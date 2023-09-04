<script setup>
    import Expert_mode from "./Expert_mode.vue"
    import Tooltip from "./Tooltip.vue"
    import Tooltip_texts from "../tooltip_texts.json"
</script>
<template>

    <div class="input_area">

        <div class="tooltip_container">
            <v-select
            v-model=proc_1_type
            v-on:update:model-value="[toggleStepTwo(), saveNewInputs()]"
            class="select processing_type_select"
            label="Type - Step 1"
            single-line
            suffix="Type - Step 1"
            :items=proc_1_type_options
            variant="solo"
            :bg-color=color_green />

            <Tooltip
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="tooltip_container">
            <p class="text processing_ml_text">Mass loss - Step 1</p>
            <Tooltip
            :tooltip_class="'tooltip processing_ml_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>
        <div class="slider_container">
            <v-slider
            v-model=proc_1_ml
            v-on:update:model-value="[saveNewInputs()]"
            class="slider"
            :color=color_green
            :thumb-color=color_green
            thumb-size="20"
            :min="0.5"
            :max="40"
            :step="0.1" />
            <p class="percentage">{{ Math.round(proc_1_ml * 10) / 10 }}%</p>
        </div>

        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=step1expmodelabel
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=false
        :color_green=color_green
        :expert_mode_cost_prop=proc_1_cost
        :expert_mode_gwp_prop=proc_1_gwp />

        <br><br>

        <div class="tooltip_container">
            <v-select
            v-if="!proc_2_type_disabled"
            v-model=proc_2_type
            v-on:update:model-value="[saveNewInputs()]"
            class="select processing_2_type_select"
            label="Type - Step 2"
            single-line
            suffix="Type - Step 2"
            :items=proc_2_type_options
            variant="solo"
            :bg-color=color_green />

            <Tooltip
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div 
        v-if="!proc_2_ml_disabled"
        class="tooltip_container">
            <p class="text processing_ml_text">Mass loss - Step 2</p>
            <Tooltip
            :tooltip_class="'tooltip processing_ml_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>
        <div class="slider_container">
            <v-slider
            v-if="!proc_2_ml_disabled"
            v-model=proc_2_ml
            v-on:update:model-value="[saveNewInputs()]"
            class="slider"
            :color=color_green
            :thumb-color=color_green
            thumb-size="20"
            :min="0.5"
            :max="40"
            :step="0.1" />
            <p v-if="!proc_2_ml_disabled"
            id="proc_2_ml" class="percentage">{{ Math.round(proc_2_ml * 10) / 10 }}%</p>
        </div>

        <Expert_mode
        v-if="!proc_2_expmode_disabled"
        @newExpertModeValues="newExpertModeValues($event)"
        :label=step2expmodelabel
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=false
        :color_green=color_green
        :expert_mode_cost_prop=proc_2_cost
        :expert_mode_gwp_prop=proc_2_gwp />

        <br><br>

        <div class="tooltip_container">
            <v-select
            v-model=proc_wt
            v-on:update:model-value="[saveNewInputs()]"
            class="select processing_wt_select"
            label="Wall thickness [mm]"
            single-line
            suffix="Wall thickness [mm]"
            :items=proc_wt_options
            variant="solo"
            :bg-color=color_lightgrey />

            <Tooltip
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="tooltip_container">
            <v-select
            v-if="!moi_disabled"
            v-model=proc_moi
            v-on:update:model-value="[saveNewInputs()]"
            class="select processing_moi_select"
            label="Method of insertion"
            single-line
            suffix="Method of insertion"
            :items=moi_options
            variant="solo"
            :bg-color=color_lightgrey />
            <v-select
            v-if="moi_disabled"
            disabled
            v-model=proc_moi
            class="select processing_moi_select processing_moi_select_disabled"
            label="Method of insertion"
            single-line
            suffix="Method of insertion"
            :items=moi_options
            variant="solo"
            :bg-color=color_lightgrey />

            <Tooltip
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="processing_buttoncontainer">
            <div class="processing_clear_buttoncontainer">
                <RouterLink
                :to='{name:"StartView"}'>
                    <v-btn
                    :color=color_lightgrey
                    elevation="5"
                    width="225px"
                    height="55px"
                    ><p class="processing_clear_button_text">Clear all</p></v-btn>
                </RouterLink>
            </div>

            <div class="processing_calc_buttoncontainer">
                <RouterLink
                :to='{name:"WaitingView"}'
                v-if="buttonCalculateEnabled">
                    <v-btn
                    @click="calculateButton()"
                    :color=color_green
                    elevation="5"
                    width="225px"
                    height="55px"
                    ><p class="processing_calc_button_text">Calculate</p></v-btn>
                </RouterLink>
                <v-btn
                v-if="!buttonCalculateEnabled"
                disabled
                :color=color_darkgreen
                elevation="5"
                width="225px"
                height="55px"
                ><p class="processing_calc_button_text">Calculate</p></v-btn>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        props: ["app_input_prop", "proc_moi_prop", "matrix_insertion_prop", "buttonCalculateEnabled", "color_green", "color_lightgrey", "color_darkgreen"],
        emits: ["saveNewInputs", "calculateButton"],
        components: {
            Expert_mode: Expert_mode
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
        mounted() {
            //set select-options based on matrix-thermotype and matrix-insertion
            if(this.matrix_type === "Thermoplast" && this.matrix_insertion_prop === true) {
                this.proc_1_type_options = ["Doublebeltpress (Organosheet Production)", "Compression Moulding"]
                this.proc_2_type_options = ["Isothermal forming"]
                this.proc_wt_options = [0.5, 1, 2]
                this.proc_2_type_disabled = false
                this.proc_2_ml_disabled = false
                this.proc_2_ml = 10
                this.proc_2_expmode_disabled = false
                this.moi_options = ["Thermoplastfiber"]
                this.proc_moi = "Thermoplastfiber"
                this.moi_disabled = true
            } else if(this.matrix_type === "Thermoplast" && this.matrix_insertion_prop === false) {
                this.proc_1_type_options = ["Doublebeltpress (Organosheet Production)", "Compression Moulding"]
                this.proc_2_type_options = ["Isothermal forming"]
                this.proc_wt_options = [0.5, 1, 2]
                this.proc_2_type_disabled = false
                this.proc_2_ml_disabled = false
                this.proc_2_ml = 10
                this.proc_2_expmode_disabled = false
                this.moi_options = ["Thermoplast powder", "Thermoplast foil"]
                this.moi_disabled = false
            } else if(this.matrix_type === "Thermoset") {
                this.proc_1_type_options = ["Wet Compression Moulding", "Resin Transfer Moulding"]
                this.proc_2_type_options = [""]
                this.proc_2_type = undefined
                this.proc_2_type_disabled = true
                this.proc_2_ml_disabled = true
                this.proc_2_ml = undefined
                this.proc_wt_options = [0.5, 1, 2]
                this.proc_2_wt = undefined
                this.proc_2_expmode_disabled = true
                this.moi_options = ["Thermoset (liquid)"]
                this.proc_moi = "Thermoset (liquid)"
                this.moi_disabled = true
            }
            this.saveNewInputs()
            //reposition processing-2-mass-loss-percent if Process-step-1-expmode "open"
            if(this.proc_1_cost !== undefined || this.proc_1_gwp !== undefined) {
                document.getElementById("proc_2_ml").classList.add("processing_2_ml_percentage_2")
            }
        },
        methods: {
            toggleStepTwo() {
                if(this.proc_1_type === "Doublebeltpress (Organosheet Production)") {
                    this.proc_2_type_disabled = false
                    this.proc_2_ml_disabled = false
                    this.proc_2_ml = 10
                    this.proc_2_expmode_disabled = false
                } else if(this.proc_1_type === "Compression Moulding") {
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
                this.$emit("calculateButton", undefined)
            },
            log() {
                console.log("proc_1_type:" + this.proc_1_type)
                console.log("proc_1_ml:" + this.proc_1_ml)
                console.log("proc_1_wt:" + this.proc_1_wt)
                console.log("proc_1_cost:" + this.proc_1_cost)
                console.log("proc_1_gwp:" + this.proc_1_gwp)
                console.log("proc_2_type:" + this.proc_2_type)
                console.log("proc_2_ml:" + this.proc_2_ml)
                console.log("proc_2_wt:" + this.proc_2_wt)
                console.log("proc_2_cost:" + this.proc_2_cost)
                console.log("proc_2_gwp:" + this.proc_2_gwp)
                console.log("proc_moi:" + this.proc_moi)
            }
        }
    }
</script>