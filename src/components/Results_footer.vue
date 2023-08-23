<template>
    <div class="results_footer">
        <div class="footer_content">

            <div class="results_print_buttoncontainer">
                <v-btn
                @click=handlePrintButton()
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_print_button_text">PRINT</p></v-btn>
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
        props: ["color_lightgrey"],
        data: () => ({
           
        }),
        methods: {
            handlePrintButton() {
                
            }
        }
    }
</script>