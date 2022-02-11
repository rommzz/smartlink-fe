<template>
  <div class="d-flex rounded" style="border-style: solid; border-width: 1px; border-color: #C8D0DD">
    <div class="pa-2 align-self-center" style="background: #F6F6F6">
      Rp
    </div>
    <div class="flex-fill text-center text-subtitle-1" style="border-left: solid 1px; border-color: #C8D0DD"> 
      <v-text-field
        class="nominal"
        dense
        hide-details
        outlined
        :type="type"
        placeholder="contoh: 800000"
        :value="value"
        v-model="inputVal">
      </v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nominalInput',
  props: {
    value: {
			default: null
		},
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
  }
}
</script>

<style scoped>
.nominal >>> .v-input__slot  fieldset{
  border-style: hidden !important;
}
.nominal >>> .v-text_field {
  width: 140px !important;
}
</style>