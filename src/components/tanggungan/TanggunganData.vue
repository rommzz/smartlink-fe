<template>
  <div>
    <base-card>
      <template v-slot:header>
        <span>tanggungan</span>
        <div style="line-height: 1">
          <span class="mid-grey--text" style="line-height: 1; font-size: 12px; font-weight: normal">
            karyawan ini memiliki tanggungan
          </span>
        </div>
      </template>
      <template v-slot:body>
        <div class="d-flex align-center" style="cursor: pointer" @click="modalNew()">
          <v-icon color="primary">
            mdi-plus-circle-outline
          </v-icon>
          <span class="primary--text">
            Tambah pembayaran tanggungan...
          </span>
        </div>
        <div v-for="(item, index) in data.tanggungan" :key="index" class="py-2 d-flex justify-space-between align-center">
          <div class="pr-2">
            <div class="black--text text-capitalize" style="font-size: 14px">
              {{ item.nama }}
            </div>
            <div class="mid-grey--text" style="line-height: 0.5; font-size: 12px">
              {{ item.keterangan }} 
            </div>
          </div>
          <div class="error--text">
            <span class="" style="font-size: 14px"> 
              {{ item.nominal | formatNumber }}
            </span>
            <v-icon @click="modalEdit(item, index)" class="ml-1" color="error">
              mdi-square-edit-outline
            </v-icon>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="d-flex justify-space-between">
          <span class="title-card" style="font-weight: 600">
            Tanggungan dibayar
          </span>
          <span class="title-card error--text" style="font-weight: 600">
            (-){{ subtotalTanggungan | formatRupiah}}
          </span>
        </div>
      </template>
    </base-card>
    <modal-tanggungan ref="modal" @addData="v => addData(v)" @updateData="v => updateData(v)" @deleteData="()=> {deleteData()}"/>
  </div>
</template>

<script>
import BaseCard from "../BaseCard.vue"
import ModalTanggungan from "./ModalTanggungan.vue"

export default {
  name: 'tanggunganData',
  components: { BaseCard, ModalTanggungan },
  props: {
    propsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: {},
      index: null
    }
  },
  created() {
    this.data = this.propsData
  },
  methods: {
    modalNew() {
      this.$refs.modal.show(true, {})
    },
    modalEdit(item, index) {
      this.index = index
      this.$refs.modal.show(false, item)
    },
    addData(v) {
      this.data.tanggungan.push(v)
    },  
    updateData(v) {
      this.$set(this.data.tanggungan, this.index, v)
    },
    deleteData() {
      this.data.tanggungan.splice(this.index, 1)
    }
  },
  computed: {
    subtotalTanggungan () {
      return this.$store.state.inquiry.tanggungan
    }
  }
}
</script>

<style>

</style>