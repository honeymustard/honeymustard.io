import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  emulator(state: State): boolean
}

export const getters: GetterTree<State, State> & Getters = {
  emulator: (state) => state.emulator,
}