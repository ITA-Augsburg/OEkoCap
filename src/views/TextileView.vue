<script setup>
    import Input_subheader from "../components/Input_subheader.vue"
    import Input_textile from "../components/Input_textile.vue"
    import Input_footer from "../components/Input_footer.vue"
</script>

<template>
    <Input_subheader
    :text_3="subheader_textile"></Input_subheader>
    <Input_textile
    :color_green=color_green
    :color_white=color_white
    
    :textile_type_prop=textile_type_prop
    :textile_ml_prop=textile_ml_prop
    :textile_tp_prop=textile_tp_prop
    :textile_aw_prop=textile_aw_prop
    :textile_cost_prop=textile_cost_prop
    :textile_gwp_prop=textile_gwp_prop
    @saveNewInputs="saveNewInputs($event)"></Input_textile>
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
    "sep_type_prop", "sep_cost_prop", "sep_gwp_prop",
    "matrix_thermo_type_prop", "matrix_polymer_prop", "matrix_fvc_prop", "matrix_insertion_prop", "matrix_cost_prop", "matrix_gwp_prop",
    "textile_type_prop", "textile_ml_prop", "textile_tp_prop", "textile_aw_prop", "textile_cost_prop", "textile_gwp_prop",
    "proc_1_type_prop", "proc_1_ml_prop", "proc_1_wt_prop", "proc_1_cost_prop", "proc_1_gwp_prop", "proc_2_type_prop",

    "buttonCalculateEnabled", "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "subheader_textile", "color_green", "color_white", "color_lightgrey"],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs"],
    mounted() {
        //if user enters app on *url*/textile then redirect to *url*/, otherwise app_input could have missing mandatory values
        if(this.waste_type_prop === undefined) {
            this.$router.push({name: "StartView"})
        }
    },
    data: () => ({
        id: "textile",
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