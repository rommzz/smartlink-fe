<template>
  <v-dialog content-class="rounded-b-0 mx-0" max-width="400" v-model="dialog">
    <v-card class="rounded-b-0">
      <v-card-text class="text-right py-3 px-2" style="position: relative">
        <div class="font-weight-bold black--text text-capitalize text-center" style="font-size: 16px;position: absolute;left: 50%;transform: translateX(-50%);width: 100%;letter-spacing: -0.02em;">
          {{ header }}
        </div>
        <v-icon color="primary" @click="dialog= false">
          mdi-close
        </v-icon>
      </v-card-text>
      <v-divider />
      <v-card-text class="pt-4">
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'baseDialog',
  props: {
    header: {
      type: String,
      default: 'Base modal'
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    show () {
      this.dialog = true
    },
    close() {
      this.dialog = false
    }
  }
}
</script>

<style>

</style>