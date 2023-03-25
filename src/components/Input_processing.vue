<template>

    <div class="input_area">

        <v-select
        v-model=proc_type
        v-on:update:model-value="[saveNewInputs()]"
        class="select processing_type_select"
        label="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <v-select
        v-model=proc_subtype
        v-on:update:model-value="[saveNewInputs()]"
        class="select processing_subtype_select"
        label="Subtype"
        :items=subtype_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <p class="text processing_ml_text">Mass loss</p>
        <v-slider
        v-model=proc_ml
        v-on:update:model-value="[saveNewInputs()]"
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        :min="0.5"
        :max="40"
        :step="0.1"
        ></v-slider>
        <p class="percentage processing_ml_percentage">{{ proc_ml }}%</p>

        <v-select
        v-model=proc_wt
        v-on:update:model-value="[saveNewInputs()]"
        class="select processing_wt_select"
        label="Wall thickness"
        :items=wt_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <v-select
        v-model=proc_moi
        v-on:update:model-value="[saveNewInputs()]"
        class="select processing_moi_select"
        label="Method of insertion"
        :items=moi_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <Expert_mode
        @newExpertModeValues="newExpertModeValues($event)"
        :label=label
        :disabled=false
        :color_green=color_green
        :color_white=color_white
        :expert_mode_cost_prop=proc_1_cost_prop
        :expert_mode_gwp_prop=proc_1_gwp_prop></Expert_mode>

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
    import Expert_mode from "./Expert_mode.vue"
    export default {
        props: ["proc_1_type_prop", "proc_1_ml_prop", "proc_1_wt_prop", "proc_1_cost_prop", "proc_1_gwp_prop", "proc_2_type_prop", "matrix_thermo_type_prop", "matrix_insertion_prop",
        "buttonCalculateEnabled", "color_green", "color_white", "color_lightgrey", "color_darkgreen"],
        emits: ["saveNewInputs"],
        components: {
            Expert_mode: Expert_mode
        },
        data() {
            return {
                type_options: [""],
                subtype_options: [""],
                wt_options: [""],
                moi_options: [""],

                proc_type: this.proc_1_type_prop,
                proc_subtype: this.proc_2_type_prop,
                proc_ml: this.proc_1_ml_prop,
                proc_wt: this.proc_1_wt_prop,
                proc_moi: undefined,

                expert_mode_cost: this.proc_1_cost_prop,
                expert_mode_gwp: this.proc_1_gwp_prop,

                label: "Expert mode"
            }
        },
        mounted() {
            //set select-options based on matrix-thermotype and matrix-insertion
            if(this.matrix_thermo_type_prop === "Thermoplast" && this.matrix_insertion_prop === true) {
                this.type_options = ["Isothermal forming"]
                this.subtype_options = ["Double belt press and organosheet heating + forming"]
                this.wt_options = [0.5, 1, 2]
                this.moi_options = ["Thermoplastfiber"]
            } else if(this.matrix_thermo_type_prop === "Thermoplast" && this.matrix_insertion_prop === false) {
                this.type_options = ["Isothermal forming"]
                this.subtype_options = ["Double belt press and organosheet heating + forming"]
                this.wt_options = [0.5, 1, 2]
                this.moi_options = ["Thermoplast powder", "Thermoplast foil"]
            } else if(this.matrix_thermo_type_prop === "Thermoset") {
                this.type_options = ["Wet compression moulding", "Resin transfer moulding"]
                this.subtype_options = [""]
                this.wt_options = [0.5, 1, 2]
                this.moi_options = ["Thermoset (liquid)"]
            }
        },
        methods: {
            newExpertModeValues(new_values) {
                this.expert_mode_cost = new_values[0]
                this.expert_mode_gwp = new_values[1]
                this.saveNewInputs()
                this.log()
            },
            saveNewInputs() {
                //setTimeout needed to properly update slider values
                setTimeout(() => {
                    // this.log()
                    this.$emit(
                        "saveNewInputs",
                    {
                        proc_type: this.proc_type,
                        proc_subtype: this.proc_subtype,
                        proc_ml: this.proc_ml,
                        proc_wt: this.proc_wt,
                        proc_moi: this.proc_moi,
                        proc_cost: this.expert_mode_cost,
                        proc_gwp: this.expert_mode_gwp
                    })
                }, 20);
            },
            log() {
                console.log("proc_type:" + this.proc_type)
                console.log("proc_subtype:" + this.proc_subtype)
                console.log("proc_ml:" + this.proc_ml)
                console.log("proc_wt:" + this.proc_wt)
                console.log("proc_moi:" + this.proc_moi)
                console.log("proc_expmode_cost:" + this.expert_mode_cost)
                console.log("proc_expmode_gwp:" + this.expert_mode_gwp)
            }
        }
    }
</script>