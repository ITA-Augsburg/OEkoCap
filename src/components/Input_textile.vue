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
                type_options: ["textiletype1", "textiletype2"],
                throughput_options: ["textilethroughput1", "textilethroughput2"],
                aw_options: ["textileaw1", "textileaw2"],

                expert_mode_cost: undefined,
                expert_mode_gwp: undefined,

                label: "Expert mode"
            }
        },
        methods: {
            getNewValues(new_values) {
                this.expert_mode_cost = new_values[0]
                this.expert_mode_gwp = new_values[1]
                this.log()
            },
            log() {
                console.log("log todo")
            }
        }
    }
</script>