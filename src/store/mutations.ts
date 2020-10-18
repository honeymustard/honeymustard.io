import { MutationTree } from 'vuex';
import { State } from './state';

export type Mutations<S = State> = {
  setEmulator(state: S, value: boolean): void
}

export const mutations: MutationTree<State> & Mutations = {
  setEmulator: (state, value) => state.emulator = value,
}