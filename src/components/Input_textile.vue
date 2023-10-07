<script setup>
    import Expert_mode from "./Expert_mode.vue"
    import Tooltip from "./Tooltip.vue"
    import Tooltip_texts from "../tooltip_texts.json"
</script>

<template>

    <div class="input_area">

        <div class="tooltip_container">
            <v-select
            v-model=textile_type
            v-on:update:model-value="[updateTextileRoute(), saveNewInputs()]"
            class="select textile_type_select"
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

        <div class="tooltip_container">
            <p class="text textile_ml_text">Mass loss</p>
            <Tooltip
            :tooltip_class="'tooltip textile_ml_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>
        <div class="slider_container">
            <v-slider
            v-if="textile_type === undefined"
            disabled
            class="slider"
            :color=color_green
            :thumb-color=color_green
            thumb-size="20" />
            <v-slider
            v-if="textile_type !== undefined"
            v-model=textile_ml
            v-on:update:model-value="saveNewInputs()"
            class="slider"
            :color=color_green
            :thumb-color=color_green
            thumb-size="20"
            :min=ml_options[0]
            :max=ml_options[1]
            :step=ml_options[2] />
            <p v-if="textile_type !== undefined" class="percentage">{{ textile_ml }}%</p>
        </div>

        <div class="tooltip_container">
            <v-select
            v-model=textile_tp
            v-on:update:model-value="saveNewInputs()"
            class="select textile_throughput_select"
            label="Throughput [kg/h/m]"
            single-line
            suffix="Throughput [kg/h/m]"
            :items=throughput_options
            variant="solo"
            :bg-color=color_lightgrey />

            <Tooltip
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="tooltip_container"
        v-if="false">
            <v-select
            v-model=textile_aw
            v-on:update:model-value="saveNewInputs()"
            class="select textile_aw_select"
            label="Areal weight [g/m²]"
            single-line
            suffix="Areal weight [g/m²]"
            :items=aw_options
            variant="solo"
            :bg-color=color_lightgrey />

            <Tooltip
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=label
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=false
        :color_green=color_green
        :expert_mode_cost_prop=expert_mode_cost
        :expert_mode_gwp_prop=expert_mode_gwp />

    </div>

</template>

<script>
/**
 * This component holds input-elements related to App.vue->app_input.textile_process.
 * Every time an input is made, every input of this component is emitted to App.vue->app_input.
 */
    export default {
        props: ["app_input_prop", "matrix_insertion_prop", "color_green", "color_lightgrey"],
        emits: ["saveNewInputs"],
        components: {
            Expert_mode: Expert_mode
        },
        mounted() {
            /**
             * If user made inputs previously and comes back to this site, then previous inputs are displayed in the input-elements.
             * Some variables are set, to recreate the state of the site that the user previously left.
             * This components input-element-options also depend on shred_1_type, shred_2_type from Input_waste.vue and matrix_insertion from Input_matrix.vue.
             */
            // (undef fine) && insert || (coarse fine) && insert -> nur "Wet-laid with Thermoplastfiber"
            // (undef fine) && !insert || (coarse fine) && !insert -> nur "Wet-laid"
            // (coarse undef) && insert || (undef cutting) && insert -> "Dry-laid with Thermoplastfiber", "Air-laid with Thermoplastfiber"
            // (coarse undef) && !insert || (undef cutting) && !insert -> "Dry-laid", "Air-laid"
            let shred_1_type = this.app_input_prop.shredding_1.type
            let shred_2_type = this.app_input_prop.shredding_2.type
            if(
                shred_1_type === undefined && shred_2_type === "Fine" && this.matrix_insertion_prop ||
                shred_1_type === "Coarse" && shred_2_type === "Fine" && this.matrix_insertion_prop
            ) {
                this.type_options = ["Wet-laid with Thermoplastfiber"]
            } else if(
                shred_1_type === undefined && shred_2_type === "Fine" && !this.matrix_insertion_prop ||
                shred_1_type === "Coarse" && shred_2_type === "Fine" && !this.matrix_insertion_prop
            ) {
                this.type_options = ["Wet-laid"]
            } else if(
                shred_1_type === "Coarse" && shred_2_type === undefined && this.matrix_insertion_prop ||
                shred_1_type === undefined && shred_2_type === "Cutting" && this.matrix_insertion_prop
            ) {
                this.type_options = ["Dry-laid with Thermoplastfiber", "Air-laid with Thermoplastfiber"]
            } else if(
                shred_1_type === "Coarse" && shred_2_type === undefined && !this.matrix_insertion_prop ||
                shred_1_type === undefined && shred_2_type === "Cutting" && !this.matrix_insertion_prop
            ) {
                this.type_options = ["Dry-laid", "Air-laid"]
            }

            if(this.textile_type === "Dry-laid" || this.textile_type === "Dry-laid with Thermoplastfiber") {
                    this.ml_options = [5, 15, 5]
                    this.throughput_options = [20, 40, 60]
                    // this.aw_options = [100, 250, 500, 1000]
                } else if(this.textile_type === "Air-laid" || this.textile_type === "Air-laid with Thermoplastfiber") {
                    this.ml_options = [5, 15, 5]
                    this.throughput_options = [50, 100, 200]
                    // this.aw_options = [300, 500, 800]
                } else if(this.textile_type === "Wet-laid" || this.textile_type === "Wet-laid with Thermoplastfiber") {
                    this.ml_options = [2, 5, 3]
                    this.throughput_options = [5, 15, 25]
                    // this.aw_options = [50, 100, 200]
                }
        },
        data() {
            return {
                type_options: [""],
                ml_options: [0, 0, 0],
                throughput_options: [""],
                aw_options: [""],

                textile_type: this.app_input_prop.textile_process.type,
                textile_ml: this.app_input_prop.textile_process.mass_loss_percent,
                textile_tp: this.app_input_prop.textile_process.throughput_kg_per_h,
                textile_aw: this.app_input_prop.textile_process.areal_weight_g_per_sqm,

                expert_mode_cost: this.app_input_prop.textile_process.euro_per_kg,
                expert_mode_gwp: this.app_input_prop.textile_process.co2_equv_per_kg,

                label: "Expert mode"
            }
        },
        methods: {
            updateTextileRoute() {
                /**
                 * Triggers when user interacts with an input-element.
                 * Some elements change when others are interacted with, some elements depend on others.
                 */
                if(this.textile_type === "Dry-laid" || this.textile_type === "Dry-laid with Thermoplastfiber") {
                    this.ml_options = [5, 15, 5]
                    this.throughput_options = [20, 40, 60]
                    // this.aw_options = [100, 250, 500, 1000]
                    this.textile_ml = 5
                    this.textile_tp = undefined
                    this.textile_aw = 250
                } else if(this.textile_type === "Air-laid" || this.textile_type === "Air-laid with Thermoplastfiber") {
                    this.ml_options = [5, 15, 5]
                    this.throughput_options = [50, 100, 200]
                    // this.aw_options = [300, 500, 800]
                    this.textile_ml = 5
                    this.textile_tp = undefined
                    this.textile_aw = 250
                } else if(this.textile_type === "Wet-laid" || this.textile_type === "Wet-laid with Thermoplastfiber") {
                    this.ml_options = [2, 5, 3]
                    this.throughput_options = [5, 15,25]
                    // this.aw_options = [50, 100, 200]
                    this.textile_ml = 5
                    this.textile_tp = undefined
                    this.textile_aw = 100
                }
            },
            newExpertModeValues(new_values) {
                /**
                 * Handles the ExpertMode.vue emits, saves the values that come from there.
                 */
                this.expert_mode_cost = new_values[0]
                this.expert_mode_gwp = new_values[1]
                this.saveNewInputs()
                // this.log()
            },
            saveNewInputs() {
                /**
                 * Triggers when user interacts with an input-element.
                 * Emits every input-value of this component to App.vue->app_input.
                 * setTimeout() needed to properly update slider values.
                 */
                setTimeout(() => {
                    // this.log()
                    this.$emit(
                        "saveNewInputs",
                    {
                        textile_type: this.textile_type,
                        textile_ml: this.textile_ml,
                        textile_tp: this.textile_tp,
                        textile_aw: this.textile_aw,
                        textile_cost: this.expert_mode_cost,
                        textile_gwp: this.expert_mode_gwp
                    })
                }, 20);
            },
            log() {
                /**
                 * Logs every input-value of this component.
                 */
                console.log("textile_type:" + this.textile_type)
                console.log("textile_ml:" + this.textile_ml)
                console.log("textile_tp:" + this.textile_tp)
                console.log("textile_aw:" + this.textile_aw)
                console.log("textile_expmode_cost:" + this.expert_mode_cost)
                console.log("textile_expmode_gwp:" + this.expert_mode_gwp)
            }
        }
    }
</script>