<template>
  <v-app>
    <v-main class="bg">
      <v-sheet max-width="820" class="mx-auto white">
        <router-view/>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
  created() {
  }
};
</script>
<style>
.title-card{
  font-size: 16px;
  color: black;
  text-transform: capitalize;
}
</style>