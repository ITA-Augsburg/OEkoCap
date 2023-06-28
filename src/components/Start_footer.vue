<template>

    <div class="start_footer">
        <div class="footer_content">

            <div class="sponsor_container">
                <p class="sponsor_text">Gefördert durch:</p>
                <v-img 
                v-bind:src='require("../assets/logo_bundesm_wirtschaft_klimaschutz.png")'
                alt="bundesministerium_logo"
                height="100px"></v-img>
                
            </div>

            <p class="footer_copyright_text">© 2023 
                <a
                class="footer_copyright_link"
                href="https://ita-augsburg.com/"
                target="_blank">
                    ITA Augsburg
                </a>
            </p>

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