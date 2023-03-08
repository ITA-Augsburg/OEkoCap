<template>

    <v-switch
    class="switch"
    :label= label
    inset
    :color=color_green
    @click="showHideExpertMode()"
    ></v-switch>

    <v-text-field
    v-if="switchState"
    class="textfield cost_textfield"
    label="€/kg"
    variant="solo"
    :bg-color=color_green
    :color=color_white
    ></v-text-field>

    <v-text-field
    v-if="switchState"
    class="textfield co2_textfield"
    label="kg CO2-äq./kg"
    variant="solo"
    :bg-color=color_green
    :color=color_white
    ></v-text-field>

</template>

<script>

    export default {
        props: ["label", "color_green", "color_white"],
        data() {
            return {
                switchState: false
            }
        },
        methods: {
            showHideExpertMode() {
                this.switchState = !this.switchState
                // console.log(this.switchState)
            }
        }
    }
</script>