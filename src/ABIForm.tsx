import './ABIForm.css';

import React, { useMemo } from 'react';

import { ABI, abiSchema } from './types/index';
import {
  extractEnumsFromABI,
  extractFunctionFromRawAbi,
  extractStructFromABI,
  extractSubTypesFromType,
  segregateViewAndExternalFunctions,
} from './types/helper';
import FunctionForm from './FunctionForm';

export type ABIFormProps = {
  abi?: ABI;
};

export const ABIForm: React.FC<ABIFormProps> = ({ abi }) => {
  try {
    abiSchema.validateSync(abi);
  } catch (e) {
    return <p>Not a Valid ABI Schema</p>;
  }


  // If abi validated successfully then it's a valid abi as per spec.
  // https://github.com/starkware-libs/starknet-specs/blob/master/api/starknet_metadata.json

  const { viewFunctions, externalFunctions } = useMemo(() => {
    try {
      const rawFns = extractFunctionFromRawAbi(abi, []);
      const filteredFunction = segregateViewAndExternalFunctions(rawFns);

      // rawFns.map((fn) => {
      //   fn?.inputs.map((ip) => {
      //     const subType = extractSubTypesFromType(ip?.type);
      //     if (subType.contains) console.log({ fn, subType });
      //   });
      // });
      // console.log(extractStructFromABI(abi), extractEnumsFromABI(abi));
      return filteredFunction;
    } catch (e) {
      console.log(e);
      return {
        viewFunctions: [],
        externalFunctions: [],
      };
    }
  }, [abi]);

  const structs = useMemo(() => {
    try {
      return extractStructFromABI(abi);
    } catch (e) {
      return [];
    }
  }, [abi]);

  const enums = useMemo(() => {
    try {
      return extractEnumsFromABI(abi);
    } catch (e) {
      return [];
    }
  }, [abi]);

  return (
    <>
      <div>
        <p>Read</p>
        {viewFunctions.map((viewFn) => {
          return (
            <FunctionForm
              functionAbi={viewFn}
              structs={structs}
              enums={enums}
            />
          );
        })}
        <p>Write</p>
        {externalFunctions.map((externalFn) => {
          return (
            <FunctionForm
              functionAbi={externalFn}
              structs={structs}
              enums={enums}
            />
          );
        })}
      </div>
    </>
  );
};
