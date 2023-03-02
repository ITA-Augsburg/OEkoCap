<template>
  <div class="header">
    <v-img 
    class="header_logo"
    v-bind:src='require("../assets/logo_oekocap_weiss.png")'
    alt="oekoCap_logo"
    ></v-img>
    <p class="header_textcontainer">
      <a class="header_text">Calculator</a>
      <a class="header_text">Guideline</a>
      <a class="header_text">Project</a>
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
