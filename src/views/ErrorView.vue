<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Error from "../components/Error.vue"
    import Button_footer from "../components/Footer_with_button.vue"
</script>

<template>
    <Input_subheader
    :text_2='"CALCULATOR"'
    :text_3='"ERROR"'
    :tooltip_enabled=false
    :tooltip_text="''" />
    <Error
    :error_message_prop=error_message_prop />
    <Button_footer />
</template>

<script>
/**
 * User gets redirected here when something goes wrong, like the created input is invalid in the recycling.exe or the server is not responding.
 * Error message can be passed as a prop.
 */
export default {
    props: [
    "app_input_prop", "waste_fine_checkbox_prop", "matrix_insertion_prop", "proc_moi_prop",
    "app_output_prop", "startedCorrectly", "error_message_prop",
    "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "color_main", "color_lightgrey"
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
        id: "err",
    }),
    methods: {
        updateInputFooter() {
            /**
             * Updates the progress-bar in the input-footer.
             */
            this.$emit("updateInputFooter", undefined)
        }
    }
};
</script>