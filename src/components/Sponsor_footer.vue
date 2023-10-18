<script setup>
    import Copyright_text from "./Copyright_text.vue"
</script>

<template>

    <div class="the_sponsor_footer">
        <div class="footer_content">

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