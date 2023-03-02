<template>

    <div class="input_area">

        <v-select
        class="select type_select"
        label="Type"
        :items=type_options
        variant="solo"
        density="comfortable"
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

        <p class="text fiber_text">Fiber volume content</p>
        <v-slider
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        ></v-slider>
        <p class="percentage fiber_percentage">89%</p>
        
        <v-switch
        class="switch"
        label="Consider Transportation"
        inset
        :color=color_green
        ></v-switch>

        <p class="text coarse_text">Coarse Shredding - Mass loss</p>
        <v-slider
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        ></v-slider>
        <p class="percentage coarse_percentage">89%</p>

        <p class="text fine_text">Fine Shredding - Mass loss</p>
        <v-slider
        class="slider"
        :color=color_green
        :thumb-color=color_green
        thumb-size="20"
        ></v-slider>
        <p class="percentage fine_percentage">89%</p>

        <v-switch
        class="switch"
        label="Expert mode"
        inset
        :color=color_green
        ></v-switch>

    </div>

</template>

<script>
    export default {
        props: ["color_green", "color_white"],
        data() {
            return {
                type_options: ['Cut-Off', 'End of Life'],
            }
        }
    }
</script>