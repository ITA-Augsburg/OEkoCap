<script setup>
    import Copyright_text from "./Copyright_text.vue"
</script>

<template>

    <!-- Footer with sponsor-logo and copyright text. class name "sponsor_footer" was colliding with a vuetify class name, hence the "the" prefix -->
    <div class="the_sponsor_footer">

        <!-- centered container -->
        <div class="footer_content">

            <!-- sponsor-logo -->
            <div class="sponsor_container">
                <p class="sponsor_text">Sponsored by:</p>
                <v-img 
                v-bind:src='require("../assets/logo_bundesm_wirtschaft_klimaschutz.png")'
                alt="bundesministerium_logo"
                height="100px"></v-img>
                
            </div>

            <Copyright_text />

        </div>
    </div>

</template>

<script>
/**
 * Footer component with the sponsor displayed.
 */
export default {
}
</script>