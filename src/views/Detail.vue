<template>
  <div class="bg">
    <v-card class="mb-5 rounded-0 elevation-1">
      <v-card-text class="py-3 px-2" style="position: relative">
        <div class="font-weight-bold black--text text-capitalize text-center" style="font-size: 16px;position: absolute;left: 50%;transform: translateX(-50%);width: 100%;letter-spacing: -0.02em;">
          Detail pembayaran
        </div>
        <v-icon color="primary" @click="$router.push({ path: '/' })">
          mdi-arrow-left
        </v-icon>
      </v-card-text>
      <v-divider />
      <v-card-text>
        <div class="d-flex justify-space-between align-center">
          <div class="pb-1 black--text" style="line-height: 1;font-size: 14px">
            Subtotal Gaji
          </div>
          <span class="black--text font-weight-bold" style="font-size: 16px;">
            {{ $store.state.inquiry.subtotalGaji | formatRupiah }}
          </span>
        </div>
        <div class="pb-1 d-flex justify-space-between align-center">
          <div class="black--text" style="line-height: 1;font-size: 14px">
            Subtotal Upah
          </div>
          <span class="black--text font-weight-bold" style="font-size: 16px;">
            {{ $store.state.inquiry.subtotalUpah | formatRupiah }}
          </span>
        </div>
        <div class="pb-1 d-flex justify-space-between align-center">
          <div class="black--text" style="line-height: 1;font-size: 14px">
            Subtotal Komisi
          </div>
          <span class="black--text font-weight-bold" style="font-size: 16px;">
            {{ $store.state.inquiry.subtotalKomisi | formatRupiah }}
          </span>
        </div>
        <div class="py-1 d-flex justify-space-between align-center">
          <div class="black--text" style="line-height: 1;font-size: 14px">
            Gaji Kotor
          </div>
          <span class="black--text font-weight-bold secondary--text" style="font-size: 16px;">
            {{ ($store.state.inquiry.subtotalKomisi + $store.state.inquiry.subtotalUpah + $store.state.inquiry.subtotalGaji) | formatRupiah }}
          </span>
        </div>
        <div class="py-1 d-flex justify-space-between align-center">
          <div class="black--text" style="line-height: 1;font-size: 14px">
            Tanggungan
          </div>
          <span class="font-weight-bold error--text" style="font-size: 16px;">
            {{ $store.state.inquiry.tanggungan | formatRupiah }}
          </span>
        </div>
      </v-card-text>
      <v-card-text style="border-top: dashed; border-width: 1px; border-color: #ededed;">
        <div class="primary--text font-weight-bold py-1 d-flex justify-space-between align-center">
          <div class="" style="line-height: 1;font-size: 16px">
            Total Gaji Bersih
          </div>
          <span class="font-weight-bold" style="font-size: 16px;">
            {{ ($store.state.inquiry.subtotalKomisi + $store.state.inquiry.subtotalUpah + $store.state.inquiry.subtotalGaji) - $store.state.inquiry.tanggungan  | formatRupiah }}
          </span>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="rounded-0 elevation-1">
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <div class="pb-4">
            Bayar dari rekening <span class="primary--text">*</span>
            <div class="d-flex rounded" style="">
              <v-select
                class="borderless"
                :rules="rule"
                :items="listRekening"
                append-icon="mdi-chevron-down"
                return-object
                :item-text="item => item.bank +' - '+ item.nomor"
                dense
                :hide-details="!(!valid && data.rekening == undefined)"
                outlined
                min="1"
                placeholder="Pilih Rekening Bank"
                v-model="data.rekening">
                <template v-slot:item="{ item }">
                  <v-list-item-content py-0>
                    <v-list-item-title v-text="item.pemilik"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.bank + '-' + item.nomor"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-select>
            </div>
          </div>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="data.tanggal_catat"
            persistent
            max-width="400px"
          >
            <template v-slot:activator="{ on, attrs }">
              <div class="pb-4">
                Dicatat Pada Tanggal <span class="primary--text">*</span>
                <div class="d-flex rounded" style="">
                  <v-text-field
                    :rules="rule"
                    required
                    class="borderless"
                    :append-icon="data.tanggal_catat ? 'mdi-calendar' : 'mdi-calendar-blank'"
                    dense
                    :hide-details="!(!valid && data.tanggal_catat == undefined)"
                    outlined
                    min="1"
                    placeholder="Nama Komisi"
                    v-bind="attrs"
                    v-on="on"
                    v-model="data.tanggal_catat">
                  </v-text-field>
                </div>
              </div>
            </template>
            <v-date-picker
              v-model="data.tanggal_catat"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="modal = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(data.tanggal_catat)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <div class="pb-4">
            Keterangan
            <div class="d-flex rounded" style="">
              <v-text-field
                class="borderless"
                dense
                hide-details
                outlined
                min="1"
                placeholder="Nama Komisi"
                v-model="data.keterangan">
              </v-text-field>
            </div>
          </div>
          <div class="py-5"/>
          <v-btn
            color="primary"
            depressed
            block
            class="text-none"
            @click="submit()"
          >
            Submit Gaji
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  name:'detailPembayaran',
  data () {
    return{
      data: {},
      listRekening: [],
      modal: false,
      valid: true,
      rule: [
        v => !!v || 'Wajib diisi',
      ]
    }
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) {
        return
      }
      console.log(this.data);
      const config = {
        headers: {
          'accept': '*/*'
        }
      }
      Axios.post('/save', (this.data), config).then(r => {
        console.log(r);
      }).catch(e => {
        console.log(e);
      })
    }
  },
  created() {
    if (Object.keys(this.$store.state.data).length) {
      this.data = this.$store.state.data
      this.listRekening = this.$store.state.rekening
    } else {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>

.borderless >>> .v-input__slot  fieldset{
  border-style: solid; border-width: 1px; border-color: #C8D0DD
}
</style>