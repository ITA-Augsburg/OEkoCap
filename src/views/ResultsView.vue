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
    :id=id
    :progressValue=progressValue
    :color_green="color_green"
    :color_lightgrey="color_lightgrey"
    @updateInputFooter="updateInputFooter()"></Input_footer>
</template>

<script>
export default {
    props: ["progressValue", "subheader_results", "color_green", "color_lightgrey"],
    emits: ["clearAppInput", "updateInputFooter"],
    data: () => ({
        id: "results",
    }),
    methods: {
        updateInputFooter() {
            this.$emit("updateInputFooter", undefined)
        }
    }
};
</script>