<template>
  <base-modal ref="modal" header="ubah kehadiran">
    <div>
      Durasi keterlambatan
      <div class="d-flex rounded" style="border-style: solid; border-width: 1px; border-color: #C8D0DD">
        <div class="pa-2">
          <v-icon color="primary" @click="hari++">
            mdi-plus
          </v-icon>
        </div>
        <div class="flex-fill py-2 text-center text-subtitle-1" style="border-left: solid 1px;border-right: solid 1px;border-color: #C8D0DD"> 
          {{hari}} hari
        </div>
        <div class="pa-2">
          <v-icon color="primary" @click="hari>0 && hari--">
            mdi-minus
          </v-icon>
        </div>
      </div>
      <v-row class="mt-3">
        <v-col class="pr-0">
          <v-btn class="col-6 text-none" block outlined color="error">
            hapus
          </v-btn>
        </v-col>
        <div class="pl-1" />
        <v-col class="pl-0">
          <v-btn class="col-6 text-none" block depressed color="primary">
            simpan
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </base-modal>
</template>

<script>
import baseModal from './baseModal.vue'

export default {
  name: 'modalKehadiran',
  components: { baseModal },
  data () {
    return{
      hari: 0
    }
  },
  methods: {
    show() {
      this.$refs.modal.show()
    }
  }
}
</script>

<style>

</style>