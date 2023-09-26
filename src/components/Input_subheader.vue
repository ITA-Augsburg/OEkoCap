<script setup>
  import Tooltip from "../components/Tooltip.vue"
  import Tooltip_texts from "../tooltip_texts.json"
</script>

<template>

<div class="subheader">
    <p class="subheader_text_1">ÖkoCaP</p>
    <p class="subheader_text_2">{{ text_2 }}</p>
    <div class="subheader_text_3_container">
      <p class="subheader_text_3">{{ text_3 }}</p>
      <Tooltip
      v-if="tooltip_enabled === true"
      :tooltip_class='"tooltip subheader_tooltip"'
      :tooltip_text=Tooltip_texts.test />
    </div>

</div>

</template>
<script>
export default {
  props: ["text_2", "text_3", "tooltip_enabled"],
  data() {
    return {
    }
  }
}
</script>