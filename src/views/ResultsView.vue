<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Results from "../components/Results.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_results"></Input_subheader>
    <Results
    :app_output_prop=app_output_prop
    :color_green=color_green
    :color_lightgrey=color_lightgrey
    @setErrorMessage="setErrorMessage($event)"></Results>
    <Input_footer
    :id=id
    :progressValue=progressValue
    :color_green=color_green
    :color_lightgrey=color_lightgrey
    @updateInputFooter="updateInputFooter()"></Input_footer>
</template>

<script>
export default {
    props: [
    "app_input_prop", "matrix_insertion_prop", "proc_moi_prop",
    "app_output_prop", "startedCorrectly", "error_message_prop",
    "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "subheader_results", "color_green", "color_lightgrey"
    ],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs", "calculateButton", "startedCorrectlyF", "setErrorMessage"],
    data: () => ({
        id: "results",
    }),
    methods: {
        updateInputFooter() {
            this.$emit("updateInputFooter", undefined)
        },
        setErrorMessage(message) {
            this.$emit("setErrorMessage", message)
        }
    }
};
</script>