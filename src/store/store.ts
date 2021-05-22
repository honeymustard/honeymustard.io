import { createStore } from 'vuex';
import { state } from './state';
import { getters } from './getters';
import { mutations } from './mutations';

export const store = createStore({
  state,
  getters,
  mutations,
})