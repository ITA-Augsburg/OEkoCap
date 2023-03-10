<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Input_separation from "../components/Input_separation.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_separation"></Input_subheader>
    <Input_separation
    :color_green="color_green"
    :color_white="color_white"></Input_separation>
    <Input_footer
    v-bind:id="separation"
    v-bind:color_green="color_green"
    v-bind:color_lightgrey="color_lightgrey"></Input_footer>
</template>

<script>
export default {
    props: ["subheader_separation", "color_green", "color_white", "color_lightgrey"],
    emits: ["clearAppInput"],
    data: () => ({
    }),
};
</script>