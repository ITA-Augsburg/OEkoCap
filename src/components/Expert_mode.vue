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
    v-model=expert_mode_cost
    @update:model-value="propagateNewValues()"
    class="textfield cost_textfield"
    label="€/kg"
    variant="solo"
    :bg-color=color_green
    :color=color_white
    ></v-text-field>

    <v-text-field
    v-if="switchState"
    v-model=expert_mode_gwp
    @update:model-value="propagateNewValues()"
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
                expert_mode_cost: undefined,
                expert_mode_gwp: undefined,
            }
        },
        methods: {
            showHideExpertMode() {
                this.switchState = !this.switchState
                // console.log(this.switchState)
                if(this.switchState === false) {
                    this.expert_mode_cost = undefined
                    this.expert_mode_gwp = undefined
                    this.propagateNewValues()
                }
            },
            propagateNewValues() {
                console.log("propagated")
                // console.log(this.transporexpert_mode_cost + " " + this.expert_mode_gwp)
                this.$emit("newExpertModeValues", [this.expert_mode_cost, this.expert_mode_gwp])
            }
        }
    }
</script>