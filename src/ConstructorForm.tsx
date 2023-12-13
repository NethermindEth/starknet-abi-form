import './ABIForm.css';

import React, { useMemo } from 'react';

import { ABI, abiSchema } from './types/index';
import {
  convertConstructorToFunction,
  EMPTY_CONSTRUCTOR_FUNCTION,
  extractConstructorFromRawAbi,
} from './types/helper';
import FunctionForm from './FunctionForm';
import { Provider } from './UIComponents/Tooltip/Tooltip';
import { CallbackReturnType } from './ABIForm';

export type ConstructorFormProps = {
  abi?: ABI;
  callBackFn: (value: CallbackReturnType) => void;
};

export const ConstructorForm: React.FC<ConstructorFormProps> = ({
  abi,
  callBackFn,
}) => {
  try {
    abiSchema.validateSync(abi);
  } catch (e) {
    console.error(e);
    return <p className="invalid-abi">Not a Valid ABI Schema Cairo v2</p>;
  }

  const constructor = useMemo(() => {
    try {
      const constructorFromAbi = extractConstructorFromRawAbi(abi);
      return convertConstructorToFunction(constructorFromAbi);
    } catch (e) {
      return EMPTY_CONSTRUCTOR_FUNCTION;
    }
  }, [abi]);

  return (
    <Provider>
      <FunctionForm
        callbackFn={callBackFn}
        functionAbi={constructor}
        structs={[]}
        buttonLabel="Deploy"
      />
    </Provider>
  );
};

export default ConstructorForm;
