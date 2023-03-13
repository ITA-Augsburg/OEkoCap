<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Waiting from "../components/Waiting.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_empty"></Input_subheader>
    <Waiting></Waiting>
    <Input_footer
    :id=id
    :progressValue=progressValue
    :color_green=color_green
    :color_lightgrey=color_lightgrey
    @updateInputFooter="updateInputFooter()"></Input_footer>
</template>

<script>
export default {
    props: ["progressValue", "subheader_empty", "color_green", "color_lightgrey"],
    emits: ["clearAppInput", "updateInputFooter"],
    data: () => ({
        id: "waiting",
    }),
    methods: {
        updateInputFooter() {
            this.$emit("updateInputFooter", undefined)
        }
    }
};
</script>