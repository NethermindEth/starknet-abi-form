use starknet::ContractAddress;


#[starknet::interface]
trait IVotingStorage<TContractState> {
    fn transfer_owner(ref self: TContractState, to: ContractAddress);
    fn get_owner(self: @TContractState) -> ContractAddress;
}

#[starknet::contract]
mod Voting {
    use super::ContractAddress;
    use traits::Into;
    use array::ArrayTrait;
    use starknet::get_caller_address;

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct ConstituencyDetails {
        name: felt252, 
    }

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct Voting {
        constituency: u16,
        active: bool,
        details: ConstituencyDetails
    }

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct VoterDetails {
        name: felt252,
        age: u8,
    }

    #[storage]
    struct Storage {
        owner: ContractAddress,
        voters: LegacyMap::<ContractAddress, VoterDetails>,
        votes: LegacyMap::<(u16, ContractAddress), u8>,
        active_polls: LegacyMap::<u16, Voting>
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        OwnershipTransferred: OwnershipTransferred,
        UserVoted: UserVoted,
        VotingCreated: VotingCreated
    }

    #[derive(Drop, starknet::Event)]
    struct VotingCreated {
        #[key]
        constituency: u16,
        details: Voting,
    }

    #[derive(Drop, starknet::Event)]
    struct UserVoted {
        #[key]
        voter: ContractAddress,
        voted: Voting,
    }


    #[derive(Drop, starknet::Event)]
    struct OwnershipTransferred {
        #[key]
        prev_owner: ContractAddress,
        #[key]
        new_owner: ContractAddress,
    }


    #[constructor]
    fn constructor(ref self: ContractState, init_owner: ContractAddress) {
        self.owner.write(init_owner);
    }

    #[external(v0)]
    impl IVoting of super::IVotingStorage<ContractState> {
        // Write Functions
        fn transfer_owner(ref self: ContractState, to: ContractAddress) {
            self.only_owner();
            let prev_owner = self.owner.read();
            self.owner.write(to);
            self
                .emit(
                    Event::OwnershipTransferred(
                        OwnershipTransferred { prev_owner: prev_owner, new_owner: to }
                    )
                );
        }

        // Read Functions
        fn get_owner(self: @ContractState) -> ContractAddress {
            self.owner.read()
        }
    }

    #[external(v0)]
    #[generate_trait]
    impl Methods of MethodsTrait {
        fn create_voting(ref self: ContractState, constituency_id: u16, voting: Voting) {
            self.only_owner();

            assert(voting.active == true, 'Voting is not active');

            self.active_polls.write(constituency_id, voting);
            self
                .emit(
                    Event::VotingCreated(
                        VotingCreated { constituency: constituency_id, details: voting,  }
                    )
                )
        }

        fn vote(ref self: ContractState, constituency_id: u16, response: u8) {
            let active_poll = self.active_polls.read(constituency_id);
            assert(active_poll.active == true, 'voting not active');

            let caller = get_caller_address();

            self.votes.write((constituency_id, caller), response);
            self.emit(Event::UserVoted(UserVoted { voter: caller, voted: active_poll }))
        }

        fn dummy_array(ref self: ContractState, states: Array<u256>) -> Array<u256> {
            states
        }
    }

    #[generate_trait]
    impl PrivateMethods of PrivateMethodsTrait {
        fn only_owner(self: @ContractState) {
            let caller = get_caller_address();
            assert(caller == self.owner.read(), 'Caller is not the owner');
        }
    }
}
