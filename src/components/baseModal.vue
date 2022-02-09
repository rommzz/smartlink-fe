<template>
  <v-dialog content-class="rounded-b-0" max-width="" v-model="dialog">
    <v-card class="rounded-b-0">
      <v-card-text class="text-right py-3" style="position: relative">
        <div class="font-weight-bold black--text text-capitalize pt-1" style="font-size: 18px; position: absolute;left: 50%;transform: translatex(-50%);">
          {{ header }}
        </div>
        <v-icon color="primary" @click="dialog= false">
          mdi-close
        </v-icon>
      </v-card-text>
      <v-divider />
      <v-card-text>
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
    }
  }
}
</script>

<style>

</style>