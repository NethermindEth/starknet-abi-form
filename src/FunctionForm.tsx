import React from 'react';
import {
  ABIEnum,
  ABIFunction,
  ABIFunctionInputs,
  ABIStruct,
  yupAbiFunctionSchema,
} from './types';
import { CoreTypes, isACoreType } from './types/dataTypes';
import StructForm from './StructForm';
import {
  extractSubTypesFromType,
  hasArrayOfSubType,
  hasSubTypes,
} from './types/helper';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import loadashFp from 'lodash';

import './FunctionForm.css';

// name: {type: core | array | struct, validation: yupSchema, content: [] | {} | ''}

type UIType = {
  type: 'core' | 'array' | 'struct';
  validationSchema?: null | Yup.AnySchema;
  abi_type: string;
  content: string | any[] | {};
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
              validationSchema: Yup.string(),
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
                  validationSchema: Yup.array().of(Yup.string()),
                  content: [],
                },
              };
            } else {
              // Else call recursively
              const structArrIdx = structs?.findIndex(
                (struct) => struct.name === subArrType
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
              } else {
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
          }
        }

        const structIdx = structs?.findIndex(
          (struct) => struct.name === cMember.type
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
    } else {
      return {};
    }
  }
  return {};
};

function reduceFunctionInputs(
  inputs: ABIFunctionInputs[],
  structs: ABIStruct[]
): UIType | {} {
  return inputs?.reduce((p, c) => {
    if (isACoreType(c.type)) {
      return {
        ...p,
        [c.name]: {
          type: 'core',
          abi_type: c.type,
          validationSchema: Yup.string().required(),
          content: '',
        },
      };
    }

    if (hasArrayOfSubType(c.type)) {
      const isSubTypes = extractSubTypesFromType(c.type);
      if (isSubTypes && isSubTypes?.contains && isSubTypes?.types) {
        const subArrType = isSubTypes.types[0];
        if (isACoreType(c.type)) {
          return {
            ...p,
            [c.name]: {
              type: 'array',
              abi_type: c.type,
              validationSchema: Yup.array().of(Yup.string().required()),
              content: [],
            },
          };
        } else {
          const structArrIdx = structs?.findIndex(
            (struct) => struct.name === c.type
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
          } else {
            return {
              ...p,
              [c.name]: {
                type: 'raw',
                abi_type: c.type,
                validationSchema: Yup.string(),
                content: '',
              },
            };
          }
        }
      }
    }

    const structIdx = structs?.findIndex((struct) => struct.name === c.type);

    if (structIdx > -1) {
      const reduced_struct = expandStructsAndReduce(
        structs[structIdx],
        structs
      );
      return {
        ...p,
        [c.name]: {
          type: 'struct',
          abi_type: c.type,
          validationSchema: null,
          content: {
            ...reduced_struct,
          },
        },
      };
    }

    return {
      ...p,
    };
  }, {});
}

function extractInitialValues(values: UIType | {}): {} {
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
        // We can safely take 0th object from array since
        // we have assigned in our default parsing for presenting arrays.
        return {
          ...p,
          [c]: [
            {
              ...extractInitialValues(currentObj?.content[0]),
            },
          ],
        };
      }

      return {
        ...p,
      };
    }, {});
  }
  return {};
}

function extractValidationSchema(values: UIType | {}): {} {
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
          [c]: extractValidationSchema(currentObj?.content),
        };
      }

      if (currentObj?.type === 'array') {
        // We can safely take 0th object from array since
        // we have assigned in our default parsing for presenting arrays.
        return {
          ...p,
          [c]: [
            {
              ...extractValidationSchema(currentObj?.content[0]),
            },
          ],
        };
      }

      return {
        ...p,
      };
    }, {});
  }
  return {};
}

type IFunctionForm = {
  functionAbi: ABIFunction;
  structs: ABIStruct[];
  enums: ABIEnum[];
};

type IParseInputFieldsFromObject = {
  values: Record<string, string | {} | Array<{}>>;
  // errors: Record<string, string | {} | Array<{}>>;
  parentKey?: string[];
  handleChange: (e: React.ChangeEvent<any>) => any;
  handleArrayPush: (path: string[], value: string | {}) => void;
  handleArrayPop: (path: string[], index: number) => void;
};
const ParseInputFieldsFromObject: React.FC<IParseInputFieldsFromObject> = ({
  values,
  parentKey,
  handleChange,
  handleArrayPush,
  handleArrayPop,
}) => {
  if (typeof values === 'object') {
    const keys = Object.keys(values);

    return keys.map((key) => {
      const currentValueObject = values[key];

      if (typeof currentValueObject === 'string') {
        let name =
          parentKey && parentKey?.length > 0
            ? parentKey?.reduce((p, c) => {
                if (isNaN(parseInt(c))) {
                  return `${p}.${c}`;
                } else {
                  return `${p}[${c}]`;
                }
              }, '')
            : '';
        if (name.length > 0 && name.startsWith('.')) {
          name = name.slice(1);
        }
        return (
          <div className="simple-input">
            <label>{`${name ? `${name}.` : ''}${key}`}</label>
            <input
              type="text"
              name={`${name ? `${name}.` : ''}${key}`}
              placeholder={`${name ? `${name}.` : ''}${key}`}
              style={{ width: '100%' }}
              onChange={handleChange}
            />
          </div>
        );
      }
      if (
        typeof currentValueObject === 'object' &&
        !Array.isArray(currentValueObject)
      ) {
        const parentKeys = parentKey ? [...parentKey, key] : [key];
        return (
          <div className="border-struct">
            <ParseInputFieldsFromObject
              values={{ ...currentValueObject }}
              parentKey={parentKeys}
              handleChange={handleChange}
              handleArrayPush={handleArrayPush}
              handleArrayPop={handleArrayPop}
            />
          </div>
        );
      }
      if (Array.isArray(currentValueObject)) {
        return currentValueObject?.map((obj, index) => {
          const pathKeys = parentKey ? [...parentKey, key] : [key];
          const parentKeys = parentKey
            ? [...parentKey, key, index.toString()]
            : [key];
          return (
            <div className="border-array">
              <ParseInputFieldsFromObject
                values={{ ...obj }}
                parentKey={parentKeys}
                handleChange={handleChange}
                handleArrayPush={handleArrayPush}
                handleArrayPop={handleArrayPop}
              />
              <button onClick={() => handleArrayPush(pathKeys, obj)}>
                ADD +
              </button>
              {index !== 0 && (
                <button
                  onClick={() => {
                    handleArrayPop(pathKeys, index);
                  }}
                >
                  DELETE -
                </button>
              )}
            </div>
          );
        });
      }
    });
  }
  return <></>;
};

const FunctionForm: React.FC<IFunctionForm> = ({
  functionAbi,
  structs,
  enums,
}) => {
  // Check if functionAbi is correct with yup validation schema
  try {
    yupAbiFunctionSchema.validateSync(functionAbi);
  } catch (e) {
    return <p>Not a valid function ABI</p>;
  }

  const initialValuesMap = reduceFunctionInputs(functionAbi?.inputs, structs);

  //   console.log(initialValuesMap, functionAbi, structs);
  const initialValues = extractInitialValues(initialValuesMap);
  const validationSchema = extractValidationSchema(initialValuesMap);
  console.log({ initialValues, validationSchema });

  const { values, errors, dirty, handleChange, handleSubmit } = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      console.log(values, validationSchema);
    },
  });

  console.log(values, errors, dirty);

  const handleArrayPush = (path: string[], value: string | {}) => {
    if (loadashFp.has(values, path)) {
      const oldValues = loadashFp.get(values, path);
      const newValues = [...oldValues, value];
      loadashFp.set(values, path, newValues);
    }
  };

  const handleArrayPop = (path: string[], index: number) => {
    if (loadashFp.has(values, path)) {
      const oldValues = loadashFp.get(values, path);
      const newValues = [
        ...oldValues.filter((o: any, i: number) => i !== index),
      ];
      loadashFp.set(values, path, newValues);
    }
  };

  return (
    <div>
      <h5>
        {functionAbi?.name}(
        {functionAbi?.inputs?.map((ip) => `${ip?.name}`).join(',')})
      </h5>
      <form onSubmit={handleSubmit}>
        <ParseInputFieldsFromObject
          values={values}
          // errors={errors}
          handleChange={handleChange}
          handleArrayPush={handleArrayPush}
          handleArrayPop={handleArrayPop}
        />
        <button type="submit">Call</button>
      </form>
    </div>
  );
};

export default FunctionForm;
