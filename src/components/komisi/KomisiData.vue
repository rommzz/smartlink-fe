<template>
  <div>
    <base-card>
      <template v-slot:header>
        <span>komisi</span>
      </template>
      <template v-slot:body>
        <div class="d-flex align-center" style="cursor: pointer" @click="modalNew()">
          <v-icon color="primary">
            mdi-plus-circle-outline
          </v-icon>
          <span class="primary--text">
            Tambah komisi lain...
          </span>
        </div>
        <div v-for="(item, index) in data.komisi" :key="index" class="py-2 d-flex justify-space-between align-center">
          <div class="pr-2">
            <div class="black--text text-capitalize" style="font-size: 14px">
              {{ item.nama }}
            </div>
            <div class="mid-grey--text" style="line-height: 0.5; font-size: 12px">
              {{ item.nominal }} 
            </div>
          </div>
          <div class="">
            <span class="" style="font-size: 14px"> 
              {{ item.nominal | formatNumber}}
            </span>
            <v-icon class="ml-1" color="primary" @click="modalEdit(item.nama, item.nominal, index)">
              mdi-square-edit-outline
            </v-icon>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="d-flex justify-space-between">
          <span class="title-card" style="font-weight: 600">
            subtotal Komisi
          </span>
          <span class="title-card" style="font-weight: 600">
            {{ subtotalKomisi | formatRupiah}}
          </span>
        </div>
      </template>
    </base-card>
    <modal-komisi ref="modal" @addData="v => addData(v)" @updateData="v => updateData(v)" @deleteData="()=> {deleteData()}"/>
  </div>
</template>

<script>
import BaseCard from "../BaseCard.vue"
import ModalKomisi from "./ModalKomisi.vue"

export default {
  name: 'komisiData',
  components: { BaseCard, ModalKomisi },
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
      this.$refs.modal.show(true, 0, null)
    },
    modalEdit(nama, nominal, index) {
      this.index = index
      this.$refs.modal.show(false, nominal, nama)
    },
    addData(v) {
      this.data.komisi.push(v)
    },
    updateData(v) {
      this.$set(this.data.komisi, this.index, v)
    },
    deleteData() {
      this.data.komisi.splice(this.index, 1)
    }
  },
  computed: {
    subtotalKomisi () {
      return this.$store.state.inquiry.subtotalKomisi
    }
  }
}
</script>

<style>

</style>