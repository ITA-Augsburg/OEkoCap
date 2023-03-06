<template>

    <v-switch
    class="switch"
    label="Expert mode"
    inset
    :color=color_green
    ></v-switch>

    <v-text-field
    class="textfield cost_textfield"
    label="€/kg"
    variant="solo"
    :bg-color=color_green
    :color=color_white
    ></v-text-field>

    <v-text-field
    class="textfield co2_textfield"
    label="kg CO2-äq./kg"
    variant="solo"
    :bg-color=color_green
    :color=color_white
    ></v-text-field>

</template>

<script>

    export default {
        props: ["color_green", "color_white"],
        data() {
            return {
            }
        }
    }
</script>