export default [
  {
    type: 'impl',
    name: 'MasterControlImpl',
    interface_name: 'arcade_account::account::interface::IMasterControl',
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
    name: 'core::starknet::account::Call',
    members: [
      {
        name: 'to',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'selector',
        type: 'core::felt252',
      },
      {
        name: 'calldata',
        type: 'core::array::Array::<core::felt252>',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::array::Span::<core::felt252>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<core::felt252>',
      },
    ],
  },
  {
    type: 'interface',
    name: 'arcade_account::account::interface::IMasterControl',
    items: [
      {
        type: 'function',
        name: 'update_whitelisted_contracts',
        inputs: [
          {
            name: 'data',
            type: 'core::array::Array::<(core::starknet::contract_address::ContractAddress, core::bool)>',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'update_whitelisted_calls',
        inputs: [
          {
            name: 'data',
            type: 'core::array::Array::<(core::starknet::contract_address::ContractAddress, core::felt252, core::bool)>',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'function_call',
        inputs: [
          {
            name: 'data',
            type: 'core::array::Array::<core::starknet::account::Call>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Array::<core::array::Span::<core::felt252>>',
          },
        ],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'get_master_account',
        inputs: [],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        state_mutability: 'external',
      },
    ],
  },
  {
    type: 'impl',
    name: 'SRC6Impl',
    interface_name: 'openzeppelin::account::interface::ISRC6',
  },
  {
    type: 'interface',
    name: 'openzeppelin::account::interface::ISRC6',
    items: [
      {
        type: 'function',
        name: '__execute__',
        inputs: [
          {
            name: 'calls',
            type: 'core::array::Array::<core::starknet::account::Call>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Array::<core::array::Span::<core::felt252>>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: '__validate__',
        inputs: [
          {
            name: 'calls',
            type: 'core::array::Array::<core::starknet::account::Call>',
          },
        ],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'is_valid_signature',
        inputs: [
          {
            name: 'hash',
            type: 'core::felt252',
          },
          {
            name: 'signature',
            type: 'core::array::Array::<core::felt252>',
          },
        ],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'impl',
    name: 'SRC6CamelOnlyImpl',
    interface_name: 'openzeppelin::account::interface::ISRC6CamelOnly',
  },
  {
    type: 'interface',
    name: 'openzeppelin::account::interface::ISRC6CamelOnly',
    items: [
      {
        type: 'function',
        name: 'isValidSignature',
        inputs: [
          {
            name: 'hash',
            type: 'core::felt252',
          },
          {
            name: 'signature',
            type: 'core::array::Array::<core::felt252>',
          },
        ],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'impl',
    name: 'DeclarerImpl',
    interface_name: 'openzeppelin::account::interface::IDeclarer',
  },
  {
    type: 'interface',
    name: 'openzeppelin::account::interface::IDeclarer',
    items: [
      {
        type: 'function',
        name: '__validate_declare__',
        inputs: [
          {
            name: 'class_hash',
            type: 'core::felt252',
          },
        ],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'impl',
    name: 'SRC5Impl',
    interface_name: 'openzeppelin::introspection::interface::ISRC5',
  },
  {
    type: 'interface',
    name: 'openzeppelin::introspection::interface::ISRC5',
    items: [
      {
        type: 'function',
        name: 'supports_interface',
        inputs: [
          {
            name: 'interface_id',
            type: 'core::felt252',
          },
        ],
        outputs: [
          {
            type: 'core::bool',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'impl',
    name: 'SRC5CamelImpl',
    interface_name: 'openzeppelin::introspection::interface::ISRC5Camel',
  },
  {
    type: 'interface',
    name: 'openzeppelin::introspection::interface::ISRC5Camel',
    items: [
      {
        type: 'function',
        name: 'supportsInterface',
        inputs: [
          {
            name: 'interfaceId',
            type: 'core::felt252',
          },
        ],
        outputs: [
          {
            type: 'core::bool',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'function',
    name: 'get_public_key',
    inputs: [],
    outputs: [
      {
        type: 'core::felt252',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'set_public_key',
    inputs: [
      {
        name: 'new_public_key',
        type: 'core::felt252',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'getPublicKey',
    inputs: [],
    outputs: [
      {
        type: 'core::felt252',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'function',
    name: 'setPublicKey',
    inputs: [
      {
        name: 'newPublicKey',
        type: 'core::felt252',
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
        name: '_public_key',
        type: 'core::felt252',
      },
      {
        name: '_master_account',
        type: 'core::starknet::contract_address::ContractAddress',
      },
    ],
  },
  {
    type: 'function',
    name: '__validate_deploy__',
    inputs: [
      {
        name: 'class_hash',
        type: 'core::felt252',
      },
      {
        name: 'contract_address_salt',
        type: 'core::felt252',
      },
      {
        name: '_public_key',
        type: 'core::felt252',
      },
      {
        name: '_master_account',
        type: 'core::starknet::contract_address::ContractAddress',
      },
    ],
    outputs: [
      {
        type: 'core::felt252',
      },
    ],
    state_mutability: 'view',
  },
  {
    type: 'event',
    name: 'arcade_account::Account::Event',
    kind: 'enum',
    variants: [],
  },
];
