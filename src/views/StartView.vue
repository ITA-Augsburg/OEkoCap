<script setup>
    import Start_subheader from "../components/Start_subheader.vue"
    import Start from "../components/Start.vue"
    import Sponsor_footer from "../components/Sponsor_footer.vue"
</script>

<template>
    <Start_subheader />
    <Start
    :color_green=color_green
    @clearAppInput="clearAppInput()" />
    <Sponsor_footer />
</template>

<script>
/**
 * Holds components that together represent the starting-page of the app.
 */
export default {
    props: [
        "app_input_prop", "waste_fine_checkbox_prop", "matrix_insertion_prop", "proc_moi_prop",
        "app_output_prop", "startedCorrectly",  "error_message_prop",
        "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
        "progressValue", "color_green"
    ],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs", "calculateButton", "setStartedCorrectly", "setErrorMessage", "resetProcessingMasslosses"],
    data: () => ({
    }),
    mounted() {
        /**
         * To prevent user from entering on an input-page via url, the variable startedCorrectly is checked.
         * When false, user is redirected to StartView. When true, user can continue to the input-page.
         * When StartView is loaded, startedCorrectly is set to true.
         */
        this.$emit("setStartedCorrectly", undefined)
    },
    methods: {
        clearAppInput() {
            /**
             * transmits the emit from child-component to App.vue.
             */
            this.$emit("clearAppInput", undefined)
        }
    }
};
</script>