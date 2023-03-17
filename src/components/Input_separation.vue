<template>

    <div class="input_area">

        <v-select
        v-model=separation_type
        v-on:update:model-value="saveNewInputs()"
        class="select separation_type_select"
        label="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=label
        :expert_mode_cost_prop="sep_cost_prop"
        :expert_mode_gwp_prop="sep_gwp_prop"
        :color_green="color_green"
        :color_white="color_white"></Expert_mode>

    </div>

</template>

<script>
    import Expert_mode from "./Expert_mode.vue"
    export default {
        props: ["sep_type_prop", "sep_cost_prop", "sep_gwp_prop",
        "color_green", "color_white"],
        emits: ["saveNewInputs"],
        components: {
            Expert_mode: Expert_mode
        },
        data() {
            return {
                type_options: ["Pyrolyse"],
                separation_type: this.sep_type_prop,

                expert_mode_cost: this.sep_cost_prop,
                expert_mode_gwp: this.sep_gwp_prop,

                label: "Expert mode"
            }
        },
        methods: {
            newExpertModeValues(new_values) {
                this.expert_mode_cost = new_values[0]
                this.expert_mode_gwp = new_values[1]
                this.$emit(
                        "saveNewInputs",
                    {
                        sep_type: this.separation_type,
                        sep_cost: this.expert_mode_cost,
                        sep_gwp: this.expert_mode_gwp
                    })
                // this.log()
            },
            saveNewInputs() {
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