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
        v-if="waste_type === undefined || waste_type === 'Cut-Off'"
        disabled
        class="checkbox waste_size_checkbox"
        label="Waste Size > 1.5m"
        :color=color_green
        v-model="size1dot5"
        ></v-checkbox>

        <p class="text waste_fmc_text">Fiber mass content</p>
        <v-slider
        v-on:update:model-value="saveNewInputs()"
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        :min="10.00"
        :max="100.00"
        :step="1"
        v-model="waste_fmc"
        ></v-slider>
        <p class="percentage waste_fmc_percentage">{{ waste_fmc }}%</p>

        <p v-if="waste_type === 'End of Life' && size1dot5 === true"
        class="text waste_coarse_text">Coarse Shredding - Mass loss</p>
        <p v-if="waste_type === undefined || waste_type === 'Cut-Off' || waste_type === 'End of Life' && size1dot5 === false"
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
        v-model="waste_coarse"
        ></v-slider>
        <v-slider
        v-if="waste_type === undefined || waste_type === 'Cut-Off' || waste_type === 'End of Life' && size1dot5 === false"
        disabled
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        :min="0.5"
        :max="15"
        :step="0.1"
        v-model="waste_coarse"
        ></v-slider>
        <p
        v-if="waste_type === 'End of Life' && size1dot5 === true"
        class="percentage waste_coarse_percentage">{{ waste_coarse }}%</p>

        <Expert_mode
        v-if="!coarse_expmode_disabled"
        @newExpertModeValues="newExpertModeValues($event)"
        @updateWasteUI="updateWasteUI()"
        :label=coarse_expmode_label
        :disabled=false
        :expert_mode_cost_prop=waste_coarse_cost_prop
        :expert_mode_gwp_prop=waste_coarse_gwp_prop
        :color_green=color_green
        ></Expert_mode>
        <Expert_mode
        v-if="coarse_expmode_disabled"
        :label=coarse_expmode_label
        :disabled=true
        :expert_mode_cost_prop=waste_coarse_cost_prop
        :expert_mode_gwp_prop=waste_coarse_gwp_prop
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
        v-model="waste_fine"
        ></v-slider>
        <p id="fine_percentage" class="percentage waste_fine_percentage">{{ waste_fine }}%</p>

        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=fine_expmode_label
        :disabled=false
        :expert_mode_cost_prop=waste_fine_cost_prop
        :expert_mode_gwp_prop=waste_fine_gwp_prop
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
        props: ["waste_type_prop", "waste_size_prop", "waste_fmc_prop", "waste_coarse_prop", "waste_coarse_cost_prop", "waste_coarse_gwp_prop", "waste_fine_prop", "waste_fine_cost_prop", "waste_fine_gwp_prop", "waste_transport_cost_prop", "waste_transport_gwp_prop",
        "color_green"],
        emits: ["saveNewInputs"],
        components: {
            Expert_mode: Expert_mode
        },
        mounted() {
            //reposition fine-shredding-mass-loss-percent if Coarse-exp-mode "open"
            if(this.waste_type === "End of Life" && this.size1dot5 === true) {
                this.coarse_expmode_disabled = false
            }
            if(this.coarse_cost !== undefined || this.coarse_gwp !== undefined) {
                document.getElementById("fine_percentage").classList.add("waste_fine_percentage_2")
            }
        },
        data() {
            return {
                type_options: ['Cut-Off', 'End of Life'],
                waste_type: this.waste_type_prop,
                size1dot5: this.waste_size_prop,
                waste_fmc: this.waste_fmc_prop,
                waste_coarse: this.waste_coarse_prop,
                coarse_cost: this.waste_coarse_cost_prop,
                coarse_gwp: this.waste_coarse_gwp_prop,
                waste_fine: this.waste_fine_prop,
                fine_cost: this.waste_fine_cost_prop,
                fine_gwp: this.waste_fine_gwp_prop,
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
                if(this.waste_type === "Cut-Off") {
                    this.size1dot5 = false
                    this.waste_coarse = undefined
                    this.coarse_expmode_disabled = true
                    this.coarse_cost = undefined
                    this.coarse_gwp = undefined
                    document.getElementById("fine_percentage").classList.remove("waste_fine_percentage_2")
                } else if(this.waste_type === "End of Life" && this.size1dot5 === false) {
                    this.waste_coarse = undefined
                    this.coarse_expmode_disabled = true
                    this.coarse_cost = undefined
                    this.coarse_gwp = undefined
                    document.getElementById("fine_percentage").classList.remove("waste_fine_percentage_2")
                } else if(this.waste_type === "End of Life" && this.size1dot5 === true) {
                    this.coarse_expmode_disabled = false
                    if(this.waste_coarse === undefined) {
                        this.waste_coarse = 5.0
                    }
                }
                // this.log()
            },
            newExpertModeValues(new_values) {
                if(new_values[2] === this.transport_label) {
                    this.transport_cost = new_values[0]
                    this.transport_gwp = new_values[1]
                } else if(new_values[2] === this.coarse_expmode_label) {
                    this.coarse_cost = new_values[0]
                    this.coarse_gwp = new_values[1]
                } else if(new_values[2] === this.fine_expmode_label) {
                    this.fine_cost = new_values[0]
                    this.fine_gwp = new_values[1]
                }
                this.saveNewInputs()
                // this.log()
            },
            saveNewInputs() {
                // console.log(this.waste_fmc)
                //setTimeout needed to properly update slider values
                setTimeout(() => {
                    // console.log(this.waste_fmc)
                    // this.log()
                    this.$emit(
                        "saveNewInputs",
                    {
                        waste_type: this.waste_type,
                        waste_size: this.size1dot5,
                        waste_fmc: this.waste_fmc,
                        waste_coarse: this.waste_coarse,
                        waste_coarse_cost: this.coarse_cost,
                        waste_coarse_gwp: this.coarse_gwp,
                        waste_fine: this.waste_fine,
                        waste_fine_cost: this.fine_cost,
                        waste_fine_gwp: this.fine_gwp,
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
                console.log("waste_fmc:"+this.waste_fmc)
                console.log("waste_coarse:"+this.waste_coarse)
                console.log("waste_coarse_cost:"+this.coarse_cost)
                console.log("waste_coarse_gwp:"+this.coarse_gwp)
                console.log("waste_fine:"+this.waste_fine)
                console.log("waste_fine_cost:"+this.fine_cost)
                console.log("waste_fine_gwp:"+this.fine_gwp)
                console.log("waste_tr_cost:"+this.transport_cost)
                console.log("waste_tr_gwp:"+this.transport_gwp)
                console.log()
            }
        }
    }
</script>