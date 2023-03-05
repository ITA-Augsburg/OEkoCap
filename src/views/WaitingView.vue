<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Waiting from "../components/Waiting.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader :text_3="subheader_empty"></Input_subheader>
    <Waiting></Waiting>
    <Input_footer v-bind:color_green="color_green" v-bind:color_lightgrey="color_lightgrey"></Input_footer>
</template>

<script>
export default {
    props: ["subheader_empty", "color_green", "color_lightgrey"],
    data: () => ({
    }),
};
</script>