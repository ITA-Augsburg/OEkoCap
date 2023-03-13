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
    :id=id
    :progressValue=progressValue
    :color_green="color_green"
    :color_lightgrey="color_lightgrey"
    @updateInputFooter="updateInputFooter()"></Input_footer>
</template>

<script>
export default {
    props: ["progressValue", "subheader_error", "color_green", "color_lightgrey"],
    emits: ["clearAppInput", "updateInputFooter"],
    data: () => ({
        id: "err",
    }),
    methods: {
        updateInputFooter() {
            this.$emit("updateInputFooter", undefined)
        }
    }
};
</script>