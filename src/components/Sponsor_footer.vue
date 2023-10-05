<template>

    <div class="sponsor_footer">
        <div class="footer_content">

            <div class="sponsor_container">
                <p class="sponsor_text">Gefördert durch:</p>
                <v-img 
                v-bind:src='require("../assets/logo_bundesm_wirtschaft_klimaschutz.png")'
                alt="bundesministerium_logo"
                height="100px"></v-img>
                
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
    props: [],
    mounted() {
        let date = new Date()
        this.copyrightTextFragment = "© " + date.getFullYear().toString() + " "
    },
    data: () => ({
        copyrightTextFragment: ""
    }),
};
</script>