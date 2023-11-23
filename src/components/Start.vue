<script setup>
    import router from "../router"
</script>

<template>
    <!-- centered container with set width -->
    <div class="start_area">

        <!-- company logos -->
        <div class="start_logocontainer">
            <div class="start_sublogocontainer">
                <v-img
                class="frauenhofer_logo_start"
                v-bind:src='require("../assets/frauenhofer_logo.png")'
                alt="frauenhoferIGCV_logo"
                resize="false"
                @click="redirectToIGCV()" />

                <v-img
                class="ita_logo_start"
                v-bind:src='require("../assets/ita_logo_bunt.png")'
                alt="ITA_logo"
                resize="false"
                @click="redirectToITA()" />
            </div>

            <div class="start_sublogocontainer">
                <v-img
                class="aif_logo_start"
                v-bind:src='require("../assets/aif_logo.png")'
                alt="AIF_logo"
                resize="false"
                @click="redirectToAIF()" />

                <v-img
                class="igf_logo_start"
                v-bind:src='require("../assets/igf_logo.png")'
                alt="IGF_logo"
                resize="false"
                @click="redirectToIGF()" />
            </div>
            
        </div>

        <!-- start-button -->
        <v-btn
        @click="startButton()"
        class="start_button"
        v-bind:color=color_main
        elevation="5"
        width="160px"
        height="47px"
        ><p class="start_button_text">Start</p></v-btn>

        <!-- example-button, for development purposes only, see the readme -->
        <!-- <v-btn
        style="margin-top: 10px;"
        class="start_button"
        v-bind:color=color_main
        @click="shortcut()"
        elevation="5"
        width="160px"
        height="47px"
        ><p class="start_button_text">example</p></v-btn> -->

    </div>

</template>

<script>
/**
 * Logos of companies and button to start inputting.
 */
export default {
    props: ["color_main"],
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
        redirectToIGCV() {
            window.open("https://www.igcv.fraunhofer.de/", "_blanc")
        },
        redirectToITA() {
            window.open("https://ita-augsburg.com/", "_blanc")
        },
        redirectToAIF() {
            window.open("https://www.aif.de/", "_blanc")
        },
        redirectToIGF() {
            window.open("https://www.aif.de/foerderangebote/igf-industrielle-gemeinschaftsforschung.html", "_blanc")
        },
        shortcut() {
            /**
             * Functionality that takes user to the results. Intended for development only.
             */
            router.push({name: "ResultsView"})
        }
    }
};
</script>