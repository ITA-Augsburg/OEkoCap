<script setup>
    import Expert_mode from "./Expert_mode.vue"
    import Tooltip from "./Tooltip.vue"
    import Tooltip_texts from "../tooltip_texts.json"
</script>

<template>

    <div class="input_area">

        <div class="tooltip_container">
            <v-select
            v-model=separation_type
            v-on:update:model-value=saveNewInputs()
            class="select separation_type_select"
            label="Type"
            single-line
            suffix="Type"
            :items=type_options
            variant="solo"
            :bg-color=color_green />

            <Tooltip
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <Expert_mode
        @newExpertModeValues=newExpertModeValues($event)
        :label=label
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=false
        :expert_mode_cost_prop=expert_mode_cost
        :expert_mode_gwp_prop=expert_mode_gwp
        :color_green=color_green />

    </div>

</template>

<script>
    export default {
        props: ["app_input_prop", "color_green"],
        emits: ["saveNewInputs"],
        components: {
            Expert_mode: Expert_mode
        },
        data() {
            return {
                type_options: ["Pyrolyse"],
                separation_type: this.app_input_prop.separation.type,

                expert_mode_cost: this.app_input_prop.separation.euro_per_kg,
                expert_mode_gwp: this.app_input_prop.separation.co2_equv_per_kg,

                label: "Expert mode"
            }
        },
        methods: {
            newExpertModeValues(new_values) {
                this.expert_mode_cost = new_values[0]
                this.expert_mode_gwp = new_values[1]
                this.saveNewInputs()
                // this.log()
            },
            saveNewInputs() {
                // this.log()
                this.$emit(
                        "saveNewInputs",
                    {
                        sep_type: this.separation_type,
                        sep_cost: this.expert_mode_cost,
                        sep_gwp: this.expert_mode_gwp
                    })
            },
            log() {
                console.log("sep_type:" + this.separation_type)
                console.log("sep_cost:" + this.expert_mode_cost)
                console.log("sep_gwp:" + this.expert_mode_gwp)
            }
        }
    }
</script>