<template>

    <div class="input_area">

        <v-select
        class="select matrix_type_select"
        label="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <v-select
        class="select matrix_polymer_select"
        label="Polymer"
        :items=polymer_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <p class="text matrix_fvc_text">Fiber volume content</p>
        <v-slider
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        ></v-slider>
        <p class="percentage matrix_fvc_percentage">89%</p>

        <v-checkbox
        class="checkbox matrix_iip_checkbox"
        label="Insert matrix as fibers in textile process"
        :color=color_green
        ></v-checkbox>

        <Expert_mode
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
                type_options: ["matrixtype1", "matrixtype2"],
                polymer_options: ["matrixpolymer1", "matrixpolymer2"],

                label: "Expert mode"
            }
        }
    }
</script>