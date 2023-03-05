<template>

    <div class="input_area">

        <v-select
        class="select textile_type_select"
        label="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <p class="text textile_ml_text">Mass loss</p>
        <v-slider
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        ></v-slider>
        <p class="percentage textile_ml_percentage">89%</p>

        <v-select
        class="select textile_throughput_select"
        label="Throughput"
        :items=throughput_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <v-select
        class="select textile_aw_select"
        label="Areal weight"
        :items=aw_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <Expert_mode :color_green="color_green" :color_white="color_white"></Expert_mode>

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
                type_options: ["textiletype1", "textiletype2"],
                throughput_options: ["textilethroughput1", "textilethroughput2"],
                aw_options: ["textileaw1", "textileaw2"]
            }
        }
    }
</script>