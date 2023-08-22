import { AbiStructs } from 'starknet';
import { ABI, ABIFunction, ABIStruct, ABIEnum } from '.';
import { isACoreType } from './dataTypes';

export function extractFunctionFromRawAbi(abi: ABI, functions: ABIFunction[]) {
  // Considering any here because it can be any of types.
  abi?.map((item: any) => {
    if (typeof item === 'object' && item.type && item.type === 'function') {
      functions = [...functions, item];
    }
    // As per specifications, only interface can have functions inside them other then root level abi with key `items`
    if (
      typeof item === 'object' &&
      item.type &&
      item.type === 'interface' &&
      item.items &&
      Array.isArray(item.items)
    ) {
      functions = [...functions, ...item.items];
    }
  });
  return functions;
}

type ReturnFunctions = {
  viewFunctions: ABIFunction[];
  externalFunctions: ABIFunction[];
};

export function segregateViewAndExternalFunctions(
  functions: ABIFunction[]
): ReturnFunctions {
  let viewFunctions: ABIFunction[] = [];
  let externalFunctions: ABIFunction[] = [];

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
  let structs: ABIStruct[] = [];
  abi?.forEach((item: any) => {
    if (typeof item === 'object' && item.type && item.type === 'struct') {
      structs.push(item);
    }
  });
  return structs;
}

export function extractEnumsFromABI(abi: ABI) {
  let enums: ABIEnum[] = [];
  abi?.forEach((item: any) => {
    if (typeof item === 'object' && item.type && item.type === 'enum') {
      enums.push(item);
    }
  });
  return enums;
}

// export function functionFlattenStruct(struct: ABIStruct, structs: ABIStruct[]) {
//   if (struct && struct?.members && Array.isArray(struct?.members)) {
//     if (struct?.members?.length === 0) {
//       return struct;
//     }
//     const flattenedStructMembers = struct.members.map((member) => {
//       if (member?.type && typeof member?.type === 'string') {
//         if (!isACoreType(member.type)) {
//           const structIdx =
//             structs?.findIndex((struct) => struct.name === member.type) || -1;
//           if (structIdx !== -1) {
//             return { ...structs[structIdx], name: member?.name };
//           }

//           if (hasArrayOfSubType(member.type)) {
//             const isSubTypes = extractSubTypesFromType(member.type);
//             if (
//               isSubTypes?.contains &&
//               isSubTypes?.types &&
//               isSubTypes?.types?.length > 0
//             ) {
//               const arrSubType = isSubTypes?.types[0]; // Safe to take 1 element only, since we can only have homogenous arrays
//               if (!isACoreType(arrSubType)) {
//                 const arrStructIdx =
//                   structs?.findIndex((struct) => struct.name === arrSubType) ||
//                   -1;

//                 console.log('Array: ', structs[arrStructIdx]);
//               }
//             }
//           }
//         }
//         return member;
//       }
//       return member;
//     });
//     return {
//       ...struct,
//       members: flattenedStructMembers,
//     };
//   }
//   return struct;
// }

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

export function extractSubTypesFromType(type: string): ReturnExtractedSubTypes {
  const regex = /<[^<>]*>/g;
  if (type && typeof type === 'string') {
    if (hasSubTypes(type)) {
      const matches = type.match(regex) || [];
      const finalMatch = matches.map((type) => {
        return type.substring(1, type.length - 1);
      });
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

// import { BigNumber } from 'ethers'
// import { uint256 } from 'starknet'
// import * as Yup from 'yup'

// export const transformInputs = (val: string): BigNumber | BigNumber[] => {
//   const isArrayRegex = /[,[\]]/
//   const replaceSquareBracesRegex = /[[\]]/g

//   if (!val.match(isArrayRegex)) {
//     const num = BigNumber.from(val.trim())
//     return num
//   } else {
//     const newVal = val.replaceAll(replaceSquareBracesRegex, '')
//     const newArr = newVal.split(',')
//     return newArr.map((str) => BigNumber.from(str.trim()))
//   }
// }

// export const typeValidation = (
//   type: string,
//   value: BigNumber | BigNumber[]
// ): boolean => {
//   let isValid = true
//   try {
//     if (!Array.isArray(value)) {
//       if (value.lt(0)) {
//         return false
//       }
//       switch (type) {
//         case 'core::integer::u8':
//           return value.lte(2 ** 8)
//         case 'core::integer::u16':
//           return value.lte(2 ** 16)
//         case 'core::integer::u32':
//           return value.lte(2 ** 32)
//         case 'core::integer::u64':
//           return value.lte(2 ** 64)
//         case 'core::integer::u128':
//           return value.lte(uint256.UINT_128_MAX)
//         case 'core::felt252':
//           return value.lte(uint256.UINT_128_MAX)
//         case 'core::bool':
//           return value.lte(1)
//         case 'core::integer::u256':
//           return false
//         default:
//           // TODO: @prix0007  add more validations here
//           return true
//       }
//     } else if (Array.isArray(value)) {
//       value.forEach((v) => {
//         if (v.lt(0)) {
//           isValid = false
//         }
//       })
//       switch (type) {
//         case 'core::integer::u256':
//           // Should be only 2 comma seperated value
//           if (value.length !== 2) {
//             return false
//           }
//           value.forEach((v) => {
//             if (!v.lte(uint256.UINT_128_MAX)) {
//               isValid = false
//             }
//           })
//           break
//         default:
//       }
//     }
//     return isValid
//   } catch (e) {
//     console.log(e)
//     return false
//   }
// }

// // Add Methods here
// Yup.addMethod(Yup.string, 'validate_ip', function (type: string) {
//   return this.test('check inputs', type, function (val) {
//     const { createError } = this
//     if (val !== undefined) {
//       try {
//         const i_p = transformInputs(val)
//         const isValid = typeValidation(type, i_p)
//         if (!isValid) {
//           return createError(
//             new Yup.ValidationError(`${val} is not correct for type ${type}`)
//           )
//         }
//         return true
//       } catch (e: any) {
//         return createError(new Yup.ValidationError(e?.message || e))
//       }
//     }
//     return createError(new Yup.ValidationError('value is required'))
//   })
// })

// export default Yup
