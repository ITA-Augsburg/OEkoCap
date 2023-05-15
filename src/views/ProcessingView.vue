<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Input_processing from "../components/Input_processing.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_processing"></Input_subheader>
    <Input_processing
    :color_green=color_green
    :color_lightgrey=color_lightgrey
    :color_darkgreen=color_darkgreen
    :buttonCalculateEnabled=buttonCalculateEnabled
    
    :proc_1_type_prop=proc_1_type_prop
    :proc_1_ml_prop=proc_1_ml_prop
    :proc_1_wt_prop=proc_1_wt_prop
    :proc_1_cost_prop=proc_1_cost_prop
    :proc_1_gwp_prop=proc_1_gwp_prop
    :proc_2_type_prop=proc_2_type_prop
    :proc_2_ml_prop=proc_2_ml_prop
    :proc_2_wt_prop=proc_2_wt_prop
    :proc_2_cost_prop=proc_2_cost_prop
    :proc_2_gwp_prop=proc_2_gwp_prop
    :proc_moi_prop=proc_moi_prop
    :matrix_thermo_type_prop=matrix_thermo_type_prop
    :matrix_insertion_prop=matrix_insertion_prop
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
    props: ["waste_type_prop", "waste_size_prop", "waste_fmc_prop", "waste_coarse_prop", "waste_coarse_cost_prop", "waste_coarse_gwp_prop", "waste_fine_prop", "waste_fine_cost_prop", "waste_fine_gwp_prop", "waste_transport_cost_prop", "waste_transport_gwp_prop",
    "sep_type_prop", "sep_cost_prop", "sep_gwp_prop",
    "matrix_thermo_type_prop", "matrix_polymer_prop", "matrix_fmc_prop", "matrix_insertion_prop", "matrix_cost_prop", "matrix_gwp_prop",
    "textile_type_prop", "textile_ml_prop", "textile_tp_prop", "textile_aw_prop", "textile_cost_prop", "textile_gwp_prop",
    "proc_1_type_prop", "proc_1_ml_prop", "proc_1_wt_prop", "proc_1_cost_prop", "proc_1_gwp_prop", "proc_2_type_prop", "proc_2_ml_prop", "proc_2_wt_prop", "proc_2_cost_prop", "proc_2_gwp_prop", "proc_moi_prop",

    "app_output_prop",
    "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "subheader_processing", "color_green", "color_lightgrey", "color_darkgreen"],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs", "calculateButton"],
    mounted() {
        //if user enters app on *url*/processing then redirect to *url*/, otherwise app_input could have missing mandatory values
        if(this.waste_type_prop === undefined) {
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