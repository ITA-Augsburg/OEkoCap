<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Results from "../components/Results.vue"
    import Results_footer from "../components/Results_footer.vue"
</script>

<template>
    <Input_subheader
    :text_2='"CALCULATOR"'
    :text_3='"RESULTS"'
    :tooltip_enabled=false />
    <Results
    :app_output_prop=app_output_prop
    :color_green=color_green
    :color_lightgrey=color_lightgrey
    @setErrorMessage=setErrorMessage($event)
    @chartsAsImages=chartsAsImages($event) />
    <Results_footer
    :color_lightgrey=color_lightgrey
    :data_urls_prop=images />
</template>

<script>
export default {
    props: [
    "app_input_prop", "waste_fine_checkbox_prop", "matrix_insertion_prop", "proc_moi_prop",
    "app_output_prop", "startedCorrectly", "error_message_prop",
    "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "color_green", "color_lightgrey"
    ],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs", "calculateButton", "setStartedCorrectly", "setErrorMessage"],
    data: () => ({
        id: "results",
        images: undefined
    }),
    methods: {
        updateInputFooter() {
            this.$emit("updateInputFooter", undefined)
        },
        setErrorMessage(message) {
            this.$emit("setErrorMessage", message)
        },
        chartsAsImages(images) {
            this.images = images
        }
    }
};
</script>