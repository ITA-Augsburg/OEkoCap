<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Input_waste from "../components/Input_waste.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3=subheader_waste
    :tooltip_enabled=true />
    <Input_waste
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
        "app_input_prop", "matrix_insertion_prop", "proc_moi_prop", "app_output_prop", "startedCorrectly", "error_message_prop",
        "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
        "progressValue", "subheader_waste", "color_green", "color_lightgrey"
    ],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs", "calculateButton", "startedCorrectlyF", "setErrorMessage"],
    data: () => ({
        id: "waste",
    }),
    mounted() {
        //if user enters app on *url*/textile then redirect to *url*/, otherwise app_input could have missing mandatory values
        if(!this.startedCorrectly) {
            this.$router.push({name: "StartView"})
        }
    },
    methods: {
        updateInputFooter() {
            this.$emit("updateInputFooter", undefined)
        },
        saveNewInputs(new_values) {
            // console.log("hi from wasteView")
            // console.log(new_values)
            this.$emit("saveNewInputs", new_values)
        },
    }
};
</script>