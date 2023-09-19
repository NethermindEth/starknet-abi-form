import { it, expect } from 'vitest';
import { ValidationError } from 'yup';

import cairov21Sample1 from './test_abis/cairov2.1_sample_1';
import cairov21Sample2 from './test_abis/cairov2.1_sample_2';
import cairov22Sample1 from './test_abis/cairov2.2_sample_1';

import cairov21FunctionSample1 from './test_abis/cairov2.1_function_sample1';
import cairov21FunctionSample1Incorrect from './test_abis/cairov2.1_function_sample1_incorrect';
import { abiSchema, yupAbiFunctionSchema } from '../src';

it('Should validate cairo v2.1.0 version abi sample 1', () =>
  expect(abiSchema.validate(cairov21Sample1)).to.not.throw);

it('Should validate cairo v2.1.0 version abi sample 2', () =>
  expect(abiSchema.validate(cairov21Sample2)).to.not.throw);

it('Should validate cairo v2.2.0 version abi', () =>
  expect(abiSchema.validate(cairov22Sample1)).to.not.throw);

it('Should validate cairo v2.1.0 function abi', () =>
  expect(yupAbiFunctionSchema.validate(cairov21FunctionSample1)).to.not.throw);

it('Should throw on bad cairov2.1.0 function abi', async () =>
  expect(
    yupAbiFunctionSchema.validate(cairov21FunctionSample1Incorrect)
  ).rejects.toThrow(new ValidationError('inputs[0].name is a required field')));
