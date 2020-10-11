import { MutationTree } from 'vuex';
import { State } from './state';

export type Mutations<State> = {
  setEmulator(state: State, value: boolean): void
}

export const mutations: MutationTree<State> & Mutations<State> = {
  setEmulator: (state, value) => state.emulator = value,
}