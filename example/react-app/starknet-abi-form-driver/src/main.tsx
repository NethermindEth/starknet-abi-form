import { InjectedConnector, StarknetConfig } from '@starknet-react/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider, constants } from 'starknet';

const connectors = [
  new InjectedConnector({ options: { id: 'braavos' } }),
  new InjectedConnector({ options: { id: 'argentX' } }),
];

const provider = new Provider({
  sequencer: { network: constants.NetworkName.SN_GOERLI },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StarknetConfig
      autoConnect
      connectors={connectors}
      defaultProvider={provider}
    >
      <App />
    </StarknetConfig>
  </React.StrictMode>
);
