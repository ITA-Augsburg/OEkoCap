<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Input_waste from "../components/Input_waste.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_waste"></Input_subheader>
    <Input_waste
    :color_green="color_green"
    :color_white="color_white"

    :waste_type_prop=waste_type_prop
    :waste_size_prop=waste_size_prop
    :waste_fvc_prop=waste_fvc_prop
    :waste_coarse_prop=waste_coarse_prop
    :waste_fine_prop=waste_fine_prop
    :waste_transport_cost_prop=waste_transport_cost_prop
    :waste_transport_gwp_prop=waste_transport_gwp_prop

    @saveNewInputs="saveNewInputs($event)"></Input_waste>
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
    props: ["waste_type_prop", "waste_size_prop", "waste_fvc_prop", "waste_coarse_prop", "waste_fine_prop", "waste_transport_cost_prop", "waste_transport_gwp_prop",
    "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "subheader_waste", "color_green", "color_white", "color_lightgrey"],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs"],
    data: () => ({
        id: "waste",
    }),
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