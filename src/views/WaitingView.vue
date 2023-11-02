<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Waiting from "../components/Waiting.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_2='"CALCULATOR"'
    :text_3='"⠀"'
    :tooltip_enabled=false
    :tooltip_text="''" />
    <Waiting></Waiting>
    <Input_footer
    :id=id
    :progressValue=progressValue
    :color_green=color_green
    :color_lightgrey=color_lightgrey
    @updateInputFooter="updateInputFooter()" />
</template>

<script>
/**
 * Holds components that together represent the loading-screen.
 */
export default {
    props: [
    "app_input_prop", "waste_fine_checkbox_prop", "matrix_insertion_prop", "proc_moi_prop",
    "app_output_prop", "startedCorrectly", "error_message_prop",
    "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "color_green", "color_lightgrey"
    ],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs", "calculateButton", "setStartedCorrectly", "setErrorMessage", "resetProcessingMasslosses"],
    mounted() {
        /**
         * If user enters app via url (oekocap.com/matrix for example) then user gets redirected to the start.
         * User must start on the first input-page because later input-pages are dependent on earlier inputs.
         */
        if(!this.startedCorrectly) {
            this.$router.push({name: "StartView"})
            return
        }
    },
    data: () => ({
        id: "waiting",
    }),
    methods: {
        updateInputFooter() {
            /**
             * Updates the progress-bar in the input-footer.
             */
            this.$emit("updateInputFooter", undefined)
        }
    }
}
</script>