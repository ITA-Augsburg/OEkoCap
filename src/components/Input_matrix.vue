<template>

    <div class="input_area">

        <v-select
        v-model="matrix_type"
        v-on:update:model-value="[updateMatrixRoute(), saveNewInputs()]"
        class="select matrix_type_select"
        label="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <v-select
        v-model="matrix_polymer"
        v-on:update:model-value="saveNewInputs()"
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
        v-on:update:model-value="saveNewInputs()"
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
        v-on:update:model-value="saveNewInputs()"
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
        :disabled=false
        :color_green="color_green"
        :color_white="color_white"
        :expert_mode_cost_prop="matrix_cost_prop"
        :expert_mode_gwp_prop="matrix_gwp_prop"></Expert_mode>

    </div>

</template>

<script>
    import Expert_mode from "./Expert_mode.vue"
    export default {
        props: ["matrix_thermo_type_prop", "matrix_polymer_prop", "matrix_fvc_prop", "matrix_insertion_prop", "matrix_cost_prop", "matrix_gwp_prop",
        "color_green", "color_white"],
        emits: ["saveNewInputs"],
        components: {
            Expert_mode: Expert_mode
        },
        mounted() {
            if(this.matrix_type === "Thermoplast") {
                this.polymer_options = ["PP", "PA6", "PET", "PLA"]
            } else if(this.matrix_type === "Thermoset") {
                this.polymer_options = ["EP"]
            }
        },
        data() {
            return {
                type_options: ["Thermoplast", "Thermoset"],
                polymer_options: [""],

                matrix_type: this.matrix_thermo_type_prop,
                matrix_polymer: this.matrix_polymer_prop,
                matrix_fvc: this.matrix_fvc_prop,
                matrix_insertion: this.matrix_insertion_prop,

                expert_mode_cost: this.matrix_cost_prop,
                expert_mode_gwp: this.matrix_gwp_prop,

                label: "Expert mode"
            }
        },
        methods: {
            updateMatrixRoute() {
                if(this.matrix_type === "Thermoplast") {
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
                        matrix_type: this.matrix_type,
                        matrix_polymer: this.matrix_polymer,
                        matrix_fvc: this.matrix_fvc,
                        matrix_insertion: this.matrix_insertion,
                        matrix_cost: this.expert_mode_cost,
                        matrix_gwp: this.expert_mode_gwp
                    })
                }, 20);
            },
            log() {
                console.log("matrix_type:" + this.matrix_type)
                console.log("matrix_polymer:" + this.matrix_polymer)
                console.log("matrix_fvc:" + this.matrix_fvc)
                console.log("matrix_insertion:" + this.matrix_insertion)
                console.log("matrix_cost:" + this.expert_mode_cost)
                console.log("matrix_gwp:" + this.expert_mode_gwp)
            }
        }
    }
</script>