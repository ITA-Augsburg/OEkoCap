<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Input_matrix from "../components/Input_matrix.vue"
    import Input_footer from "../components/Input_footer.vue"
    import Tooltip_texts from "../tooltip_texts.json"
</script>

<template>
    <!-- Subheader on the matrix-page -->
    <Input_subheader
    :text_2='"Step 2: Part production"'
    :text_3='"MATRIX"'
    :tooltip_enabled=true
    :tooltip_text=Tooltip_texts.matrix_subheader_tooltip />

    <!-- Main area on the matrix-page -->
    <Input_matrix
    :color_main=color_main
    :matrix_insertion_prop=matrix_insertion_prop
    :app_input_prop=app_input_prop
    @saveNewInputs="saveNewInputs($event)"
    @resetProcessingMasslosses="resetProcessingMasslosses()" />

    <!-- Footer on the matrix-page -->
    <Input_footer
    :id=id
    :progressValue=progressValue
    :color_main=color_main
    :color_lightgrey=color_lightgrey
    :button2enabled=button2enabled
    :button3enabled=button3enabled
    :button4enabled=button4enabled
    :button5enabled=button5enabled
    @updateInputFooter="updateInputFooter()" />
</template>

<script>
/**
 * Holds components that together represent the input-page that corresponds to App.vue->app_input.polymer.
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
        id: "matrix",
    }),
    methods: {
        updateInputFooter() {
            /**
             * Updates the progress-bar in the input-footer.
             */
            this.$emit("updateInputFooter", undefined)
        },
        saveNewInputs(new_values) {
            /**
             * transmits the emit from child-component to App.vue->app_input.
             */
            this.$emit("saveNewInputs", new_values)
        },
        resetProcessingMasslosses() {
            this.$emit("resetProcessingMasslosses", undefined)
        }
    }
}
</script>