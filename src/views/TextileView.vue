<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Input_textile from "../components/Input_textile.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_textile"></Input_subheader>
    <Input_textile
    :color_green="color_green"
    :color_white="color_white"></Input_textile>
    <Input_footer
    v-bind:id="textile"
    v-bind:color_green="color_green"
    v-bind:color_lightgrey="color_lightgrey"></Input_footer>
</template>

<script>
export default {
    props: ["subheader_textile", "color_green", "color_white", "color_lightgrey"],
    emits: ["clearAppInput"],
    data: () => ({
    }),
};
</script>