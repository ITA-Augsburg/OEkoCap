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
    :model-value=transport_cost
    class="textfield cost_textfield"
    label="€/kg"
    variant="solo"
    :bg-color=color_green
    :color=color_white
    ></v-text-field>

    <v-text-field
    v-if="switchState"
    :model-value=transport_gwp
    v-on:update:focused="propagateNewValues()"
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
        emits: ["newExpertModeValues"],
        data() {
            return {
                switchState: false,
                transport_cost: undefined,
                transport_gwp: undefined,
                new_values: [this.transport_cost, this.transport_gwp]
            }
        },
        methods: {
            showHideExpertMode() {
                this.switchState = !this.switchState
                // console.log(this.switchState)
                if(this.switchState === false) {
                    this.transport_cost = undefined
                    this.transport_gwp = undefined
                    this.propagateNewValues()
                }
            },
            propagateNewValues() {
                console.log("propagated")
                console.log(this.transport_cost + " " + this.transport_gwp)
                this.$emit("newExpertModeValues", "new_values")
            }
        }
    }
</script>