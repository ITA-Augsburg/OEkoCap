<template>

    <!-- Copyright-text that automatically determines the current year. Used in footer components. -->
    <p class="footer_copyright_text">
        {{ copyrightTextFragment }}
        <a
        class="footer_copyright_link"
        href="https://ita-augsburg.com/"
        target="_blank">
            ITA Augsburg
        </a>
        • (v1.1.2)
    </p>
</template>

<script>

    export default {
        mounted() {
            /**
             * Determines the current year and builds the copyright-text.
             */
            let date = new Date()
            this.copyrightTextFragment = "© " + date.getFullYear().toString() + " "
        },
        data: () => ({
            copyrightTextFragment: ""
        })
    }
</script>