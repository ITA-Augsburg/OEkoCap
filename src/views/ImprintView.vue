<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Imprint from "../components/Imprint.vue"
    import Data_protection from "../components/Data_protection.vue"
    import Sponsor_footer from "../components/Sponsor_footer.vue"
</script>
<template>
    <!-- Subheader on the imprint-page -->
    <Input_subheader
    :text_2='"Imprint"'
    :text_3='"⠀"'
    :tooltip_enabled=false
    :tooltip_text="''" />

    <!-- Main area on the imprint-page -->
    <div class="info_area">
        <Imprint />
        <Data_protection />
    </div>

    <!-- Footer on the imprint-page -->
    <Sponsor_footer />

</template>
<script>
/**
 * Page for displaying legal information.
 */
    export default {
        props: ["app_input_prop", "waste_fine_checkbox_prop", "matrix_insertion_prop", "proc_moi_prop",
            "app_output_prop", "startedCorrectly", "error_message_prop",
            "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
            "progressValue", "color_main", "color_lightgrey"],
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
    }
</script>