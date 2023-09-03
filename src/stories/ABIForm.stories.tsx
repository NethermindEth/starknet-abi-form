import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ABIForm } from '..';
import useResponseUI from '../hooks/useResponse';

export default {
  title: 'ABIForm',
  component: ABIForm,
  argTypes: {},
} as Meta<typeof ABIForm>;

const Template: StoryFn<typeof ABIForm> = (args) => {
  const { responses } = useResponseUI({
    complex_input: <div>Test Response</div>,
  });

  return <ABIForm {...args} responses={responses} />;
};

export const Primary = Template.bind({});

// Sample ABI 1
// const sampleAbi = [
//   {
//     type: 'struct',
//     name: 'core::starknet::account::Call',
//     members: [
//       {
//         name: 'to',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'selector',
//         type: 'core::felt252',
//       },
//       {
//         name: 'calldata',
//         type: 'core::array::Array::<core::felt252>',
//       },
//     ],
//   },
//   {
//     type: 'function',
//     name: '__validate__',
//     inputs: [
//       {
//         name: 'calls',
//         type: 'core::array::Array::<core::starknet::account::Call>',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::felt252',
//       },
//     ],
//     state_mutability: 'external',
//   },
//   {
//     type: 'struct',
//     name: 'core::array::Span::<core::felt252>',
//     members: [
//       {
//         name: 'snapshot',
//         type: '@core::array::Array::<core::felt252>',
//       },
//     ],
//   },
//   {
//     type: 'function',
//     name: '__execute__',
//     inputs: [
//       {
//         name: 'calls',
//         type: 'core::array::Array::<core::starknet::account::Call>',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::array::Array::<core::array::Span::<core::felt252>>',
//       },
//     ],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'is_valid_signature',
//     inputs: [
//       {
//         name: 'hash',
//         type: 'core::felt252',
//       },
//       {
//         name: 'signature',
//         type: 'core::array::Array::<core::felt252>',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::felt252',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'impl',
//     name: 'ExecuteFromOutsideImpl',
//     interface_name: 'lib::outside_execution::IOutsideExecution',
//   },
//   {
//     type: 'struct',
//     name: 'lib::outside_execution::OutsideExecution',
//     members: [
//       {
//         name: 'caller',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'nonce',
//         type: 'core::felt252',
//       },
//       {
//         name: 'execute_after',
//         type: 'core::integer::u64',
//       },
//       {
//         name: 'execute_before',
//         type: 'core::integer::u64',
//       },
//       {
//         name: 'calls',
//         type: 'core::array::Span::<core::starknet::account::Call>',
//       },
//     ],
//   },
//   {
//     type: 'enum',
//     name: 'core::bool',
//     variants: [
//       {
//         name: 'False',
//         type: '()',
//       },
//       {
//         name: 'True',
//         type: '()',
//       },
//     ],
//   },
//   {
//     type: 'interface',
//     name: 'lib::outside_execution::IOutsideExecution',
//     items: [
//       {
//         type: 'function',
//         name: 'execute_from_outside',
//         inputs: [
//           {
//             name: 'outside_execution',
//             type: 'lib::outside_execution::OutsideExecution',
//           },
//           {
//             name: 'signature',
//             type: 'core::array::Array::<core::felt252>',
//           },
//         ],
//         outputs: [
//           {
//             type: 'core::array::Array::<core::array::Span::<core::felt252>>',
//           },
//         ],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'is_valid_outside_execution_nonce',
//         inputs: [
//           {
//             name: 'nonce',
//             type: 'core::felt252',
//           },
//         ],
//         outputs: [
//           {
//             type: 'core::bool',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'get_outside_execution_message_hash',
//         inputs: [
//           {
//             name: 'outside_execution',
//             type: 'lib::outside_execution::OutsideExecution',
//           },
//         ],
//         outputs: [
//           {
//             type: 'core::felt252',
//           },
//         ],
//         state_mutability: 'view',
//       },
//     ],
//   },
//   {
//     type: 'impl',
//     name: 'UpgradeableImpl',
//     interface_name: 'lib::upgrade::IUpgradeable',
//   },
//   {
//     type: 'interface',
//     name: 'lib::upgrade::IUpgradeable',
//     items: [
//       {
//         type: 'function',
//         name: 'upgrade',
//         inputs: [
//           {
//             name: 'new_implementation',
//             type: 'core::starknet::class_hash::ClassHash',
//           },
//           {
//             name: 'calldata',
//             type: 'core::array::Array::<core::felt252>',
//           },
//         ],
//         outputs: [
//           {
//             type: 'core::array::Array::<core::felt252>',
//           },
//         ],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'execute_after_upgrade',
//         inputs: [
//           {
//             name: 'data',
//             type: 'core::array::Array::<core::felt252>',
//           },
//         ],
//         outputs: [
//           {
//             type: 'core::array::Array::<core::felt252>',
//           },
//         ],
//         state_mutability: 'external',
//       },
//     ],
//   },
//   {
//     type: 'impl',
//     name: 'ArgentAccountImpl',
//     interface_name: 'account::interface::IArgentAccount',
//   },
//   {
//     type: 'struct',
//     name: 'account::escape::Escape',
//     members: [
//       {
//         name: 'ready_at',
//         type: 'core::integer::u64',
//       },
//       {
//         name: 'escape_type',
//         type: 'core::felt252',
//       },
//       {
//         name: 'new_signer',
//         type: 'core::felt252',
//       },
//     ],
//   },
//   {
//     type: 'struct',
//     name: 'lib::version::Version',
//     members: [
//       {
//         name: 'major',
//         type: 'core::integer::u8',
//       },
//       {
//         name: 'minor',
//         type: 'core::integer::u8',
//       },
//       {
//         name: 'patch',
//         type: 'core::integer::u8',
//       },
//     ],
//   },
//   {
//     type: 'enum',
//     name: 'account::escape::EscapeStatus',
//     variants: [
//       {
//         name: 'None',
//         type: '()',
//       },
//       {
//         name: 'NotReady',
//         type: '()',
//       },
//       {
//         name: 'Ready',
//         type: '()',
//       },
//       {
//         name: 'Expired',
//         type: '()',
//       },
//     ],
//   },
//   {
//     type: 'interface',
//     name: 'account::interface::IArgentAccount',
//     items: [
//       {
//         type: 'function',
//         name: '__validate_declare__',
//         inputs: [
//           {
//             name: 'class_hash',
//             type: 'core::felt252',
//           },
//         ],
//         outputs: [
//           {
//             type: 'core::felt252',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: '__validate_deploy__',
//         inputs: [
//           {
//             name: 'class_hash',
//             type: 'core::felt252',
//           },
//           {
//             name: 'contract_address_salt',
//             type: 'core::felt252',
//           },
//           {
//             name: 'owner',
//             type: 'core::felt252',
//           },
//           {
//             name: 'guardian',
//             type: 'core::felt252',
//           },
//         ],
//         outputs: [
//           {
//             type: 'core::felt252',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'change_owner',
//         inputs: [
//           {
//             name: 'new_owner',
//             type: 'core::felt252',
//           },
//           {
//             name: 'signature_r',
//             type: 'core::felt252',
//           },
//           {
//             name: 'signature_s',
//             type: 'core::felt252',
//           },
//         ],
//         outputs: [],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'change_guardian',
//         inputs: [
//           {
//             name: 'new_guardian',
//             type: 'core::felt252',
//           },
//         ],
//         outputs: [],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'change_guardian_backup',
//         inputs: [
//           {
//             name: 'new_guardian_backup',
//             type: 'core::felt252',
//           },
//         ],
//         outputs: [],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'trigger_escape_owner',
//         inputs: [
//           {
//             name: 'new_owner',
//             type: 'core::felt252',
//           },
//         ],
//         outputs: [],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'trigger_escape_guardian',
//         inputs: [
//           {
//             name: 'new_guardian',
//             type: 'core::felt252',
//           },
//         ],
//         outputs: [],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'escape_owner',
//         inputs: [],
//         outputs: [],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'escape_guardian',
//         inputs: [],
//         outputs: [],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'cancel_escape',
//         inputs: [],
//         outputs: [],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'get_owner',
//         inputs: [],
//         outputs: [
//           {
//             type: 'core::felt252',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'get_guardian',
//         inputs: [],
//         outputs: [
//           {
//             type: 'core::felt252',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'get_guardian_backup',
//         inputs: [],
//         outputs: [
//           {
//             type: 'core::felt252',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'get_escape',
//         inputs: [],
//         outputs: [
//           {
//             type: 'account::escape::Escape',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'get_version',
//         inputs: [],
//         outputs: [
//           {
//             type: 'lib::version::Version',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'get_name',
//         inputs: [],
//         outputs: [
//           {
//             type: 'core::felt252',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'get_guardian_escape_attempts',
//         inputs: [],
//         outputs: [
//           {
//             type: 'core::integer::u32',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'get_owner_escape_attempts',
//         inputs: [],
//         outputs: [
//           {
//             type: 'core::integer::u32',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'get_escape_and_status',
//         inputs: [],
//         outputs: [
//           {
//             type: '(account::escape::Escape, account::escape::EscapeStatus)',
//           },
//         ],
//         state_mutability: 'view',
//       },
//     ],
//   },
//   {
//     type: 'impl',
//     name: 'Erc165Impl',
//     interface_name: 'lib::erc165::IErc165',
//   },
//   {
//     type: 'interface',
//     name: 'lib::erc165::IErc165',
//     items: [
//       {
//         type: 'function',
//         name: 'supports_interface',
//         inputs: [
//           {
//             name: 'interface_id',
//             type: 'core::felt252',
//           },
//         ],
//         outputs: [
//           {
//             type: 'core::bool',
//           },
//         ],
//         state_mutability: 'view',
//       },
//     ],
//   },
//   {
//     type: 'impl',
//     name: 'OldArgentAccountImpl',
//     interface_name: 'account::interface::IDeprecatedArgentAccount',
//   },
//   {
//     type: 'interface',
//     name: 'account::interface::IDeprecatedArgentAccount',
//     items: [
//       {
//         type: 'function',
//         name: 'getVersion',
//         inputs: [],
//         outputs: [
//           {
//             type: 'core::felt252',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'getName',
//         inputs: [],
//         outputs: [
//           {
//             type: 'core::felt252',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'supportsInterface',
//         inputs: [
//           {
//             name: 'interface_id',
//             type: 'core::felt252',
//           },
//         ],
//         outputs: [
//           {
//             type: 'core::felt252',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'isValidSignature',
//         inputs: [
//           {
//             name: 'hash',
//             type: 'core::felt252',
//           },
//           {
//             name: 'signatures',
//             type: 'core::array::Array::<core::felt252>',
//           },
//         ],
//         outputs: [
//           {
//             type: 'core::felt252',
//           },
//         ],
//         state_mutability: 'view',
//       },
//     ],
//   },
//   {
//     type: 'constructor',
//     name: 'constructor',
//     inputs: [
//       {
//         name: 'owner',
//         type: 'core::felt252',
//       },
//       {
//         name: 'guardian',
//         type: 'core::felt252',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::AccountCreated',
//     kind: 'struct',
//     members: [
//       {
//         name: 'owner',
//         type: 'core::felt252',
//         kind: 'key',
//       },
//       {
//         name: 'guardian',
//         type: 'core::felt252',
//         kind: 'data',
//       },
//     ],
//   },
//   {
//     type: 'struct',
//     name: 'core::array::Span::<core::array::Span::<core::felt252>>',
//     members: [
//       {
//         name: 'snapshot',
//         type: '@core::array::Array::<core::array::Span::<core::felt252>>',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::TransactionExecuted',
//     kind: 'struct',
//     members: [
//       {
//         name: 'hash',
//         type: 'core::felt252',
//         kind: 'key',
//       },
//       {
//         name: 'response',
//         type: 'core::array::Span::<core::array::Span::<core::felt252>>',
//         kind: 'data',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::EscapeOwnerTriggered',
//     kind: 'struct',
//     members: [
//       {
//         name: 'ready_at',
//         type: 'core::integer::u64',
//         kind: 'data',
//       },
//       {
//         name: 'new_owner',
//         type: 'core::felt252',
//         kind: 'data',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::EscapeGuardianTriggered',
//     kind: 'struct',
//     members: [
//       {
//         name: 'ready_at',
//         type: 'core::integer::u64',
//         kind: 'data',
//       },
//       {
//         name: 'new_guardian',
//         type: 'core::felt252',
//         kind: 'data',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::OwnerEscaped',
//     kind: 'struct',
//     members: [
//       {
//         name: 'new_owner',
//         type: 'core::felt252',
//         kind: 'data',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::GuardianEscaped',
//     kind: 'struct',
//     members: [
//       {
//         name: 'new_guardian',
//         type: 'core::felt252',
//         kind: 'data',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::EscapeCanceled',
//     kind: 'struct',
//     members: [],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::OwnerChanged',
//     kind: 'struct',
//     members: [
//       {
//         name: 'new_owner',
//         type: 'core::felt252',
//         kind: 'data',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::GuardianChanged',
//     kind: 'struct',
//     members: [
//       {
//         name: 'new_guardian',
//         type: 'core::felt252',
//         kind: 'data',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::GuardianBackupChanged',
//     kind: 'struct',
//     members: [
//       {
//         name: 'new_guardian_backup',
//         type: 'core::felt252',
//         kind: 'data',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::AccountUpgraded',
//     kind: 'struct',
//     members: [
//       {
//         name: 'new_implementation',
//         type: 'core::starknet::class_hash::ClassHash',
//         kind: 'data',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::OwnerAdded',
//     kind: 'struct',
//     members: [
//       {
//         name: 'new_owner_guid',
//         type: 'core::felt252',
//         kind: 'key',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::OwnerRemoved',
//     kind: 'struct',
//     members: [
//       {
//         name: 'removed_owner_guid',
//         type: 'core::felt252',
//         kind: 'key',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'account::argent_account::ArgentAccount::Event',
//     kind: 'enum',
//     variants: [
//       {
//         name: 'AccountCreated',
//         type: 'account::argent_account::ArgentAccount::AccountCreated',
//         kind: 'nested',
//       },
//       {
//         name: 'TransactionExecuted',
//         type: 'account::argent_account::ArgentAccount::TransactionExecuted',
//         kind: 'nested',
//       },
//       {
//         name: 'EscapeOwnerTriggered',
//         type: 'account::argent_account::ArgentAccount::EscapeOwnerTriggered',
//         kind: 'nested',
//       },
//       {
//         name: 'EscapeGuardianTriggered',
//         type: 'account::argent_account::ArgentAccount::EscapeGuardianTriggered',
//         kind: 'nested',
//       },
//       {
//         name: 'OwnerEscaped',
//         type: 'account::argent_account::ArgentAccount::OwnerEscaped',
//         kind: 'nested',
//       },
//       {
//         name: 'GuardianEscaped',
//         type: 'account::argent_account::ArgentAccount::GuardianEscaped',
//         kind: 'nested',
//       },
//       {
//         name: 'EscapeCanceled',
//         type: 'account::argent_account::ArgentAccount::EscapeCanceled',
//         kind: 'nested',
//       },
//       {
//         name: 'OwnerChanged',
//         type: 'account::argent_account::ArgentAccount::OwnerChanged',
//         kind: 'nested',
//       },
//       {
//         name: 'GuardianChanged',
//         type: 'account::argent_account::ArgentAccount::GuardianChanged',
//         kind: 'nested',
//       },
//       {
//         name: 'GuardianBackupChanged',
//         type: 'account::argent_account::ArgentAccount::GuardianBackupChanged',
//         kind: 'nested',
//       },
//       {
//         name: 'AccountUpgraded',
//         type: 'account::argent_account::ArgentAccount::AccountUpgraded',
//         kind: 'nested',
//       },
//       {
//         name: 'OwnerAdded',
//         type: 'account::argent_account::ArgentAccount::OwnerAdded',
//         kind: 'nested',
//       },
//       {
//         name: 'OwnerRemoved',
//         type: 'account::argent_account::ArgentAccount::OwnerRemoved',
//         kind: 'nested',
//       },
//     ],
//   },
// ];

// Sample ABI 2
const sampleAbi = [
  {
    type: 'impl',
    name: 'Balance',
    interface_name: 'scarb_test::IBalance',
  },
  {
    type: 'interface',
    name: 'scarb_test::IBalance',
    items: [
      {
        type: 'function',
        name: 'get',
        inputs: [],
        outputs: [
          {
            type: 'core::integer::u128',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'increase',
        inputs: [
          {
            name: 'a',
            type: 'core::integer::u128',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'decrease',
        inputs: [
          {
            name: 'decrease_by',
            type: 'core::integer::u128',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::integer::u256',
    members: [
      {
        name: 'low',
        type: 'core::integer::u128',
      },
      {
        name: 'high',
        type: 'core::integer::u128',
      },
    ],
  },
  {
    type: 'enum',
    name: 'core::bool',
    variants: [
      {
        name: 'False',
        type: '()',
      },
      {
        name: 'True',
        type: '()',
      },
    ],
  },
  {
    type: 'struct',
    name: 'scarb_test::Balance::VoteDetails',
    members: [
      {
        name: 'name',
        type: 'core::integer::u256',
      },
      {
        name: 'party',
        type: 'core::integer::u256',
      },
      {
        name: 'conclusion',
        type: 'core::integer::u8',
      },
    ],
  },
  {
    type: 'struct',
    name: 'scarb_test::Balance::Status',
    members: [
      {
        name: 'voted',
        type: 'core::bool',
      },
      {
        name: 'timestamp',
        type: 'core::integer::u64',
      },
      {
        name: 'details',
        type: 'core::array::Array::<scarb_test::Balance::VoteDetails>',
      },
    ],
  },
  {
    type: 'struct',
    name: 'scarb_test::Balance::Complex',
    members: [
      {
        name: 'name',
        type: 'core::integer::u256',
      },
      {
        name: 'age',
        type: 'core::integer::u16',
      },
      {
        name: 'status',
        type: 'core::bool',
      },
      {
        name: 'votes',
        type: 'core::array::Array::<core::integer::u256>',
      },
      {
        name: 'statue',
        type: 'scarb_test::Balance::Status',
      },
    ],
  },
  {
    type: 'function',
    name: 'complex_input',
    inputs: [
      {
        name: 'complex',
        type: 'scarb_test::Balance::Complex',
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
        name: 'value_',
        type: 'core::integer::u128',
      },
    ],
  },
  {
    type: 'event',
    name: 'scarb_test::Balance::Event',
    kind: 'enum',
    variants: [],
  },
];

// Sample ABI 3
// Goerli Contract Address: 0x0370f2bcbee32a4af36fb3acc7e5b385cda66529063719262e64c21841a907ff
// const sampleAbi = [
//   {
//     type: 'function',
//     name: 'constructor',
//     inputs: [
//       {
//         name: 'controller_admin',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'liquidation_threshold',
//         type: 'core::felt252',
//       },
//       {
//         name: 'math_u256_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'user_positions_limit',
//         type: 'core::integer::u32',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'account_collateral',
//     inputs: [
//       {
//         name: 'minter_account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::integer::u256',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'controller_admin',
//     inputs: [],
//     outputs: [
//       {
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'factory_address',
//     inputs: [],
//     outputs: [
//       {
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'orderbook_address',
//     inputs: [],
//     outputs: [
//       {
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'struct',
//     name: 'contracts::controller::OpenOrder',
//     members: [
//       {
//         name: 'option_token_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'orderbook_order_id',
//         type: 'core::felt252',
//       },
//       {
//         name: 'prev_index',
//         type: 'core::felt252',
//       },
//       {
//         name: 'next_index',
//         type: 'core::felt252',
//       },
//     ],
//   },
//   {
//     type: 'function',
//     name: 'sell_open_order',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'id',
//         type: 'core::felt252',
//       },
//     ],
//     outputs: [
//       {
//         type: 'contracts::controller::OpenOrder',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'account_sell_open_orders_index',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::felt252',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'account_sell_open_orders_count',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::integer::u32',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'account_total_maintenance_margin',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::integer::u256',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'account_total_initial_margin',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::integer::u256',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'get_sell_open_orders_head',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::felt252',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'get_sell_open_orders_tail',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::felt252',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'is_market_maker',
//     inputs: [
//       {
//         name: 'market_maker',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::bool',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'deposit_collateral',
//     inputs: [
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'collateral_amount',
//         type: 'core::integer::u256',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'open_short',
//     inputs: [
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'strike_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'expiration_date',
//         type: 'core::integer::u64',
//       },
//       {
//         name: 'strike_price',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'is_put',
//         type: 'core::bool',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'price',
//         type: 'core::integer::u256',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'open_short_mm',
//     inputs: [
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'strike_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'expiration_date',
//         type: 'core::integer::u64',
//       },
//       {
//         name: 'strike_price',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'is_put',
//         type: 'core::bool',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'price',
//         type: 'core::integer::u256',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'mint_option_mm',
//     inputs: [
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'strike_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'expiration_date',
//         type: 'core::integer::u64',
//       },
//       {
//         name: 'strike_price',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'is_put',
//         type: 'core::bool',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'price',
//         type: 'core::integer::u256',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'sell_options',
//     inputs: [
//       {
//         name: 'option_token_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'price',
//         type: 'core::integer::u256',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'open_long',
//     inputs: [
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'strike_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'expiration_date',
//         type: 'core::integer::u64',
//       },
//       {
//         name: 'strike_price',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'is_put',
//         type: 'core::bool',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'price',
//         type: 'core::integer::u256',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'withdraw_collateral',
//     inputs: [
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'execute_short',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'option_token_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'orderbook_order_id',
//         type: 'core::felt252',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'fully_filled',
//         type: 'core::bool',
//       },
//       {
//         name: 'buyer',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'execute_short_limit',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'option_token_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'buyer',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'cancel_open_orders',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'liquidate',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'liquidate_market_makers',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'settle_payoff',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_asset_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'payoff',
//         type: 'core::integer::u256',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'exercise_option',
//     inputs: [
//       {
//         name: 'option_token_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'cancel_buy_order',
//     inputs: [
//       {
//         name: 'option_token_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'orderbook_order_id',
//         type: 'core::felt252',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'cancel_sell_order',
//     inputs: [
//       {
//         name: 'option_token_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'orderbook_order_id',
//         type: 'core::felt252',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'set_factory_address',
//     inputs: [
//       {
//         name: 'factory_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'set_orderbook_address',
//     inputs: [
//       {
//         name: 'orderbook_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'set_market_maker',
//     inputs: [
//       {
//         name: 'market_maker',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'event',
//     name: 'collateral_deposit',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'underlying_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'collateral_withdraw',
//     inputs: [
//       {
//         name: 'minter_account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'underlying_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'liquidation',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'underlying_address',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'liquidator',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'reward',
//         type: 'core::integer::u256',
//       },
//     ],
//   },
// ];

// Sample ABI 4
// Goerli Contract Address: 0x064fc0fd76134df5d1b89d4cb1be780041180f0ab7e722f068107049dd3aadf6
// const sampleAbi4 = [
//   {
//     type: 'impl',
//     name: 'Balance',
//     interface_name: 'scarb_test_2::IBalance',
//   },
//   {
//     type: 'interface',
//     name: 'scarb_test_2::IBalance',
//     items: [
//       {
//         type: 'function',
//         name: 'get',
//         inputs: [],
//         outputs: [
//           {
//             type: 'core::integer::u128',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'increase',
//         inputs: [
//           {
//             name: 'a',
//             type: 'core::integer::u128',
//           },
//         ],
//         outputs: [],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'decrease',
//         inputs: [
//           {
//             name: 'decrease_by',
//             type: 'core::integer::u128',
//           },
//         ],
//         outputs: [],
//         state_mutability: 'external',
//       },
//     ],
//   },
//   {
//     type: 'struct',
//     name: 'core::integer::u256',
//     members: [
//       {
//         name: 'low',
//         type: 'core::integer::u128',
//       },
//       {
//         name: 'high',
//         type: 'core::integer::u128',
//       },
//     ],
//   },
//   {
//     type: 'enum',
//     name: 'core::bool',
//     variants: [
//       {
//         name: 'False',
//         type: '()',
//       },
//       {
//         name: 'True',
//         type: '()',
//       },
//     ],
//   },
//   {
//     type: 'struct',
//     name: 'scarb_test_2::Balance::Complex',
//     members: [
//       {
//         name: 'name',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'age',
//         type: 'core::integer::u16',
//       },
//       {
//         name: 'status',
//         type: 'core::bool',
//       },
//       {
//         name: 'votes',
//         type: 'core::array::Array::<core::integer::u256>',
//       },
//     ],
//   },
//   {
//     type: 'function',
//     name: 'complex_input',
//     inputs: [
//       {
//         name: 'complex',
//         type: 'core::array::Array::<scarb_test_2::Balance::Complex>',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'constructor',
//     name: 'constructor',
//     inputs: [
//       {
//         name: 'value_',
//         type: 'core::integer::u128',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'scarb_test_2::Balance::Event',
//     kind: 'enum',
//     variants: [],
//   },
// ];

// Sample ABI 5
// Goerli Contract Address: 0x07de87b39455a44e4c55e1930d5518e526b14e8f7ed320381ba8cce02a11b533
// const sampleAbi = [
//   {
//     type: 'impl',
//     name: 'Balance',
//     interface_name: 'scarb_test_2::IBalance',
//   },
//   {
//     type: 'interface',
//     name: 'scarb_test_2::IBalance',
//     items: [
//       {
//         type: 'function',
//         name: 'get',
//         inputs: [],
//         outputs: [
//           {
//             type: 'core::integer::u128',
//           },
//         ],
//         state_mutability: 'view',
//       },
//       {
//         type: 'function',
//         name: 'increase',
//         inputs: [
//           {
//             name: 'a',
//             type: 'core::integer::u128',
//           },
//         ],
//         outputs: [],
//         state_mutability: 'external',
//       },
//       {
//         type: 'function',
//         name: 'decrease',
//         inputs: [
//           {
//             name: 'decrease_by',
//             type: 'core::integer::u128',
//           },
//         ],
//         outputs: [],
//         state_mutability: 'external',
//       },
//     ],
//   },
//   {
//     type: 'struct',
//     name: 'core::integer::u256',
//     members: [
//       {
//         name: 'low',
//         type: 'core::integer::u128',
//       },
//       {
//         name: 'high',
//         type: 'core::integer::u128',
//       },
//     ],
//   },
//   {
//     type: 'enum',
//     name: 'core::bool',
//     variants: [
//       {
//         name: 'False',
//         type: '()',
//       },
//       {
//         name: 'True',
//         type: '()',
//       },
//     ],
//   },
//   {
//     type: 'struct',
//     name: 'scarb_test_2::Balance::Complex',
//     members: [
//       {
//         name: 'name',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'age',
//         type: 'core::integer::u16',
//       },
//       {
//         name: 'status',
//         type: 'core::bool',
//       },
//       {
//         name: 'votes',
//         type: 'core::array::Array::<core::integer::u256>',
//       },
//     ],
//   },
//   {
//     type: 'function',
//     name: 'complex_input',
//     inputs: [
//       {
//         name: 'complex',
//         type: 'core::array::Array::<scarb_test_2::Balance::Complex>',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'user_input',
//     inputs: [
//       {
//         name: 'state',
//         type: 'core::array::Array::<core::integer::u128>',
//       },
//     ],
//     outputs: [],
//     state_mutability: 'external',
//   },
//   {
//     type: 'constructor',
//     name: 'constructor',
//     inputs: [
//       {
//         name: 'value_',
//         type: 'core::integer::u128',
//       },
//     ],
//   },
//   {
//     type: 'event',
//     name: 'scarb_test_2::Balance::Event',
//     kind: 'enum',
//     variants: [],
//   },
// ];

// Sample ABI 6
// Goerli Contract Address: 0x0571229a6620BaDD612EA5995Ed64F32398C1e552A3dAdAbb8a1758b267Aa450
// const sampleAbi = [
//   {
//     type: 'struct',
//     name: 'core::integer::u256',
//     members: [
//       {
//         name: 'low',
//         type: 'core::integer::u128',
//       },
//       {
//         name: 'high',
//         type: 'core::integer::u128',
//       },
//     ],
//   },
//   {
//     type: 'constructor',
//     name: 'constructor',
//     inputs: [
//       {
//         name: 'initial_supply',
//         type: 'core::integer::u256',
//       },
//       {
//         name: 'recipient',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//   },
//   {
//     type: 'function',
//     name: 'name',
//     inputs: [],
//     outputs: [
//       {
//         type: 'core::felt252',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'symbol',
//     inputs: [],
//     outputs: [
//       {
//         type: 'core::felt252',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'decimals',
//     inputs: [],
//     outputs: [
//       {
//         type: 'core::integer::u8',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'total_supply',
//     inputs: [],
//     outputs: [
//       {
//         type: 'core::integer::u256',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'balance_of',
//     inputs: [
//       {
//         name: 'account',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::integer::u256',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'function',
//     name: 'allowance',
//     inputs: [
//       {
//         name: 'owner',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'spender',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::integer::u256',
//       },
//     ],
//     state_mutability: 'view',
//   },
//   {
//     type: 'enum',
//     name: 'core::bool',
//     variants: [
//       {
//         name: 'False',
//         type: '()',
//       },
//       {
//         name: 'True',
//         type: '()',
//       },
//     ],
//   },
//   {
//     type: 'function',
//     name: 'transfer',
//     inputs: [
//       {
//         name: 'recipient',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::bool',
//       },
//     ],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'transfer_from',
//     inputs: [
//       {
//         name: 'sender',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'recipient',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::bool',
//       },
//     ],
//     state_mutability: 'external',
//   },
//   {
//     type: 'function',
//     name: 'approve',
//     inputs: [
//       {
//         name: 'spender',
//         type: 'core::starknet::contract_address::ContractAddress',
//       },
//       {
//         name: 'amount',
//         type: 'core::integer::u256',
//       },
//     ],
//     outputs: [
//       {
//         type: 'core::bool',
//       },
//     ],
//     state_mutability: 'external',
//   },
//   {
//     type: 'event',
//     name: 'erc20::MyToken::Event',
//     kind: 'enum',
//     variants: [],
//   },
// ];

Primary.args = {
  abi: sampleAbi,
  callBackFn: (value) => {
    // @ts-ignore
    console.log({ storybook: value });
  },
};
