<script setup>
  import Tooltip from "../components/Tooltip.vue"
</script>

<template>

<div class="subheader">
    <p class="subheader_text_1">ÖkoCaP</p>
    <p class="subheader_text_2">{{ text_2 }}</p>
    <div class="subheader_text_3_container">
      <p class="subheader_text_3">{{ text_3 }}</p>
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
 */
export default {
  props: ["text_2", "text_3", "tooltip_enabled", "tooltip_text"],
  data() {
    return {
    }
  }
}
</script>