<script setup>
    import router from "../router"
</script>

<template>

    <div class="input_footer">
        <div class="footer_content">

            <div class="error_footer_buttoncontainer">
                <v-btn
                @click=handleBackButton()
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="error_footer_button_text">back</p></v-btn>
            </div>

            <p class="footer_copyright_text">
                {{ copyrightTextFragment }}
                <a
                class="footer_copyright_link"
                href="https://ita-augsburg.com/"
                target="_blank">
                    ITA Augsburg
                </a>
                • (v1.0.0)
            </p>

            </div>
    </div>

</template>
<script>
    export default {
        props: ["color_lightgrey", "data_urls_prop"],
        mounted() {
            /**
             * Determines the current year and builds the copyright-text.
             */
            let date = new Date()
            this.copyrightTextFragment = "© " + date.getFullYear().toString() + " "
        },
        data: () => ({
            copyrightTextFragment: ""
        }),
        methods: {
            handleBackButton() {
                /**
                 * Sends user back to the start-page
                 * Resets App.vue->app_input, since the user can start choosing values and then go back to the start-page.
                 */
                this.$emit("clearAppInput", undefined)
                router.push({name: "StartView"})
            }
        }
    }
</script>