# Starknet React ABI Form

This package helps you render the forms via abi, and have input validations built-in to help you build faster your dapp on starknet.

# Usage in You Dapp

- `npm install starknet-abi-forms`
- In your Dapp Import the `ABIForm` and use it.
  - Sample usage you can checkout at [/example/react-app/starknet-abi-form-driver](https://github.com/NethermindEth/starknet-abi-form/tree/dev/example/react-app/starknet-abi-form-driver/src/App.tsx)
- To Import form styles
  - `import "starknet-abi-forms/index.css";` from your usage.
  - You can add your styling with as below by overriding css from a new css file.
- Checkout sample react project at [/example/react-app/starknet-abi-form-driver](https://github.com/NethermindEth/starknet-abi-form/tree/dev/example/react-app/starknet-abi-form-driver/)

# Using Custom CSS

- [here](https://github.com/NethermindEth/starknet-abi-form/tree/dev/custom_css.md)

# Building Locally

- `pnpm install` - to install dependencies initially
- `pnpm dev` - to run in development mode in storybook
- `yalc publish` - to publish to local pnpm store

# RoadMap

- Support enums in function params
- Support for Cairo v1, v0
