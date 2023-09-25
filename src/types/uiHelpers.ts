import * as Yup from 'yup';
import { ABIEnum, ABIFunctionInputs, ABIStruct } from '.';
import { isACoreEnum, isACoreType } from './dataTypes';
import {
  extractSubTypesFromType,
  extractSubTypesFromTypeOuter,
  extractTupleContent,
  hasArrayOfSubType,
  hasSubTypes,
  hasTuple,
  transformIndividualTypesFromTuples,
} from './helper';

// name: {type: core | array | struct, validation: yupSchema, content: [] | {} | ''}

function functionFindFromStructs(structs: ABIStruct[], name: string) {
  if (name && typeof name === 'string') {
    return structs.findIndex((struct) => struct?.name === name);
  }
  return -1;
}

function functionFindFromEnums(enums: ABIEnum[], name: string) {
  if (name && typeof name === 'string') {
    return enums.findIndex((e) => e?.name === name);
  }
  return -1;
}

export type UIType = {
  abi_type: string;
  content: string | any[] | {};
  type: 'core' | 'array' | 'struct' | 'enum';
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
              validationSchema: Yup.string()
                .required()
                // @ts-expect-error because validate_core_type is not a function of Yup
                .validate_core_type(cMember.type),
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
                  validationSchema: Yup.array(
                    Yup.string()
                      .required()
                      // @ts-expect-error because validate_core_type is not a function of Yup
                      .validate_core_type(subArrType)
                  ),
                  content: [''],
                },
              };
            }
            // Else call recursively
            const structArrIdx = functionFindFromStructs(structs, subArrType);
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

        const structIdx = functionFindFromStructs(structs, cMember.type);

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

const expandEnumsAndReduce = (en: ABIEnum, enums: ABIEnum[]): UIType | {} => {
  if (en && typeof en === 'object') {
    if (en.variants && Array.isArray(en.variants) && en.variants.length > 0) {
      return en.variants.reduce((pVariant, cVariant) => {
        // Base case
        if (isACoreType(cVariant.type)) {
          // In case we found that enum variant has a core type
          return {
            ...pVariant,
            [cVariant.name]: {
              type: 'core',
              abi_type: cVariant.type,
              validationSchema: Yup.string()
                .required()
                // @ts-expect-error because validate_core_type is not a function of Yup
                .validate_core_type(cVariant.type),
              content: '',
            },
          };
        }

        if (cVariant.type === '()') {
          return {
            ...pVariant,
            [cVariant.name]: {
              type: 'enum_option',
              abi_type: cVariant.type,
              validationSchema: null,
              content: null,
            },
          };
        }

        if (hasTuple(cVariant.type)) {
          console.log('Has tuples', cVariant.type);
          const tuples = extractTupleContent(cVariant.type);
          // explicitly taking first element from tuple
          const finalTuples = tuples.map((tuple) =>
            transformIndividualTypesFromTuples(tuple)
          )[0];

          const finalReducedValues = finalTuples.reduce((pVal, cVal, index) => {
            return {
              ...pVal,
              [index]: {
                type: 'core',
                abi_type: cVal,
                content: '',
                validationSchema: null,
              },
            };
          }, {});

          return {
            ...pVariant,
            [cVariant.name]: {
              type: 'enum',
              abi_type: cVariant.type,
              validationSchema: null,
              content: finalReducedValues,
            },
          };
        }

        if (hasSubTypes(cVariant.type)) {
          const subArrType = extractSubTypesFromTypeOuter(cVariant.type);
          console.log('Has subtype ?', subArrType?.types);
        }
        // if (isACoreType(cVariant.type)) {
        //   return {
        //     ...pVariant,
        //     [cVariant.name]: {
        //       type: 'core',
        //       abi_type: cVariant.type,
        //       validationSchema: Yup.string()
        //         .required()
        //         // @ts-expect-error because validate_core_type is not a function of Yup
        //         .validate_core_type(cVariant.type),
        //       content: '',
        //     },
        //   };
        // }
        // if (hasArrayOfSubType(cVariant.type)) {
        //   const isSubTypes = extractSubTypesFromType(cVariant.type);
        //   if (isSubTypes && isSubTypes?.contains && isSubTypes?.types) {
        //     const subArrType = isSubTypes.types[0];
        //     // Is Array is of core type return,
        //     if (isACoreType(subArrType)) {
        //       return {
        //         ...pVariant,
        //         [cVariant.name]: {
        //           type: 'array',
        //           abi_type: cVariant.type,
        //           validationSchema: Yup.array(
        //             Yup.string()
        //               .required()
        //               // @ts-expect-error because validate_core_type is not a function of Yup
        //               .validate_core_type(subArrType)
        //           ),
        //           content: [''],
        //         },
        //       };
        //     }
        //     // Else call recursively
        //     const enumArrIdx = functionFindFromEnums(enums, subArrType);
        //     if (enumArrIdx > -1) {
        //       const reducedStruct = expandEnumsAndReduce(
        //         enums[enumArrIdx],
        //         enums
        //       );

        //       return {
        //         ...pVariant,
        //         [cVariant.name]: {
        //           type: 'array',
        //           validationSchema: null,
        //           abi_type: cVariant.type,
        //           content: [
        //             {
        //               ...reducedStruct,
        //             },
        //           ],
        //         },
        //       };
        //     }
        //     return {
        //       ...pVariant,
        //       [cVariant.name]: {
        //         type: 'raw',
        //         abi_type: cVariant.type,
        //         validationSchema: Yup.string(),
        //         content: '',
        //       },
        //     };
        //   }
        // }

        // const enumIdx = functionFindFromEnums(enums, cVariant.type);

        // if (enumIdx > -1) {
        //   const reducedStruct = expandEnumsAndReduce(
        //     enums[enumIdx],
        //     enums
        //   );

        //   return {
        //     ...pVariant,
        //     [cVariant.name]: {
        //       type: 'enum',
        //       abi_type: cVariant.type,
        //       validationSchema: null,
        //       content: {
        //         ...reducedStruct,
        //       },
        //     },
        //   };
        // }

        return {
          ...pVariant,
        };
      }, {});
    }
    return {};
  }
  return {};
};

export const reduceFunctionInputs = (
  inputs: ABIFunctionInputs[],
  structs: ABIStruct[],
  enums: ABIEnum[]
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
            // @ts-expect-error because validate_core_type is not a function of Yup
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
                  // @ts-expect-error because validate_core_type is not a function of Yup
                  .validate_core_type(subArrType)
              ),
              content: [''],
            },
          };
        }
        const structArrIdx = functionFindFromStructs(structs, subArrType);

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

    const structIdx = functionFindFromStructs(structs, c.type);

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

    const enumIdx = functionFindFromEnums(enums, c.type);

    if (enumIdx > -1) {
      console.log('Found enum', enumIdx, enums[enumIdx]);
      const reducedEnum = expandEnumsAndReduce(enums[enumIdx], enums);
      console.log({ fnname: c.name, reducedEnum });
      return {
        ...p,
        [c.name]: {
          type: 'enum',
          abi_type: c.type,
          content: {
            ...reducedEnum,
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

      if (currentObj?.type === 'enum') {
        return {
          ...p,
          [c]: extractInitialValues(currentObj?.content),
        };
      }

      if (currentObj?.type === 'array') {
        if (currentObj?.content.length > 0) {
          // We can safely take 0th object from array since
          // we have assigned in our default parsing for presenting arrays.
          if (typeof currentObj?.content[0] === 'string') {
            return {
              ...p,
              [c]: [''],
            };
          }
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

      if (currentObj?.type === 'enum') {
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

export function extractAbiTypes(values: UIType | {}): {} {
  if (typeof values === 'object' && Object.keys(values).length > 0) {
    return Object.keys(values).reduce((p, c) => {
      // @ts-ignore
      const currentObj = values[c];

      if (currentObj?.type === 'core') {
        return {
          ...p,
          [c]: currentObj?.abi_type,
        };
      }

      if (currentObj?.type === 'struct') {
        return {
          ...p,
          [c]: extractAbiTypes(currentObj?.content),
        };
      }

      if (currentObj?.type === 'enum') {
        return {
          ...p,
          [c]: extractAbiTypes(currentObj?.content),
        };
      }

      if (currentObj?.type === 'array') {
        // We can safely take 0th object from array since
        // we have assigned in our default parsing for presenting arrays.
        if (
          currentObj?.content.length > 0 &&
          typeof currentObj?.content[0] === 'object'
        ) {
          return {
            ...p,
            [c]: [{ ...extractAbiTypes(currentObj?.content[0]) }],
          };
        }
        const { contains, types } = extractSubTypesFromType(
          currentObj?.abi_type
        );
        if (contains && types && types?.length > 0) {
          return {
            ...p,
            [c]: [types[0]],
          };
        }
        return {
          ...p,
          [c]: [currentObj?.abi_type],
        };
      }

      return {
        ...p,
      };
    }, {});
  }
  return {};
}
