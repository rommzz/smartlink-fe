<template>
  <base-modal ref="modal" header="Ubah Gaji Pokok">
    <div>
      Nominal
      <div class="d-flex align-center">
        <nominal-input type="number" style="width: 50%" v-model="nominal"></nominal-input> 
        <div>
          <v-icon>
            mdi-close
          </v-icon>
        </div>
        <div class="d-flex rounded" style="border-style: solid; border-width: 1px; border-color: #C8D0DD">
          <div class="text-center text-subtitle-1" style="border-right: solid 1px; border-color: #C8D0DD"> 
            <v-text-field
              class="borderless shrink"
              dense
              hide-details
              outlined
              min="1"
              type="number"
              v-model="total_periode">
            </v-text-field>
          </div>
          <div class="pa-2 flex-fill align-self-center" style="background:rgb(246, 246, 246)">
            periode
          </div>
        </div>
      </div>
      <v-row class="mt-3">
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
      total_periode: 0
    }
  },
  methods: {
    show(nominal, periode) {
      this.nominal = nominal
      this.total_periode = periode
      this.$refs.modal.show()
    },
    save() {
      const data = {
        nominal: this.nominal,
        total_periode: this.total_periode
      }
      console.log(data);
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
.borderless >>> .v-input__slot  fieldset{
  border-style: hidden !important;
}
</style>