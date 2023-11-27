<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Results from "../components/Results.vue"
    import Results_footer from "../components/Results_footer.vue"
    import Tooltip_texts from "../tooltip_texts.json"
</script>

<template>

    <!-- Subheader on the results-page -->
    <Input_subheader
    :text_2='"CALCULATOR"'
    :text_3='"RESULTS"'
    :tooltip_enabled=true
    :tooltip_text=Tooltip_texts.results_subheader_tooltip />

    <!-- Main area on the results-page -->
    <Results
    :app_output_prop=app_output_prop
    :startedCorrectly=startedCorrectly
    :color_main=color_main
    :color_lightgrey=color_lightgrey
    @chartsAsImages=chartsAsImages($event) />

    <!-- Footer on the results-page -->
    <Results_footer
    :color_lightgrey=color_lightgrey
    :app_input_prop=app_input_prop
    :data_urls_prop=images />
</template>

<script>
/**
 * Holds components that together represent the results-page. Output from the server is visualised here.
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
        id: "results",
        images: undefined
    }),
    methods: {
        updateInputFooter() {
            /**
             * Updates the progress-bar in the input-footer.
             */
            this.$emit("updateInputFooter", undefined)
        },
        chartsAsImages(images) {
            /**
             * Image data-urls are emitted from Results-component, these are saved here and passed to Results-footer-component for pdf-creation.
             */
            this.images = images
        }
    }
}
</script>