<script setup>
import router from "../router"
</script>

<template>
  <!-- App-header component with App-logo and some hyperlinks. On small screens there is a hamburger(button). -->
  <div class="header">
    <v-img
    v-if="wideWindow"
    :src='require("../assets/logo_oekocap_weiss.png")'
    alt="oekoCap_logo"
    :class="'oekocap_header_logo'"
    @click="()=>{router.push({name: 'StartView'})}" />
    
    <p class="header_textcontainer">
      <span class="header_text" @click="()=>{router.push({name: 'StartView'})}">CALCULATOR</span>
      <span class="header_text" @click="()=>{router.push({name: 'GuidelinesView'})}">GUIDELINES</span>
      <span class="header_text" @click="()=>{router.push({name: 'ProjectView'})}">PROJEKT</span>
      <span class="header_text" @click="()=>{router.push({name: 'ImprintView'})}">IMPRINT</span>
    </p>

    <v-img
    :src='require("../assets/cu_logo.png")'
    alt="composites_united_logo"
    :class="'cu_header_logo'"
    @click="redirectToCU()" />
    
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

  <!-- This drawer can be toggled by clicking the hamburger-button. -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="bottom"
    width="325"
  >
    <v-list-item>
      <div class="header_text" @click="()=>{router.push({name: 'StartView'})}">Calculator</div>
    </v-list-item>
    <v-divider thickness="2" class="border-opacity-100" />
    <v-list-item>
      <p class="header_text" @click="()=>{router.push({name: 'GuidelinesView'})}">Guidelines</p>
    </v-list-item>
    <v-divider thickness="2" class="border-opacity-100" />
    <v-list-item>
      <p class="header_text" @click="()=>{router.push({name: 'ProjectView'})}">Project</p>
    </v-list-item>
    <v-divider thickness="2" class="border-opacity-100" />
    <v-list-item>
      <p class="header_text" @click="()=>{router.push({name: 'ImprintView'})}">Imprint</p>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
/**
 * This is the app-header-component, it is present at the top of the page all the time. It contains elements for navigating to important pages.
 */
export default {
  props: [],
  mounted() {
    /** 
     * Hamburger-button and -drawer should only be visible if the browser-viewport-width is less then 500px wide. If drawer open and window gets resized to width >= 500px then close the drawer.
     */
    window.addEventListener("resize", () => {
              if(this.wideWindow === false && window.innerWidth > 780) {
                this.drawer = false
                this.wideWindow = true
              } else if(this.wideWindow === true && window.innerWidth <= 780) {
                this.wideWindow = false
              }
            })
  },
  data() {
    return {
      wideWindow: window.innerWidth > 780 ? true : false,
      headerTextRight: ["Calculator", "Guidelines", "Project"],
      drawer: false
    }
  },
  methods: {
    redirectToCU() {
      window.open("https://composites-united.com/", "_blanc")
    }
  }
}
</script>
