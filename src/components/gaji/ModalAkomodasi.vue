<template>
  <base-modal ref="modal" header="Ubah Uang Absen/Transport/Lembur">
    <div>
      Nominal
      <div class="d-flex align-center">
        <nominal-input style="width: 50%" v-model="nominal"></nominal-input> 
        <div>
          <v-icon small>
            mdi-close
          </v-icon>
        </div>
        <div class="text-body-1">
          {{ total_kehadiran }} hari
        </div>
      </div>
      <v-row class="mt-3">
        <v-col class="pr-0">
          <v-btn @click="hari = 0" class="col-6 text-none" block outlined color="error">
            Hapus
          </v-btn>
        </v-col>
        <div class="pl-1" />
        <v-col class="pl-0">
          <v-btn class="col-6 text-none" block depressed color="primary" @click="save()">
            Simpan
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </base-modal>
</template>

<script>
import baseModal from '../baseModal.vue'
import nominalInput from '../nominalInput.vue'


export default {
  name: 'modalGaji',
  components: { baseModal, nominalInput},
  data () {
    return{
      nominal: 0,
      total_kehadiran: 0
    }
  },
  methods: {
    show(nominal, total_kehadiran) {
      this.nominal = nominal
      this.total_kehadiran = total_kehadiran
      this.$refs.modal.show()
    },
    save() {
      const data = {
        nominal: this.nominal,
        total_periode: this.total_periode
      }
      this.$emit('savedata', data)
      this.$refs.modal.close()
    }
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.v-text-field{
  width: 60px;
}
</style>