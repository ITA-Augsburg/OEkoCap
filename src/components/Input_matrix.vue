<script setup>
    import Expert_mode from "./Expert_mode.vue"
    import Tooltip from "./Tooltip.vue"
    import Tooltip_texts from "../tooltip_texts.json"
</script>

<template>

    <!-- centered container -->
    <div class="input_area_for_step_2_subheader">

        <div class="tooltip_container">

            <!-- matrix type dropdown -->
            <v-select
            v-model="matrix_type"
            v-on:update:model-value="[updateMatrixRoute(), saveNewInputs()]"
            class="select select_maincolor matrix_type_select"
            label="Type"
            single-line
            suffix="Type"
            :items=type_options
            variant="solo"
            :bg-color=color_main />

            <!-- optional matrix type tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="tooltip_container">

            <!-- matrix polymer dropdown -->
            <v-select
            v-model="matrix_polymer"
            v-on:update:model-value="saveNewInputs()"
            class="select select_maincolor matrix_polymer_select"
            label="Polymer"
            single-line
            suffix="Polymer"
            :items=polymer_options
            variant="solo"
            :bg-color=color_main />

            <!-- optional matrix polymer tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="tooltip_container">

            <!-- fiber volume content text and optional tooltip -->
            <p class="text matrix_fmc_text">Fiber Volume Content</p>
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip matrix_fiber_text_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>
        <div class="slider_container">

            <!-- fiber volume content slider -->
            <v-slider
            v-model="matrix_fmc"
            v-on:update:model-value="saveNewInputs()"
            class="slider"
            :color=color_main
            :thumb-color=color_main
            thumb-size="20"
            :min="20"
            :max="40"
            :step="10" />
            <p class="percentage">{{ matrix_fmc }}%</p>
        </div>

        <div class="tooltip_container">
            <div class="checkbox_container">

                <!-- matrix insertion checkbox, enabled -->
                <v-checkbox
                v-if="matrix_type !== 'Thermoset'"
                v-model="matrix_insertion"
                v-on:update:model-value="saveNewInputs()"
                class="checkbox matrix_iip_checkbox"
                label="Insert matrix as fibers in textile process"
                :color=color_main />

                <!-- matrix insertion checkbox, disabled -->
                <v-checkbox
                v-if="matrix_type === 'Thermoset'"
                disabled
                class="checkbox matrix_iip_checkbox"
                label="Insert matrix as fibers in textile process"
                :color=color_main />
            </div>

            <!-- optional matrix insertion tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip matrix_insert_text_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <!-- matrix expert-mode -->
        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=label
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=false
        :color_main="color_main"
        :expert_mode_cost_prop=expert_mode_cost
        :expert_mode_gwp_prop=expert_mode_gwp />

    </div>

</template>

<script>
/**
 * This component holds input-elements related to App.vue->app_input.polymer.
 * Every time an input is made, every input of this component is emitted to App.vue->app_input.
 * Props:
 * app_input_prop (json): the input-json that goes into recycling.exe on the server. This input is always updated when user interacts with any of the input-elements on the input-pages.
 * matrix_insertion_prop (boolean): controls the state of the matrix insertion checkbox.
 * Emits:
 * saveNewInputs: whenever an input-element is interacted with, the modified values are sent to App.vue->app_input.
 * resetProcessingMassLosses: when matrix type is changed, processing-page mass-loss values are reset because they are dependent on the matrix type.
 */
    export default {
        props: ["app_input_prop", "matrix_insertion_prop", "color_main"],
        emits: ["saveNewInputs", "resetProcessingMasslosses"],
        components: {
            Expert_mode: Expert_mode
        },
        mounted() {
            /**
             * If user made inputs previously and comes back to this site, then previous inputs are displayed in the input-elements.
             * Some variables are set, to recreate the state of the site that the user previously left.
             */
            if(this.matrix_type === "Thermoplast") {
                this.polymer_options = ["PP", "PA6"]
            } else if(this.matrix_type === "Thermoset") {
                this.polymer_options = ["EP"]
            }

            // saveNewInputs will execute code that enables the next footer button if needed
            this.saveNewInputs()
        },
        data() {
            return {
                type_options: ["Thermoplast", "Thermoset"],
                polymer_options: [""],

                matrix_type: this.app_input_prop.polymer.thermo_type,
                matrix_polymer: this.app_input_prop.polymer.matrix_type,
                matrix_fmc: this.app_input_prop.polymer.fvc_percent,
                matrix_insertion: this.matrix_insertion_prop,

                expert_mode_cost: this.app_input_prop.polymer.euro_per_kg,
                expert_mode_gwp: this.app_input_prop.polymer.co2_equv_per_kg,

                label: "Expert mode"
            }
        },
        methods: {
            updateMatrixRoute() {
                /**
                 * Some variables are dependent of the selected matrix-type, when user makes a selection, these variables must be changed or reset.
                 */
                this.$emit("resetProcessingMasslosses", undefined)
                if(this.matrix_type === "Thermoplast") {
                    this.polymer_options = ["PP", "PA6"]
                    this.matrix_polymer = undefined
                } else if(this.matrix_type === "Thermoset") {
                    this.polymer_options = ["EP"]
                    this.matrix_polymer = undefined
                    this.matrix_insertion = false
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
                        matrix_type: this.matrix_type,
                        matrix_polymer: this.matrix_polymer,
                        matrix_fmc: this.matrix_fmc,
                        matrix_insertion: this.matrix_insertion,
                        matrix_cost: this.expert_mode_cost,
                        matrix_gwp: this.expert_mode_gwp
                    })
                }, 20);
            },
            log() {
                /**
                 * Logs every input-value of this component.
                 */
                console.log("matrix_type:" + this.matrix_type)
                console.log("matrix_polymer:" + this.matrix_polymer)
                console.log("matrix_fmc:" + this.matrix_fmc)
                console.log("matrix_insertion:" + this.matrix_insertion)
                console.log("matrix_cost:" + this.expert_mode_cost)
                console.log("matrix_gwp:" + this.expert_mode_gwp)
            }
        }
    }
</script>