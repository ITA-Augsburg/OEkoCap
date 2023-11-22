<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Sponsor_footer from "../components/Sponsor_footer.vue"
</script>

<template>
    <Input_subheader
    :text_2='"Guidelines"'
    :text_3='"⠀"'
    :tooltip_enabled=false
    :tooltip_text="''" />

    <div class="info_area">
        <p style="font-size: 20px; text-align: center; padding-top: 50px; color: var(--color-grey)">Coming soon</p>
    </div>

    <Sponsor_footer />
</template>

<script>
/**
 * Placeholder page. To be added.
 */
    export default {
        props: [
            "app_input_prop", "waste_fine_checkbox_prop", "matrix_insertion_prop", "proc_moi_prop",
            "app_output_prop", "startedCorrectly", "error_message_prop",
            "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
            "progressValue", "color_main", "color_lightgrey"
        ],
        emits: ["clearAppInput", "updateInputFooter", "saveNewInputs", "calculateButton", "setStartedCorrectly", "setErrorMessage", "resetProcessingMasslosses"],
    }
</script>