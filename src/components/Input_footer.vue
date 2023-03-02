<template>

    <div class="footer">
        <div class="footer_content">

            <p class="footer_percentage">15%</p>

            <v-progress-linear
                v-bind:bg-color=color_green
                bg-opacity="0.2"
                v-bind:color=color_green
                height="10"
                v-model="value"
            >
            </v-progress-linear>

            <div class="footer_buttoncontainer">
                <!-- <v-btn
                    v-for="(text, i) in footerbuttontext"
                    v-bind:key="i"
                    icon=""
                    v-bind:color=color_lightgrey
                    elevation="12"
                    width="45px"
                    height="45px"
                >
                    <p class="footer_button_text">{{ text }}</p>
                </v-btn> -->
                <v-btn
                icon=""
                v-bind:color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">‹</p></v-btn>
                <v-btn
                icon=""
                v-bind:color=color_green
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">1</p></v-btn>
                <v-btn
                icon=""
                v-bind:color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">2</p></v-btn>
                <v-btn
                icon=""
                v-bind:color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">3</p></v-btn>
                <v-btn
                icon=""
                v-bind:color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">4</p></v-btn>
                <v-btn
                icon=""
                v-bind:color=color_lightgrey
                elevation="12"
                width="45px"
                height="45px"
                ><p class="footer_button_text">5</p></v-btn>
                <v-btn
                icon=""
                v-bind:color=color_lightgrey
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
    props: ["color_green", "color_lightgrey"],
  data: () => ({
    value: 15,
    footerbuttontext: ["‹", "1", "2", "3", "4", "5", "›"],
  }),
};
</script>