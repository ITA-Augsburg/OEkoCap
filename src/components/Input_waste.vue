<script setup>
    import Expert_mode from "./Expert_mode.vue"
    import Tooltip from "./Tooltip.vue"
    import Tooltip_texts from "../tooltip_texts.json"
</script>

<template>
    
    <!-- centered container -->
    <div class="input_area_for_step_1_subheader">
        
        <div class="tooltip_container">

            <!-- waste-type dropdown -->
            <v-select
            class="select select_maincolor waste_type_select"
            label="Type"
            single-line
            suffix="Type"
            :items=type_options
            variant="solo"
            :bg-color=color_main
            v-model=waste_type
            v-on:update:model-value="[updateWasteRoute(), saveNewInputs()]" />

            <!-- optional waste-type tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip select_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="tooltip_container">

            <!-- carbon-fiber-cost textfield -->
            <v-text-field
            v-if="waste_type == 'Cut-Off'"
            v-model=waste_carbon_fibre_cost
            @update:model-value="checkCarbonFibreCostAndSave()"
            class="textfield"
            label="carbon fibre €/kg part"
            single-line
            suffix="€/kg part"
            variant="solo"
            :bg-color=color_main />

            <!-- optional carbon-fibre-cost tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip textfield_tooltip'"
            :tooltip_text=Tooltip_texts.waste_carbon_fibre_cost_tooltip />
        </div>
        
        <div class="tooltip_container"
        v-if="waste_type === 'End of Life' || waste_type === undefined">
            <div class="checkbox_container">

                <!-- waste-size checkbox, enabled -->
                <v-checkbox
                v-if="waste_type === 'End of Life'"
                @click="[toggleSizeCheckbox(), updateWasteRoute(), saveNewInputs()]"
                class="checkbox waste_size_checkbox"
                label="Waste Size > 1.5m"
                :color=color_main
                v-model="size1dot5" />

                <!-- waste-size checkbox, disabled -->
                <v-checkbox
                v-if="waste_type === undefined"
                disabled
                class="checkbox waste_size_checkbox"
                label="Waste Size > 1.5m"
                :color=color_main
                v-model="size1dot5" />
            </div>

            <!-- optional waste-size tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip waste_size_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="tooltip_container"
        v-if="
        waste_type === undefined ||
        waste_type === 'End of Life' && size1dot5 === true ||
        waste_type === 'End of Life' && size1dot5 === false">

            <!-- coarse-shredding mass-loss text enabled -->
            <p v-if="waste_type === 'End of Life' && size1dot5 === true"
            class="text waste_coarse_text">Coarse Shredding - Mass loss</p>

            <!-- coarse-shredding mass-loss text disabled -->
            <p v-if="waste_type === undefined || waste_type === 'End of Life' && size1dot5 === false"
            class="text waste_coarse_text text_disabled">Coarse Shredding - Mass loss</p>

            <!-- optional coarse-shredding tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip waste_coarse_text_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="slider_container">

            <!-- coarse-shredding slider, enabled -->
            <v-slider
            v-if="waste_type === 'End of Life' && size1dot5 === true"
            v-on:update:model-value="saveNewInputs()"
            class="slider"
            :color=color_main
            :thumb-color=color_main
            thumb-size="20"
            :min="0"
            :max="10"
            :step="1"
            v-model="shred_1_ml" />

            <!-- coarse-shredding slider, disabled -->
            <v-slider
            v-if="waste_type === undefined || waste_type === 'End of Life' && size1dot5 === false"
            disabled
            class="slider"
            :color=color_main
            :thumb-color=color_main
            thumb-size="20"
            :min="0"
            :max="10"
            :step="1"
            v-model="shred_1_ml" />

            <!-- coarse-shredding percentage-text, only displayed if coarse-shredding slider enabled -->
            <p
            v-if="waste_type === 'End of Life' && size1dot5 === true"
            class="percentage">{{ Math.round(shred_1_ml * 10) / 10 }}%</p>
        </div>

        <!-- coarse-shredding expert-mode, enabled -->
        <Expert_mode
        v-if="!coarse_expmode_disabled && coarse_expmode_disabled !== undefined"
        @newExpertModeValues="newExpertModeValues($event)"
        :label=coarse_expmode_label
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=false
        :expert_mode_gwp_prop=shred_1_gwp
        :expert_mode_cost_prop=shred_1_cost
        :color_main=color_main />

        <!-- coarse-shredding expert-mode, disabled -->
        <Expert_mode
        v-if="coarse_expmode_disabled && coarse_expmode_disabled !== undefined"
        :label=coarse_expmode_label
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=true
        :expert_mode_cost_prop=shred_1_cost
        :expert_mode_gwp_prop=shred_1_gwp
        :color_main=color_main />

        <div class="tooltip_container">

            <!-- fine-shredding checkbox for toggling fine-shredding input-elements -->
            <div class="checkbox_container waste_fine_checkbox_container">

                <!-- fine-shredding checkbox enabled -->
                <v-checkbox
                v-if="waste_type === 'End of Life' && size1dot5"
                @click="[toggleFineCheckbox(), updateWasteRoute(), saveNewInputs()]"
                class="checkbox waste_fine_checkbox"
                :color=color_main
                v-model="fine_checkbox" />

                <!-- fine-shredding checkbox disabled -->
                <v-checkbox
                v-if="waste_type === 'End of Life' && !size1dot5"
                disabled
                class="checkbox waste_fine_checkbox"
                :color=color_main
                v-model="fine_checkbox" />

            <!-- fine-, cutting-shredding text -->
            </div>
            <p v-if="shred_2_type !== 'Cutting'" id="waste_fine_text" class="text waste_fine_text"
            @click="handleFineMassLossText()">Fine Shredding - Mass loss</p>
            <p v-if="shred_2_type === 'Cutting'" class="text waste_cutting_text">Cutting - Mass loss</p>

            <!-- optional fine-, cutting-shredding tooltip -->
            <Tooltip
            :tooltip_enabled=false
            :tooltip_class="'tooltip waste_fine_text_tooltip'"
            :tooltip_text=Tooltip_texts.test />
        </div>

        <div class="slider_container">

            <!-- fine-, cutting-shredding slider enabled -->
            <v-slider
            v-if="fine_checkbox"
            v-on:update:model-value="saveNewInputs()"
            class="slider"
            :color=color_main
            :thumb-color=color_main
            thumb-size="20"
            :min="0"
            :max="10"
            :step="1"
            v-model="shred_2_ml" />

            <!-- fine-, cutting-shredding slider disabled -->
            <v-slider
            v-if="!fine_checkbox"
            class="slider"
            disabled
            :color=color_main
            :thumb-color=color_main
            thumb-size="20"
            :min="0"
            :max="10"
            :step="1"
            v-model="shred_2_ml" />

            <!-- fine-, cutting-shredding percentage-text, only displayed if fine-, cutting-shredding slider enabled -->
            <p
            v-if="fine_checkbox"
            class="percentage">{{ Math.round(shred_2_ml * 10) / 10 }}%</p>
        </div>

        <!-- fine-, cutting-shredding expert-mode, enabled -->
        <Expert_mode
        v-if="waste_type === 'Cut-Off' || waste_type === 'End of Life' && fine_checkbox"
        @newExpertModeValues="newExpertModeValues($event)"
        :label=fine_expmode_label
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=false
        :expert_mode_cost_prop=shred_2_cost
        :expert_mode_gwp_prop=shred_2_gwp
        :color_main=color_main />

        <!-- fine-, cutting-shredding expert-mode, disabled -->
        <Expert_mode
        v-if="waste_type === 'End of Life' && !fine_checkbox"
        :label=fine_expmode_label
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=true
        :expert_mode_cost_prop=shred_2_cost
        :expert_mode_gwp_prop=shred_2_gwp
        :color_main=color_main />

        <br>

        <!-- transport expert-mode -->
        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=transport_label
        :tooltip_text_prop=Tooltip_texts.test
        :disabled=false
        :expert_mode_cost_prop=transport_cost
        :expert_mode_gwp_prop=transport_gwp
        :color_main=color_main />
        
    </div>

    <!-- A popup for when an invalid character has been typed into the carbon-fibre-cost textfield -->
    <v-dialog v-model=dialogOpen width="auto" close-on-content-click>
        <v-card>
            <v-card-text>
                {{ dialogText }}
            </v-card-text>
            <v-card-actions>
                <v-btn block @click="dialogOpen = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
/**
 * This component holds input-elements related to App.vue->app_input.waste, .shredding_1, .shredding_2 and .transportation.
 * Every time an input is made, every input of this component is emitted to App.vue->app_input.
 * Props:
 * app_input_prop (json): the input-json that goes into recycling.exe on the server. This input is always updated when user interacts with any of the input-elements on the input-pages.
 * waste_fine_checkbox_prop (boolean): controls wether or not the fine-shredding elements are enabled.
 * Emits:
 * saveNewInputs: whenever an input-element is interacted with, the modified values are sent to App.vue->app_input.
 */
    export default {
        props: ["app_input_prop", "color_main", "waste_fine_checkbox_prop"],
        emits: ["saveNewInputs"],
        mounted() {
            /**
             * If user made inputs previously and comes back to this site, then previous inputs are displayed in the input-elements.
             * Some variables are set, to recreate the state of the site that the user previously left.
             */
            if(this.waste_type === "End of Life" && this.size1dot5 === true) {
                this.coarse_expmode_disabled = false
            }
            if(this.waste_type === "Cut-Off") {
                this.coarse_expmode_disabled = undefined
            }
            if(this.size1dot5 && document.getElementById("waste_fine_text") !== null) document.getElementById("waste_fine_text").classList.add("pointer")
        },
        data() {
            return {
                type_options: ['Cut-Off', 'End of Life'],
                waste_type: this.app_input_prop.waste.type,
                size1dot5: this.app_input_prop.waste.size_bigger_1dot5_m,
                waste_carbon_fibre_cost: this.app_input_prop.waste.waste_carbon_fibre_euro_per_kg,
                fine_checkbox: this.waste_fine_checkbox_prop,

                shred_1_type: this.app_input_prop.shredding_1.type,
                shred_1_ml: this.app_input_prop.shredding_1.mass_loss_percent,
                shred_1_gwp: this.app_input_prop.shredding_1.co2_equv_per_kg,
                shred_1_cost: this.app_input_prop.shredding_1.euro_per_kg,
                shred_2_type: this.app_input_prop.shredding_2.type,
                shred_2_ml: this.app_input_prop.shredding_2.mass_loss_percent,
                shred_2_gwp: this.app_input_prop.shredding_2.co2_equv_per_kg,
                shred_2_cost: this.app_input_prop.shredding_2.euro_per_kg,

                transport_cost: this.app_input_prop.transport.euro_per_kg,
                transport_gwp: this.app_input_prop.transport.co2_equv_per_kg,

                coarse_expmode_label: "Coarse shredding expert mode",
                fine_expmode_label: "Fine shredding expert mode",
                transport_label: "Consider Transportation",

                coarse_expmode_disabled: true,

                dialogOpen: false,
                dialogText: ""
            }
        },
        methods: {
            toggleSizeCheckbox() {
                /**
                 * waste-size-checkbox toggles the fine-shredding-checkbox.
                 * When the fine-shredding checkbox is enabled, then its text is clickable to toggle the checkbox, the cursor is set to pointer.
                 */
                this.size1dot5 = !this.size1dot5
                this.size1dot5
                    ? document.getElementById("waste_fine_text").classList.add("pointer")
                    : document.getElementById("waste_fine_text").classList.remove("pointer")
            },
            toggleFineCheckbox() {
                /**
                 * Toggles the fine-shredding-slider.
                 */
                this.fine_checkbox = !this.fine_checkbox
            },
            handleFineMassLossText() {
                /**
                 * Handles click on fine-shredding-checkbox-text.
                 */
                if(this.size1dot5) {
                    this.toggleFineCheckbox()
                    this.updateWasteRoute()
                    this.saveNewInputs()
                }
            },
            updateWasteRoute() {
                /**
                 * Triggers when user interacts with an input-element.
                 * Some elements change when others are interacted with, some elements depend on others.
                 */
                if(this.waste_type === "End of Life") {
                    this.waste_carbon_fibre_cost = 0
                    this.shred_2_type = "Fine"
                    // this.shred_2_ml = 5.0
                    this.fine_expmode_label = "Fine shredding expert mode"

                    if(this.size1dot5) {
                        this.shred_1_type = "Coarse"
                        this.coarse_expmode_disabled = false
                        if(this.shred_1_ml === undefined) {
                            this.shred_1_ml = 5.0
                        }
                        if(this.fine_checkbox) {
                            if(this.shred_2_ml === undefined) {
                                this.shred_2_ml = 5.0
                            }
                        } else {
                            this.shred_2_type = undefined
                            this.shred_2_ml = undefined
                            this.shred_2_gwp = undefined
                            this.shred_2_cost = undefined
                        }
                    } else {
                        this.shred_1_type = undefined
                        this.shred_1_ml = undefined
                        this.coarse_expmode_disabled = true
                        this.shred_1_gwp = undefined
                        this.shred_1_cost = undefined

                        this.fine_checkbox = true
                        if(this.shred_2_ml === undefined) {
                            this.shred_2_ml = 5.0
                        }
                    }
                    
                } else if(this.waste_type === "Cut-Off") {
                    this.shred_1_type = undefined
                    this.shred_1_ml = undefined
                    this.shred_1_gwp = undefined
                    this.shred_1_cost = undefined

                    this.shred_2_type = "Cutting"
                    this.shred_2_ml = 5.0
                    this.coarse_expmode_disabled = undefined
                    this.fine_expmode_label = "Cutting expert mode"

                    this.fine_checkbox = true
                }
                // this.log()
            },
            checkCarbonFibreCostAndSave() {
                /**
                 * Checks contents of carbon-fibre-cost textfield. Pops up a message if contents are invalid. Otherwise saves input.
                 * Contents are saved in App.vue->app_input
                 */
                let isNumber = false
                let isEmpty = false
                let value = undefined
                if(this.waste_carbon_fibre_cost === "" || this.waste_carbon_fibre_cost === undefined) {
                    isEmpty = true
                } else if(!isNaN(parseFloat(String(this.waste_carbon_fibre_cost).replaceAll(",", ".")))) {
                    isNumber = true
                    value = parseFloat(String(this.waste_carbon_fibre_cost).replaceAll(",", "."))
                } else if(!isNaN(parseInt(String(this.waste_carbon_fibre_cost).replaceAll(",", ".")))) {
                    isNumber = true
                    value = parseInt(String(this.waste_carbon_fibre_cost).replaceAll(",", "."))
                }

                if(isNumber && value >= 0 || isEmpty) {
                    this.waste_carbon_fibre_cost = value
                    this.saveNewInputs()
                } else {
                    this.waste_carbon_fibre_cost = undefined
                    this.saveNewInputs()
                    this.dialogText = "Please input a positive number."
                    this.dialogOpen = true
                }
            },
            newExpertModeValues(new_values) {
                /**
                 * Handles the ExpertMode.vue emits, saves the values that come from there.
                 */
                if(new_values[2] === this.transport_label) {
                    this.transport_cost = new_values[0]
                    this.transport_gwp = new_values[1]
                } else if(new_values[2] === this.coarse_expmode_label) {
                    this.shred_1_cost = new_values[0]
                    this.shred_1_gwp = new_values[1]
                } else if(new_values[2] === this.fine_expmode_label) {
                    this.shred_2_cost = new_values[0]
                    this.shred_2_gwp = new_values[1]
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
                setTimeout(() => {
                    // this.log()
                    this.$emit(
                        "saveNewInputs",
                    {
                        waste_type: this.waste_type,
                        waste_size: this.size1dot5,
                        waste_carbon_fibre_cost: this.waste_carbon_fibre_cost,

                        shred_1_type: this.shred_1_type,
                        shred_1_ml: this.shred_1_ml,
                        shred_1_gwp: this.shred_1_gwp,
                        shred_1_cost: this.shred_1_cost,
                        shred_2_type: this.shred_2_type,
                        shred_2_ml: this.shred_2_ml,
                        shred_2_gwp: this.shred_2_gwp,
                        shred_2_cost: this.shred_2_cost,

                        transport_cost: this.transport_cost,
                        transport_gwp: this.transport_gwp,

                        waste_fine_checkbox: this.fine_checkbox
                    })
                }, 20);
            },
            log() {
                /**
                 * Logs every input-value of this component.
                 */
                console.log("waste_type:"+this.waste_type)
                console.log("waste_size:"+this.size1dot5)
                console.log("waste_carbon_fibre_cost:"+this.waste_carbon_fibre_cost)
                console.log("shred_1_type:"+this.shred_1_type)
                console.log("shred_1_ml:"+this.shred_1_ml)
                console.log("shred_1_cost:"+this.shred_1_cost)
                console.log("shred_1_gwp:"+this.shred_1_gwp)
                console.log("shred_2_type:"+this.shred_2_type)
                console.log("shred_2_ml:"+this.shred_2_ml)
                console.log("shred_2_cost:"+this.shred_2_cost)
                console.log("shred_2_gwp:"+this.shred_2_gwp)
                console.log("waste_tr_cost:"+this.transport_cost)
                console.log("waste_tr_gwp:"+this.transport_gwp)
                console.log()
            }
        }
    }
</script>