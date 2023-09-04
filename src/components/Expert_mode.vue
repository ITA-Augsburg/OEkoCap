<script setup>
    import Tooltip from "./Tooltip.vue"
</script>

<template>

    <div class="tooltip_container">
        <div class="switch_container">
            <v-switch
            v-if="!disabled"
            class="switch"
            inset
            :label=label
            :color=color_green
            v-model="switchState"
            @click="showHideExpertMode()"
            ></v-switch>
            <v-switch
            v-if="disabled"
            class="switch"
            disabled
            inset
            :label=label
            :color=color_green
            v-model="switchState"
            ></v-switch>
        </div>
        <Tooltip
        v-if="tooltip_text_prop !== undefined"
        :tooltip_class=exp_tooltip_class
        :tooltip_text=tooltip_text_prop />
    </div>
    

    <v-text-field
    v-if="switchState && !disabled"
    v-model=expert_mode_cost
    @update:model-value="propagateNewValues()"
    class="textfield cost_textfield"
    label="€/kg"
    single-line
    suffix="€/kg"
    variant="solo"
    :bg-color=color_green
    ></v-text-field>

    <v-text-field
    v-if="switchState && !disabled"
    v-model=expert_mode_gwp
    @update:model-value="propagateNewValues()"
    class="textfield co2_textfield"
    label="kg CO2-eq./kg"
    single-line
    suffix="kg CO2-eq./kg"
    variant="solo"
    :bg-color=color_green
    ></v-text-field>

</template>

<script>

    export default {
        props: ["disabled", "expert_mode_cost_prop", "expert_mode_gwp_prop", "label", "color_green", "tooltip_text_prop"],
        emits: ["newExpertModeValues"],
        mounted() {
            if(this.expert_mode_cost_prop !== undefined || this.expert_mode_gwp_prop !== undefined) {
                this.switchState = true
            }
        },
        data() {
            return {
                switchState: false,
                expert_mode_cost: this.expert_mode_cost_prop,
                expert_mode_gwp: this.expert_mode_gwp_prop,

                exp_tooltip_class: "tooltip exp_mode_tooltip"
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
                //Das Monster
                //expmode-cost and -gwp values are only propagated (and saved in App.vue->app_input) if they're numbers.
                // console.log("propagated")
                // console.log(this.expert_mode_cost + " " + this.expert_mode_gwp)
                if(this.expert_mode_cost === undefined && this.expert_mode_gwp === undefined) {
                    this.$emit("newExpertModeValues", [this.expert_mode_cost, this.expert_mode_gwp, this.label])
                } else if(this.expert_mode_cost === undefined && this.expert_mode_gwp !== undefined) {
                    if(isNaN(parseFloat(String(this.expert_mode_gwp).replaceAll(",", ".")))) {
                        if(this.expert_mode_gwp !== "") {
                            alert("Please enter a number for 'kg CO2-eq./kg'.")
                        }
                        this.expert_mode_gwp = undefined
                        this.propagateNewValues()
                    } else {
                        this.$emit("newExpertModeValues", [this.expert_mode_cost, parseFloat(String(this.expert_mode_gwp).replaceAll(",", ".")), this.label])
                    }
                } else if(this.expert_mode_cost !== undefined && this.expert_mode_gwp === undefined) {
                    if(isNaN(parseFloat(String(this.expert_mode_cost).replaceAll(",", ".")))) {
                        if(this.expert_mode_cost !== "") {
                            alert("Please enter a number for '€/kg'.")
                        }
                        this.expert_mode_cost = undefined
                        this.propagateNewValues()
                    } else {
                        this.$emit("newExpertModeValues", [parseFloat(String(this.expert_mode_cost).replaceAll(",", ".")), this.expert_mode_gwp, this.label])
                    }
                } else {
                    if(isNaN(parseFloat(String(this.expert_mode_cost).replaceAll(",", "."))) && isNaN(parseFloat(String(this.expert_mode_gwp).replaceAll(",", ".")))) {
                        if(this.expert_mode_cost !== "" && this.expert_mode_gwp !== "") {
                            alert("Please enter a number for 'kg CO2-eq./kg' and '€/kg'.")
                        }
                        this.expert_mode_cost = undefined
                        this.expert_mode_gwp = undefined
                        this.propagateNewValues()
                    } else if(isNaN(parseFloat(String(this.expert_mode_cost).replaceAll(",", "."))) && !isNaN(parseFloat(String(this.expert_mode_gwp).replaceAll(",", ".")))) {
                        if(this.expert_mode_cost !== "") {
                            alert("Please enter a number for '€/kg'.")
                        }
                        this.expert_mode_cost = undefined
                        this.propagateNewValues()
                    } else if(!isNaN(parseFloat(String(this.expert_mode_cost).replaceAll(",", "."))) && isNaN(parseFloat(String(this.expert_mode_gwp).replaceAll(",", ".")))) {
                        if(this.expert_mode_gwp !== "") {
                            alert("Please enter a number for 'kg CO2-eq./kg'.")
                        }
                        this.expert_mode_gwp = undefined
                        this.propagateNewValues()
                    } else {
                        this.$emit("newExpertModeValues", [parseFloat(String(this.expert_mode_cost).replaceAll(",", ".")), parseFloat(String(this.expert_mode_gwp).replaceAll(",", ".")), this.label])
                    }
                }
            }
        }
    }
</script>