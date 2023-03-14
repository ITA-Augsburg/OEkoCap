<template>

    <div class="input_area">

        <v-select
        v-model=proc_type
        class="select processing_type_select"
        label="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <v-select
        v-model=proc_subtype
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
        class="select processing_wt_select"
        label="Wall thickness"
        :items=wt_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <v-select
        v-model=proc_moi
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
        :color_green="color_green"
        :color_white="color_white"></Expert_mode>

        <div class="processing_buttoncontainer">
            <div class="processing_clear_buttoncontainer">
                <v-btn
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="processing_clear_button_text">Clear all</p></v-btn>
            </div>

            <div class="processing_calc_buttoncontainer">
                <v-btn
                :color=color_green
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
        props: ["color_green", "color_white", "color_lightgrey"],
        components: {
            Expert_mode: Expert_mode
        },
        data() {
            return {
                type_options: ["processingtype1", "processingtype2"],
                subtype_options: ["processingsubtype1", "processingsubtype2"],
                wt_options: ["processingwt1", "processingwt2"],
                moi_options: ["processingmoi1", "processingmoi2"],

                proc_type: undefined,
                proc_subtype: undefined,
                proc_ml: 10,
                proc_wt: undefined,
                proc_moi: undefined,

                expert_mode_cost: undefined,
                expert_mode_gwp: undefined,

                label: "Expert mode"
            }
        },
        methods: {
            newExpertModeValues(new_values) {
                this.expert_mode_cost = new_values[0]
                this.expert_mode_gwp = new_values[1]
                this.log()
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