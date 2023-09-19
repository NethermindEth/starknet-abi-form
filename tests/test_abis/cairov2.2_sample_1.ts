export default [
  {
    type: 'enum',
    name: 'scarb_test::EnumFnContract::Choice',
    variants: [
      { name: 'ChoiceA', type: '()' },
      { name: 'ChoiceB', type: '()' },
      { name: 'ChoiceC', type: '()' },
      { name: 'ChoiceD', type: '()' },
    ],
  },
  {
    type: 'function',
    name: 'user_choice',
    inputs: [{ name: 'state', type: 'scarb_test::EnumFnContract::Choice' }],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'enum',
    name: 'scarb_test::EnumFnContract::Movement',
    variants: [
      {
        name: 'Coords',
        type: '(core::integer::u64, core::integer::u64)',
      },
      { name: 'Message', type: 'core::felt252' },
    ],
  },
  {
    type: 'function',
    name: 'move_user',
    inputs: [
      { name: 'movement', type: 'scarb_test::EnumFnContract::Movement' },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'bulk_move',
    inputs: [
      {
        name: 'users_moved',
        type: 'core::array::Array::<scarb_test::EnumFnContract::Movement>',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'event',
    name: 'scarb_test::EnumFnContract::UserChoice',
    kind: 'struct',
    members: [
      {
        name: 'user',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'choice',
        type: 'scarb_test::EnumFnContract::Choice',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'scarb_test::EnumFnContract::UserMoved',
    kind: 'struct',
    members: [
      {
        name: 'user',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'movement',
        type: 'scarb_test::EnumFnContract::Movement',
        kind: 'key',
      },
    ],
  },
  {
    type: 'event',
    name: 'scarb_test::EnumFnContract::Event',
    kind: 'enum',
    variants: [
      {
        name: 'UserChoice',
        type: 'scarb_test::EnumFnContract::UserChoice',
        kind: 'nested',
      },
      {
        name: 'UserMoved',
        type: 'scarb_test::EnumFnContract::UserMoved',
        kind: 'nested',
      },
    ],
  },
];
