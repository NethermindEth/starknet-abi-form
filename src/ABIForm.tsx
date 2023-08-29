import './ABIForm.css';

import React, { useMemo, useState } from 'react';

import { ABI, abiSchema } from './types/index';
import {
  extractFunctionFromRawAbi,
  extractStructFromABI,
  segregateViewAndExternalFunctions,
} from './types/helper';
import FunctionForm from './FunctionForm';
import { Content, List, Root, Trigger } from './UIComponents/Tabs/Tabs';
import { ActiveTabClasses, DefaultTabClasses } from './utils/tailwindClasses';

export type CallbackReturnType = {
  functionName: string;
  raw: {};
  starkli?: {
    bigint: bigint[];
    decimal: string;
    hex: string;
  };
  stateMutability: 'view' | 'external';
};

export type ABIFormProps = {
  abi?: ABI;
  callBackFn: (value: CallbackReturnType) => void;
};

export const ABIForm: React.FC<ABIFormProps> = ({ abi, callBackFn }) => {
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
      return filteredFunction;
    } catch (e) {
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

  // const enums = useMemo(() => {
  //   try {
  //     return extractEnumsFromABI(abi);
  //   } catch (e) {
  //     return [];
  //   }
  // }, [abi]);

  const [activeTab, setActiveTab] = useState<'read' | 'write'>('write');

  return (
    <Root value={activeTab}>
      <List className="text-sm font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <Trigger
          value="read"
          className={
            activeTab === 'read' ? ActiveTabClasses : DefaultTabClasses
          }
          onClick={() => {
            setActiveTab('read');
          }}
        >
          Read
        </Trigger>
        <Trigger
          value="write"
          className={
            activeTab === 'write' ? ActiveTabClasses : DefaultTabClasses
          }
          onClick={() => {
            setActiveTab('write');
          }}
        >
          Write
        </Trigger>
      </List>
      <Content value="read">
        {viewFunctions.map((viewFn) => (
          <FunctionForm
            key={`viewFn-${viewFn.name}`}
            functionAbi={viewFn}
            structs={structs}
            callbackFn={callBackFn}
            // enums={enums}
          />
        ))}
      </Content>
      <Content value="write">
        {externalFunctions.map((externalFn) => (
          <FunctionForm
            key={`externalFn-${externalFn.name}`}
            functionAbi={externalFn}
            structs={structs}
            callbackFn={callBackFn}
            // enums={enums}
          />
        ))}
      </Content>
    </Root>
  );
};
