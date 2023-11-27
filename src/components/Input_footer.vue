<script setup>
    import router from "../router"
    import Copyright_text from "./Copyright_text.vue"
</script>

<template>

    <!-- App-footer that has buttons and a progress-bar on it for navigating the input-pages. -->

    <!-- container for defining height -->
    <div class="input_footer">

        <!-- container for centering content -->
        <div class="footer_content">

            <!-- percentage value of the progress bar. Not displayed on narrow viewport width. -->
            <p class="footer_percentage">{{ progressValue }}%</p>

            <!-- vuetify progress bar -->
            <v-progress-linear
            class="footer_progressbar"
            :bg-color=color_main
            bg-opacity="0.2"
            :color=color_main
            height="10"
            :model-value=progressValue />

            <!-- container for the buttons -->
            <div class="footer_buttoncontainer">

                <!-- back button -->

                <!-- enabled -->
                <v-btn
                v-if="id !== 'waiting' && id !== 'err' && id !== 'results'"
                icon=""
                @click="backButton()"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">‹</p></v-btn>

                <!-- disabled -->
                <v-btn
                v-if="id === 'waiting' || id === 'err' || id === 'results'"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">‹</p></v-btn>

                <!-- one button -->

                <!-- enabled, selected (maincolor) -->
                <v-btn
                v-if="id === 'waste'"
                icon=""
                :color=color_main
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">1</p></v-btn>

                <!-- enabled, not selected (grey) -->
                <v-btn
                v-if="id !== 'waste' && id !== 'waiting' && id !== 'err' && id !== 'results'"
                icon=""
                @click="handleButton('1')"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">1</p></v-btn>

                <!-- disabled, not selectable (grey) -->
                <v-btn
                v-if="id === 'waiting' || id === 'err' || id === 'results'"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">1</p></v-btn>

                <!-- two button -->
                
                <!-- enabled, selected (maincolor) -->
                <v-btn
                v-if="id === 'separation'"
                icon=""
                :color=color_main
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">2</p></v-btn>

                <!-- enabled, not selected (grey) -->
                <v-btn
                v-if="id !== 'separation' && button2enabled"
                icon=""
                @click="handleButton('2')"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">2</p></v-btn>

                <!-- disabled, not selectable (grey) -->
                <v-btn
                v-if="id !== 'separation' && !button2enabled"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">2</p></v-btn>

                <!-- three button -->

                <!-- enabled, selected (maincolor) -->
                <v-btn
                v-if="id === 'matrix'"
                icon=""
                :color=color_main
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">3</p></v-btn>

                <!-- enabled, not selected (grey) -->
                <v-btn
                v-if="id !== 'matrix' && button3enabled"
                icon=""
                @click="handleButton('3')"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">3</p></v-btn>

                <!-- disabled, not selectable (grey) -->
                <v-btn
                v-if="id !== 'matrix' && !button3enabled"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">3</p></v-btn>

                <!-- four button -->

                <!-- enabled, selected (maincolor) -->
                <v-btn
                v-if="id === 'textile'"
                icon=""
                :color=color_main
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">4</p></v-btn>

                <!-- enabled, not selected (grey) -->
                <v-btn
                v-if="id !== 'textile' && button4enabled"
                icon=""
                @click="handleButton('4')"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">4</p></v-btn>

                <!-- disabled, not selectable (grey) -->
                <v-btn
                v-if="id !== 'textile' && !button4enabled"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">4</p></v-btn>

                <!-- five button -->

                <!-- enabled, selected (maincolor) -->
                <v-btn
                v-if="id === 'processing'"
                icon=""
                :color=color_main
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">5</p></v-btn>

                <!-- enabled, not selected (grey) -->
                <v-btn
                v-if="id !== 'processing' && button5enabled"
                icon=""
                @click="handleButton('5')"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">5</p></v-btn>

                <!-- disabled, not selectable (grey) -->
                <v-btn
                v-if="id !== 'processing' && !button5enabled"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">5</p></v-btn>
                
                <!-- next button -->

                <!-- enabled -->
                <v-btn
                v-if="id !== 'waiting' && id !== 'err' && id !== 'results'"
                icon=""
                @click="nextButton()"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">›</p></v-btn>

                <!-- disabled -->
                <v-btn
                v-if="id === 'waiting' || id === 'err' || id === 'results'"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">›</p></v-btn>

            </div>

            <Copyright_text />

        </div>
    </div>

    <!-- popup for displaying error-messages that these buttons might trigger -->
    <v-dialog v-model=dialogOpen width="auto" close-on-content-click>
        <v-card>
            <v-card-text>
                {{ dialogText }}
            </v-card-text>
            <v-card-actions>
                <v-btn block @click="dialogOpen = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
/**
 * App-footer that has buttons and a progress-bar on it for navigating the input-pages.
 * Props:
 * buttonXenabled (boolean): controls wether the button is enabled or disabled. These props are updated in App.vue through the updateInputFooter emit.
 * progressValue (number, 0 to 100): controls the state of the progress bar.
 * id (string): identifies the parent-component that the Input_footer-component is in. Id-value is used by the buttons of this component.
 * Emits:
 * updateInputFooter: buttons are dynamically enabled and disabled, depending on the state of App.vue->app_input. See diagrams/oekocap_webapp_abhaengigkeiten_diagramm.png.
 */
export default {
    props: ["button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "progressValue", "id", "color_main", "color_lightgrey"],
    emits: ["updateInputFooter"],
    data: () => ({
        dialogOpen: false,
        dialogText: "",
    }),
    methods: {
        backButton() {
            /**
             * Navigates to previous input-page.
             */
            switch(this.id) {
                case "waste":
                    router.push({name:"WasteView"})
                    break
                case "separation":
                    router.push({name:"WasteView"})
                    break
                case "matrix":
                    router.push({name:"SeparationView"})
                    break
                case "textile":
                    router.push({name:"MatrixView"})
                    break
                case "processing":
                    router.push({name:"TextileView"})
                    break
                case "waiting":
                    router.push({name:"WaitingView"})
                    break
                case "err":
                    router.push({name:"ErrorView"})
                    break
            }
        },
        updateInputFooter() {
            /**
             * Sets progress-bar value.
             */
            this.$emit("updateInputFooter", undefined)
        },
        nextButton() {
            /**
             * Navigates to next input-page if user has selected every mandatory input. Else a popup pops up.
             */
            this.updateInputFooter()
            // console.log(this.button2enabled)
            switch(this.id) {
                //mandatory fields are checked in app.vue->saveNewInputs()
                //if user clicks next-button and non-mandatory fields are still undefined, they get their default value here in setDefaultValues()
                case "waste":
                    if(this.button2enabled) {
                        router.push({name:"SeparationView"})
                    } else {
                        this.dialogText = "Please choose a type before continuing."
                        this.dialogOpen = true
                    }
                    break
                case "separation":
                    if(this.button3enabled) {
                        router.push({name:"MatrixView"})

                    } else {
                        this.dialogText = "Please choose a type before continuing."
                        this.dialogOpen = true
                    }
                    break
                case "matrix":
                    if(this.button4enabled) {
                        router.push({name:"TextileView"})
                    } else {
                        this.dialogText = "Please choose a type and a polymer before continuing."
                        this.dialogOpen = true
                    }
                    break
                case "textile":
                    if(this.button5enabled) {
                        router.push({name:"ProcessingView"})
                    } else {
                        this.dialogText = "Please choose a type and throughput before continuing."
                        this.dialogOpen = true
                    }
                    break
                case "processing":
                    router.push({name:"ProcessingView"})
                    break
                case "waiting":
                    router.push({name:"WaitingView"})
                    break
                case "err":
                    router.push({name:"ErrorView"})
                    break
            }
        },
        handleButton(id) {
            /**
             * Navigates to a specific input-page.
             */
            switch(id) {
                case '1':
                    router.push({name:"WasteView"})
                    break
                case '2':
                    router.push({name:"SeparationView"})
                    break
                case '3':
                    router.push({name:"MatrixView"})
                    break
                case '4':
                    router.push({name:"TextileView"})
                    break
                case '5':
                    router.push({name:"ProcessingView"})
            }
            this.updateInputFooter()
        }
    }
};
</script>