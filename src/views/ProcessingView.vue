<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Input_processing from "../components/Input_processing.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_processing"></Input_subheader>
    <Input_processing
    :color_green="color_green"
    :color_white="color_white"
    :color_lightgrey="color_lightgrey"></Input_processing>
    <Input_footer
    v-bind:id=id
    v-bind:color_green="color_green"
    v-bind:color_lightgrey="color_lightgrey"></Input_footer>
</template>

<script>
export default {
    props: ["subheader_processing", "color_green", "color_white", "color_lightgrey"],
    emits: ["clearAppInput"],
    data: () => ({
        id: "processing"
    }),
};
</script>