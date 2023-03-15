<script setup>
    import Start_subheader from "../components/Start_subheader.vue"
    import Start from "../components/Start.vue"
    import Start_footer from "../components/Start_footer.vue"
</script>

<template>
    <Start_subheader></Start_subheader>
    <Start
    :color_green="color_green"
    @clearAppInput="clearAppInput()"></Start>
    <Start_footer></Start_footer>
</template>

<script>
export default {
    props: ["waste_type_prop", "waste_size_prop", "waste_fvc_prop", "waste_coarse_prop", "waste_fine_prop", "waste_transport_cost_prop", "waste_transport_gwp_prop",
    "button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "color_green"],
    emits: ["clearAppInput", "updateInputFooter", "saveNewInputs"],
    data: () => ({
    }),
    methods: {
        clearAppInput() {
            // console.log("StartView.vue clearAppInput emitted")
            this.$emit("clearAppInput", undefined)
        }
    }
};
</script>