<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Error from "../components/Error.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_error"></Input_subheader>
    <Error></Error>
    <Input_footer
    v-bind:id=id
    v-bind:color_green="color_green"
    v-bind:color_lightgrey="color_lightgrey"></Input_footer>
</template>

<script>
export default {
    props: ["subheader_error", "color_green", "color_lightgrey"],
    emits: ["clearAppInput"],
    data: () => ({
        id: "err"
    }),
};
</script>