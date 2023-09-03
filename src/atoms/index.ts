import { atom } from 'jotai';
// import { atomWithStorage } from 'jotai/utils';

// const ABI_FORM = 'STARKNET_ABI_FORM';

// export const formsAtom = atomWithStorage<Record<string, {}>>(ABI_FORM, {});
export const formsAtom = atom<Record<string, {}>>({});
