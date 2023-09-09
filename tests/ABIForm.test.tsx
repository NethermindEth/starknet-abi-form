import React from 'react';
import renderer from 'react-test-renderer';
import { it, expect } from 'vitest';
import { ABIForm, CallbackReturnType } from '../src';

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
];

it('renders correctly', () => {
  const callback = (val: CallbackReturnType) => val;
  const tree = renderer
    .create(<ABIForm abi={sampleAbi} callBackFn={callback} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
