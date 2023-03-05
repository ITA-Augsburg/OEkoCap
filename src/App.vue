<script setup>
  // import Test from "./components/Test.vue"

  import Header from "./components/Header.vue"
  // import Start_subheader from "./components/Start_subheader.vue"
  import Input_subheader from "./components/Input_subheader.vue"

  // import Start from "./components/Start.vue"
  // import Input_waste from "./components/Input_waste.vue"
  // import Input_separation from "./components/Input_separation.vue"
  // import Input_matrix from "./components/Input_matrix.vue"
  // import Input_textile from "./components/Input_textile.vue"
  // import Input_processing from "./components/Input_processing.vue"
  // import Waiting from "./components/Waiting.vue"
  import Results from "./components/Results.vue"

  // import Start_footer from "./components/Start_footer.vue"
  import Input_footer from "./components/Input_footer.vue"
</script>

<template>
  <VApp>
    <Header></Header>
    <!-- <Start_subheader></Start_subheader> -->
    <Input_subheader :text_3="subheader_empty"></Input_subheader>
    <VMain>
      <!-- <Test></Test> -->
      <!-- <Start v-bind:color_green="color_green"></Start> -->
      <!-- <Input_waste :color_green="color_green" :color_white="color_white"></Input_waste> -->
      <!-- <Input_separation :color_green="color_green" :color_white="color_white"></Input_separation> -->
      <!-- <Input_matrix :color_green="color_green" :color_white="color_white"></Input_matrix> -->
      <!-- <Input_textile :color_green="color_green" :color_white="color_white"></Input_textile> -->
      <!-- <Input_processing :color_green="color_green" :color_white="color_white" :color_lightgrey="color_lightgrey"></Input_processing> -->
      <!-- <Waiting></Waiting> -->
      <Results></Results>
    </VMain>
    <!-- <Start_footer></Start_footer> -->
    <Input_footer v-bind:color_green="color_green" v-bind:color_lightgrey="color_lightgrey"></Input_footer>
  </VApp>
</template>

<script>
export default {
  data: () => ({
    color_white: "#FFFFFF",
    color_lightgrey: "#F2F2F2",
    color_grey: "#4A4A4A",
    color_green: "#55CD89",

    subheader_waste: "WASTE",
    subheader_separation: "SEPARATION",
    subheader_matrix: "MATRIX",
    subheader_textile: "TEXTILE",
    subheader_processing: "PROCESSING",
    subheader_empty: "⠀"
  }),
};
</script>