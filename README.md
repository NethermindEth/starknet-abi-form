# Starknet React ABI Form

This package helps you render the forms via abi, and have input validations built-in to help you build faster your dapp on starknet.

# Usage in You Dapp

- `npm install starknet-react-abi-ui`
- In your Dapp Import the `ABIForm` and use it.
  - Sample usage you can checkout at [/example/react-app/starknet-abi-form-driver](./example/react-app/starknet-abi-form-driver/src/App.tsx)
- To Import form styles
  - `import "starknet-react-abi-ui/index.css";` from your usage.
- Checkout sample react project at [/example/react-app/starknet-abi-form-driver](./example/react-app/starknet-abi-form-driver/)

# Building Locally

- `pnpm install` - to install dependencies initially
- `pnpm dev` - to run in development mode in storybook
- `yalc publish` - to publish to local pnpm store
