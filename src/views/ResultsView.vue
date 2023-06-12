<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Results from "../components/Results.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_results"></Input_subheader>
    <Results
    :app_output_prop=app_output_prop
    :color_green=color_green></Results>
    <Input_footer
    :id=id
    :progressValue=progressValue
    :color_green=color_green
    :color_lightgrey=color_lightgrey
    @updateInputFooter="updateInputFooter()"></Input_footer>
</template>

<script>
export default {
    props: ["waste_type_prop", "waste_size_prop", "waste_fmc_prop",
    
    "shred_1_type_prop", "shred_1_ml_prop", "shred_1_gwp_prop", "shred_1_cost_prop", "shred_2_type_prop", "shred_2_ml_prop", "shred_2_gwp_prop", "shred_2_cost_prop",
    
    "waste_transport_cost_prop", "waste_transport_gwp_prop",
    "sep_type_prop", "sep_cost_prop", "sep_gwp_prop",
    "matrix_thermo_type_prop", "matrix_polymer_prop", "matrix_fmc_prop", "matrix_insertion_prop", "matrix_cost_prop", "matrix_gwp_prop",
    "textile_type_prop", "textile_ml_prop", "textile_tp_prop", "textile_aw_prop", "textile_cost_prop", "textile_gwp_prop",
    "proc_1_type_prop", "proc_1_ml_prop", "proc_1_wt_prop", "proc_1_cost_prop", "proc_1_gwp_prop", "proc_2_type_prop", "proc_2_ml_prop", "proc_2_wt_prop", "proc_2_cost_prop", "proc_2_gwp_prop", "proc_moi_prop",

    "app_output_prop", "startedCorrectly",
    "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "subheader_results", "color_green", "color_lightgrey"],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs", "calculateButton", "startedCorrectlyF"],
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