import { it, expect, describe } from 'vitest';
import {
  extractSubTypesFromType,
  finalizeValues,
  flattenArrays,
  hasArrayOfSubType,
  hasSubTypes,
} from '../src/types/helper';

describe('Helper Functions Testing', () => {
  it('should hasSubTypes detect types', () => {
    const sample = 'core::array::Array<core::felt252>';
    return (
      expect(hasSubTypes(sample)).to.be.true,
      expect(hasSubTypes('core::array::Array<struct::ABC>')).to.be.true,
      expect(hasSubTypes('core::felt252')).to.be.false
    );
  });

  it('should hasArrayOfSubType detect array types', () => {
    const sample = 'core::array::Array<core::felt252>';
    return (
      expect(hasArrayOfSubType(sample)).to.be.true,
      expect(hasArrayOfSubType('core::span::Span::<core::felt252>')).to.be
        .false,
      expect(hasArrayOfSubType('core::felt252')).to.be.false
    );
  });

  it('should extractSubTypesFromType extract subtype', () => {
    const extractedTypes = extractSubTypesFromType(
      'core::array::Array<core::felt252>'
    );
    const extractedTypes2 = extractSubTypesFromType(
      'core::array::Array<struct::ABC<core::felt252>>'
    );
    return (
      expect(extractedTypes.contains).to.be.true,
      expect(extractedTypes.types && extractedTypes.types[0]).to.be.eq(
        'core::felt252'
      ),
      expect(extractedTypes2.contains).to.be.true,
      expect(extractedTypes2.types && extractedTypes2.types[0]).to.be.eq(
        'core::felt252'
      )
    );
  });

  it('should flattenArrays properly', () => {
    const sampleArr = [
      [1, 2],
      [2, [3, 5]],
    ];
    const expected = [1, 2, 2, 3, 5];
    return expect(flattenArrays(sampleArr)).to.be.deep.eq(expected);
  });

  it('should finalizeValues transform values properly', () => {
    const sampleInput = {
      name: 'Prince',
      nameArr: ['Dummy 1', 'Dummy 2'],
      complex: {
        a: '0x2',
      },
    };
    const expected = {
      name: '0x5072696e6365',
      nameArr: ['0x44756d6d792031', '0x44756d6d792032'],
      complex: {
        a: '0x2',
      },
    };
    return expect(finalizeValues(sampleInput)).to.be.deep.eq(expected);
  });
});
