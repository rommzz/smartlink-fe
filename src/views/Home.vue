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
            <span class="primary--text" style="font-weight: 600">
              Ubah kehadiran
            </span>
          </div>
        </template>
      </base-card>

      <base-card>
        <template v-slot:header>
          <span>gaji</span>
        </template>
        <template v-slot:body>
          <div v-for="(item, index) in data.pengaturan_gaji" :key="index" class="py-2 d-flex justify-space-between align-center">
            <div>
              <div class="black--text" style="line-height: 1;font-size: 14px">
                {{item.nama}}
              </div>
              <div class="mid-grey--text" style="line-height: 1; font-size: 12px">
                {{ `${item.nominal} x ${item.id == 1 ? '1' : data.total_kehadiran} ${item.jenis}` }} 
              </div>
            </div>
            <div>
              <span class="black--text" style="font-size: 14px"> 
                {{ valueGaji(item.nominal, item.id) }}
              </span>
              <v-icon class="ml-1" color="primary" @click="show()">
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
              {{ subtotalGaji() }}
            </span>
          </div>
        </template>
      </base-card>

      <base-card>
        <template v-slot:header>
          <span>upah borongan</span>
        </template>
        <template v-slot:body>
          <div v-for="(item, index) in data.pengaturan_upah" :key="index" class="py-2 d-flex justify-space-between align-center">
            <div>
              <div class="black--text text-capitalize" style="line-height: 1; font-size: 14px">
                {{ item.nama }}
              </div>
              <div class="mid-grey--text" style="line-height: 1;; font-size: 12px">
                {{ pengerjaan_upah(item.id).nominal + ' ' + pengerjaan_upah(item.id).satuan }} 
              </div>
            </div>
            <div>
              <span class="black--text" style="font-size: 14px"> 
                {{ pengerjaan_upah(item.id).nominal * item.nominal }}
              </span>
              <v-icon class="ml-1" color="primary">
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
              {{ subtotalUpah() }}
            </span>
          </div>
        </template>
      </base-card>

      <base-card>
        <template v-slot:header>
          <span>komisi</span>
        </template>
        <template v-slot:body>
          <div>
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
                {{ item.nominal }}
              </span>
              <v-icon class="ml-1" color="primary">
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
              {{ subtotalKomisi() }}
            </span>
          </div>
        </template>
      </base-card>

      <v-card class="elevation-1 rounded-0 mb-5">
        <v-card-text class="d-flex justify-space-between secondary--text text-capitalize title-card" style="font-weight: 600">
          <span>
            total gaji kotor
          </span>
          <span>
            {{ subtotalGaji() + subtotalKomisi() + subtotalUpah() }}
          </span>
        </v-card-text>
      </v-card>

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
          <div>
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
                {{ item.nominal }}
              </span>
              <v-icon class="ml-1" color="error">
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
            <span class="title-card" style="font-weight: 600">
              (-){{ subtotalTanggungan() }}
            </span>
          </div>
        </template>
      </base-card>
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
              {{subtotalGaji() + subtotalKomisi() + subtotalUpah() - subtotalTanggungan() }}
            </span>
          </div>
          <div class="py-2" style="line-height: 18px">
            Nominal akhir yang diterima karyawan setelah ditambah komisi dikurangi pembayaran tanggungan (jika ada).
          </div>
          <v-btn 
            class="text-none"
            color="primary"
            block
          >
            Berikutnya
          </v-btn>
        </v-card-text>
      </v-card>
    </template>
    <modal-kehadiran ref="modalKehadiran">
    </modal-kehadiran>
  </div>
</template>

<script>
import Axios from "axios"
import baseCard from "../components/BaseCard.vue"
import ModalKehadiran from '../components/ModalKehadiran.vue'

export default {
  name: 'Inquiry',
  components: { baseCard, ModalKehadiran },
  data () {
    return {
      data: {},
      isloading: true
    }
  },
  methods: {
    async getData () {
      this.isloading = true
      await Axios.get('/inquiry').then(r => {
        console.log(r);
        this.data = r.data.data
        this.data.tanggungan = [
          {
            nama: 'Ganti Barang Hilang',
            nominal: 50000,
            keterangan: 'Baju yang hilang warna merah'
          },
          {
            nama: 'Denda Keterlambatan',
            nominal: 20000,
            keterangan: 'karena terlambat 3 hari berturut - turut '
          }
        ]
        this.data.komisi = [
          {
            nama: 'Bonus Target 1',
            nominal: 20000
          }
        ]
      }).catch(e => {
        console.log(e);
      }).finally(() => {
        this.isloading = false
      })
    },
    valueGaji (v, id) {
      if (id == 1) {
        return parseInt(v)
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
      if (!this.data.komisi.length) {
        return 0
      }
      else {
        let total = 0
        this.data.komisi.forEach(item => {
          total = total + item.nominal
        });
        return total
      }
    },
    subtotalTanggungan () {
      if (!this.data.tanggungan.length) {
        return 0
      }
      else {
        let total = 0
        this.data.tanggungan.forEach(item => {
          total = total + item.nominal
        });
        return total
      }
    },
    show() {
      this.$refs.modalKehadiran.show()
    }
  },
  async created () {
    await this.getData()
  }

}
</script>
<style scoped>
.title-card{
  font-size: 16px;
  color: black;
  text-transform: capitalize;
}
</style>