<template>
  <v-card class="mb-5 rounded-0 elevation-1">
    <v-card-title
      :class="`black--text py-3 text-capitalize font-weight-bold ${centeredTitle && 'justify-center'}`"
    >
      <span style="font-size: 16px;">
        <slot name="header" />
      </span>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <slot name="body"/>
    </v-card-text>
    <v-card-text style="border-top: dashed; border-width: 1px; border-color: #ededed;">
      <slot name="footer" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    centeredTitle: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>