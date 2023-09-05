import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import loadashFp from 'lodash';
import { useAtom } from 'jotai';
import { ABIFunction, ABIStruct, yupAbiFunctionSchema } from './types';

import './FunctionForm.css';
import {
  extractAbiTypes,
  extractInitialValues,
  extractValidationSchema,
  reduceFunctionInputs,
} from './types/uiHelpers';
import {
  AccordionRoot,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './UIComponents/Accordian/Accordian';
import { Button, ButtonColorsClasses } from './UIComponents/Button/Button';
import Tag, { TagColors } from './UIComponents/Tag/Tag';
import {
  flattenArrays,
  flattenToRawCallData,
  transformStringArrayToInteger,
} from './types/helper';
import { CallbackReturnType } from './ABIForm';
import { formsAtom } from './atoms';

const typeToTagColor = (name: string): TagColors => {
  try {
    const pathNames = name?.split('::');
    const coreType = pathNames[pathNames.length - 1];
    // console.log({pathNames, coreType})

    switch (coreType) {
      case 'u8':
        return 'green';
      case 'u16':
        return 'green';
      case 'u32':
        return 'green';
      case 'u64':
        return 'green';
      case 'u128':
        return 'green';
      case 'bool':
        return 'indigo';
      case 'felt252':
        return 'yellow';
      case 'ContractAddress':
        return 'pink';
      default:
        return 'blue';
    }
  } catch (e) {
    return 'blue';
  }
};

type IParseInputFieldsFromObject = {
  abiTypes: Record<string, string | {} | Array<{}>>;
  errors: Record<string, string | {} | Array<{}>>;
  handleArrayPop: (path: string[], index: number) => void;
  handleArrayPush: (path: string[], value: string | {}) => void;
  handleChange: (e: React.ChangeEvent<any>) => any;
  initialValues: Record<string, string | {} | Array<{}>>;
  parentKeys?: string[];
  values: Record<string, string | {} | Array<{}>>;
};
const ParseInputFieldsFromObject: React.FC<IParseInputFieldsFromObject> = ({
  values,
  errors,
  abiTypes,
  initialValues,
  parentKeys,
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
          parentKeys && parentKeys?.length > 0
            ? parentKeys?.reduce((p, c) => {
                if (Number.isNaN(parseInt(c, 10))) {
                  return `${p}.${c}`;
                }
                return `${p}[${c}]`;
              }, '')
            : '';
        if (name.length > 0 && name.startsWith('.')) {
          name = name.slice(1);
        }

        const fullPath = parentKeys ? [...parentKeys, key] : [key];
        let error = '';

        let abiTypeInfo = '';
        if (loadashFp.has(errors, fullPath)) {
          error = loadashFp.get(errors, fullPath);
        }

        // Since Type conform to initial state,
        // For arrays index 0 will have the valid type.
        const initialFullPath = fullPath.map((pathItem) => {
          if (Number.isNaN(parseInt(pathItem, 10))) {
            return pathItem;
          }
          return '0';
        });
        if (loadashFp.has(abiTypes, initialFullPath)) {
          abiTypeInfo = loadashFp.get(abiTypes, initialFullPath);
        }

        return (
          <div
            className="my-2 w-full px-2 py-1 border-gray-200 border-2 rounded function-form-input-wrapper"
            key={fullPath?.join('|')}
          >
            <label
              htmlFor={`${name ? `${name}.` : ''}${key}`}
              className="block mb-2 text-sm font-medium input-label"
            >
              {`${name ? `${name}.` : ''}${key}`}
              <Tag
                style={{ marginLeft: '1rem' }}
                tag={typeToTagColor(abiTypeInfo)}
                className="input-tag"
              >
                {abiTypeInfo}
              </Tag>
            </label>
            <input
              type="text"
              id={`${name ? `${name}.` : ''}${key}`}
              name={`${name ? `${name}.` : ''}${key}`}
              placeholder={`${name ? `${name}.` : ''}${key}`}
              value={currentValueObject}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 function-form-input"
              onChange={handleChange}
            />
            <p className="input-error">{error}</p>
          </div>
        );
      }
      if (
        typeof currentValueObject === 'object' &&
        !Array.isArray(currentValueObject)
      ) {
        const lParentKeys = parentKeys ? [...parentKeys, key] : [key];
        return (
          <div
            className="w-full flex flex-col shadow-md shadow-green-500 rounded p-2 my-2 bg-green-50 function-struct"
            key={lParentKeys.join('|')}
          >
            <p className="text-xl font-bold function-struct-header">
              struct: {key}
            </p>
            <ParseInputFieldsFromObject
              values={{ ...currentValueObject }}
              errors={errors}
              initialValues={initialValues}
              abiTypes={abiTypes}
              parentKeys={lParentKeys}
              handleChange={handleChange}
              handleArrayPush={handleArrayPush}
              handleArrayPop={handleArrayPop}
            />
          </div>
        );
      }
      if (Array.isArray(currentValueObject)) {
        const pathKeys = parentKeys ? [...parentKeys, key] : [key];
        const initalArrPath = pathKeys.map((pathItem) => {
          if (Number.isNaN(parseInt(pathItem, 10))) {
            return pathItem;
          }
          return '0';
        });
        let initalObj = '';
        if (loadashFp.has(initialValues, initalArrPath)) {
          const initalArr = loadashFp.get(initialValues, initalArrPath);
          if (initalArr && Array.isArray(initalArr) && initalArr.length > 0) {
            [initalObj] = initalArr;
          }
        }

        const [accordianTabsState, setAccordianTabsState] = useState<string[]>(
          (): string[] => {
            const retArr = currentValueObject
              ? currentValueObject?.map((obj, index) => {
                  const lParentKeys = parentKeys
                    ? [...parentKeys, key, index.toString()]
                    : [key, index.toString()];
                  return lParentKeys.join('|');
                })
              : [];
            return retArr;
          }
        );

        return (
          <AccordionRoot
            type="multiple"
            key={`accordion-root|${pathKeys.join('|')}`}
            className="w-full shadow-sm shadow-purple-500 p-2 rounded bg-purple-50 function-array-root"
            value={accordianTabsState}
            onValueChange={(value) => {
              const diff = loadashFp.difference(accordianTabsState, value);
              if (diff.length > 0) {
                const filteredAccordianTabsState = accordianTabsState.filter(
                  (activeTab) => !diff.includes(activeTab)
                );
                setAccordianTabsState([...filteredAccordianTabsState]);
                return;
              }
              setAccordianTabsState([...accordianTabsState, ...value]);
            }}
          >
            <div className="flex justify-between items-center function-array-header">
              <h5 className="text-xl array-title">Array: {key}</h5>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleArrayPush(pathKeys, initalObj);
                }}
                className="array-add"
              >
                ADD +
              </Button>
            </div>
            {currentValueObject?.map((obj, index) => {
              const lParentKeys = parentKeys
                ? [...parentKeys, key, index.toString()]
                : [key, index.toString()];

              if (typeof obj === 'string') {
                // In this case it is an array of coreDataType, so don't have to call recursively here.
                // Stop Condition

                let name =
                  lParentKeys && lParentKeys?.length > 0
                    ? lParentKeys?.reduce((p, c) => {
                        if (Number.isNaN(parseInt(c, 10))) {
                          return `${p}.${c}`;
                        }
                        return `${p}[${c}]`;
                      }, '')
                    : '';
                if (name.length > 0 && name.startsWith('.')) {
                  name = name.slice(1);
                }

                const fullPath = lParentKeys;

                let error = '';
                let coreArrAbiTypeInfo = '';

                if (loadashFp.has(errors, fullPath)) {
                  error = loadashFp.get(errors, fullPath);
                }

                // Since Type conform to initial state,
                // For arrays index 0 will have the valid type.
                const initialFullPathCoreArr = fullPath.map((pathItem) => {
                  if (Number.isNaN(parseInt(pathItem, 10))) {
                    return pathItem;
                  }
                  return '0';
                });
                if (loadashFp.has(abiTypes, initialFullPathCoreArr)) {
                  coreArrAbiTypeInfo = loadashFp.get(
                    abiTypes,
                    initialFullPathCoreArr
                  );
                }

                return (
                  <div
                    className="w-full flex flex-col items-end shadow-md shadow-green-500 rounded p-2 bg-green-50 my-2 array-core-item"
                    key={fullPath.join('|')}
                  >
                    <Button
                      className="w-max array-core-item-delete"
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArrayPop(pathKeys, index);
                      }}
                    >
                      DELETE
                    </Button>
                    <div className="my-2 w-full px-2 py-1 border-gray-200 border-2 rounded function-form-input-wrapper">
                      <label
                        htmlFor={`${name}`}
                        className="block mb-2 text-sm font-medium input-label"
                      >
                        {`${name}`}{' '}
                        <Tag
                          style={{ marginLeft: '1rem' }}
                          tag={typeToTagColor(coreArrAbiTypeInfo)}
                          className="input-tag"
                        >
                          {coreArrAbiTypeInfo}
                        </Tag>{' '}
                      </label>
                      <input
                        type="text"
                        name={`${name}`}
                        id={`${name}`}
                        value={obj}
                        placeholder={`${name}`}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 function-form-input"
                        onChange={handleChange}
                      />
                      <p className="input-error">{error}</p>
                    </div>
                  </div>
                );
              }

              return (
                <AccordionItem
                  value={lParentKeys.join('|')}
                  className="w-full flex flex-col shadow-md shadow-green-500 rounded p-2 bg-green-50 my-2 array-complex-item"
                  key={lParentKeys.join('|')}
                >
                  <AccordionTrigger className="w-full hover:shadow-md hover:bg-slate-50 rounded array-complex-item-trigger">
                    <div className="flex justify-between items-center w-full px-2">
                      <p className="text-xl font-bold array-complex-item-header">
                        {index + 1}. struct: {key}
                      </p>
                      <div
                        className={`${ButtonColorsClasses.red} array-complex-item-delete`}
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArrayPop(pathKeys, index);
                        }}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          handleArrayPop(pathKeys, index);
                        }}
                      >
                        DELETE -
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="array-complex-item-content">
                    <ParseInputFieldsFromObject
                      values={{ ...obj }}
                      errors={errors}
                      initialValues={initialValues}
                      abiTypes={abiTypes}
                      parentKeys={lParentKeys}
                      handleChange={handleChange}
                      handleArrayPush={handleArrayPush}
                      handleArrayPop={handleArrayPop}
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </AccordionRoot>
        );
      }
      return '';
    });
  }
  return <p className="failed-parse-type">Could not parse type!!</p>;
};

type IFunctionForm = {
  callbackFn: (value: CallbackReturnType) => void;
  functionAbi: ABIFunction;
  response?: React.ReactNode;
  structs: ABIStruct[];
  // enums: ABIEnum[];
};

const FunctionForm: React.FC<IFunctionForm> = ({
  functionAbi,
  structs,
  callbackFn,
  response,
  // enums,
}) => {
  // Check if functionAbi is correct with yup validation schema
  try {
    yupAbiFunctionSchema.validateSync(functionAbi);
  } catch (e) {
    console.error(e);
    return <p className="invalid-abi">Not a valid function ABI</p>;
  }

  const initialValuesMap = reduceFunctionInputs(functionAbi?.inputs, structs);
  // console.log({initialValuesMap, functionAbi, structs});
  // Freezing object, as these are reference maps used to make initial forms
  // also helpers like type info + validation schema
  const initialValues = Object.freeze(extractInitialValues(initialValuesMap));
  const validationSchema = Object.freeze(
    extractValidationSchema(initialValuesMap)
  );
  const abiTypesInfo = Object.freeze(extractAbiTypes(initialValuesMap));
  // console.log({ initialValues, validationSchema, abiTypesInfo });

  // Persistent State on Jotai
  const [formStates, setFormsState] = useAtom(formsAtom);
  const oldFormStates = formStates[functionAbi.name];

  // console.log(functionAbi?.name, { oldFormStates });

  const { values, errors, setValues, handleChange, handleSubmit } = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: (finalValues) => {
      try {
        const rawArrayValues = flattenToRawCallData(finalValues);
        const starkliValues = transformStringArrayToInteger(
          flattenArrays(rawArrayValues) as string[]
        );

        const starknetValues = Object.keys(finalValues).map(
          // @ts-ignore
          (key) => finalValues[key]
        );

        const callbackReturnValues: CallbackReturnType = {
          raw: finalValues,
          functionName: functionAbi?.name,
          stateMutability: functionAbi?.state_mutability,
          starknetjs: starknetValues,
          starkli: {
            bigint: starkliValues,
            decimal: starkliValues.map((v) => v.toString(10)).join(' '),
            hex: starkliValues.map((v) => `0x${v.toString(16)}`).join(' '),
          },
        };
        callbackFn(callbackReturnValues);
      } catch (e) {
        console.error(e);
        callbackFn({
          raw: finalValues,
          functionName: functionAbi?.name,
          stateMutability: functionAbi?.state_mutability,
        });
      }
    },
  });

  useEffect(() => {
    if (oldFormStates) {
      setValues(oldFormStates);
    }
  }, []);

  useEffect(() => {
    // Update the Atom with a function name key
    if (!loadashFp.isEqual(initialValues, values)) {
      setFormsState({
        ...formStates,
        [functionAbi.name]: values,
      });
    }
  }, [values]);

  // console.log(values, errors, dirty);

  const handleArrayPush = (path: string[], value: string | {}) => {
    if (loadashFp.has(values, path)) {
      const oldValues = loadashFp.get(values, path);
      const newValues = [...oldValues, value];
      loadashFp.set(values, path, newValues);
      setValues({ ...values });
    }
  };

  const handleArrayPop = (path: string[], index: number) => {
    if (loadashFp.has(values, path)) {
      const oldValues = loadashFp.get(values, path);
      const newValues = [
        ...oldValues.filter((o: any, i: number) => i !== index),
      ];
      loadashFp.set(values, path, newValues);
      setValues({ ...values });
    }
  };

  return (
    <div className="bg-slate-100 p-3 rounded my-2 shadow-md function-root">
      <div className="flex items-center function-header">
        <p className="mr-2 text-md font-bold text-black  ">
          {functionAbi?.name}
        </p>
        (
        {functionAbi?.inputs?.map((ip) => (
          <React.Fragment key={ip?.name}>
            <span className="mr-2 text-sm font-normal dark:text-gray-400">
              {ip?.name}:
            </span>
            <Tag color={typeToTagColor(ip?.type)}>{ip?.type}</Tag>
          </React.Fragment>
        ))}
        )
      </div>
      <form onSubmit={handleSubmit} className="function-form">
        <ParseInputFieldsFromObject
          values={values}
          errors={errors}
          initialValues={initialValues}
          abiTypes={abiTypesInfo}
          handleChange={handleChange}
          handleArrayPush={handleArrayPush}
          handleArrayPop={handleArrayPop}
        />
        <Button
          type="submit"
          color="purple"
          className="my-2 function-form-submit"
        >
          Call
        </Button>
      </form>
      <div className="my-2 function-response">{response}</div>
    </div>
  );
};

export default FunctionForm;
