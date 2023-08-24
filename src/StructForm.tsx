// import React from 'react';
// import { ABIEnum, ABIStruct, yupAbiStructSchema } from './types';
// import { isACoreType } from './types/dataTypes';
// import {
//   extractSubTypesFromType,
//   hasArrayOfSubType,
//   hasSubTypes,
// } from './types/helper';

// type IStructForm = {
//   structParamName: string;
//   structAbi: ABIStruct;
//   structs?: ABIStruct[];
//   enums?: ABIEnum[];
// };

// const StructForm: React.FC<IStructForm> = ({
//   structParamName,
//   structAbi,
//   structs,
//   enums,
// }) => {
//   try {
//     yupAbiStructSchema.validateSync(structAbi);
//   } catch (e) {
//     return <p>Not a valid struct schema</p>;
//   }
//   console.log(structAbi);
//   return (
//     <div style={{ border: '1px solid red', padding: '0.5rem 0.1rem' }}>
//       <p>
//         {structParamName} | {structAbi?.name}
//       </p>
//       {structAbi?.members.map((structMember) => {
//         if (isACoreType(structMember?.type))
//           return (
//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 border: '1px solid lime',
//                 padding: '0.1rem',
//               }}
//             >
//               <label>
//                 {structMember?.name} | {structMember?.type}
//               </label>
//               <input placeholder={structMember?.name} />
//             </div>
//           );

//         const structIdx =
//           structs?.findIndex((struct) => struct.name === structMember?.type) ||
//           -1;

//         if (structIdx !== -1 && structs) {
//           return (
//             <StructForm
//               structParamName={structMember?.name}
//               structAbi={structs[structIdx]}
//               structs={structs}
//               enums={enums}
//             />
//           );
//         }

//         // Check if is a array
//         if (hasArrayOfSubType(structMember?.type)) {
//           const isSubTypes = extractSubTypesFromType(structMember?.type);
//           if (
//             isSubTypes?.contains &&
//             isSubTypes?.types &&
//             isSubTypes?.types?.length > 0
//           ) {
//             const arrSubType = isSubTypes?.types[0]; // Safe to take 1 element only, since we can only have homogenous arrays
//             console.log(structMember?.name);
//             console.log('Found Array of types: ', arrSubType);

//             if (isACoreType(arrSubType)) {
//               return (
//                 <div
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     border: '1px solid lime',
//                     padding: '0.1rem',
//                   }}
//                 >
//                   <label>
//                     {structMember?.name} | {structMember?.type}
//                   </label>
//                   <input placeholder={`array: ${arrSubType}`} />
//                 </div>
//               );
//             }

//             const structIdx =
//               structs?.findIndex((struct) => struct.name === arrSubType) || -1;

//             if (structIdx !== -1 && structs) {
//               return (
//                 <StructForm
//                   structParamName={`array<${structMember?.name}>`}
//                   structAbi={structs[structIdx]}
//                   structs={structs}
//                   enums={enums}
//                 />
//               );
//             }
//           }
//         }

//         // Check if have subTypes
//         if (hasSubTypes(structMember?.type)) {
//           console.log('Found SubTypes', structMember.type);
//         }
//       })}
//     </div>
//   );
// };

// export default StructForm;
