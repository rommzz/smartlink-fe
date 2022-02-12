import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inquiry:{
      subtotalGaji: 0,
      subtotalUpah: 0,
      subtotalKomisi: 0,
      tanggungan: 0,
    },
    data: {},
    rekening: []
  },
  mutations: {
    SET_SUBTOTAL_GAJI(state, value) {
      state.inquiry.subtotalGaji = value;
    },
    SET_SUBTOTAL_UPAH(state, value) {
      state.inquiry.subtotalUpah = value;
    },
    SET_SUBTOTAL_KOMISI(state, value) {
      state.inquiry.subtotalKomisi = value;
    },
    SET_SUBTOTAL_TANGGUNGAN(state, value) {
      state.inquiry.tanggungan = value;
    },
    SET_DATA(state, value) {
      state.data = value
    },
    SET_REKENING_LIST(state, value) {
      state.rekening = value
    }
  },
  actions: {
  },
  modules: {
  }
})
