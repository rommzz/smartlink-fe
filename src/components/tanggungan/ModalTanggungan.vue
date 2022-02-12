<template>
  <base-modal ref="modal" header="Bayar tanggungan/denda">
    <div>
      <div class="pb-4">
        Nama Komisi
        <div class="d-flex rounded" style="border-style: solid; border-width: 1px; border-color: #C8D0DD">
          <v-text-field
            class="borderless"
            dense
            hide-details
            outlined
            min="1"
            placeholder="Contoh: Ganti Barang Hilang"
            v-model="item.nama">
          </v-text-field>
        </div>
      </div>
      <div>
        Nominal
        <nominal-input type="number" style="width: 100%" v-model="item.nominal"></nominal-input> 
      </div>
      <div class="pt-4">
        Keterangan
        <div class="d-flex rounded" style="border-style: solid; border-width: 1px; border-color: #C8D0DD">
          <v-text-field
            class="borderless"
            dense
            hide-details
            outlined
            min="1"
            placeholder="Contoh : Baju yang hilang warna merah"
            v-model="item.keterangan">
          </v-text-field>
        </div>
      </div>
    </div>
    <v-row class="mt-3">
      <v-col class="pr-0">
        <v-btn @click="isNew ? item = clearForm() : $emit('deleteData', true); $refs.modal.close()" class="col-6 text-none" block outlined color="error">
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
  </base-modal>
</template>

<script>
import baseModal from '../baseModal.vue'
import nominalInput from '../nominalInput.vue'


export default {
  name: 'modalTanggungan',
  components: { baseModal, nominalInput},
  data () {
    return{
      item: this.clearForm(),
      isNew: true
    }
  },
  methods: {
    clearForm() {
      return {
        nama: null,
        keterangan: null,
        nominal: null
      }
    },
    show(isNew, item) {
      this.item = isNew ? this.clearForm() : item
      this.isNew =isNew
      this.$refs.modal.show()
    },
    save() {
      if (this.isNew) {
        this.$emit('addData', this.item)
      } else {
        this.$emit('updateData', this.item)
      }
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

.borderless >>> .v-input__slot  fieldset{
  border-style: hidden !important;
}
</style>