import React from 'react';
import renderer from 'react-test-renderer';
import { it, expect } from 'vitest';
import FunctionForm from '../src/FunctionForm';

const sampleAbi = {
  type: 'function',
  name: 'user_input',
  inputs: [
    {
      name: 'state',
      type: 'core::array::Array::<core::integer::u128>',
    },
  ],
  outputs: [],
  state_mutability: 'external' as any,
};

it('renders correctly', () => {
  const tree = renderer
    .create(
      <FunctionForm
        functionAbi={sampleAbi}
        structs={[]}
        callbackFn={(e) => e}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
