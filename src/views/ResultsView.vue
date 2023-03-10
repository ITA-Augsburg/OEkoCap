<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Results from "../components/Results.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_results"></Input_subheader>
    <Results></Results>
    <Input_footer
    v-bind:id="results"
    v-bind:color_green="color_green"
    v-bind:color_lightgrey="color_lightgrey"></Input_footer>
</template>

<script>
export default {
    props: ["subheader_results", "color_green", "color_lightgrey"],
    emits: ["clearAppInput"],
    data: () => ({
    }),
};
</script>