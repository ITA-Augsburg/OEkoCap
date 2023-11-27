<script setup>
    import Expert_mode from "./Expert_mode.vue"
    import Tooltip from "./Tooltip.vue"
    import Tooltip_texts from "../tooltip_texts.json"
    import router from "../router"
</script>
<template>

    <!-- centered container -->
    <div class="input_area_for_step_2_subheader">

        <div class="tooltip_container">

            <!-- processing step 1 dropdown -->
            <v-select
            v-model=proc_1_type
            v-on:update:model-value="[toggleStepTwo(), saveNewInputs()]"
            class="select select_maincolor processing_type_select"
            label="Type - Step 1"
            single-line
            suffix="Type - Step 1"
            :items=proc_1_type_options
            variant="solo"
            :bg-color=color_main />

            <!-- optional processing step 1 tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="tooltip_container">

            <!-- processing step 1 mass-loss text with optional tooltip -->
            <p class="text processing_ml_text">Mass loss - Step 1</p>
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip processing_ml_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="slider_container">

            <!-- processing step 1 mass-loss slider -->
            <v-slider
            v-model=proc_1_ml
            v-on:update:model-value="[saveNewInputs()]"
            class="slider"
            :color=color_main
            :thumb-color=color_main
            thumb-size="20"
            :min="15"
            :max="30"
            :step="1" />
            <p class="percentage">{{ Math.round(proc_1_ml * 10) / 10 }}%</p>
        </div>

        <!-- processing step 1 expert mode -->
        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=step1expmodelabel
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=false
        :color_main=color_main
        :expert_mode_cost_prop=proc_1_cost
        :expert_mode_gwp_prop=proc_1_gwp />

        <br><br>

        <div
        class="tooltip_container"
        v-if="!proc_2_type_disabled">

            <!-- processing step 2 dropdown -->
            <v-select
            v-model=proc_2_type
            v-on:update:model-value="[saveNewInputs()]"
            class="select select_maincolor processing_2_type_select"
            label="Type - Step 2"
            single-line
            suffix="Type - Step 2"
            :items=proc_2_type_options
            variant="solo"
            :bg-color=color_main />

            <!-- optional processing step 2 tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div 
        v-if="!proc_2_ml_disabled"
        class="tooltip_container">
            <!-- processing step 2 mass-loss text with optional tooltip -->
            <p class="text processing_ml_text">Mass loss - Step 2</p>
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip processing_ml_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="slider_container">

            <!-- processing step 2 mass-loss slider -->
            <v-slider
            v-if="!proc_2_ml_disabled"
            v-model=proc_2_ml
            v-on:update:model-value="[saveNewInputs()]"
            class="slider"
            :color=color_main
            :thumb-color=color_main
            thumb-size="20"
            :min="15"
            :max="30"
            :step="1" />
            <p v-if="!proc_2_ml_disabled"
            id="proc_2_ml" class="percentage">{{ Math.round(proc_2_ml * 10) / 10 }}%</p>
        </div>

        <!-- processing step 2 expert mode -->
        <Expert_mode
        v-if="!proc_2_expmode_disabled"
        @newExpertModeValues="newExpertModeValues($event)"
        :label=step2expmodelabel
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=false
        :color_main=color_main
        :expert_mode_cost_prop=proc_2_cost
        :expert_mode_gwp_prop=proc_2_gwp />

        <!-- some padding if processing step 2 enabled -->
        <div v-if="!proc_2_expmode_disabled" style="height: 48px;"></div>

        <div class="tooltip_container">

            <!-- wall thickness dropdown -->
            <v-select
            v-if="proc_1_type !== 'Prepreg Production' || proc_1_type === undefined"
            v-model=proc_wt
            v-on:update:model-value="[saveNewInputs()]"
            class="select select_grey processing_wt_select"
            label="Wall thickness [mm]"
            single-line
            suffix="Wall thickness [mm]"
            :items=proc_wt_options
            variant="solo"
            :bg-color=color_lightgrey />

            <!-- wall thickness dropdown but renamed. The selected value is converted back into [0.5, 1, 2] in App.vue->formatAppInputKeys() -->
            <v-select
            v-if="proc_1_type === 'Prepreg Production'"
            v-model=proc_wt
            v-on:update:model-value="[saveNewInputs()]"
            class="select select_grey processing_wt_select"
            label="Utilization"
            single-line
            suffix="Utilization"
            :items=proc_wt_options
            variant="solo"
            :bg-color=color_lightgrey />

            <!-- optional wall thickness tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="tooltip_container">

            <!-- method of insertion dropdown, enabled -->
            <v-select
            v-if="!moi_disabled"
            v-model=proc_moi
            v-on:update:model-value="[saveNewInputs()]"
            class="select select_grey processing_moi_select"
            label="Method of insertion"
            single-line
            suffix="Method of insertion"
            :items=moi_options
            variant="solo"
            :bg-color=color_lightgrey />

            <!-- method of insertion dropdown, disabled -->
            <v-select
            v-if="moi_disabled"
            disabled
            v-model=proc_moi
            class="select select_grey processing_moi_select processing_moi_select_disabled"
            label="Method of insertion"
            single-line
            suffix="Method of insertion"
            :items=moi_options
            variant="solo"
            :bg-color=color_lightgrey />

            <!-- optional method of insertion tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <!-- "clear all" and "calculate" buttons -->
        <div class="processing_buttoncontainer">
            <div class="processing_clear_buttoncontainer">

                <!-- clear all button -->
                <v-btn
                @click="clearButton()"
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="processing_clear_button_text">Clear all</p></v-btn>
            </div>

            <div class="processing_calc_buttoncontainer">

                <!-- calculate button, enabled -->
                <v-btn
                v-if="buttonCalculateEnabled"
                @click="calculateButton()"
                :color=color_main
                elevation="5"
                width="225px"
                height="55px"
                ><p class="processing_calc_button_text">Calculate</p></v-btn>

                <!-- calculate button, disabled -->
                <v-btn
                v-if="!buttonCalculateEnabled"
                disabled
                :color=color_main_disabled
                elevation="5"
                width="225px"
                height="55px"
                ><p class="processing_calc_button_text">Calculate</p></v-btn>
            </div>
        </div>

    </div>

</template>

<script>
/**
 * This component holds input-elements related to App.vue->app_input.processing_1 and .processing_2.
 * Every time an input is made, every input of this component is emitted to App.vue->app_input.
 * The calculate-button emits a signal to App.vue where the inputs are sent to the server.
 * Props:
 * app_input_prop (json): the input-json that goes into recycling.exe on the server. This input is always updated when user interacts with any of the input-elements on the input-pages.
 * proc_moi_prop (string): contains the currently selected value of the method-of-insertion dropdown.
 * matrix_insertion_prop (boolean): controls the state of the matrix insertion checkbox.
 * buttonCalculateEnabled (boolean):
 * Emits:
 * saveNewInputs: whenever an input-element is interacted with, the modified values are sent to App.vue->app_input.
 * calculateButton: when calculate-button pressed, triggers App.vue->calculateButton()
 */
    export default {
        props: ["app_input_prop", "proc_moi_prop", "matrix_insertion_prop", "buttonCalculateEnabled", "color_main", "color_lightgrey", "color_main_disabled"],
        emits: ["saveNewInputs", "calculateButton"],
        components: {
            Expert_mode: Expert_mode
        },
        mounted() {
            /**
             * If user made inputs previously and comes back to this site, then previous inputs are displayed in the input-elements.
             * Some variables are set, to recreate the state of the site that the user previously left.
             */
            //set select-options based on matrix-thermotype and matrix-insertion
            if(this.matrix_type === "Thermoplast" && this.matrix_insertion_prop === true) {
                this.proc_1_type_options = ["Doublebeltpress (Organosheet Production)", "Compression Moulding"]
                this.proc_2_type_options = ["Isothermal forming"]
                this.proc_wt_options = [0.5, 1, 2]
                if(this.proc_1_type === undefined || this.proc_1_type === "Doublebeltpress (Organosheet Production)") {
                    this.proc_2_type_disabled = false
                    this.proc_2_ml_disabled = false
                    this.proc_2_expmode_disabled = false
                } else if(this.proc_1_type === "Compression Moulding") {
                    this.proc_2_type_disabled = true
                    this.proc_2_ml_disabled = true
                    this.proc_2_expmode_disabled = true
                }
                this.moi_options = ["Thermoplastfiber"]
                this.proc_moi = "Thermoplastfiber"
                this.moi_disabled = true
            } else if(this.matrix_type === "Thermoplast" && this.matrix_insertion_prop === false) {
                this.proc_1_type_options = ["Doublebeltpress (Organosheet Production)", "Compression Moulding"]
                this.proc_2_type_options = ["Isothermal forming"]
                this.proc_wt_options = [0.5, 1, 2]
                if(this.proc_1_type === undefined || this.proc_1_type === "Doublebeltpress (Organosheet Production)") {
                    this.proc_2_type_disabled = false
                    this.proc_2_ml_disabled = false
                    this.proc_2_expmode_disabled = false
                } else if(this.proc_1_type === "Compression Moulding") {
                    this.proc_2_type_disabled = true
                    this.proc_2_ml_disabled = true
                    this.proc_2_expmode_disabled = true
                }
                this.moi_options = ["Thermoplast powder", "Thermoplast foil"]
                this.moi_disabled = false
            } else if(this.matrix_type === "Thermoset") {
                this.proc_1_type_options = ["Wet Compression Moulding", "Resin Transfer Moulding", "Prepreg Production"]
                this.proc_2_type_options = ["Autoclave"]
                if(
                this.proc_1_type === "Wet Compression Moulding" ||
                this.proc_1_type === "Resin Transfer Moulding" ||
                this.proc_1_type === undefined) {
                    this.proc_2_type = undefined
                    this.proc_2_type_disabled = true
                    this.proc_2_ml_disabled = true
                    this.proc_2_ml = undefined
                    this.proc_wt_options = [0.5, 1, 2]
                    this.proc_2_expmode_disabled = true
                }
                if(this.proc_1_type === "Prepreg Production") {
                    this.proc_2_type = this.app_input_prop.processing_2.type
                    this.proc_2_type_disabled = false
                    this.proc_2_ml_disabled = false
                    // this.proc_2_ml = this.app_input_prop.processing_2.mass_loss_percent
                    this.proc_wt_options = ["0.34 kg/m³", "1.25 kg/m³", "2.25 kg/m³"]
                    this.proc_2_expmode_disabled = false
                }
                this.moi_options = ["Thermoset (liquid)"]
                this.proc_moi = "Thermoset (liquid)"
                this.moi_disabled = true
            }
            this.saveNewInputs()
        },
        data() {
            return {
                proc_1_type_options: [""],
                proc_wt_options: [""],
                proc_2_type_options: [""],
                moi_options: [""],

                proc_1_type: this.app_input_prop.processing_1.type,
                proc_1_ml: this.app_input_prop.processing_1.mass_loss_percent,
                proc_wt: this.app_input_prop.processing_1.wandstärke_mm,
                proc_1_cost: this.app_input_prop.processing_1.euro_per_kg,
                proc_1_gwp: this.app_input_prop.processing_1.co2_equv_per_kg,
                proc_2_type: this.app_input_prop.processing_2.type,
                proc_2_ml: this.app_input_prop.processing_2.mass_loss_percent,
                proc_2_cost: this.app_input_prop.processing_2.euro_per_kg,
                proc_2_gwp: this.app_input_prop.processing_2.co2_equv_per_kg,
                proc_moi: this.proc_moi_prop,
                matrix_type: this.app_input_prop.polymer.thermo_type,

                step1expmodelabel: "Process step 1 expert mode",
                step2expmodelabel: "Process step 2 expert mode",

                moi_disabled: false,
                proc_2_type_disabled: false,
                proc_2_ml_disabled: false,
                proc_2_expmode_disabled: false
            }
        },
        methods: {
            toggleStepTwo() {
                /**
                 * Based on the selection in the process-step-1 dropdown, other elements might change.
                 */
                //thermoset
                if(this.proc_1_type === "Prepreg Production") {
                    this.proc_1_ml = 20
                    this.proc_2_type_disabled = false
                    this.proc_2_ml_disabled = false
                    this.proc_2_ml = 10
                    this.proc_2_expmode_disabled = false
                    this.proc_wt_options = ["0.34 kg/m³", "1.25 kg/m³", "2.25 kg/m³"]
                    this.proc_wt = undefined
                } else if(this.proc_1_type === "Wet Compression Moulding" || this.proc_1_type === "Resin Transfer Moulding") {
                    this.proc_1_ml = 30
                    this.proc_2_type_disabled = true
                    this.proc_2_type = undefined
                    this.proc_2_ml_disabled = true
                    this.proc_2_ml = undefined
                    this.proc_2_expmode_disabled = true
                    this.proc_2_cost = undefined
                    this.proc_2_gwp = undefined
                    this.proc_wt_options = [0.5, 1, 2]
                    this.proc_wt = undefined
                //thermoplast
                } else if(this.proc_1_type === "Doublebeltpress (Organosheet Production)") {
                    this.proc_2_type_disabled = false
                    this.proc_2_ml_disabled = false
                    this.proc_1_ml = 20
                    this.proc_2_ml = 10
                    this.proc_2_expmode_disabled = false
                } else if(this.proc_1_type === "Compression Moulding") {
                    this.proc_1_ml = 30
                    this.proc_2_type_disabled = true
                    this.proc_2_type = undefined
                    this.proc_2_ml_disabled = true
                    this.proc_2_ml = undefined
                    this.proc_2_expmode_disabled = true
                    this.proc_2_cost = undefined
                    this.proc_2_gwp = undefined
                }
            },
            newExpertModeValues(new_values) {
                /**
                 * Handles the ExpertMode.vue emits, saves the values that come from there.
                 */
                if(new_values[2] === this.step1expmodelabel) {
                    this.proc_1_cost = new_values[0]
                    this.proc_1_gwp = new_values[1]
                } else if(new_values[2] === this.step2expmodelabel) {
                    this.proc_2_cost = new_values[0]
                    this.proc_2_gwp = new_values[1]
                }
                this.saveNewInputs()
                // this.log()
            },
            saveNewInputs() {
                /**
                 * Triggers when user interacts with an input-element.
                 * Emits every input-value of this component to App.vue->app_input.
                 * setTimeout() needed to properly update slider values.
                 */
                if(this.proc_moi === "") {
                    this.proc_moi = undefined
                }
                //setTimeout needed to properly update slider values
                setTimeout(() => {
                    // this.log()
                    this.$emit(
                        "saveNewInputs",
                    {
                        proc_1_type: this.proc_1_type,
                        proc_1_ml: this.proc_1_ml,
                        proc_wt: this.proc_wt,
                        proc_1_cost: this.proc_1_cost,
                        proc_1_gwp: this.proc_1_gwp,
                        proc_2_type: this.proc_2_type,
                        proc_2_ml: this.proc_2_ml,
                        proc_2_cost: this.proc_2_cost,
                        proc_2_gwp: this.proc_2_gwp,
                        proc_moi: this.proc_moi
                    })
                }, 20);
            },
            calculateButton() {
                /**
                 * Triggers a function in App.vue that sends inputs to the server.
                 */
                this.$emit("calculateButton", undefined)
                router.push({name:"WaitingView"})
            },
            clearButton() {
                /**
                 * Sends user back to the start. Resets App.vue->app_input and other variables when Start.vue is mounted in StartView.
                 */
                router.push({name:"StartView"})
            },
            log() {
                /**
                 * Logs every input-value of this component.
                 */
                console.log("proc_1_type:" + this.proc_1_type)
                console.log("proc_1_ml:" + this.proc_1_ml)
                console.log("proc_1_cost:" + this.proc_1_cost)
                console.log("proc_1_gwp:" + this.proc_1_gwp)
                console.log("proc_2_type:" + this.proc_2_type)
                console.log("proc_2_ml:" + this.proc_2_ml)
                console.log("proc_wt:" + this.proc_wt)
                console.log("proc_2_cost:" + this.proc_2_cost)
                console.log("proc_2_gwp:" + this.proc_2_gwp)
                console.log("proc_moi:" + this.proc_moi)
                console.log()
            }
        }
    }
</script>