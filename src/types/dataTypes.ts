import { cairo, uint256 } from 'starknet';
import { BigNumber } from 'bignumber.js';
import * as Yup from 'yup';

export const CoreTypes = [
  'core::felt252',
  'core::bool',
  'core::integer::u8',
  'core::integer::u16',
  'core::integer::u32',
  'core::integer::u64',
  'core::integer::u128',
  //   'core::integer::u256',
  'core::starknet::contract_address::ContractAddress',
];

export const isACoreType = (type: string): boolean => {
  if (type && typeof type === 'string') {
    return CoreTypes.includes(type);
  }

  return false;
};

function validateCoreType(type: string, val: string): boolean {
  const value = BigNumber(val);
  switch (type) {
    case 'core::integer::u8':
      return value.lte(2 ** 8);
    case 'core::integer::u16':
      return value.lte(2 ** 16);
    case 'core::integer::u32':
      return value.lte(2 ** 32);
    case 'core::integer::u64':
      return value.lte(2 ** 64);
    case 'core::integer::u128':
      return value.lte(uint256.UINT_128_MAX.toString());
    case 'core::felt252':
      return value.lte(uint256.UINT_128_MAX.toString());
  }
  return false;
}

// Add Methods here
Yup.addMethod(Yup.string, 'validate_core_type', function (type: string) {
  return this.test('check inputs', type, function (val) {
    const { createError } = this;
    if (val !== undefined) {
      try {
        const isValid = validateCoreType(type, val);
        if (!isValid) {
          return createError(
            new Yup.ValidationError(`${val} is not correct for type ${type}`)
          );
        }
        return true;
      } catch (e: any) {
        return createError(new Yup.ValidationError(e?.message || e));
      }
    }
    return createError(new Yup.ValidationError('value is required'));
  });
});
