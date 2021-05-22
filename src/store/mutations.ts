import { State } from './state';

export const mutations = {
  setProgram: (state: State, value: any) => state.program = value,
}