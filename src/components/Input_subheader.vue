<script setup>
  import Tooltip from "../components/Tooltip.vue"
</script>

<template>

  <!-- container for defining width and height -->
  <div class="subheader">
    <p class="subheader_text_1">ÖkoCaP</p>
    <p class="subheader_text_2">{{ text_2 }}</p> <!-- style="font-weight: 900;"-->
    <div class="subheader_text_3_container">
      <p class="subheader_text_3">{{ text_3 }}</p>

      <!-- tooltip for displaying a message that is relevant to the whole page that this subheader is on. -->
      <Tooltip
      :tooltip_enabled=tooltip_enabled
      :tooltip_class='"tooltip subheader_tooltip"'
      :tooltip_text=tooltip_text />
    </div>

  </div>

</template>
<script>
/**
 * Displays information about the current input-page.
 * Props:
 * text_2 (string): infromation about the current step.
 * text_3 (string): information about the current input-group.
 * tooltip_enabled (boolean): wehter or not the tooltip should show.
 * tooltip_text: text to be displayed in the tooltip.
 */
export default {
  props: ["text_2", "text_3", "tooltip_enabled", "tooltip_text"],
  data() {
    return {
    }
  }
}
</script>