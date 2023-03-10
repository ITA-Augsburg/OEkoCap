<template>

    <div class="start_area">

        <div class="start_logocontainer">
            <v-img
            v-bind:src='require("../assets/frauenhofer_logo.png")'
            alt="frauenhoferIGCV_logo"
            resize="false"></v-img>

            <v-img
            v-bind:src='require("../assets/ita_logo_bunt.png")'
            alt="ITA_logo"
            resize="false"></v-img>
        </div>

        <p class="text start_text">
            Multi-criteria calculation tool for carbon fiber recycling
        </p>

        <router-link :to='{name:"WasteView"}'>
            <v-btn
            @click="clearAppInput()"
            class="start_button"
            v-bind:color=color_green
            elevation="5"
            width="160px"
            height="47px"
            ><p class="start_button_text">Start</p></v-btn>
        </router-link>

    </div>

</template>

<script>
export default {
    props: ["color_green"],
    emits: ["clearAppInput"],
    data: () => ({
    }),
    methods: {
        clearAppInput() {
            console.log("clearAppInput emitted from Start.vue")
            this.$emit("clearAppInput", undefined)
        }
    }
};
</script>