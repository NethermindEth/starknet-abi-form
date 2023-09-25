import _ from 'lodash';
import { ABI, ABIFunction, ABIStruct, ABIEnum } from '.';
import { finalTransformedValue } from './dataTypes';

export function extractFunctionFromRawAbi(abi: ABI, functions: ABIFunction[]) {
  // Considering any here because it can be any of types.
  let lFunctions = [...functions];
  abi?.forEach((item: any) => {
    if (typeof item === 'object' && item.type && item.type === 'function') {
      lFunctions = [...lFunctions, item];
    }
    // As per specifications, only interface can have functions inside them other then root level abi with key `items`
    if (
      typeof item === 'object' &&
      item.type &&
      item.type === 'interface' &&
      item.items &&
      Array.isArray(item.items)
    ) {
      lFunctions = [...lFunctions, ...item.items];
    }
  });
  return lFunctions;
}

type ReturnFunctions = {
  externalFunctions: ABIFunction[];
  viewFunctions: ABIFunction[];
};

export function segregateViewAndExternalFunctions(
  functions: ABIFunction[]
): ReturnFunctions {
  const viewFunctions: ABIFunction[] = [];
  const externalFunctions: ABIFunction[] = [];

  if (Array.isArray(functions)) {
    functions.forEach((fn) => {
      if (fn && typeof fn === 'object' && fn.state_mutability === 'view') {
        viewFunctions.push(fn);
      }
      if (fn && typeof fn === 'object' && fn.state_mutability === 'external') {
        externalFunctions.push(fn);
      }
    });
  }

  return {
    viewFunctions,
    externalFunctions,
  };
}

export function extractStructFromABI(abi: ABI) {
  const structs: ABIStruct[] = [];
  abi?.forEach((item: any) => {
    if (typeof item === 'object' && item.type && item.type === 'struct') {
      structs.push(item);
    }
  });
  return structs;
}

export function extractEnumsFromABI(abi: ABI) {
  const enums: ABIEnum[] = [];
  abi?.forEach((item: any) => {
    if (typeof item === 'object' && item.type && item.type === 'enum') {
      enums.push(item);
    }
  });
  return enums;
}

type ReturnExtractedSubTypes = {
  contains: boolean;
  types?: string[];
};

export function hasSubTypes(type: string): boolean {
  const regex = /<[^<>]*>/g;
  if (type && typeof type === 'string') {
    return regex.test(type);
  }
  return false;
}

export function hasArrayOfSubType(type: string): boolean {
  const regex = /^core::array/g;
  if (type && typeof type === 'string') {
    return regex.test(type);
  }
  return false;
}

export function hasTuple(type: string): boolean {
  const regex = /\([^)]*\)/g;
  if (type && typeof type === 'string') {
    return regex.test(type);
  }
  return false;
}

export function extractTupleContent(type: string): string[] {
  const regex = /\(([^)]+)\)/g;

  if (type && typeof type === 'string') {
    const matches = type.match(regex);
    const finalMatches =
      matches?.map((matchedVal) => {
        return matchedVal.slice(1, matchedVal.length - 1);
      }) || [];
    return finalMatches;
  }
  return [];
}

export function transformIndividualTypesFromTuples(value: string): string[] {
  if (value && typeof value === 'string') {
    const items = value.split(',').map((v) => v.trim());
    console.log(items);
    return items;
  }
  return [];
}

export function extractOutermostAngleBrackets(input: string) {
  const matches = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '<') {
      if (depth === 0) {
        start = i;
      }
      depth++;
    } else if (input[i] === '>') {
      depth--;
      if (depth === 0 && start !== -1) {
        matches.push(input.substring(start, i + 1));
        start = -1;
      }
    }
  }

  return matches;
}

export function extractSubTypesFromTypeOuter(
  type: string
): ReturnExtractedSubTypes {
  if (hasSubTypes(type)) {
    const matches = extractOutermostAngleBrackets(type) || [];
    console.log(matches);
    const finalMatch = matches.map((lType) =>
      lType.substring(1, lType.length - 1)
    );
    return {
      contains: true,
      types: finalMatch,
    };
  }
  return {
    contains: false,
  };
}

export function extractSubTypesFromType(type: string): ReturnExtractedSubTypes {
  const regex = /<[^<>]*>/g;
  if (type && typeof type === 'string') {
    if (hasSubTypes(type)) {
      const matches = type.match(regex) || [];
      const finalMatch = matches.map((lType) =>
        lType.substring(1, lType.length - 1)
      );
      return {
        contains: true,
        types: finalMatch,
      };
    }
  }
  return {
    contains: false,
  };
}

export const flattenArrays = (value: any) => _.flattenDeep(value);

export const transformStringArrayToInteger = (value: string[]): bigint[] =>
  value.map((lValue) => {
    if (typeof lValue === 'string') {
      return BigInt(lValue);
    }
    return lValue;
  });

export function finalizeValues(value: any): any {
  if (typeof value === 'string') {
    return finalTransformedValue(value);
  }

  if (Array.isArray(value)) {
    return value.map((val) => {
      if (typeof val === 'string') {
        return finalTransformedValue(val);
      }
      return finalizeValues(val);
    });
  }

  if (typeof value === 'object') {
    return Object.keys(value).reduce((prev, key) => {
      const curr = value[key];
      const currFVal = finalizeValues(curr);
      return {
        ...prev,
        [key]: currFVal,
      };
    }, {});
  }
  return value;
}

export function flattenToRawCallData(value: any): any {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return [
      value.length,
      ...value.map((lValue) => {
        if (typeof lValue === 'string') {
          return lValue;
        }
        return flattenToRawCallData(lValue);
      }),
    ];
  }
  if (typeof value === 'object') {
    return Object.keys(value).map((key) => {
      const curr = value[key];
      return flattenToRawCallData(curr);
    });
  }
  return '';
}
