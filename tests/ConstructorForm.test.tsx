import React from 'react';
import renderer from 'react-test-renderer';
import { it, expect } from 'vitest';
import { CallbackReturnType, ConstructorForm } from '../src';

const sampleAbi = [
  {
    type: 'function',
    name: 'user_input',
    inputs: [
      {
        name: 'state',
        type: 'core::array::Array::<core::integer::u128>',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'constructor',
    name: 'constructor',
    inputs: [
      {
        name: 'owner',
        type: 'core::felt252',
      },
      {
        name: 'guardian',
        type: 'core::felt252',
      },
    ],
  },
];

it('renders correctly', () => {
  const callback = (val: CallbackReturnType) => val;
  const tree = renderer
    .create(<ConstructorForm abi={sampleAbi} callBackFn={callback} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
