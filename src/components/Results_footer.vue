<script setup>
    import pdfMake from "pdfmake/build/pdfmake"
    import pdfFonts from "pdfmake/build/vfs_fonts"
    pdfMake.vfs = pdfFonts.pdfMake.vfs
</script>

<template>
    <div class="results_footer">
        <div class="footer_content">

            <div class="results_pdf_buttoncontainer">
                <v-btn
                @click=handlePdfButton()
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_pdf_button_text">download results</p></v-btn>
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
        props: ["color_lightgrey", "data_urls_prop"],
        emits: [],
        data: () => ({
           
        }),
        methods: {
            handlePdfButton() {
                // let images = []
                // if(this.data_urls_prop !== undefined) {
                //     for(let i=0; i<this.data_urls_prop.length; i++) {
                //         let img = new Image()
                //         img.src = this.data_urls_prop[i].image
                //         images.push(img)
                //     }
                // }
                let docDefinition = {
                    content: [
                        "hello world",
                        this.data_urls_prop ? {
                            image: this.data_urls_prop[0].image,
                            width: 250
                        } : ""
                    ]
                }
                // console.log(this.images_prop)
                pdfMake.createPdf(docDefinition).open()
            }
        }
    }
</script>