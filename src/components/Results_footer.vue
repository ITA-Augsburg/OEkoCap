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
                v-if="false"
                @click=handlePdfButton()
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_pdf_button_text">download results</p></v-btn>
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

    <img :src='require("../assets/logo_oekocap_schwarz.png")' style="display: none;"  id="oekocap_logo_black">
</template>

<script>
    export default {
        props: ["color_lightgrey", "data_urls_prop"],
        mounted() {
            let date = new Date()
            this.copyrightTextFragment = "© " + date.getFullYear().toString() + " "
        },
        data: () => ({
            copyrightTextFragment: "",
        }),
        methods: {
            handlePdfButton() {
                // console.log(this.data_urls_prop)
                // for(let i=0; i<this.data_urls_prop.length; i++) {
                //     console.log(this.data_urls_prop[i].name)
                // }

                let date = new Date()
                let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
                let month = date.getMonth()+1 < 10  ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
                let dateString = day + "." + month + "." + date.getFullYear()

                let headerLogo = this.imageToDataUrl("oekocap_logo_black")
                let generalDescription = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."

                let content = [
                    { image: headerLogo, width: 180, margin: [ 0, 0, 0, 0], alignment: "center" },
                    { text: generalDescription, margin: [0, 25, 0, 20], alignment: "justify" },
                ]
                this.addChartsToPdf(content)

                let docDefinition = {
                    pageSize: 'A4',
                    pageMargins: [ 40, 40, 40, 20 ], // left, top, right, bottom
                    header: function() {
                        return {
                            layout: "noBorders",
                            table: {
                                headerRows: 0,
                                widths: ["*"],
                                body: [[
                                    { text: "www.oekocap.com", fontSize: 10, alignment: "right", margin: [ 0, 7, 40, 0 ] }
                                ]]
                            }
                        }
                    },
                    footer: function(currentPage, pageCount) {
                        let footerObject = {
                            layout: "noBorders",
                            table: {
                                headerRows: 0,
                                widths: ["*", "*", "*"],
                                body: [[
                                    { text: dateString, margin: [40, 0, 0, 7], alignment: "left", fontSize: 10 },
                                    { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'center', fontSize: 10 },
                                    { text: " © " + date.getFullYear() + " ITA Augsburg", margin: [0, 0, 40, 7], alignment: "right", fontSize: 10 }
                                ]]
                            }
                        }
                        // if(currentPage % 2) {
                        //     // page number left, copyright right
                        //     footerObject.table.body[0].push({ text: "Page " + currentPage.toString() + ' of ' + pageCount, margin: [40, 0, 0, 7], alignment: "left", fontSize: 10 })
                        //     footerObject.table.body[0].push({ text: " © " + date.getFullYear() + " ITA Augsburg", margin: [0, 0, 40, 7], alignment: "right" })
                            
                        // } else {
                        //     // copyright left, page number right
                        //     footerObject.table.body[0].push({ text: " © " + date.getFullYear() + " ITA Augsburg", margin: [40, 0, 0, 7], alignment: "left" })
                        //     footerObject.table.body[0].push({ text: "Page " + currentPage.toString() + ' of ' + pageCount, margin: [0, 0, 40, 7], alignment: "right", fontSize: 10 })
                        // }
                        return footerObject
                    },
                    content: content
                }
                
                // console.log(this.data_urls_prop)
                pdfMake.createPdf(docDefinition).open()
            },
            imageToDataUrl(id) {
                let image = document.getElementById(id)
                let canvas = document.createElement("canvas")
                let context = canvas.getContext("2d")
                canvas.width = image.width
                canvas.height = image.height
                context.drawImage(image, 0, 0)
                // console.log(canvas.toDataURL("img/png"))
                return canvas.toDataURL("img/png")
            },
            addChartsToPdf(pdfContent) {
                let chartTextsPlaceholder = "name" + '\n' + "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat"
                // first page can hold three charts
                pdfContent.push({
                    layout: "noBorders",
                    table: {
                        headerRows: 0,
                        widths: ["*", 200],
                        heights: [180, 180],
                        body: [
                            [
                                {text: chartTextsPlaceholder, alignment: "justify", margin: [0, 50, 10, 0]},
                                {image: this.data_urls_prop[0].image, fit: [200, 180], alignment: "right", margin: [0, 15, 0, 0]}
                            ],
                            [
                                {text: chartTextsPlaceholder, alignment: "justify", margin: [0, 50, 10, 0]},
                                {image: this.data_urls_prop[1].image, fit: [200, 180], alignment: "right", margin: [0, 15, 0, 0]}
                            ],
                            [
                                {text: chartTextsPlaceholder, alignment: "justify", margin: [0, 50, 10, 0]},
                                {image: this.data_urls_prop[2].image, fit: [200, 180], alignment: "right", margin: [0, 15, 0, 0]}
                            ],
                        ]
                    },
                    pageBreak: "after"
                })

                // other pages can hold four charts
                let chartCount = 0
                let currentBody = []
                for(let i=3; i<this.data_urls_prop.length; i++) {
                    if(chartCount >= 4) {
                        pdfContent.push({
                            // layout: "noBorders",
                            table: {
                                headerRows: 0,
                                widths: ["*", 200],
                                heights: [180, 180],
                                body: currentBody
                            },
                            pageBreak: "after"
                        })
                        chartCount = 0
                        currentBody = []
                    }

                    switch(this.data_urls_prop[i].type) {
                        case "bar":
                            currentBody.push([
                                {text: chartTextsPlaceholder, alignment: "justify", margin: [0, 50, 10, 0]},
                                {image: this.data_urls_prop[i].image, fit: [200, 180], alignment: "right", margin: [0, 15, 0, 0]}
                            ])
                            chartCount++
                            break
                        case "pie":
                            currentBody.push([
                                {text: chartTextsPlaceholder, alignment: "justify", margin: [0, 50, 10, 0]},
                                {image: this.data_urls_prop[i].image, width: 135, alignment: "center", margin: [0, 15, 0, 0]}
                            ])
                            chartCount++
                            break
                        case "ashby":
                            currentBody.push([
                                {text: chartTextsPlaceholder, alignment: "justify", margin: [0, 50, 10, 0]},
                                {image: this.data_urls_prop[i].image, fit: [200, 180], alignment: "right", margin: [0, 15, 0, 0]}
                            ])
                            chartCount++
                            break
                        case "legend":
                            break
                        default:
                            console.error("Invalid chart-type in Results_footer.vue fillTable(...) function!")
                            break
                    }
                }
            },
        }
    }
</script>