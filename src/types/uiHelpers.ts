import * as Yup from 'yup';
import { ABIFunctionInputs, ABIStruct } from '.';
import { isACoreType } from './dataTypes';
import { extractSubTypesFromType, hasArrayOfSubType } from './helper';

// name: {type: core | array | struct, validation: yupSchema, content: [] | {} | ''}

type UIType = {
  abi_type: string;
  content: string | any[] | {};
  type: 'core' | 'array' | 'struct';
  validationSchema?: null | Yup.AnySchema;
};
const expandStructsAndReduce = (
  struct: ABIStruct,
  structs: ABIStruct[]
): UIType | {} => {
  if (struct && typeof struct === 'object') {
    if (
      struct.members &&
      Array.isArray(struct.members) &&
      struct.members.length > 0
    ) {
      return struct.members.reduce((pMember, cMember) => {
        if (isACoreType(cMember.type)) {
          return {
            ...pMember,
            [cMember.name]: {
              type: 'core',
              abi_type: cMember.type,
              validationSchema: Yup.string().required(),
              content: '',
            },
          };
        }
        if (hasArrayOfSubType(cMember.type)) {
          const isSubTypes = extractSubTypesFromType(cMember.type);
          if (isSubTypes && isSubTypes?.contains && isSubTypes?.types) {
            const subArrType = isSubTypes.types[0];
            // Is Array is of core type return,
            if (isACoreType(subArrType)) {
              return {
                ...pMember,
                [cMember.name]: {
                  type: 'array',
                  abi_type: cMember.type,
                  validationSchema: Yup.array().of(Yup.string().required()),
                  content: [],
                },
              };
            }
            // Else call recursively
            const structArrIdx = structs?.findIndex(
              (lStruct) => lStruct.name === subArrType
            );
            if (structArrIdx > -1) {
              const reducedStruct = expandStructsAndReduce(
                structs[structArrIdx],
                structs
              );

              return {
                ...pMember,
                [cMember.name]: {
                  type: 'array',
                  validationSchema: null,
                  abi_type: cMember.type,
                  content: [
                    {
                      ...reducedStruct,
                    },
                  ],
                },
              };
            }
            return {
              ...pMember,
              [cMember.name]: {
                type: 'raw',
                abi_type: cMember.type,
                validationSchema: Yup.string(),
                content: '',
              },
            };
          }
        }

        const structIdx = structs?.findIndex(
          (lStruct) => lStruct.name === cMember.type
        );

        if (structIdx > -1) {
          const reducedStruct = expandStructsAndReduce(
            structs[structIdx],
            structs
          );

          return {
            ...pMember,
            [cMember.name]: {
              type: 'struct',
              abi_type: cMember.type,
              validationSchema: null,
              content: {
                ...reducedStruct,
              },
            },
          };
        }

        return {
          ...pMember,
        };
      }, {});
    }
    return {};
  }
  return {};
};

export const reduceFunctionInputs = (
  inputs: ABIFunctionInputs[],
  structs: ABIStruct[]
): UIType | {} =>
  inputs?.reduce((p, c) => {
    if (isACoreType(c.type)) {
      return {
        ...p,
        [c.name]: {
          type: 'core',
          abi_type: c.type,
          validationSchema: Yup.string()
            .required()
            // @ts-expect-error because validate_ip is not a function of Yup
            .validate_core_type(c.type),
          content: '',
        },
      };
    }

    if (hasArrayOfSubType(c.type)) {
      const isSubTypes = extractSubTypesFromType(c.type);
      if (isSubTypes && isSubTypes?.contains && isSubTypes?.types) {
        const subArrType = isSubTypes.types[0];
        if (isACoreType(subArrType)) {
          return {
            ...p,
            [c.name]: {
              type: 'array',
              abi_type: c.type,
              validationSchema: Yup.array(
                Yup.string()
                  .required()
                  // @ts-expect-error because validate_ip is not a function of Yup
                  .validate_core_type(subArrType)
              ),
              content: [],
            },
          };
        }
        const structArrIdx = structs?.findIndex(
          (struct) => struct.name === subArrType
        );

        if (structArrIdx > -1) {
          const reducedStruct = expandStructsAndReduce(
            structs[structArrIdx],
            structs
          );
          return {
            ...p,
            [c.name]: {
              type: 'array',
              validationSchema: null,
              abi_type: c.type,
              content: [
                {
                  ...reducedStruct,
                },
              ],
            },
          };
        }
        return {
          ...p,
          [c.name]: {
            type: 'raw',
            abi_type: c.type,
            validationSchema: Yup.string().required(),
            content: '',
          },
        };
      }
    }

    const structIdx = structs?.findIndex((struct) => struct.name === c.type);

    if (structIdx > -1) {
      const reducedStruct = expandStructsAndReduce(structs[structIdx], structs);
      return {
        ...p,
        [c.name]: {
          type: 'struct',
          abi_type: c.type,
          validationSchema: null,
          content: {
            ...reducedStruct,
          },
        },
      };
    }

    return {
      ...p,
    };
  }, {});

export function extractInitialValues(values: UIType | {}): {} {
  if (typeof values === 'object' && Object.keys(values).length > 0) {
    return Object.keys(values).reduce((p, c) => {
      // @ts-ignore
      const currentObj = values[c];
      //   console.log(currentObj);
      if (currentObj?.type === 'core') {
        return {
          ...p,
          [c]: currentObj?.content,
        };
      }

      if (currentObj?.type === 'struct') {
        return {
          ...p,
          [c]: extractInitialValues(currentObj?.content),
        };
      }

      if (currentObj?.type === 'array') {
        if (currentObj?.content.length > 0) {
          // We can safely take 0th object from array since
          // we have assigned in our default parsing for presenting arrays.
          return {
            ...p,
            [c]: [extractInitialValues(currentObj?.content[0])],
          };
        }
        return {
          ...p,
          [c]: [''],
        };
      }

      return {
        ...p,
      };
    }, {});
  }
  return {};
}

export function extractValidationSchema(values: UIType | {}): {} {
  if (typeof values === 'object' && Object.keys(values).length > 0) {
    return Object.keys(values).reduce((p, c) => {
      // @ts-ignore
      const currentObj = values[c];
      //   console.log(currentObj);
      if (currentObj?.type === 'core') {
        return {
          ...p,
          [c]: currentObj?.validationSchema,
        };
      }

      if (currentObj?.type === 'struct') {
        return {
          ...p,
          [c]: Yup.object(extractValidationSchema(currentObj?.content)),
        };
      }

      if (currentObj?.type === 'array') {
        // We can safely take 0th object from array since
        // we have assigned in our default parsing for presenting arrays.
        return {
          ...p,
          [c]: currentObj?.validationSchema
            ? currentObj?.validationSchema
            : Yup.array(
                Yup.object(extractValidationSchema(currentObj?.content[0]))
              ).required(),
        };
      }

      return {
        ...p,
      };
    }, {});
  }
  return {};
}
