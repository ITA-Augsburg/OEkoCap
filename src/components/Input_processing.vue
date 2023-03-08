<template>

    <div class="input_area">

        <v-select
        class="select processing_type_select"
        label="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <v-select
        class="select processing_subtype_select"
        label="Subtype"
        :items=subtype_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <p class="text processing_ml_text">Mass loss</p>
        <v-slider
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        ></v-slider>
        <p class="percentage processing_ml_percentage">89%</p>

        <v-select
        class="select processing_wt_select"
        label="Wall thickness"
        :items=wt_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <v-select
        class="select processing_moi_select"
        label="Method of insertion"
        :items=moi_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <Expert_mode
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

                label: "Expert mode"
            }
        }
    }
</script>