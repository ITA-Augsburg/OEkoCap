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
    :id=id
    :progressValue=progressValue
    :color_green=color_green
    :color_lightgrey=color_lightgrey
    :button2enabled=button2enabled
    :button3enabled=button3enabled
    :button4enabled=button4enabled
    :button5enabled=button5enabled
    @updateInputFooter="updateInputFooter()"></Input_footer>
</template>

<script>
export default {
    props: ["button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "subheader_processing", "color_green", "color_white", "color_lightgrey"],
    emits: ["clearAppInput", "updateInputFooter"],
    data: () => ({
        id: "processing",
    }),
    methods: {
        updateInputFooter() {
            this.$emit("updateInputFooter", undefined)
        }
    }
};
</script>