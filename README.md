# Starknet React ABI Form

This package helps you render the forms via abi, and have input validations built-in to help you build faster your dapp on starknet.

# Usage in You Dapp

- `npm install starknet-react-abi-ui`
- In your Dapp Import the `ABIForm` and use it.
  - Sample usage you can checkout at [/example/react-app/starknet-abi-form-driver](./example/react-app/starknet-abi-form-driver/src/App.tsx)
- To Import form styles
  - `import "starknet-react-abi-ui/index.css";` from your usage.
  - You can add your styling with as below by overriding css from a new css file.
- Checkout sample react project at [/example/react-app/starknet-abi-form-driver](./example/react-app/starknet-abi-form-driver/)

# Overriding CSS

- You can override styling by using below classes with different parts of the package

### Tabs

- `tab-root` Tabs Root wrapper class
- `tab-triggers-wrapper` Tabs Trigger wrapper class
- `tab-trigger` Tabs Called Read and Write wrapper class
- `tab-content` Active Tab Content displayed class

### Function

- `function-root` Root wrapper for function
- `function-header` Header for function with name and inputs
- `function-response` Response Wrapper usually injected by using code
- `function-form` Form class
- `function-form-submit`Form Submission button class
- `function-form-input-wrapper` A Wrapper which wraps input with tags and labels
- `input-label` Label for an Input class
- `input-tag` Tab for type of that input's class
- `input-error` Error mentioning class
- `function-form-input` Input for the form class
- `function-struct` Wrapper for a struct
- `function-struct-header` Header with struct name inside the wrapper
- `function-array-root` Main wrapper for an array type
- `function-array-header` Header for that array type
- `array-title` Title for the array as in ABI Name
- `array-add` Add button to add array item
- `array-core-item` An Core type item wrapper
- `array-core-item-delete` Delete button to delete core type item wrapper
- `array-complex-item` An Complex type item wrapper can be a struct (i.e in case array<struct>)
- `array-complex-item-trigger` Trigger for accordian acts as button to open and close
- `array-complex-item-delete` Delete Button to delete complex item
- `array-complex-item-header` Header text for the complex item in trigger
- `array-complex-item-content` Content of the complex type

### Others

- `invalid-abi` text when an abi is not valid
- `failed-parse-type` text when a type can't be parsed

### Tags

- `tag-blue` Tag default styling of blue
- `tag-gray` Tag default styling of gray
- `tag-green` Tag default styling of green
- `tag-indigo` Tag default styling of indigo
- `tag-pink` Tag default styling of pink
- `tag-purple` Tag default styling of purple
- `tag-red` Tag default styling of red
- `tag-yellow` Tag default styling of yellow

### Buttons

- `btn-blue` Button with default blue styling
- `btn-green` Button with default green styling
- `btn-cyan` Button with default cyan styling
- `btn-teal` Button with default teal styling
- `btn-lime` Button with default lime styling
- `btn-red` Button with default red styling
- `btn-pink` Button with default pink styling
- `btn-purple` Button with default purple styling

# Building Locally

- `pnpm install` - to install dependencies initially
- `pnpm dev` - to run in development mode in storybook
- `yalc publish` - to publish to local pnpm store
