<template>

    <div class="footer">
        <div class="footer_content">

            <div class="sponsor_container">
                <p class="sponsor_text">Gefördert durch:</p>
                <v-img 
                v-bind:src='require("../assets/logo_bundesm_wirtschaft_klimaschutz.png")'
                alt="bundesministerium_logo"
                height="100px"></v-img>
                
            </div>

            <p class="footer_copyright_text">© 2023 <u>ITA Augsburg</u></p>

        </div>
    </div>

</template>

<script>
export default {
    props: [],
  data: () => ({
    
  }),
};
</script>