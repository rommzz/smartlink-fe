<template>
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
            {{ (pengerjaan_upah(item.id).nominal * item.nominal) | formatNumber }}
          </span>
          <v-icon class="ml-1" color="grey lighten-2">
            mdi-cancel
          </v-icon>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="d-flex justify-space-between">
        <span class="title-card" style="font-weight: 600">
          subtotal Upah
        </span>
        <span class="title-card" style="font-weight: 600">
          {{ subtotalUpah | formatRupiah}}
        </span>
      </div>
    </template>
  </base-card>
</template>

<script>
import BaseCard from "../BaseCard.vue"
export default {
  name: 'boronganData',
  components: { BaseCard, },
  props: {
    propsData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.data = this.propsData
  },
  methods: {
    pengerjaan_upah (id) {
      return this.data.pengerjaan_upah.find(x => x.pengaturan_upah_id === id);
    },
  },
  computed: {
    subtotalUpah() {
      return this.$store.state.inquiry.subtotalUpah
    }
  }
}
</script>

<style>

</style>