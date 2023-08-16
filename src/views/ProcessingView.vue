<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Input_processing from "../components/Input_processing.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_processing"></Input_subheader>
    <Input_processing
    :app_input_prop=app_input_prop
    :proc_moi_prop=proc_moi_prop
    :matrix_insertion_prop=matrix_insertion_prop
    :color_green=color_green
    :color_lightgrey=color_lightgrey
    :color_darkgreen=color_darkgreen
    :buttonCalculateEnabled=buttonCalculateEnabled
    @saveNewInputs="saveNewInputs($event)"
    @calculateButton="calculateButton()"></Input_processing>
    <Input_footer
    :id=id
    :progressValue=progressValue
    :color_green=color_green
    :color_lightgrey=color_lightgrey
    :button2enabled=button2enabled
    :button3enabled=button3enabled
    :button4enabled=button4enabled
    :button5enabled=button5enabled
    @updateInputFooter="updateInputFooter()"></Input_footer>
</template>

<script>
export default {
    props: [
    "app_input_prop", "matrix_insertion_prop", "proc_moi_prop",
    "app_output_prop", "startedCorrectly", "error_message_prop",
    "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "subheader_processing", "color_green", "color_lightgrey", "color_darkgreen"
    ],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs", "calculateButton", "startedCorrectlyF", "setErrorMessage"],
    mounted() {
        //if user enters app on *url*/processing then redirect to *url*/, otherwise app_input could have missing mandatory values
        if(!this.startedCorrectly) {
            this.$router.push({name: "StartView"})
        }
    },
    data: () => ({
        id: "processing",
    }),
    methods: {
        updateInputFooter() {
            this.$emit("updateInputFooter", undefined)
        },
        saveNewInputs(new_values) {
            this.$emit("saveNewInputs", new_values)
        },
        calculateButton() {
            this.$emit("calculateButton", undefined)
        }
    }
};
</script>