<template>

    <div class="input_area">

        <v-select
        class="select waste_type_select"
        label="Type"
        :items=type_options
        variant="solo"
        :bg-color=color_green
        :color=color_white
        ></v-select>

        <v-checkbox
        class="checkbox waste_size_checkbox"
        label="Waste Size > 1.5m"
        :color=color_green
        ></v-checkbox>

        <v-checkbox
        class="checkbox desizing_checkbox"
        label="Desizing"
        :color=color_green
        disabled="true"
        ></v-checkbox>

        <p class="text waste_fvc_text">Fiber volume content</p>
        <v-slider
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        ></v-slider>
        <p class="percentage waste_fvc_percentage">89%</p>
        
        <v-switch
        class="switch"
        label="Consider Transportation"
        inset
        :color=color_green
        ></v-switch>

        <p class="text waste_coarse_text">Coarse Shredding - Mass loss</p>
        <v-slider
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        ></v-slider>
        <p class="percentage waste_coarse_percentage">89%</p>

        <p class="text waste_fine_text">Fine Shredding - Mass loss</p>
        <v-slider
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        ></v-slider>
        <p class="percentage waste_fine_percentage">89%</p>

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
                type_options: ['wastetype1', 'wastetype2'],
            }
        }
    }
</script>