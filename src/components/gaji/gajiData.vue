<template>
  <div>
    <base-card>
      <template v-slot:header>
        <span>gaji</span>
      </template>
      <template v-slot:body>
        <div v-for="(item, index) in data" :key="index" class="py-2 d-flex justify-space-between align-center">
          <div>
            <div class="black--text" style="line-height: 1;font-size: 14px">
              {{item.nama}}
            </div>
            <div class="mid-grey--text" style="line-height: 1; font-size: 12px">
              {{ `${item.nominal} x ${item.id == 1 ? total_periode : total_kehadiran} ${item.jenis}` }} 
            </div>
          </div>
          <div>
            <span class="black--text" style="font-size: 14px"> 
              {{ valueGaji(item.nominal, item.id) | formatNumber }}
            </span>
            <v-icon class="ml-1" color="primary" @click="item.id == 1 ? showModalGaji(item.nominal, total_periode, index) : showModalAkomodasi(item.nominal, index)">
              mdi-square-edit-outline
            </v-icon>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="d-flex justify-space-between">
          <span class="title-card" style="font-weight: 600">
            subtotal Gaji
          </span>
          <span class="title-card" style="font-weight: 600">
            {{ subtotalGaji | formatRupiah }}
          </span>
        </div>
      </template>
    </base-card>
    <modal-gaji ref="modalGaji" @savedata="v => { data[index].nominal = v.nominal; total_periode = v.total_periode;  }"/>
    <modal-akomodasi ref="modalAkomodasi" @savedata="v => { data[index].nominal = v.nominal; total_periode = v.total_periode;  }"/>
  </div>
</template>

<script>
import BaseCard from "@/components/BaseCard.vue"
import ModalGaji from "./ModalGaji.vue"
import ModalAkomodasi from './ModalAkomodasi.vue'
export default {
  name: 'dataGaji',
  components: { BaseCard, ModalGaji, ModalAkomodasi },
  props: {
    propsData: {
      type: Array,
      default: () => []
    },
    propsKehadiran: {
      type: Number,
      default: 0
    },
    propsPeriode: {
      type: Number,
      default: 0
    }
  },
  data () {
    return{
      data: [],
      total_kehadiran: 0,
      total_periode: 0,
      index: null
    }
  },
  methods: {
    valueGaji (v, id) {
      if (id == 1) {
        return parseInt(v * this.total_periode)
      }
      else {
        return parseInt(v * this.total_kehadiran )
      }
    },
    showModalGaji (nominal, periode, index) {
      this.index = index
      this.$refs.modalGaji.show(nominal, periode)
    },
    showModalAkomodasi (nominal, index) {
      console.log(this.total_kehadiran);
      this.index = index
      this.$refs.modalAkomodasi.show(nominal, this.total_kehadiran)
    }
  },
  computed: {
    subtotalGaji: {
      get() {
        return this.$store.state.inquiry.subtotalGaji
      },
      set (v) {
        this.$store.commit('SET_SUBTOTAL_GAJI', v)
      }
    }
  },
  created() {
    this.data = this.propsData
    this.total_kehadiran = this.propsKehadiran
    this.total_periode = this.propsPeriode
  }
}
</script>

<style>

</style>