// import React from 'react';
// import renderer from 'react-test-renderer';
import { it } from 'vitest';
// import { ABIForm } from '../src';

// const sampleAbi = [
//   {
//     type: 'impl',
//     name: 'Balance',
//     interface_name: 'scarb_test_2::IBalance',
//   },
//   {
//     type: 'interface',
//     name: 'scarb_test_2::IBalance',
//     items: [
//       {
//         type: 'function',
//         name: 'get',
//         inputs: [],
//         outputs: [
//           {
//             type: 'core::integer::u128',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'increase',
//         inputs: [
//           {
//             name: 'a',
//             type: 'core::integer::u128',
//           },
//         ],
//         outputs: [],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'decrease',
//         inputs: [
//           {
//             name: 'decrease_by',
//             type: 'core::integer::u128',
//           },
//         ],
//         outputs: [],
//         state_mutability: 'external',
//       },
//     ],
//   },
//   {
//     type: 'struct',
//     name: 'core::integer::u256',
//     members: [
//       {
//         name: 'low',
//         type: 'core::integer::u128',
//       },
//       {
//         name: 'high',
//         type: 'core::integer::u128',
//       },
//     ],
//   },
//   {
//     type: 'enum',
//     name: 'core::bool',
//     variants: [
//       {
//         name: 'False',
//         type: '()',
//       },
//       {
//         name: 'True',
//         type: '()',
//       },
//     ],
//   },
//   {
//     type: 'struct',
//     name: 'scarb_test_2::Balance::Complex',
//     members: [
//       {
//         name: 'name',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'age',
//         type: 'core::integer::u16',
//       },
//       {
//         name: 'status',
//         type: 'core::bool',
//       },
//       {
//         name: 'votes',
//         type: 'core::array::Array::<core::integer::u256>',
//       },
//     ],
//   },
//   {
//     type: 'function',
//     name: 'complex_input',
//     inputs: [
//       {
//         name: 'complex',
//         type: 'core::array::Array::<scarb_test_2::Balance::Complex>',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'user_input',
//     inputs: [
//       {
//         name: 'state',
//         type: 'core::array::Array::<core::integer::u128>',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'constructor',
//     name: 'constructor',
//     inputs: [
//       {
//         name: 'value_',
//         type: 'core::integer::u128',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'scarb_test_2::Balance::Event',
//     kind: 'enum',
//     variants: [],
//   },
// ];

it('renders correctly', () => {
  // const tree = renderer.create(<ABIForm abi={sampleAbi} />).toJSON();
  // expect(tree).toMatchSnapshot();
});
