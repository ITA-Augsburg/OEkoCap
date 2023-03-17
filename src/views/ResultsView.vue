<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Results from "../components/Results.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_results"></Input_subheader>
    <Results></Results>
    <Input_footer
    :id=id
    :progressValue=progressValue
    :color_green=color_green
    :color_lightgrey=color_lightgrey
    @updateInputFooter="updateInputFooter()"></Input_footer>
</template>

<script>
export default {
    props: ["waste_type_prop", "waste_size_prop", "waste_fvc_prop", "waste_coarse_prop", "waste_fine_prop", "waste_transport_cost_prop", "waste_transport_gwp_prop",
    "sep_type_prop", "sep_cost_prop", "sep_gwp_prop",
    "matrix_thermo_type_prop", "matrix_polymer_prop", "matrix_fvc_prop", "matrix_insertion_prop", "matrix_cost_prop", "matrix_gwp_prop",

    "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "subheader_results", "color_green", "color_lightgrey"],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs"],
    data: () => ({
        id: "results",
    }),
    methods: {
        updateInputFooter() {
            this.$emit("updateInputFooter", undefined)
        }
    }
};
</script>