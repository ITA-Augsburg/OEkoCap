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
    <svg 
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    fill="#F2F2F2"
    id="hamburger"
    class="bi bi-list"
    viewBox="0 0 16 16"
    @click="()=>drawer=!drawer">
      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
    </svg>
  </div>

  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="bottom"
    width="325"
  >
    <v-list-item>
      <router-link
      :to='{name: "StartView"}'
      class="header_text">
        <p>Calculator</p>
      </router-link>
    </v-list-item>
    <v-divider thickness="2" class="border-opacity-100"></v-divider>
    <v-list-item>
      <router-link
      :to='{name: "StartView"}'
      class="header_text">
        <p>Guideline</p>
      </router-link>
    </v-list-item>
    <v-divider thickness="2" class="border-opacity-100"></v-divider>
    <v-list-item>
      <router-link
      :to='{name: "StartView"}'
      class="header_text">
        <p>Project</p>
      </router-link>
    </v-list-item>
    <v-divider thickness="2" class="border-opacity-100"></v-divider>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: [],
  mounted() {
    //if window-width passes through the value 500px, close drawer
    window.addEventListener("resize", () => {
              if(this.wideWindow === false && window.innerWidth >= 500) {
                this.drawer = false
                this.wideWindow = true
              } else if(this.wideWindow === true && window.innerWidth < 500) {
                this.wideWindow = false
              }
            })
  },
  data() {
    return {
      wideWindow: window.innerWidth >= 500 ? true : false,
      headerTextRight: ["Calculator", "Guideline", "Project"],
      drawer: false
    }
  }
}
</script>
