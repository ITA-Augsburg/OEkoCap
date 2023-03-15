<template>

    <div class="input_area">

        <v-select
        class="select waste_type_select"
        label="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        v-model=this.waste_type
        v-on:update:model-value="[updateWasteRoute(), saveNewInputs()]"
        ></v-select>

        <v-checkbox
        v-if="waste_type === undefined || waste_type === 'End of Life'"
        @click="[updateWasteRoute(), saveNewInputs()]"
        class="checkbox waste_size_checkbox"
        label="Waste Size > 1.5m"
        :color=color_green
        v-model="size1dot5"
        ></v-checkbox>

        <v-checkbox
        v-if="waste_type === 'Cut-Off'"
        disabled
        class="checkbox waste_size_checkbox"
        label="Waste Size > 1.5m"
        :color=color_green
        v-model="size1dot5"
        ></v-checkbox>

        <p class="text waste_fvc_text">Fiber volume content</p>
        <v-slider
        v-on:update:model-value="saveNewInputs()"
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        :min="10.00"
        :max="100.00"
        :step="1"
        v-model="waste_fvc"
        ></v-slider>
        <p class="percentage waste_fvc_percentage">{{ waste_fvc }}%</p>

        <p
        class="text waste_coarse_text">Coarse Shredding - Mass loss</p>
        <v-slider
        v-if="waste_type === undefined || waste_type === 'End of Life' && size1dot5 === true"
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
        v-if="waste_type === 'Cut-Off' || waste_type === 'End of Life' && size1dot5 === false"
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
        v-if="this.waste_coarse !== undefined"
        class="percentage waste_coarse_percentage">{{ waste_coarse }}%</p>

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
        <p class="percentage waste_fine_percentage">{{ waste_fine }}%</p>

        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=label
        :expert_mode_cost_prop="waste_transport_cost_prop"
        :expert_mode_gwp_prop="waste_transport_gwp_prop"
        :color_green="color_green"
        :color_white="color_white"
        ></Expert_mode>
        
    </div>

</template>

<script>
    import Expert_mode from "./Expert_mode.vue"
    export default {
        props: ["waste_type_prop", "waste_size_prop", "waste_fvc_prop", "waste_coarse_prop", "waste_fine_prop", "waste_transport_cost_prop", "waste_transport_gwp_prop",
        "color_green", "color_white"],
        emits: ["saveNewInputs"],
        components: {
            Expert_mode: Expert_mode
        },
        data() {
            return {
                type_options: ['Cut-Off', 'End of Life'],
                waste_type: this.waste_type_prop,
                size1dot5: this.waste_size_prop,
                waste_fvc: this.waste_fvc_prop,
                waste_coarse: this.waste_coarse_prop,
                waste_fine: this.waste_fine_prop,

                transport_cost: this.waste_transport_cost_prop,
                transport_gwp: this.waste_transport_gwp_prop,

                label: "Consider Transportation"
            }
        },
        methods: {
            updateWasteRoute() {
                this.size1dot5 = !this.size1dot5
                if(this.waste_type === "Cut-Off") {
                    this.size1dot5 = false
                    this.waste_coarse = undefined
                } else if(this.waste_type === "End of Life" && this.size1dot5 === false) {
                    this.waste_coarse = undefined
                } else if(this.waste_type === "End of Life" && this.size1dot5 === true) {
                    if(this.waste_coarse === undefined) {
                        this.waste_coarse = 5.0
                    }
                }
                // this.log()
            },
            newExpertModeValues(new_values) {
                this.transport_cost = new_values[0]
                this.transport_gwp = new_values[1]
                this.$emit(
                        "saveNewInputs",
                    {
                        waste_type: this.waste_type,
                        waste_size: this.size1dot5,
                        waste_fvc: this.waste_fvc,
                        waste_coarse: this.waste_coarse,
                        waste_fine: this.waste_fine,
                        transport_cost: this.transport_cost,
                        transport_gwp: this.transport_gwp
                    })
                // this.log()
            },
            saveNewInputs() {
                // console.log(this.waste_fvc)
                setTimeout(() => {
                    // console.log(this.waste_fvc)
                    // this.log()
                    this.$emit(
                        "saveNewInputs",
                    {
                        waste_type: this.waste_type,
                        waste_size: this.size1dot5,
                        waste_fvc: this.waste_fvc,
                        waste_coarse: this.waste_coarse,
                        waste_fine: this.waste_fine,
                        transport_cost: this.transport_cost,
                        transport_gwp: this.transport_gwp
                    })
                }, 20);
            },
            log() {
                console.log("waste_type:"+this.waste_type)
                console.log("waste_size:"+this.size1dot5)
                console.log("waste_fvc:"+this.waste_fvc)
                console.log("waste_coarse:"+this.waste_coarse)
                console.log("waste_fine:"+this.waste_fine)
                console.log("waste_tr_cost:"+this.transport_cost)
                console.log("waste_tr_gwp:"+this.transport_gwp)
                console.log()
            }
        }
    }
</script>