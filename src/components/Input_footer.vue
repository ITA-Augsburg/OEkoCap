<script setup>
    import router from "../router"
    import Copyright_text from "./Copyright_text.vue"
</script>

<template>

    <!-- App-footer that has buttons and a progress-bar on it for navigating the input-pages. -->
    <div class="input_footer">
        <div class="footer_content">

            <p class="footer_percentage">{{ progressValue }}%</p>

            <v-progress-linear
                class="footer_progressbar"
                :bg-color=color_main
                bg-opacity="0.2"
                :color=color_main
                height="10"
                :model-value=progressValue
            >
            </v-progress-linear>

            <div class="footer_buttoncontainer">

                <!-- BUTTON BACK -->
                <v-btn
                v-if="id !== 'waiting' && id !== 'err' && id !== 'results'"
                icon=""
                @click="backButton()"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">‹</p></v-btn>
                <v-btn
                v-if="id === 'waiting' || id === 'err' || id === 'results'"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">‹</p></v-btn>

                <!-- BUTTON 1 -->
                <v-btn
                v-if="id === 'waste'"
                icon=""
                :color=color_main
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">1</p></v-btn>
                <v-btn
                v-if="id !== 'waste' && id !== 'waiting' && id !== 'err' && id !== 'results'"
                icon=""
                @click="handleButton('1')"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">1</p></v-btn>
                <v-btn
                v-if="id === 'waiting' || id === 'err' || id === 'results'"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">1</p></v-btn>

                <!-- BUTTON 2 -->
                <v-btn
                v-if="id === 'separation'"
                icon=""
                :color=color_main
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">2</p></v-btn>
                <v-btn
                v-if="id !== 'separation' && button2enabled"
                icon=""
                @click="handleButton('2')"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">2</p></v-btn>
                <v-btn
                v-if="id !== 'separation' && !button2enabled"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">2</p></v-btn>

                <!-- BUTTON 3 -->
                <v-btn
                v-if="id === 'matrix'"
                icon=""
                :color=color_main
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">3</p></v-btn>
                <v-btn
                v-if="id !== 'matrix' && button3enabled"
                icon=""
                @click="handleButton('3')"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">3</p></v-btn>
                <v-btn
                v-if="id !== 'matrix' && !button3enabled"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">3</p></v-btn>

                <!-- BUTTON 4 -->
                <v-btn
                v-if="id === 'textile'"
                icon=""
                :color=color_main
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">4</p></v-btn>
                <v-btn
                v-if="id !== 'textile' && button4enabled"
                icon=""
                @click="handleButton('4')"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">4</p></v-btn>
                <v-btn
                v-if="id !== 'textile' && !button4enabled"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">4</p></v-btn>

                <!-- BUTTON 5 -->
                <v-btn
                v-if="id === 'processing'"
                icon=""
                :color=color_main
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">5</p></v-btn>
                <v-btn
                v-if="id !== 'processing' && button5enabled"
                icon=""
                @click="handleButton('5')"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">5</p></v-btn>
                <v-btn
                v-if="id !== 'processing' && !button5enabled"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_disabled_button_text">5</p></v-btn>
                
                <!-- BUTTON NEXT -->
                <v-btn
                v-if="id !== 'waiting' && id !== 'err' && id !== 'results'"
                icon=""
                @click="nextButton()"
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">›</p></v-btn>
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