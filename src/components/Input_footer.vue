<template>

    <div class="footer">
        <div class="footer_content">

            <p class="footer_percentage">{{ progressValue }}%</p>

            <v-progress-linear
                v-bind:bg-color=color_green
                bg-opacity="0.2"
                v-bind:color=color_green
                height="10"
                v-model="progressValue"
            >
            </v-progress-linear>

            <div class="footer_buttoncontainer">
                <v-btn
                icon=""
                v-bind:color=color_lightgrey
                @click="this.backButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">‹</p></v-btn>

                <v-btn
                v-if="this.id === 'waste'"
                icon=""
                v-bind:color=color_green
                @click="oneButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">1</p></v-btn>
                <v-btn
                v-if="this.id !== 'waste'"
                icon=""
                v-bind:color=color_lightgrey
                @click="oneButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">1</p></v-btn>

                <v-btn
                v-if="this.id === 'separation'"
                icon=""
                v-bind:color=color_green
                @click="twoButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">2</p></v-btn>
                <v-btn
                v-if="this.id !== 'separation'"
                icon=""
                v-bind:color=color_lightgrey
                @click="twoButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">2</p></v-btn>
                <v-btn
                v-if="this.id !== 'separation'"
                icon=""
                v-bind:color=color_lightgrey
                @click="twoButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">2</p></v-btn>

                <v-btn
                v-if="this.id === 'matrix'"
                icon=""
                v-bind:color=color_green
                @click="threeButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">3</p></v-btn>
                <v-btn
                v-if="this.id !== 'matrix'"
                icon=""
                v-bind:color=color_lightgrey
                @click="threeButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">3</p></v-btn>

                <v-btn
                v-if="this.id === 'textile'"
                icon=""
                v-bind:color=color_green
                @click="fourButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">4</p></v-btn>
                <v-btn
                v-if="this.id !== 'textile'"
                icon=""
                v-bind:color=color_lightgrey
                @click="fourButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">4</p></v-btn>

                <v-btn
                v-if="this.id === 'processing'"
                icon=""
                v-bind:color=color_green
                @click="fiveButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">5</p></v-btn>
                <v-btn
                v-if="this.id !== 'processing'"
                icon=""
                v-bind:color=color_lightgrey
                @click="fiveButton()"
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">5</p></v-btn>

                <v-btn
                icon=""
                v-bind:color=color_lightgrey
                @click="nextButton()"
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
    props: ["app_input" ,"id", "color_green", "color_lightgrey"],
  data: () => ({
    progressValue: 20,
    footerbuttontext: ["‹", "1", "2", "3", "4", "5", "›"],
  }),
  methods: {
        nextButton() {
            switch(this.id) {
                case "waste":
                    this.progressValue = 20
                    //check mandatory values
                    //set default values if needed
                    //set disabled-buttons
                    //switch to the next page
                    break
                case "separation":
                    //todo
                    break
                case "matrix":
                    //todo
                    break
                case "textile":
                    //todo
                    break
                case "processing":
                    //todo
                    break
                case "error":
                    //todo
                    break
                case "waiting":
                    //todo
                    break
                case "results":
                    //todo
                    break
            }
        },
        backButton() {
            
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

        }
    }
};
</script>