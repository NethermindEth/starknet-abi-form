import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import loadashFp from 'lodash';
import { ABIFunction, ABIStruct, yupAbiFunctionSchema } from './types';

import './FunctionForm.css';
import {
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
  errors: Record<string, string | {} | Array<{}>>;
  handleArrayPop: (path: string[], index: number) => void;
  handleArrayPush: (path: string[], value: string | {}) => void;
  handleChange: (e: React.ChangeEvent<any>) => any;
  parentKeys?: string[];
  values: Record<string, string | {} | Array<{}>>;
};
const ParseInputFieldsFromObject: React.FC<IParseInputFieldsFromObject> = ({
  values,
  errors,
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

        if (loadashFp.has(errors, fullPath)) {
          error = loadashFp.get(errors, fullPath);
        }
        return (
          <div className="input-wrapper" key={fullPath?.join('|')}>
            <label htmlFor={`${name ? `${name}.` : ''}${key}`}>
              {`${name ? `${name}.` : ''}${key}`}
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
            <ParseInputFieldsFromObject
              values={{ ...currentValueObject }}
              errors={errors}
              parentKeys={lParentKeys}
              handleChange={handleChange}
              handleArrayPush={handleArrayPush}
              handleArrayPop={handleArrayPop}
            />
          </div>
        );
      }
      if (Array.isArray(currentValueObject)) {
        return currentValueObject?.map((obj, index) => {
          const pathKeys = parentKeys ? [...parentKeys, key] : [key];

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
                    handleArrayPush(pathKeys, obj);
                  }}
                >
                  ADD +
                </button>
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArrayPop(pathKeys, index);
                    }}
                  >
                    DELETE -
                  </button>
                )}
              </div>
            );
          }
          return (
            <div className="border-array-item" key={lParentKeys.join('|')}>
              <ParseInputFieldsFromObject
                values={{ ...obj }}
                errors={errors}
                parentKeys={lParentKeys}
                handleChange={handleChange}
                handleArrayPush={handleArrayPush}
                handleArrayPop={handleArrayPop}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleArrayPush(pathKeys, obj);
                }}
              >
                ADD +
              </button>
              {index !== 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
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
  // console.log(initialValuesMap, functionAbi, structs);
  const initialValues = extractInitialValues(initialValuesMap);
  const validationSchema = extractValidationSchema(initialValuesMap);
  // console.log({ initialValues, validationSchema });

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
