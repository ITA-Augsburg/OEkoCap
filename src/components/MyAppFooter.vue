<template>

    <div class="myappfooter">
        <div class="footercontent">

            <p class="footerpercentage">15%</p>

            <v-progress-linear
                class="progressbar"
                bg-color="#55CD89"
                bg-opacity="0.2"
                color="#55CD89"
                height="10"
                v-model="value"
            >
            </v-progress-linear>

            <div class="footerbuttoncontainer">
                <!-- <v-btn class="footerbutton"
                    v-for="(text, i) in footerbuttontext"
                    v-bind:key="i"
                    icon=""
                    color="#F2F2F2"
                    elevation="12"
                    width="45px"
                    height="45px"
                >
                    <p class="footerbuttontext">{{ text }}</p>
                </v-btn> -->
                <v-btn
                icon=""
                color="#F2F2F2"
                elevation="12"
                width="45px"
                height="45px"
                >‹</v-btn>
                <v-btn
                icon=""
                color="#55CD89"
                elevation="12"
                width="45px"
                height="45px"
                >1</v-btn>
                <v-btn
                icon=""
                color="#F2F2F2"
                elevation="12"
                width="45px"
                height="45px"
                >2</v-btn>
                <v-btn
                icon=""
                color="#F2F2F2"
                elevation="12"
                width="45px"
                height="45px"
                >3</v-btn>
                <v-btn
                icon=""
                color="#F2F2F2"
                elevation="12"
                width="45px"
                height="45px"
                >4</v-btn>
                <v-btn
                icon=""
                color="#F2F2F2"
                elevation="12"
                width="45px"
                height="45px"
                >5</v-btn>
                <v-btn
                icon=""
                color="#F2F2F2"
                elevation="12"
                width="45px"
                height="45px"
                >›</v-btn>
            </div>

            <p class="footercopyrighttext">© 2023 <u>ITA Augsburg</u></p>

        </div>
    </div>

</template>

<script>
export default {
  data: () => ({
    value: 15,
    footerbuttontext: ["‹", "1", "2", "3", "4", "5", "›"]
  }),
};
</script>