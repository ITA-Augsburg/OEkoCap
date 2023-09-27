<script setup>
    import Start_subheader from "../components/Start_subheader.vue"
    import Start from "../components/Start.vue"
    import Start_footer from "../components/Start_footer.vue"
</script>

<template>
    <Start_subheader />
    <Start
    :color_green=color_green
    @clearAppInput="clearAppInput()" />
    <Start_footer />
</template>

<script>
export default {
    props: [
        "app_input_prop", "waste_fine_checkbox_prop", "matrix_insertion_prop", "proc_moi_prop",
        "app_output_prop", "startedCorrectly",  "error_message_prop",
        "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
        "progressValue", "color_green"
    ],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs", "calculateButton", "setStartedCorrectly", "setErrorMessage"],
    data: () => ({
    }),
    mounted() {
        this.$emit("setStartedCorrectly", undefined)
    },
    methods: {
        clearAppInput() {
            // console.log("StartView.vue clearAppInput emitted")
            this.$emit("clearAppInput", undefined)
        }
    }
};
</script>