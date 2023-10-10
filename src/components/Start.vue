<script setup>
    import router from "../router"
</script>

<template>

    <div class="start_area">

        <div class="start_logocontainer">
            <v-img
            class="frauenhofer_logo_start"
            v-bind:src='require("../assets/frauenhofer_logo.png")'
            alt="frauenhoferIGCV_logo"
            resize="false"></v-img>

            <v-img
            class="ita_logo_start"
            v-bind:src='require("../assets/ita_logo_bunt.png")'
            alt="ITA_logo"
            resize="false"></v-img>
        </div>

        <p class="text start_text">
            Multi-criteria calculation tool for carbon fiber recycling
        </p>

        <v-btn
        @click="startButton()"
        class="start_button"
        v-bind:color=color_green
        elevation="5"
        width="160px"
        height="47px"
        ><p class="start_button_text">Start</p></v-btn>

        <v-btn
        style="margin-top: 10px;"
        class="start_button"
        v-bind:color=color_green
        @click="shortcut()"
        elevation="5"
        width="160px"
        height="47px"
        ><p class="start_button_text">example</p></v-btn>

    </div>

</template>

<script>
/**
 * Logos of companies and button to start inputting.
 */
export default {
    props: ["color_green"],
    emits: ["clearAppInput"],
    mounted() {
        /**
         * Resets App.vue->app_input, since the user can start choosing values and then go back to the start-page.
         */
        this.$emit("clearAppInput", undefined)
    },
    data: () => ({
    }),
    methods: {
        clearAppInput() {
        /**
         * Resets App.vue->app_input, since the user can start choosing values and then go back to the start-page.
         */
            // console.log("clearAppInput emitted from Start.vue")
            this.$emit("clearAppInput", undefined)
        },
        startButton() {
            /**
             * Directs user to the first input-page.
             */
            this.clearAppInput()
            router.push({name: "WasteView"})
        },
        shortcut() {
            /**
             * Temporary button that takes user to the results.
             */
            router.push({name: "ResultsView"})
        }
    }
};
</script>