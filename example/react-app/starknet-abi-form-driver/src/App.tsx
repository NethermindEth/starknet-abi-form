import { useBlock, useContract, useNetwork } from '@starknet-react/core';
import WalletBar from './components/WalletBar';
import { useStarknet } from '@starknet-react/core/dist/providers';
import { ABIForm, CallbackReturnType } from 'starknet-react-abi-ui';
import "starknet-react-abi-ui/index.css"
import { useEffect, useState } from 'react';
import { Abi } from 'starknet';

function App() {
  const { data, isLoading, isError } = useBlock({
    refetchInterval: 3000,
  });

  const [abi, setAbi] = useState<Abi>([]);
  const [addressContract, setAddressContract] = useState('');

  const [responses, setResponses] = useState<Record<string, React.ReactNode>>(
    {}
  );

  useEffect(() => {
    try {
      library.getClassAt(addressContract).then((res) => {
        setAbi(res?.abi);
      });
    } catch (e) {
      console.error(e);
    }
  }, [addressContract]);

  const { library } = useStarknet();
  const { chain } = useNetwork();

  const { contract } = useContract({
    abi,
    address: addressContract,
  });

  const handleCall = (value: CallbackReturnType) => {
    if (contract !== null && value?.stateMutability === 'view') {
      console.log(value?.starkli?.decimal);
      contract?.call(value?.functionName, value?.starknetjs).then((res) => {
        setResponses({
          ...responses,
          [value?.functionName]: <div>{JSON.stringify(res)}</div>,
        });
        console.log(res);
      });
    }
    if (contract !== null && value?.stateMutability === 'external') {
      console.log(value);
      contract?.invoke(value.functionName, value?.starknetjs).then((res) => {
        setResponses({
          ...responses,
          [value?.functionName]: <div>{JSON.stringify(res)}</div>,
        });
        console.log(res);
      });
    }
  };

  return (
    <main>
      <p>
        Get started by editing&nbsp;
        <code>pages/index.tsx</code>
      </p>
      <input
        value={addressContract}
        onChange={(e) => {
          setAddressContract(e.target.value);
        }}
        placeholder="Enter your contract address..."
        type="text"
      />
      <div>
        {isLoading
          ? 'Loading...'
          : isError
          ? 'Error while fetching the latest block hash'
          : `Latest block hash: ${data?.block_hash}`}
      </div>
      <span>{chain && chain.name}</span>
      <h4>Using Conrtact {contract?.address}</h4>
      <WalletBar />
      <ABIForm abi={abi} callBackFn={handleCall} responses={responses} />
    </main>
  );
}

export default App;
