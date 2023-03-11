<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Input_matrix from "../components/Input_matrix.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_matrix"></Input_subheader>
    <Input_matrix
    :color_green="color_green"
    :color_white="color_white"></Input_matrix>
    <Input_footer
    v-bind:id=id
    v-bind:color_green="color_green"
    v-bind:color_lightgrey="color_lightgrey"></Input_footer>
</template>

<script>
export default {
    props: ["subheader_matrix", "color_green", "color_white", "color_lightgrey"],
    emits: ["clearAppInput"],
    data: () => ({
        id: "matrix"
    }),
};
</script>