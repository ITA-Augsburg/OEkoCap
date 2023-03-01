<script setup>
  import Header_1 from "./components/Header_1.vue"
  import Header_2 from "./components/Header_2.vue"
  import Input_1 from "./components/Input_1.vue"
  import Footer_1 from "./components/Footer_1.vue"

</script>

<template>
  <VApp>
    <Header_1></Header_1>
    <Header_2></Header_2>
    <VMain>
      <Input_1 :color_green="color_green" :color_white="color_white"></Input_1>
    </VMain>
    <Footer_1 v-bind:color_green="color_green" v-bind:color_lightgrey="color_lightgrey"></Footer_1>
  </VApp>
  
</template>

<script>
export default {
  data: () => ({
    color_white: "#FFFFFF",
    color_lightgrey: "#F2F2F2",
    color_grey: "#4A4A4A",
    color_green: "#55CD89"
  }),
};
</script>