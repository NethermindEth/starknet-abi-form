import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import loadashFp from 'lodash';
import { ABIFunction, ABIStruct, yupAbiFunctionSchema } from './types';

import './FunctionForm.css';
import {
  extractAbiTypes,
  extractInitialValues,
  extractValidationSchema,
  reduceFunctionInputs,
} from './types/uiHelpers';

type IFunctionForm = {
  functionAbi: ABIFunction;
  structs: ABIStruct[];
  // enums: ABIEnum[];
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
          <div className="input-wrapper" key={fullPath?.join('|')}>
            <label htmlFor={`${name ? `${name}.` : ''}${key}`}>
              {`${name ? `${name}.` : ''}${key}`} |{' '}
              <span>{JSON.stringify(abiTypeInfo)}</span>
            </label>
            <input
              type="text"
              id={`${name ? `${name}.` : ''}${key}`}
              name={`${name ? `${name}.` : ''}${key}`}
              placeholder={`${name ? `${name}.` : ''}${key}`}
              style={{ width: '100%' }}
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
          <div className="border-struct" key={lParentKeys.join('|')}>
            <p>struct: {key}</p>
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

        return (
          <div className="array-wrapper">
            <h5>Array: {key}</h5>
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

                if (loadashFp.has(errors, fullPath)) {
                  error = loadashFp.get(errors, fullPath);
                }

                return (
                  <div className="border-array-item" key={fullPath.join('|')}>
                    <div className="input-wrapper">
                      <label htmlFor={`${name}`}>{`${name}`}</label>
                      <input
                        type="text"
                        name={`${name}`}
                        id={`${name}`}
                        placeholder={`${name}`}
                        style={{ width: '100%' }}
                        onChange={handleChange}
                      />
                      <p className="input-error">{error}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArrayPop(pathKeys, index);
                      }}
                    >
                      DELETE -
                    </button>
                  </div>
                );
              }

              return (
                <div className="border-array-item" key={lParentKeys.join('|')}>
                  <p>
                    {index + 1}. struct: {key}
                  </p>
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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArrayPop(pathKeys, index);
                    }}
                  >
                    DELETE -
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleArrayPush(pathKeys, initalObj);
              }}
            >
              ADD +
            </button>
          </div>
        );
      }
      return '';
    });
  }
  return <p>Could not parse type!!</p>;
};

const FunctionForm: React.FC<IFunctionForm> = ({
  functionAbi,
  structs,
  // enums,
}) => {
  // Check if functionAbi is correct with yup validation schema
  try {
    yupAbiFunctionSchema.validateSync(functionAbi);
  } catch (e) {
    return <p>Not a valid function ABI</p>;
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

  const { values, errors, setValues, handleChange, handleSubmit } = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: (finalValues) => {
      // @ts-ignore
      console.log('final values:', { finalValues });
    },
  });

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
    <div>
      <h5>
        {functionAbi?.name}(
        {functionAbi?.inputs?.map((ip) => `${ip?.name}: ${ip?.type}`).join(',')}
        )
      </h5>
      <form onSubmit={handleSubmit}>
        <ParseInputFieldsFromObject
          values={values}
          errors={errors}
          initialValues={initialValues}
          abiTypes={abiTypesInfo}
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
