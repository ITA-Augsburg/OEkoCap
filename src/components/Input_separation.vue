<template>

    <div class="input_area">

        <v-select
        v-model=separation_type
        class="select separation_type_select"
        label="Type"
        :items=type_options
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
                type_options: ["Pyrolyse"],
                separation_type: undefined,

                expert_mode_cost: undefined,
                expert_mode_gwp: undefined,

                label: "Expert mode"
            }
        },
        methods: {
            getNewValues(new_values) {
                this.expert_mode_cost = new_values[0]
                this.expert_mode_gwp = new_values[1]
                // this.log()
            },
            log() {
                console.log("sep_type:" + this.separation_type)
                console.log("sep_expmode_cost:" + this.expert_mode_cost)
                console.log("sep_expmode_gwp:" + this.expert_mode_gwp)
            }
        }
    }
</script>