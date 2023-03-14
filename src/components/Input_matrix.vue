<template>

    <div class="input_area">

        <v-select
        v-model="matrix_type"
        v-on:update:model-value="updateMatrixRoute()"
        class="select matrix_type_select"
        label="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <v-select
        v-model="matrix_polymer"
        class="select matrix_polymer_select"
        label="Polymer"
        :items=polymer_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <p class="text matrix_fvc_text">Fiber volume content</p>
        <v-slider
        v-model="matrix_fvc"
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        :min="5"
        :max="35"
        :step="1"
        ></v-slider>
        <p class="percentage matrix_fvc_percentage">{{ matrix_fvc }}%</p>

        <v-checkbox
        v-if="matrix_type !== 'Thermoset'"
        v-model="matrix_insertion"
        class="checkbox matrix_iip_checkbox"
        label="Insert matrix as fibers in textile process"
        :color=color_green
        ></v-checkbox>
        <v-checkbox
        v-if="matrix_type === 'Thermoset'"
        disabled
        class="checkbox matrix_iip_checkbox"
        label="Insert matrix as fibers in textile process"
        :color=color_green
        ></v-checkbox>

        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
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
                type_options: ["Thermoplast", "Thermoset"],
                polymer_options: [""],

                matrix_type: undefined,
                matrix_polymer: undefined,
                matrix_fvc: 25,
                matrix_insertion: false,

                expert_mode_cost: undefined,
                expert_mode_gwp: undefined,

                label: "Expert mode"
            }
        },
        methods: {
            updateMatrixRoute() {
                if(this.matrix_type === "Thermoplast" && this.matrix_insertion === true) {
                    this.polymer_options = ["PP", "PA6", "PET", "PLA"]
                    this.matrix_polymer = undefined
                } else if(this.matrix_type === "Thermoplast" && this.matrix_insertion === false) {
                    this.polymer_options = ["PP", "PA6", "PET", "PLA"]
                    this.matrix_polymer = undefined
                } else if(this.matrix_type === "Thermoset") {
                    this.polymer_options = ["EP"]
                    this.matrix_polymer = undefined
                    this.matrix_insertion = false
                }
            },
            newExpertModeValues(new_values) {
                this.expert_mode_cost = new_values[0]
                this.expert_mode_gwp = new_values[1]
                this.log()
            },
            log() {
                console.log("matrix_type:" + this.matrix_type)
                console.log("matrix_polymer:" + this.matrix_polymer)
                console.log("matrix_fvc:" + this.matrix_fvc)
                console.log("matrix_insertion:" + this.matrix_insertion)
                console.log("matrix_expmode_cost:" + this.expert_mode_cost)
                console.log("matrix_expmode_gwp:" + this.expert_mode_gwp)
            }
        }
    }
</script>