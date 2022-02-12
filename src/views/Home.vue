<template>
  <div class="bg">
    <div v-if="isloading" class="text-center mt-12">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <template v-else>
      <base-card centeredTitle>
        <template v-slot:header>
          <span>faktur gaji</span>
        </template>
        <template v-slot:body>
          <div class="font-weight-bold black--text pt-1" style="font-size: 18px">
            {{ data.nama_karyawan }}
          </div>
          <div class="semi-fade--text pt-1">
            {{data.tanggal_awal + ' - ' + data.tanggal_akhir}}
          </div>
        </template>
        <template v-slot:footer>
          <div class="d-flex justify-space-between">
            <span style="font-weight: 600">
              Masuk {{ data.total_kehadiran }} Hari
            </span>
            <a class="primary--text" style="font-weight: 600" @click="showModalKehadiran(data.total_kehadiran)">
              Ubah kehadiran
            </a>
          </div>
        </template>
      </base-card>

      <gaji-data ref="gajiData" :propsData="data"/>

      <borongan-data ref="gajiData" :propsData="{pengaturan_upah: data.pengaturan_upah, pengerjaan_upah: data.pengerjaan_upah}"/>
      
      <komisi-data :propsData="data"></komisi-data>
      
      <v-card class="elevation-1 rounded-0 mb-5">
        <v-card-text class="d-flex justify-space-between secondary--text text-capitalize title-card" style="font-weight: 600">
          <span>
            total gaji kotor
          </span>
          <span>
            {{ (subtotalGaji() + subtotalKomisi() + subtotalUpah()) | formatRupiah }}
          </span>
        </v-card-text>
      </v-card>

      <tanggungan-data :propsData="data"/>
      <v-card>
        <v-card-text>
          <div class="primary--text d-flex justify-space-between pb-2" style="font-size: 20px; font-weight: 800;">
            <div class="d-flex align-baseline">
              <span>
                Total Gaji Bersih
              </span>
              <v-icon color="green" small>
                mdi-check-circle
              </v-icon>
            </div>
            <span>
              {{ (subtotalGaji() + subtotalKomisi() + subtotalUpah() - subtotalTanggungan()) | formatRupiah }}
            </span>
          </div>
          <div class="py-2" style="line-height: 18px">
            Nominal akhir yang diterima karyawan setelah ditambah komisi dikurangi pembayaran tanggungan (jika ada).
          </div>
          <v-btn 
            class="text-none"
            color="primary"
            block
            :loading="nextLoading"
            @click="next()"
          >
            Berikutnya
          </v-btn>
        </v-card-text>
      </v-card>
    </template>
    <modal-kehadiran @savedata="v => data.total_kehadiran = v" ref="modalKehadiran">
    </modal-kehadiran>
  </div>
</template>

<script>
import Axios from "axios"
import baseCard from "../components/BaseCard.vue"
import ModalKehadiran from '../components/ModalKehadiran.vue'
import '@/plugins/filter'
import gajiData from "@/components/gaji/gajiData.vue"
import BoronganData from '../components/borongan/BoronganData.vue'
import KomisiData from "../components/komisi/KomisiData.vue"
import TanggunganData from "../components/tanggungan/TanggunganData.vue"

export default {
  name: 'Inquiry',
  components: { baseCard, ModalKehadiran, gajiData, BoronganData, KomisiData, TanggunganData },
  data () {
    return {
      data: {},
      isloading: false,
      nextLoading: false
    }
  },
  methods: {
    async getData () {
      this.isloading = true
      await Axios.get('/inquiry').then(r => {
        this.data = r.data.data
        this.$store.commit('SET_SUBTOTAL_GAJI', this.subtotalGaji())
        this.$store.commit('SET_SUBTOTAL_UPAH', this.subtotalUpah())
        this.$store.commit('SET_SUBTOTAL_KOMISI', this.subtotalKomisi())
        this.$store.commit('SET_SUBTOTAL_TANGGUNGAN', this.subtotalTanggungan())
      }).catch(e => {
        console.log(e);
      }).finally(() => {
        this.isloading = false
      })
    },
    next() {
      this.nextLoading = true
      Axios.get('/bank').then(r => {
        this.$store.commit('SET_DATA', this.data)
        this.$store.commit('SET_REKENING_LIST', r.data.data)
        this.$router.push({ path: '/detail' })
      }).catch(e => {
        console.log(e);
      }).finally(() => {
        this.nextLoading = false
      })
    },
    valueGaji (v, id) {
      if (id == 1) {
        return parseInt(v * this.data.total_periode)
      }
      else {
        return parseInt(v * this.data.total_kehadiran )
      }
    },
    pengerjaan_upah (id) {
      return this.data.pengerjaan_upah.find(x => x.pengaturan_upah_id === id);
    },
    subtotalGaji() {
      let total = 0
      this.data.pengaturan_gaji.forEach(el => {
        total = total + this.valueGaji(el.nominal, el.id)
      });
      this.$store.commit('SET_SUBTOTAL_GAJI', total)
      return total
    },
    subtotalUpah() {
      let total = 0
      this.data.pengaturan_upah.forEach(item => {
        total = total + (this.pengerjaan_upah(item.id).nominal * item.nominal)
      });
      return total
    },
    subtotalKomisi() {
      let total = 0
      if (this.data.komisi.length) {
        this.data.komisi.forEach(item => {
          total = total + item.nominal
        });
      }
      this.$store.commit('SET_SUBTOTAL_KOMISI', total)
      return total
    },
    subtotalTanggungan () {
      let total = 0
      if (this.data.tanggungan.length) {
        this.data.tanggungan.forEach(item => {
          total = total + item.nominal
        });
      }
      this.$store.commit('SET_SUBTOTAL_TANGGUNGAN', total)
      return total
    },
    showModalKehadiran(v) {
      this.$refs.modalKehadiran.show(v)
    }
  },
  async created () {
    if (Object.keys(this.$store.state.data).length) {
       this.data = this.$store.state.data
       console.log(true);
    }
    else {
      await this.getData()
    }
  }

}
</script>
