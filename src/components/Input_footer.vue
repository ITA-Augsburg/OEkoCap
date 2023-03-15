<template>

    <div class="footer">
        <div class="footer_content">

            <p class="footer_percentage">{{ progressValue }}%</p>

            <v-progress-linear
                :bg-color=color_green
                bg-opacity="0.2"
                :color=color_green
                height="10"
                :model-value=progressValue
            >
            </v-progress-linear>

            <div class="footer_buttoncontainer">

<!-- BUTTON BACK -->
                <router-link
                :to=backButtonRoute
                v-if="this.id !== 'waiting' || this.id !== 'err' || this.id !== 'results'">
                    <v-btn
                    icon=""
                    @click="backButton()"
                    :color=color_lightgrey
                    elevation="12"
                    width="45px"
                    height="45px"
                    ><p class="footer_button_text">‹</p></v-btn>
                </router-link>
                <v-btn
                v-if="this.id === 'waiting' || this.id === 'err' || this.id === 'results'"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">‹</p></v-btn>

<!-- BUTTON 1 -->
                <v-btn
                v-if="this.id === 'waste'"
                icon=""
                :color=color_green
                @click="oneButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">1</p></v-btn>
                <router-link
                :to='{name: "WasteView"}'
                v-if="this.id !== 'waste'">
                    <v-btn
                    icon=""
                    :color=color_lightgrey
                    @click="oneButton()"
                    elevation="12"
                    width="45px"
                    height="45px"
                    ><p class="footer_button_text">1</p></v-btn>
                </router-link>

<!-- BUTTON 2 -->
                <v-btn
                v-if="this.id === 'separation'"
                icon=""
                :color=color_green
                @click="twoButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">2</p></v-btn>
                <router-link
                :to='{name: "SeparationView"}'
                v-if="this.id !== 'separation' && button2enabled">
                    <v-btn
                    icon=""
                    :color=color_lightgrey
                    @click="twoButton()"
                    elevation="12"
                    width="45px"
                    height="45px"
                    ><p class="footer_button_text">2</p></v-btn>
                </router-link>
                <v-btn
                v-if="this.id !== 'separation' && !button2enabled"
                disabled
                icon=""
                :color=color_lightgrey
                @click="twoButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">2</p></v-btn>

<!-- BUTTON 3 -->
                <v-btn
                v-if="this.id === 'matrix'"
                icon=""
                :color=color_green
                @click="threeButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">3</p></v-btn>
                <v-btn
                v-if="this.id !== 'matrix' && button3enabled"
                icon=""
                :color=color_lightgrey
                @click="threeButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">3</p></v-btn>
                <v-btn
                v-if="this.id !== 'matrix' && !button3enabled"
                disabled
                icon=""
                :color=color_lightgrey
                @click="threeButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">3</p></v-btn>

<!-- BUTTON 4 -->
                <router-link
                :to='{name:"MatrixView"}'
                v-if="this.id === 'textile'">
                    <v-btn
                    icon=""
                    :color=color_green
                    @click="fourButton()"
                    elevation="12"
                    width="45px"
                    height="45px"
                    ><p class="footer_button_text">4</p></v-btn>
                </router-link>
                <v-btn
                v-if="this.id !== 'textile' && button4enabled"
                icon=""
                :color=color_lightgrey
                @click="fourButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">4</p></v-btn>
                <v-btn
                v-if="this.id !== 'textile' && !button4enabled"
                disabled
                icon=""
                :color=color_lightgrey
                @click="fourButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">4</p></v-btn>

<!-- BUTTON 5 -->
                <v-btn
                v-if="this.id === 'processing'"
                icon=""
                :color=color_green
                @click="fiveButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">5</p></v-btn>
                <router-link
                :to='{name:"ProcessingView"}'
                v-if="this.id !== 'processing' && button5enabled">
                    <v-btn
                    icon=""
                    :color=color_lightgrey
                    @click="fiveButton()"
                    elevation="12"
                    width="45px"
                    height="45px"
                    ><p class="footer_button_text">5</p></v-btn>
                </router-link>
                <v-btn
                v-if="this.id !== 'processing' && !button5enabled"
                disabled
                icon=""
                :color=color_lightgrey
                @click="fiveButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">5</p></v-btn>
                
<!-- BUTTON NEXT -->
                <router-link
                :to=nextButtonRoute
                v-if="this.id !== 'waiting' || this.id !== 'err' || this.id !== 'results'">
                    <v-btn
                    icon=""
                    @click="nextButton()"
                    :color=color_lightgrey
                    elevation="12"
                    width="45px"
                    height="45px"
                    ><p class="footer_button_text">›</p></v-btn>
                </router-link>
                <v-btn
                v-if="this.id === 'waiting' || this.id === 'err' || this.id === 'results'"
                disabled
                icon=""
                :color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">›</p></v-btn>
            </div>

            <p class="footer_copyright_text">© 2023 <u>ITA Augsburg</u></p>

        </div>
    </div>

</template>

<script>
export default {
    props: ["button2enabled", "button3enabled", "button4enabled", "button5enabled",
    "app_input", "progressValue", "id", "color_green", "color_lightgrey"],
    emits: ["updateInputFooter"],
    data: () => ({
        footerbuttontext: ["‹", "1", "2", "3", "4", "5", "›"],
        backButtonRoute: "",
        nextButtonRoute: ""
    }),
    methods: {
        backButton() {
            switch(this.id) {
                case "waste":
                    this.backButtonRoute = {name: "WasteView"}
                    break
                case "separation":
                    this.backButtonRoute = {name: "WasteView"}
                    break
                case "matrix":
                    this.backButtonRoute = {name: "SeparationView"}
                    break
                case "textile":
                    this.backButtonRoute = {name: "MatrixView"}
                    break
                case "processing":
                    this.backButtonRoute = {name: "TextileView"}
                    break
                case "waiting":
                    this.backButtonRoute = {name: "WaitingView"}
                    break
                case "err":
                    this.backButtonRoute = {name: "ErrorView"}
                    break
                case "results":
                    this.backButtonRoute = {name: "ResultsView"}
                    break
            }
        },
        oneButton() {
            
        },
        twoButton() {
            
        },
        threeButton() {
            
        },
        fourButton() {
            
        },
        fiveButton() {
            
        },
        nextButton() {
            this.$emit("updateInputFooter", undefined)
            // console.log(this.button2enabled)
            switch(this.id) {
                //mandatory fields are checked in app.vue->saveNewInputs()
                //if user clicks next-button and non-mandatory fields are still undefined, they get their default value here in setDefaultValues()
                case "waste":
                    if(this.button2enabled) {
                        this.nextButtonRoute = {name:"SeparationView"}
                    } else {
                        alert("Please choose a type before continuing.")
                    }
                    break
                case "separation":
                    this.nextButtonRoute = {name:"MatrixView"}
                    break
                case "matrix":
                    this.nextButtonRoute = {name:"TextileView"}
                    break
                case "textile":
                    this.nextButtonRoute = {name:"ProcessingView"}
                    break
                case "processing":
                    this.nextButtonRoute = {name:"ProcessingView"}
                    break
                case "waiting":
                    this.nextButtonRoute = {name: "WaitingView"}
                    break
                case "err":
                    this.nextButtonRoute = {name: "ErrorView"}
                    break
                case "results":
                    this.nextButtonRoute = {name: "ResultsView"}
            }
        },
        updateInputFooter() {
            
        }
    }
};
</script>