<template>
  <div class="header">
    <router-link
    :to='{name: "StartView"}'
    class="header_logo">
      <v-img
      v-bind:src='require("../assets/logo_oekocap_weiss.png")'
      alt="oekoCap_logo"
      ></v-img>
    </router-link>
    <p class="header_textcontainer">
      <router-link
      :to='{name: "StartView"}'
      class="header_text">
        <p>Calculator</p>
      </router-link>
      <router-link
      :to='{name: "StartView"}'
      class="header_text">
        <p>Guideline</p>
      </router-link>
      <router-link
      :to='{name: "StartView"}'
      class="header_text">
        <p>Project</p>
      </router-link>
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
