<template>

    <div class="input_area">

        <v-select
        v-model=textile_type
        v-on:update:model-value="[updateTextileRoute(), saveNewInputs()]"
        class="select textile_type_select"
        label="Type"
        single-line
        suffix="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        ></v-select>

        <p class="text textile_ml_text">Mass loss</p>
        <v-slider
        v-if="textile_type === undefined"
        disabled
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        ></v-slider>
        <v-slider
        v-if="textile_type !== undefined"
        v-model=textile_ml
        v-on:update:model-value="saveNewInputs()"
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        :min=ml_options[0]
        :max=ml_options[1]
        :step=ml_options[2]
        ></v-slider>
        <p v-if="textile_type !== undefined" class="percentage textile_ml_percentage">{{ textile_ml }}%</p>

        <v-select
        v-model=textile_tp
        v-on:update:model-value="saveNewInputs()"
        class="select textile_throughput_select"
        label="Throughput"
        single-line
        suffix="Throughput"
        :items=throughput_options
        variant="solo"
        :bg-color=color_lightgrey
        ></v-select>

        <v-select
        v-model=textile_aw
        v-on:update:model-value="saveNewInputs()"
        class="select textile_aw_select"
        label="Areal weight"
        single-line
        suffix="Areal weight"
        :items=aw_options
        variant="solo"
        :bg-color=color_lightgrey
        ></v-select>

        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=label
        :disabled=false
        :color_green=color_green
        :expert_mode_cost_prop=textile_cost_prop
        :expert_mode_gwp_prop=textile_gwp_prop></Expert_mode>

    </div>

</template>

<script>
    import Expert_mode from "./Expert_mode.vue"
    export default {
        props: ["matrix_insertion_prop", "waste_coarse_prop", "waste_fine_prop",
        "textile_type_prop", "textile_ml_prop", "textile_tp_prop", "textile_aw_prop", "textile_cost_prop", "textile_gwp_prop",
        "color_green", "color_lightgrey"],
        emits: ["saveNewInputs"],
        components: {
            Expert_mode: Expert_mode
        },
        data() {
            return {
                type_options: ["Dry-laid", "Air-laid", "Wet-laid"],
                ml_options: [0, 0, 0],
                throughput_options: [""],
                aw_options: [""],

                textile_type: this.textile_type_prop,
                textile_ml: this.textile_ml_prop,
                textile_tp: this.textile_tp_prop,
                textile_aw: this.textile_aw_prop,

                expert_mode_cost: this.textile_cost_prop,
                expert_mode_gwp: this.textile_gwp_prop,

                label: "Expert mode"
            }
        },
        mounted() {
            if(this.matrix_insertion_prop) {
                if(this.waste_coarse_prop === undefined && this.waste_fine_prop !== undefined ||
                this.waste_coarse_prop !== undefined && this.waste_fine_prop !== undefined) {
                    this.type_options = ["Wet-laid with Thermoplastfiber"]
                } else {
                    this.type_options = ["Dry-laid with Thermoplastfiber", "Air-laid with Thermoplastfiber", "Wet-laid with Thermoplastfiber"]
                }
            } else {
                if(this.waste_coarse_prop === undefined && this.waste_fine_prop !== undefined ||
                this.waste_coarse_prop !== undefined && this.waste_fine_prop !== undefined) {
                    this.type_options = ["Wet-laid"]
                } else {
                    this.type_options = ["Dry-laid", "Air-laid", "Wet-laid"]
                }
            }
            if(this.textile_type === "Dry-laid" || this.textile_type === "Dry-laid with Thermoplastfiber") {
                    this.ml_options = [5, 15, 5]
                    this.throughput_options = [20, 40, 60]
                    this.aw_options = [100, 250, 500, 1000]
                } else if(this.textile_type === "Air-laid" || this.textile_type === "Air-laid with Thermoplastfiber") {
                    this.ml_options = [5, 15, 5]
                    this.throughput_options = [120]
                    this.aw_options = [300, 500, 800]
                } else if(this.textile_type === "Wet-laid" || this.textile_type === "Wet-laid with Thermoplastfiber") {
                    this.ml_options = [2, 5, 3]
                    this.throughput_options = [30, 59, 119]
                    this.aw_options = [50, 100, 200]
                }
        },
        methods: {
            updateTextileRoute() {
                if(this.textile_type === "Dry-laid" || this.textile_type === "Dry-laid with Thermoplastfiber") {
                    this.ml_options = [5, 15, 5]
                    this.throughput_options = [20, 40, 60]
                    this.aw_options = [100, 250, 500, 1000]
                    this.textile_ml = 5
                    this.textile_tp = undefined
                    this.textile_aw = undefined
                } else if(this.textile_type === "Air-laid" || this.textile_type === "Air-laid with Thermoplastfiber") {
                    this.ml_options = [5, 15, 5]
                    this.throughput_options = [120]
                    this.aw_options = [300, 500, 800]
                    this.textile_ml = 5
                    this.textile_tp = undefined
                    this.textile_aw = undefined
                } else if(this.textile_type === "Wet-laid" || this.textile_type === "Wet-laid with Thermoplastfiber") {
                    this.ml_options = [2, 5, 3]
                    this.throughput_options = [30, 59, 119]
                    this.aw_options = [50, 100, 200]
                    this.textile_ml = 5
                    this.textile_tp = undefined
                    this.textile_aw = undefined
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
                        textile_type: this.textile_type,
                        textile_ml: this.textile_ml,
                        textile_tp: this.textile_tp,
                        textile_aw: this.textile_aw,
                        textile_cost: this.expert_mode_cost,
                        textile_gwp: this.expert_mode_gwp
                    })
                }, 20);
            },
            log() {
                console.log("textile_type:" + this.textile_type)
                console.log("textile_ml:" + this.textile_ml)
                console.log("textile_tp:" + this.textile_tp)
                console.log("textile_aw:" + this.textile_aw)
                console.log("textile_expmode_cost:" + this.expert_mode_cost)
                console.log("textile_expmode_gwp:" + this.expert_mode_gwp)
            }
        }
    }
</script>