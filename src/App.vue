<script setup>
  import MyAppHeader from "./components/MyAppHeader.vue"
  import MyAppHeader2 from "./components/MyAppHeader2.vue"
  import MyAppFooter from "./components/MyAppFooter.vue"
import MyAppInput1Waste from "./components/MyAppInput1Waste.vue";
</script>

<template>
  <VApp>
    <MyAppHeader></MyAppHeader>
    <MyAppHeader2></MyAppHeader2>
    <VMain>
      <MyAppInput1Waste></MyAppInput1Waste>
    </VMain>
    <MyAppFooter></MyAppFooter>
  </VApp>
  
</template>

