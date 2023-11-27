<script setup>
    import Tooltip from "./Tooltip.vue"
</script>

<template>

    <div class="tooltip_container">
        <!-- Switch that can open two textfields -->
        <div class="switch_container">
            <!-- Switch enabled -->
            <v-switch
            v-if="!disabled"
            class="switch"
            inset
            :label=label
            :color=color_main
            v-model="switchState"
            @click="showHideExpertMode()" />

            <!-- switch disabled -->
            <v-switch
            v-if="disabled"
            class="switch"
            disabled
            inset
            :label=label
            :color=color_main
            v-model="switchState" />
        </div>

        <Tooltip
        v-if="tooltip_text_prop !== undefined"
        :tooltip_class=exp_tooltip_class
        :tooltip_text=tooltip_text_prop />
    </div>
    
    <!-- cost textfield -->
    <v-text-field
    v-if="switchState && !disabled"
    v-model=expert_mode_cost
    @update:model-value="propagateNewValues()"
    class="textfield"
    label="€/kg part"
    single-line
    suffix="€/kg part"
    variant="solo"
    :bg-color=color_main />

    <!-- gwp textfield -->
    <v-text-field
    v-if="switchState && !disabled"
    v-model=expert_mode_gwp
    @update:model-value="propagateNewValues()"
    class="textfield"
    label="CO₂-eq./kg part"
    single-line
    suffix="CO₂-eq./kg part"
    variant="solo"
    :bg-color=color_main />

    <!-- A popup for when an invalid character has been typed into the textfields -->
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
 * In this component the user can specify the cost and global warming potential of an input-group. See app_input.
 * Props:
 * disabled (boolean): this whole component can be displayed in a disabled state.
 * expert_mode_cost_prop (number): the current cost-value in the cost-textfield.
 * expert_mode_gwp_prop (number): the current gwp-value in the gwp-textfield.
 * label (string): the label next to the switch-element.
 * tooltip_text_prop (string): text to be displayed in the tooltip.
 * Emits:
 * newExpertModeValues: whenever a new value is typed into one of the textfields, the new values are sent to App.vue and put into app_input.
 */
    export default {
        props: ["disabled", "expert_mode_cost_prop", "expert_mode_gwp_prop", "label", "color_main", "tooltip_text_prop"],
        emits: ["newExpertModeValues"],
        mounted() {
            /**
             * If values have been set by the user earlier and the user returns to the page that contains this expert-mode-component, then those previous inputs will be set and displayed.
             */
            if(this.expert_mode_cost_prop !== undefined || this.expert_mode_gwp_prop !== undefined) {
                this.switchState = true
            }
        },
        data() {
            return {
                switchState: false,
                expert_mode_cost: this.expert_mode_cost_prop,
                expert_mode_gwp: this.expert_mode_gwp_prop,

                exp_tooltip_class: "tooltip exp_mode_tooltip",

                dialogOpen: false,
                dialogText: ""
            }
        },
        methods: {
            showHideExpertMode() {
                /**
                 * Toggles the existence of the two text-fields. When text-fields cease to exist, their values are reset.
                 */
                this.switchState = !this.switchState
                // console.log(this.switchState)
                if(this.switchState === false) {
                    this.expert_mode_cost = undefined
                    this.expert_mode_gwp = undefined
                    this.propagateNewValues()
                }
            },
            propagateNewValues() {
                /**
                 * Checks contents of text-fields. Pops up a message if contents are invalid. Sends them to the parent-component if contents are numbers.
                 * Contents are then saved in App.vue->app_input
                 */
                // console.log(this.expert_mode_cost + " " + this.expert_mode_gwp)

                if(this.expert_mode_cost === undefined && this.expert_mode_gwp === undefined) {
                    // both fields empty
                    this.$emit("newExpertModeValues", [this.expert_mode_cost, this.expert_mode_gwp, this.label])
                } else if(this.expert_mode_cost === undefined && this.expert_mode_gwp !== undefined) {
                    // gwp not empty
                    if(isNaN(parseFloat(String(this.expert_mode_gwp).replaceAll(",", ".")))) {
                        // gwp not a number
                        if(this.expert_mode_gwp !== "") {
                            // if user types a number and deletes it again, then the field will be set to "". In this case the error-dialog should'nt pop up.
                            this.dialogText = "Please enter a number for 'kg CO2-eq./kg'."
                            this.dialogOpen = true
                        }
                        this.expert_mode_gwp = undefined
                        this.propagateNewValues()
                    } else {
                        this.$emit("newExpertModeValues", [this.expert_mode_cost, parseFloat(String(this.expert_mode_gwp).replaceAll(",", ".")), this.label])
                    }
                } else if(this.expert_mode_cost !== undefined && this.expert_mode_gwp === undefined) {
                    if(isNaN(parseFloat(String(this.expert_mode_cost).replaceAll(",", ".")))) {
                        if(this.expert_mode_cost !== "") {
                            this.dialogText = "Please enter a number for '€/kg'."
                            this.dialogOpen = true
                        }
                        this.expert_mode_cost = undefined
                        this.propagateNewValues()
                    } else {
                        this.$emit("newExpertModeValues", [parseFloat(String(this.expert_mode_cost).replaceAll(",", ".")), this.expert_mode_gwp, this.label])
                    }
                } else {
                    if(isNaN(parseFloat(String(this.expert_mode_cost).replaceAll(",", "."))) && isNaN(parseFloat(String(this.expert_mode_gwp).replaceAll(",", ".")))) {
                        if(this.expert_mode_cost !== "" && this.expert_mode_gwp !== "") {
                            this.dialogText = "Please enter a number for 'kg CO2-eq./kg' and '€/kg'."
                            this.dialogOpen = true
                        }
                        this.expert_mode_cost = undefined
                        this.expert_mode_gwp = undefined
                        this.propagateNewValues()
                    } else if(isNaN(parseFloat(String(this.expert_mode_cost).replaceAll(",", "."))) && !isNaN(parseFloat(String(this.expert_mode_gwp).replaceAll(",", ".")))) {
                        if(this.expert_mode_cost !== "") {
                            this.dialogText = "Please enter a number for '€/kg'."
                            this.dialogOpen = true
                        }
                        this.expert_mode_cost = undefined
                        this.propagateNewValues()
                    } else if(!isNaN(parseFloat(String(this.expert_mode_cost).replaceAll(",", "."))) && isNaN(parseFloat(String(this.expert_mode_gwp).replaceAll(",", ".")))) {
                        if(this.expert_mode_gwp !== "") {
                            this.dialogText = "Please enter a number for 'kg CO2-eq./kg'."
                            this.dialogOpen = true
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