#[starknet::interface]
trait IBalance<T> {
    // Returns the current balance.
    fn get(self: @T) -> u128;
    // Increases the balance by the given amount.
    fn increase(ref self: T, a: u128);
    // Decrease the balance by the given amount
    fn decrease(ref self: T, decrease_by: u128);
}

#[starknet::contract]
mod Balance {
    use traits::Into;
    use array::ArrayTrait;

    #[storage]
    struct Storage {
        value: u128, 
    }

    #[derive(Drop, Serde)]
    struct VoteDetails {
        name: u256,
        party: u256,
        conclusion: u8
    }

    #[derive(Drop, Serde)]
    struct Status {
        voted: bool,
        timestamp: u64,
        details: Array<VoteDetails>
    }

    #[derive(Drop, Serde)]
    struct Complex {
        name: u256,
        age: u16,
        status: bool,
        votes: Array<u256>,
        statue: Status
    }

    #[constructor]
    fn constructor(ref self: ContractState, value_: u128) {
        self.value.write(value_);
    }

    #[external(v0)]
    #[generate_trait]
    impl Balance of IBalance {
        fn get(self: @ContractState) -> u128 {
            self.value.read()
        }
        fn increase(ref self: ContractState, a: u128) {
            self.value.write(self.value.read() + a);
        }
        fn decrease(ref self: ContractState, decrease_by: u128) {
            self.value.write(self.value.read() - decrease_by);
        }
    }

    #[external(v0)]
    #[generate_trait]
    impl ComplexInput of IComplexInput {
        fn complex_input(ref self: ContractState, complex: Complex) {}
    }
}
