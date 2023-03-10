<script setup>
    import Start_subheader from "../components/Start_subheader.vue"
    import Start from "../components/Start.vue"
    import Start_footer from "../components/Start_footer.vue"
</script>

<template>
    <Start_subheader></Start_subheader>
    <Start
    v-bind:color_green="color_green"
    @clearAppInput="clearAppInput()"></Start>
    <Start_footer></Start_footer>
</template>

<script>
export default {
    props: ["color_green"],
    emits: ["clearAppInput"],
    data: () => ({
    }),
    methods: {
        clearAppInput() {
            console.log("StartView.vue clearAppInput emitted")
            this.$emit("clearAppInput", undefined)
        }
    }
};
</script>