import { it, expect } from 'vitest';
import {
  finalTransformedValue,
  isACoreType,
  isStringButNotDecimalOrHex,
  stringToUTF8Hex,
  validateCoreType,
} from '../src/types/dataTypes';

it('validates final transform properly', () => {
  const mockValues = ['0xabcs', '0xabc', 'Dummy'];
  const expectedMockValues = ['0x307861626373', '0xabc', '0x44756d6d79'];

  mockValues.forEach((mockValue, index) => {
    expect(finalTransformedValue(mockValue)).to.be.eq(
      expectedMockValues[index]
    );
  });
  return true;
});

it('validate types with value correct ranges', () => {
  const mockTrueData = [
    {
      type: 'core::bool',
      value: '0x1',
    },
    {
      type: 'core::bool',
      value: '0x0',
    },
    {
      type: 'core::integer::u8',
      value: '255',
    },
    {
      type: 'core::integer::u8',
      value: '0',
    },
    {
      type: 'core::integer::u16',
      value: '0x0',
    },
    {
      type: 'core::integer::u16',
      value: '65535',
    },
    {
      type: 'core::integer::u32',
      value: '0',
    },
    {
      type: 'core::integer::u32',
      value: '4294967295',
    },
    {
      type: 'core::integer::u64',
      value: '0x0',
    },
    {
      type: 'core::integer::u64',
      value: '4294967295',
    },
    {
      type: 'core::integer::u64',
      value: '18446744073709551615',
    },
    {
      type: 'core::integer::u128',
      value: '0',
    },
    {
      type: 'core::integer::u128',
      value: '340282366920938463463374607431768211455',
    },
    {
      type: 'core::felt252',
      value: '0',
    },
    {
      type: 'core::felt252',
      value: '88452325335909', // Prince
    },
    {
      type: 'core::felt252',
      value:
        '3618502788666131106986593281521497120414687020801267626233049500247285301248',
    },

    {
      type: 'core::starknet::class_hash::ClassHash',
      value: '0',
    },
    {
      type: 'core::starknet::class_hash::ClassHash',
      value:
        '3618502788666131106986593281521497120414687020801267626233049500247285301248',
    },
    {
      type: 'core::starknet::contract_address::ContractAddress',
      value: '0',
    },
    {
      type: 'core::starknet::contract_address::ContractAddress',
      value:
        '3618502788666131106986593281521497120414687020801267626233049500247285301248',
    },
  ];

  mockTrueData.forEach(
    (val) => expect(validateCoreType(val.type, val.value)).to.be.true
  );
  return true;
});

it('validate types with value incorrect ranges should fail', () => {
  const mockFalseData = [
    {
      type: 'core::bool',
      value: '0x2',
    },
    {
      type: 'core::integer::u8',
      value: '2555',
    },
    {
      type: 'core::integer::u16',
      value: '65536',
    },
    {
      type: 'core::integer::u32',
      value: '42949672953',
    },
    {
      type: 'core::integer::u64',
      value: '184467440737095516152',
    },
    {
      type: 'core::integer::u128',
      value: '3402823669209384634633746074317682114554',
    },
    {
      type: 'core::felt252',
      value:
        '361850278866613110698659328152149712041468702080126762623304950024728530124834',
    },
    {
      type: 'core::starknet::class_hash::ClassHash',
      value:
        '361850278866613110698659328152149712041468702080126762623304950024728532201248',
    },
    {
      type: 'core::starknet::contract_address::ContractAddress',
      value:
        '361850278866613110698659328152149712041468702045801267626233049500247285301248',
    },
  ];

  mockFalseData.forEach(
    (val) => expect(validateCoreType(val.type, val.value)).to.be.false
  );
  return true;
});

it('validate isACoreType fn', () => {
  const mockExpectedTrueDate = [
    'core::felt252',
    'core::bool',
    'core::integer::u8',
    'core::integer::u16',
    'core::integer::u32',
    'core::integer::u64',
    'core::integer::u128',
    'core::starknet::contract_address::ContractAddress',
    'core::starknet::class_hash::ClassHash',
  ];

  const mockExpectedFalseData = [
    'core::array::Array<core::felt252>',
    'core::array::Array<core::integer::uin256>',
    'struct::Sample',
  ];
  mockExpectedTrueDate.forEach((type) => expect(isACoreType(type)).to.be.true);
  mockExpectedFalseData.forEach(
    (type) => expect(isACoreType(type)).to.be.false
  );
  return true;
});

it('validate stringToUTF8Hex function', () => {
  const string = 'Dummy';
  const expectedDecimal = ['44', '75', '6d', '6d', '79'];
  return expect(stringToUTF8Hex(string)).to.be.deep.eq(expectedDecimal);
});

it('validate isStringButNotDecimalOrHex fn', () => {
  const expectedString = ['Dummy', '0xqajksd', 'Prix0007'];
  const expectedDecimalsOrHex = ['3826478', '0x32784ab', '3928849283'];
  expectedString.forEach(
    (str) => expect(!isStringButNotDecimalOrHex(str)).to.be.true
  );
  expectedDecimalsOrHex.forEach(
    (str) => expect(isStringButNotDecimalOrHex(str)).to.be.true
  );
  return true;
});
