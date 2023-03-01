<template>
  <div class="header_1">
    <v-img 
      width="130px"
      v-bind:src='require("../assets/oekocap_logo_weiss.png")'
      alt="oekoCap_logo"
      class="header_1_logo"
      resize=false></v-img>
    <p class="header_1_textcontainer">
      <a class="header_1_text">Calculator</a>
      <a class="header_1_text">Guideline</a>
      <a class="header_1_text">Project</a>
    </p>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      headerTextRight: ["Calculator", "Guideline", "Project"]
    }
  }
}
</script>
