<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Input_separation from "../components/Input_separation.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_2='"Step 1: Recycling"'
    :text_3='"SEPARATION"'
    :tooltip_enabled=true />
    <Input_separation
    :color_green=color_green
    :app_input_prop=app_input_prop
    @saveNewInputs="saveNewInputs($event)" />
    <Input_footer
    :id=id

    :progressValue=progressValue
    :color_green=color_green
    :color_lightgrey=color_lightgrey

    :button2enabled=button2enabled
    :button3enabled=button3enabled
    :button4enabled=button4enabled
    :button5enabled=button5enabled
    @updateInputFooter="updateInputFooter()" />
</template>

<script>
export default {
    props: [
    "app_input_prop", "waste_fine_checkbox_prop", "matrix_insertion_prop", "proc_moi_prop",
    "app_output_prop", "startedCorrectly",  "error_message_prop",
    "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "color_green", "color_lightgrey"
    ],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs", "calculateButton", "setStartedCorrectly", "setErrorMessage"],
    mounted() {
        //if user enters app on *url*/separation then redirect to *url*/, otherwise app_input could have missing mandatory values
        if(!this.startedCorrectly) {
            this.$router.push({name: "StartView"})
        }
    },
    data: () => ({
        id: "separation",
    }),
    methods: {
        updateInputFooter() {
            this.$emit("updateInputFooter", undefined)
        },
        saveNewInputs(new_values) {
            this.$emit("saveNewInputs", new_values)
        }
    }
};
</script>