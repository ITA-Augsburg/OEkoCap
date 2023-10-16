<script setup>
    import router from "../router"
    import Copyright_text from "./Copyright_text.vue"
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

            <Copyright_text />

            </div>
    </div>

</template>
<script>
/**
 * Footer component with a button.
 */
    export default {
        props: ["color_lightgrey", "data_urls_prop"],
        data: () => ({
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