<template>
  <div class="myappheader1">
    <v-img 
      width="130px"
      v-bind:src='require("../assets/oekocap_logo_weiss.png")'
      alt="oekoCap_logo"
      class="myappheader1logo"
      resize=false></v-img>
    <p class="myappheader1textcontainer">
      <a class="myappheader1calculator myappheader1text">Calculator</a>
      <a class="myappheader1guideline myappheader1text">Guideline</a>
      <a class="myappheader1project myappheader1text">Project</a>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerTextRight: ["Calculator", "Guideline", "Project"]
    }
  }
}
</script>
