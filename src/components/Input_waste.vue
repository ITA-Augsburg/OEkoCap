<template>

    <div class="input_area">

        <v-select
        class="select waste_type_select"
        label="Type"
        single-line
        suffix="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        v-model=this.waste_type
        v-on:update:model-value="[updateWasteRoute(), saveNewInputs()]"
        ></v-select>

        <v-checkbox
        v-if="waste_type === 'End of Life'"
        @click="[updateWasteRoute(), saveNewInputs()]"
        class="checkbox waste_size_checkbox"
        label="Waste Size > 1.5m"
        :color=color_green
        v-model="size1dot5"
        ></v-checkbox>
        <v-checkbox
        v-if="waste_type === undefined"
        disabled
        class="checkbox waste_size_checkbox"
        label="Waste Size > 1.5m"
        :color=color_green
        v-model="size1dot5"
        ></v-checkbox>

        <p v-if="waste_type === 'End of Life' && size1dot5 === true"
        class="text waste_coarse_text">Coarse Shredding - Mass loss</p>
        <p v-if="waste_type === undefined || waste_type === 'End of Life' && size1dot5 === false"
        class="text waste_coarse_text waste_coarse_text_disabled">Coarse Shredding - Mass loss</p>

        <v-slider
        v-if="waste_type === 'End of Life' && size1dot5 === true"
        v-on:update:model-value="saveNewInputs()"
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        :min="0.5"
        :max="15"
        :step="0.1"
        v-model="shred_1_ml"
        ></v-slider>
        <v-slider
        v-if="waste_type === undefined || waste_type === 'End of Life' && size1dot5 === false"
        disabled
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        :min="0.5"
        :max="15"
        :step="0.1"
        v-model="shred_1_ml"
        ></v-slider>
        <p
        v-if="waste_type === 'End of Life' && size1dot5 === true"
        class="percentage waste_coarse_percentage">{{ Math.round(shred_1_ml * 10) / 10 }}%</p>

        <Expert_mode
        v-if="!coarse_expmode_disabled && coarse_expmode_disabled !== undefined"
        @newExpertModeValues="newExpertModeValues($event)"
        @updateWasteUI="updateWasteUI()"
        :label=coarse_expmode_label
        :disabled=false
        :expert_mode_cost_prop=shred_1_cost_prop
        :expert_mode_gwp_prop=shred_1_gwp_prop
        :color_green=color_green
        ></Expert_mode>
        <Expert_mode
        v-if="coarse_expmode_disabled && coarse_expmode_disabled !== undefined"
        :label=coarse_expmode_label
        :disabled=true
        :expert_mode_cost_prop=shred_1_cost_prop
        :expert_mode_gwp_prop=shred_1_gwp_prop
        :color_green=color_green
        ></Expert_mode>

        <p class="text waste_fine_text">Fine Shredding - Mass loss</p>
        <v-slider
        v-on:update:model-value="saveNewInputs()"
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        :min="0.5"
        :max="15"
        :step="0.1"
        v-model="shred_2_ml"
        ></v-slider>
        <p id="fine_percentage" class="percentage waste_fine_percentage">{{ Math.round(shred_2_ml * 10) / 10 }}%</p>

        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=fine_expmode_label
        :disabled=false
        :expert_mode_cost_prop=shred_2_cost_prop
        :expert_mode_gwp_prop=shred_2_gwp_prop
        :color_green=color_green
        ></Expert_mode>

        <br>

        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=transport_label
        :disabled=false
        :expert_mode_cost_prop=waste_transport_cost_prop
        :expert_mode_gwp_prop=waste_transport_gwp_prop
        :color_green=color_green
        ></Expert_mode>
        
    </div>

</template>

<script>
    import Expert_mode from "./Expert_mode.vue"
    export default {
        props: ["waste_type_prop", "waste_size_prop",

        "shred_1_type_prop", "shred_1_ml_prop", "shred_1_gwp_prop", "shred_1_cost_prop", "shred_2_type_prop", "shred_2_ml_prop", "shred_2_gwp_prop", "shred_2_cost_prop",

        "waste_transport_cost_prop", "waste_transport_gwp_prop",
        "color_green"],
        emits: ["saveNewInputs"],
        components: {
            Expert_mode: Expert_mode
        },
        mounted() {
            //reposition fine-shredding-mass-loss-percent if Coarse-exp-mode "open"
            if(this.waste_type === "End of Life" && this.size1dot5 === true) {
                this.coarse_expmode_disabled = false
                if(this.shred_1_cost !== undefined || this.shred_1_gwp !== undefined) {
                    document.getElementById("fine_percentage").classList.add("waste_fine_percentage_2")
                }
            }
            if(this.waste_type === "Cut-Off") {
                document.getElementById("fine_percentage").classList.add("waste_fine_percentage_3")
                this.coarse_expmode_disabled = undefined
            }
            if(this.shred_2_ml === undefined) {
                this.shred_2_ml = 5.0
            }
        },
        data() {
            return {
                type_options: ['Cut-Off', 'End of Life'],
                waste_type: this.waste_type_prop,
                size1dot5: this.waste_size_prop,

                shred_1_type: this.shred_1_type_prop,
                shred_1_ml: this.shred_1_ml_prop,
                shred_1_gwp: this.shred_1_gwp_prop,
                shred_1_cost: this.shred_1_cost_prop,
                shred_2_type: this.shred_2_type_prop,
                shred_2_ml: this.shred_2_ml_prop,
                shred_2_gwp: this.shred_2_gwp_prop,
                shred_2_cost: this.shred_2_cost_prop,

                transport_cost: this.waste_transport_cost_prop,
                transport_gwp: this.waste_transport_gwp_prop,

                coarse_expmode_label: "Coarse shredding expert mode",
                fine_expmode_label: "Fine shredding expert mode",
                transport_label: "Consider Transportation",

                coarse_expmode_disabled: true
            }
        },
        methods: {
            updateWasteRoute() {
                this.size1dot5 = !this.size1dot5
                if(this.waste_type === "Cut-Off" || this.waste_type === "End of Life" && this.size1dot5 === false) {
                    this.shred_1_type = undefined
                    this.shred_1_ml = undefined
                    this.coarse_expmode_disabled = true
                    this.shred_1_gwp = undefined
                    this.shred_1_cost = undefined
                    document.getElementById("fine_percentage").classList.remove("waste_fine_percentage_2")
                    document.getElementById("fine_percentage").classList.remove("waste_fine_percentage_3")
                    if(this.waste_type === "Cut-Off") {
                        this.shred_2_type = "Fine"
                        this.shred_2_ml = 5.0
                        this.coarse_expmode_disabled = undefined
                        document.getElementById("fine_percentage").classList.add("waste_fine_percentage_3")
                    }
                    if(this.waste_type === "End of Life") {
                        this.shred_2_type = "Fine"
                        // this.shred_2_ml = 5.0
                    }
                } else if(this.waste_type === "End of Life" && this.size1dot5 === true) {
                    this.shred_1_type = "Coarse"
                    this.shred_2_type = "Fine"
                    this.coarse_expmode_disabled = false
                    document.getElementById("fine_percentage").classList.remove("waste_fine_percentage_2")
                    document.getElementById("fine_percentage").classList.remove("waste_fine_percentage_3")
                    if(this.shred_1_ml === undefined) {
                        this.shred_1_ml = 5.0
                    }
                }
                // this.log()
            },
            newExpertModeValues(new_values) {
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
                //setTimeout needed to properly update slider values
                setTimeout(() => {
                    // this.log()
                    this.$emit(
                        "saveNewInputs",
                    {
                        waste_type: this.waste_type,
                        waste_size: this.size1dot5,

                        shred_1_type: this.shred_1_type,
                        shred_1_ml: this.shred_1_ml,
                        shred_1_gwp: this.shred_1_gwp,
                        shred_1_cost: this.shred_1_cost,
                        shred_2_type: this.shred_2_type,
                        shred_2_ml: this.shred_2_ml,
                        shred_2_gwp: this.shred_2_gwp,
                        shred_2_cost: this.shred_2_cost,

                        transport_cost: this.transport_cost,
                        transport_gwp: this.transport_gwp
                    })
                }, 20);
            },
            updateWasteUI() {
                document.getElementById("fine_percentage").classList.toggle("waste_fine_percentage_2")
            },
            log() {
                console.log("waste_type:"+this.waste_type)
                console.log("waste_size:"+this.size1dot5)
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