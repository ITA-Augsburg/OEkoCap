<template>

    <div class="input_area">

        <v-select
        class="select waste_type_select"
        label="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        v-model="waste_type"
        v-on:update:model-value="updateWasteRoute()"
        ></v-select>

        <v-checkbox
        v-if="waste_type === undefined || waste_type === 'End of Life'"
        @click="updateWasteRoute()"
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
        @newExpertModeValues="getNewValues($event)"
        :label=label
        :color_green="color_green"
        :color_white="color_white"></Expert_mode>
    </div>

</template>

<script>
    import Expert_mode from "./Expert_mode.vue"
    export default {
        props: ["color_green", "color_white"],
        components: {
            Expert_mode: Expert_mode
        },
        data() {
            return {
                type_options: ['Cut-Off', 'End of Life'],
                waste_type: undefined,
                size1dot5: false,
                waste_fvc: 60.00,
                waste_coarse: 5.0,
                waste_fine: 5.0,

                transport_cost: undefined,
                transport_gwp: undefined,

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
            getNewValues(new_values) {
                this.transport_cost = new_values[0]
                this.transport_gwp = new_values[1]
                // this.log()
            },
            log() {
                console.log("waste_type:"+this.waste_type)
                console.log("waste_size:"+this.size1dot5)
                console.log("waste_fvc:"+this.waste_fvc)
                console.log("waste_coarse:"+this.waste_coarse)
                console.log("waste_fine:"+this.waste_fine)
                console.log("waste_tr_cost:"+this.transport_cost)
                console.log("waste_tr_gwp:"+this.transport_gwp)
            }
        }
    }
</script>