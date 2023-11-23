<template>
  <!-- Subheader of the start-page -->
  <div class="subheader">
    <!-- Oekocap logo -->
    <v-img 
    class="subheader_logo"
    v-bind:src='require("../assets/logo_oekocap_schwarz.png")'
    alt="oekoCap_logo"
    resize="false" />

    <div class="text start_text">
      MULTI-CRITERIA CALCULATION TOOL FOR CARBON FIBER RECYCLING
    </div>

  </div>

    
</template>

<script>
/**
 * Header with big logo.
 */
  export default {
    data() {
      return {
      }
    }
  }
</script>