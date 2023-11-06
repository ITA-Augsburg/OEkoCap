<script setup>
    import Copyright_text from "./Copyright_text.vue"
    import pdfMake from "pdfmake/build/pdfmake"
    import pdfFonts from "pdfmake/build/vfs_fonts"
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    import { splitCamelCase } from "../results_charts_functions"
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
        
            <Copyright_text />

        </div>
    </div>

    <img :src='require("../assets/logo_oekocap_schwarz.png")' style="display: none;"  id="oekocap_logo_black_results">
    <img :src='require("../assets/logos_together.png")' style="display: none;"  id="logos_together_results">
    <!-- <img :src='require("../assets/frauenhofer_logo.png")' style="display: none;"  id="frauenhofer_logo_results">
    <img :src='require("../assets/logo_bundesm_wirtschaft_klimaschutz.png")' style="display: none;"  id="bundesm_logo_results">
    <img :src='require("../assets/ita_logo_bunt.png")' style="display: none;"  id="ita_logo_results"> -->
</template>

<script>
/**
 * Holds a button for creating a pdf from the contents of Results.vue.
 * The button is disabled for the time being and this feature is put on the backlog.
 */
    export default {
        props: ["color_lightgrey", "app_input_prop", "data_urls_prop"],
        mounted() {
            // setTimeout(() => {
            //     console.log(this.data_urls_prop)
            // }, 5000);
        },
        data: () => ({
        }),
        methods: {
            handlePdfButton() {
                /**
                 * Creates a pdf of the results.
                 */

                let date = new Date()
                let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
                let month = date.getMonth()+1 < 10  ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
                let dateString = day + "." + month + "." + date.getFullYear()

                let headerLogo = this.imageToDataUrl("oekocap_logo_black_results")
                let footer_logos = this.imageToDataUrl("logos_together_results")
                // let frauenhofer_logo = this.imageToDataUrl("frauenhofer_logo_results")
                // let bundesm_logo = this.imageToDataUrl("bundesm_logo_results")
                // let ita_logo = this.imageToDataUrl("ita_logo_results")

                let content = [
                    { image: headerLogo, width: 180, margin: [ 0, 0, 0, 20], alignment: "center" },
                    // { text: inputs, margin: [0, 25, 0, 20], alignment: "justify", fontSize: 10 },
                ]
                this.addInputsToPdf(content)
                this.addChartsToPdf(content)

                let docDefinition = {
                    pageSize: 'A4',
                    pageMargins: [ 40, 40, 40, 40], // left, top, right, bottom
                    // header: function() {
                    //     return {
                    //         layout: "noBorders",
                    //         table: {
                    //             headerRows: 0,
                    //             widths: ["*"],
                    //             body: [[
                    //                 { text: "www.oekocap.org", fontSize: 7, alignment: "right", margin: [ 0, 7, 40, 0 ] }
                    //             ]]
                    //         }
                    //     }
                    // },
                    footer: function(currentPage, pageCount) {
                        let footerObject = {
                            layout: "noBorders",
                            table: {
                                headerRows: 0,
                                widths: [100, "*", 100],
                                body: [[
                                    { text: dateString, margin: [40, 15, 0, 0], alignment: "left", fontSize: 7 },
                                    // {image: frauenhofer_logo, fit: [50, 50], alignment: "right", margin: [0, 0, 0, 0]},
                                    // {image: bundesm_logo, fit: [30, 50], alignment: "center", margin: [0, 0, 0, 0]},
                                    // {image: ita_logo, fit: [40, 50], alignment: "left", margin: [0, 0, 0, 0]},
                                    { image: footer_logos, fit: [300, 100], alignment: "center", margin: [0, 5, 0, 0] },
                                    { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: "right", fontSize: 7, margin: [0, 15, 40, 0] }
                                ]],
                            }
                        }
                        return footerObject
                    },
                    content: content
                }
                
                // console.log(this.data_urls_prop)
                pdfMake.createPdf(docDefinition).open()
            },
            imageToDataUrl(id) {
                /**
                 * Converts an image to an html-canvas-element, that can then be converted to a data-url.
                 * Data-url format is required for inserting images into the pdf.
                 */
                let image = document.getElementById(id)
                let canvas = document.createElement("canvas")
                let context = canvas.getContext("2d")
                canvas.width = image.width
                canvas.height = image.height
                context.drawImage(image, 0, 0)
                // console.log(canvas.toDataURL("img/png"))
                return canvas.toDataURL("img/png")
            },
            buildInputsString() {
                let s = ""
                s += "Inputs\n\n"

                // waste
                s += "Waste\n"
                if(this.app_input_prop.waste.type === "EoL") s += "Type: End of Life" + "\t"
                if(this.app_input_prop.waste.type !== "EoL") s += "Type: " + this.app_input_prop.waste.type + "\t"
                if(this.app_input_prop.transport.co2_equv_per_kg !== "") s += "Gwp: " + this.app_input_prop.transport.co2_equv_per_kg + "\t"
                if(this.app_input_prop.transport.euro_per_kg !== "") s += "Cost: " + this.app_input_prop.transport.euro_per_kg
                s += "\n\n"

                // shredding 1
                s += "Shredding step 1\n"
                s += "Type: " + this.app_input_prop.shredding_1.type + "\t"
                s += "Mass loss percent: " + this.app_input_prop.shredding_1.mass_loss_percent + "\t"
                if(this.app_input_prop.shredding_1.co2_equv_per_kg !== "") s += "Gwp: " + this.app_input_prop.shredding_1.co2_equv_per_kg + "\t"
                if(this.app_input_prop.shredding_1.euro_per_kg !== "") s += "Cost: " + this.app_input_prop.shredding_1.euro_per_kg
                s += "\n\n"

                // shredding 2
                if(this.app_input_prop.shredding_2.type !== "") {
                    s += "Shredding step 2\n"
                    if(this.app_input_prop.shredding_2.type !== "") s += "Type: " + this.app_input_prop.shredding_2.type + "\t"
                    if(this.app_input_prop.shredding_2.mass_loss_percent !== "") s += "Mass loss percent: " + this.app_input_prop.shredding_2.mass_loss_percent + "\t"
                    if(this.app_input_prop.shredding_2.co2_equv_per_kg !== "") s += "Gwp: " + this.app_input_prop.shredding_2.co2_equv_per_kg + "\t"
                    if(this.app_input_prop.shredding_2.euro_per_kg !== "") s += "Cost: " + this.app_input_prop.shredding_2.euro_per_kg
                    s += "\n\n"
                }

                // separation
                s += "Separation\n"
                s += "Type: " + this.app_input_prop.separation.type + "\t"
                if(this.app_input_prop.separation.co2_equv_per_kg !== "") s += "Gwp: " + this.app_input_prop.separation.co2_equv_per_kg + "\t"
                if(this.app_input_prop.separation.euro_per_kg !== "") s += "Cost: " + this.app_input_prop.separation.euro_per_kg
                s += "\n\n"

                // polymer
                s += "Polymer\n"
                s += "Thermo-type: " + this.app_input_prop.polymer.thermo_type + "\t"
                s += "Matrix-type: " + this.app_input_prop.polymer.matrix_type + "\t"
                s += "Fiber volume content percent: " + this.app_input_prop.polymer.fvc_percent + "\t"
                s += "Feedstock type: " + this.app_input_prop.polymer.feedstock_type + "\t"
                s += "State of origin: " + this.app_input_prop.polymer.state_of_origin + "\t"
                if(this.app_input_prop.polymer.co2_equv_per_kg !== "") s += "Gwp: " + this.app_input_prop.polymer.co2_equv_per_kg + "\t"
                if(this.app_input_prop.polymer.euro_per_kg !== "") s += "Cost: " + this.app_input_prop.polymer.euro_per_kg
                s += "\n\n"

                // textile process
                s += "Textile process\n"
                s += "Type: " + this.app_input_prop.textile_process.type + "\t"
                s += "Mass loss percent: " + this.app_input_prop.textile_process.mass_loss_percent + "\t"
                s += "Throughput kg/h: " + this.app_input_prop.textile_process.throughput_kg_per_h + "\t"
                s += "Areal weight g/m²: " + this.app_input_prop.textile_process.areal_weight_g_per_sqm + "\t"
                if(this.app_input_prop.textile_process.co2_equv_per_kg !== "") s += "Gwp: " + this.app_input_prop.textile_process.co2_equv_per_kg + "\t"
                if(this.app_input_prop.textile_process.euro_per_kg !== "") s += "Cost: " + this.app_input_prop.textile_process.euro_per_kg
                s += "\n\n"

                // processing 1
                s += "Processing step 1\n"
                s += "Type: " + splitCamelCase(this.app_input_prop.processing_1.type) + "\t"
                s += "Mass loss percent: " + this.app_input_prop.processing_1.mass_loss_percent + "\t"
                s += "Wall thickness: " + this.app_input_prop.processing_1.wandstärke_mm + "\t"
                if(this.app_input_prop.processing_1.co2_equv_per_kg !== "") s += "Gwp: " + this.app_input_prop.processing_1.co2_equv_per_kg + "\t"
                if(this.app_input_prop.processing_1.euro_per_kg !== "") s += "Cost: " + this.app_input_prop.processing_1.euro_per_kg
                s += "\n\n"

                // processing 2
                if(this.app_input_prop.processing_2.type !== "") {
                    s += "Processing step 2\n"
                    s += "Type: " + splitCamelCase(this.app_input_prop.processing_2.type) + "\t"
                    if(this.app_input_prop.processing_2.mass_loss_percent !== "") s += "Mass loss percent: " + this.app_input_prop.processing_2.mass_loss_percent + "\t"
                    if(this.app_input_prop.processing_2.wandstärke_mm !== "") s += "Wall thickness: " + this.app_input_prop.processing_2.wandstärke_mm + "\t"
                    if(this.app_input_prop.processing_2.co2_equv_per_kg !== "") s += "Gwp: " + this.app_input_prop.processing_2.co2_equv_per_kg + "\t"
                    if(this.app_input_prop.processing_2.euro_per_kg !== "") s += "Cost: " + this.app_input_prop.processing_2.euro_per_kg
                }

                return s
            },
            addInputsToPdf(pdfContent) {
                /**
                 * Creates a section listing the inputs.
                 */

                let waste_type = this.app_input_prop.waste.type === "EoL" ? "End of Life" : this.app_input_prop.waste.type

                pdfContent.push({text: "Inputs", fontSize: 14, alignment: "center", bold: true, margin: [0, 0, 0, 20]})

                // waste and transport
                pdfContent.push(
                {
                    layout: "noBorders",
                    table: {
                        headerRows: 0,
                        widths: ["*", "*", "*"],
                        body: [
                            [
                                {text: "WASTE", fontSize: 10, alignment: "center"},
                                {text: "TRANSPORT", fontSize: 10, alignment: "center"},
                                {text: "TRANSPORT", fontSize: 10, alignment: "center"}
                            ]
                        ]
                    }
                },
                {text: "", margin: [0, 0, 0, 5]},
                {
                    layout: "lightHorizontalLines",
                    table: {
                        headerRows: 0,
                        widths: ["*", "*", "*"],
                        body: [
                            [
                                {text: "type", fontSize: 10, alignment: "center"},
                                {text: "cost", fontSize: 10, alignment: "center"},
                                {text: "gwp", fontSize: 10, alignment: "center"}
                            ],
                            [
                                {text: waste_type, fontSize: 10, alignment: "center", margin: [0, 3, 0, 0]},
                                {text: this.checkInputString(this.app_input_prop.transport.co2_equv_per_kg), fontSize: 10, alignment: "center", margin: [0, 3, 0, 0]},
                                {text: this.checkInputString(this.app_input_prop.transport.euro_per_kg), fontSize: 10, alignment: "center", margin: [0, 3, 0, 0]}
                            ],
                        ]
                    }
                },
                {text: "", margin: [0, 0, 0, 20]})

                // shredding 1
                pdfContent.push(
                    {text: "SHREDDING STEP 1", fontSize: 10, alignment: "center", margin: [0, 0, 0, 5]},
                    {
                        layout: "lightHorizontalLines",
                        table: {
                            headerRows: 0,
                            widths: ["*", "*", "*", "*"],
                            body:[
                                [
                                    {text: "type", fontSize: 10, alignment: "center"},
                                    {text: "mass loss (%)", fontSize: 10, alignment: "center"},
                                    {text: "gwp", fontSize: 10, alignment: "center"},
                                    {text: "cost", fontSize: 10, alignment: "center"}
                                ],
                                [
                                    {text: this.app_input_prop.shredding_1.type, fontSize: 10, alignment: "center", margin: [0, 3, 0, 0]},
                                    {text: this.app_input_prop.shredding_1.mass_loss_percent, fontSize: 10, alignment: "center", margin: [0, 3, 0, 0]},
                                    {text: this.checkInputString(this.app_input_prop.shredding_1.co2_equv_per_kg), fontSize: 10, alignment: "center", margin: [0, 3, 0, 0]},
                                    {text: this.checkInputString(this.app_input_prop.shredding_1.euro_per_kg), fontSize: 10, alignment: "center", margin: [0, 3, 0, 0]}
                                ],
                            ]
                        }
                    },
                    {text: "", margin: [0, 0, 0, 20]}
                )

                // shredding 2
                if(this.app_input_prop.shredding_2.type !== "") {
                    pdfContent.push(
                        {text: "SHREDDING STEP 2", fontSize: 10, alignment: "center", margin: [0, 0, 0, 5]},
                        {
                            layout: "lightHorizontalLines",
                            table: {
                                headerRows: 0,
                                widths: ["*", "*", "*", "*"],
                                body:[
                                    [
                                        {text: "type", fontSize: 10, alignment: "center"},
                                        {text: "mass loss (%)", fontSize: 10, alignment: "center"},
                                        {text: "gwp", fontSize: 10, alignment: "center"},
                                        {text: "cost", fontSize: 10, alignment: "center"}
                                    ],
                                    [
                                        {text: this.app_input_prop.shredding_2.type, fontSize: 10, alignment: "center", margin: [0, 3, 0, 0]},
                                        {text: this.app_input_prop.shredding_2.mass_loss_percent, fontSize: 10, alignment: "center", margin: [0, 3, 0, 0]},
                                        {text: this.checkInputString(this.app_input_prop.shredding_2.co2_equv_per_kg), fontSize: 10, alignment: "center", margin: [0, 3, 0, 0]},
                                        {text: this.checkInputString(this.app_input_prop.shredding_2.euro_per_kg), fontSize: 10, alignment: "center", margin: [0, 3, 0, 0]}
                                    ],
                                ]
                            }
                        },
                        {text: "", margin: [0, 0, 0, 20]}
                    )
                }

                // TODO (uncomment App.vue app_input)
                // polymer
                // textile process
                // processing 1
                // if processing 2
            },
            checkInputString(app_input_string) {
                /**
                 * Returns appropriate string if parameter-string is an empty-string.
                 */
                return app_input_string === "" ? "not defined" : app_input_string
            },
            addChartsToPdf(pdfContent) {
                /**
                 * Creates sections for diagram-images in the pdf.
                 */
                // let about = "About this chart"
                // let description = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat"
                
                // bar charts
                pdfContent.push({
                    layout: "noBorders",
                    table: {
                        headerRows: 0,
                        widths: ["*", "*"],
                        body: [
                            [
                                {image: this.data_urls_prop["pdf_gwp_chart_normal_font_chartImage"].image, fit: [220, 400], alignment: "center", margin: [0, 0, 0, 50]},
                                {image: this.data_urls_prop["pdf_cost_chart_normal_font_legendImage"].image, fit: [220, 400], alignment: "center", margin: [0, 0, 0, 50]},
                            ],
                        ],
                    }
                })
                // pdfContent.push({text: about, alignment: "justify", margin: [0, 10, 0, 10]})
                // pdfContent.push({text: description, alignment: "justify", margin: [0, 0, 0, 0]})

                // pie charts next to each other
                // pie charts might not exist depending on the output from recycling.exe
                if(
                this.data_urls_prop["max_gwp_of_each_output_process_chart_chartImage"].image !== undefined &&
                this.data_urls_prop["max_cost_of_each_output_process_chart_chartImage"].image !== undefined) {
                    pdfContent.push({
                        layout: "noBorders",
                        table: {
                            headerRows: 0,
                            widths: ["*", "*"],
                            body: [
                                [
                                    {image: this.data_urls_prop["max_gwp_of_each_output_process_chart_chartImage"].image, fit: [180, 400], alignment: "center", margin: [0, 30, 0, 10]},
                                    {image: this.data_urls_prop["max_cost_of_each_output_process_chart_chartImage"].image, fit: [180, 400], alignment: "center", margin: [0, 30, 0, 10]}

                                ],
                                [
                                    {image: this.data_urls_prop["max_gwp_of_each_output_process_chart_legendImage"].image, fit: [180, 400], alignment: "center", margin: [0, 0, 0, 20]},
                                    {image: this.data_urls_prop["max_cost_of_each_output_process_chart_legendImage"].image, fit: [180, 400], alignment: "center", margin: [0, 0, 0, 20]}
                                ]
                            ]
                        }
                    })
                    // pdfContent.push({text: about, alignment: "justify", margin: [0, 0, 0, 10]})
                    // pdfContent.push({text: description, alignment: "justify", margin: [0, 0, 0, 0], pageBreak: 'after'})

                } else if(this.data_urls_prop["max_gwp_of_each_output_process_chart_chartImage"].image !== undefined) {
                    pdfContent.push({
                        layout: "noBorders",
                        table: {
                            headerRows: 0,
                            widths: ["*"],
                            body: [
                                [
                                    {image: this.data_urls_prop["max_gwp_of_each_output_process_chart_chartImage"].image, fit: [180, 400], alignment: "center", margin: [0, 30, 0, 10]}
                                ],
                                [
                                    {image: this.data_urls_prop["max_gwp_of_each_output_process_chart_legendImage"].image, fit: [180, 400], alignment: "center", margin: [0, 0, 0, 20]}
                                ]
                            ]
                        }
                    })
                    // pdfContent.push({text: about, alignment: "justify", margin: [0, 0, 0, 10]})
                    // pdfContent.push({text: description, alignment: "justify", margin: [0, 0, 0, 0], pageBreak: 'after'})
                } else if(this.data_urls_prop["max_cost_of_each_output_process_chart_chartImage"].image !== undefined) {
                    pdfContent.push({
                        layout: "noBorders",
                        table: {
                            headerRows: 0,
                            widths: ["*"],
                            body: [
                                [
                                    {image: this.data_urls_prop["max_cost_of_each_output_process_chart_chartImage"].image, fit: [180, 400], alignment: "center", margin: [0, 30, 0, 10]}
                                ],
                                [
                                    {image: this.data_urls_prop["max_cost_of_each_output_process_chart_legendImage"].image, fit: [180, 400], alignment: "center", margin: [0, 0, 0, 20]}
                                ]
                            ]
                        }
                    })
                    // pdfContent.push({text: about, alignment: "justify", margin: [0, 0, 0, 10]})
                    // pdfContent.push({text: description, alignment: "justify", margin: [0, 0, 0, 0], pageBreak: 'after'})
                } else {
                    pdfContent.push({text: "", pageBreak: "after"})
                }

                // ashby charts
                pdfContent.push({
                    layout: "noBorders",
                    table: {
                        headerRows: 0,
                        widths: ["*", "*"],
                        body: [
                            [
                                {image: this.data_urls_prop["tensile_0_chart_chartImage"].image, fit: [220, 400], alignment: "center", margin: [0, 30, 0, 10]},
                                {image: this.data_urls_prop["tensile_90_chart_chartImage"].image, fit: [220, 400], alignment: "center", margin: [0, 30, 0, 10]}
                            ],
                            [
                                {image: this.data_urls_prop["tensile_0_chart_legendImage"].image, fit: [220, 400], alignment: "center", margin: [0, 0, 0, 20]},
                                {image: this.data_urls_prop["tensile_90_chart_legendImage"].image, fit: [220, 400], alignment: "center", margin: [0, 0, 0, 20]}
                            ]
                        ],
                    }
                })
                // pdfContent.push({text: about, alignment: "justify", margin: [0, 0, 0, 10]})
                // pdfContent.push({text: description, alignment: "justify", margin: [0, 0, 0, 0], pageBreak: 'after'})
                pdfContent.push({text: "", pageBreak: "after"})

                pdfContent.push({
                    layout: "noBorders",
                    table: {
                        headerRows: 0,
                        widths: ["*", "*"],
                        body: [
                            [
                                {image: this.data_urls_prop["flexural_0_chart_chartImage"].image, fit: [220, 400], alignment: "center", margin: [0, 30, 0, 10]},
                                {image: this.data_urls_prop["flexural_90_chart_chartImage"].image, fit: [220, 400], alignment: "center", margin: [0, 30, 0, 10]}
                            ],
                            [
                                {image: this.data_urls_prop["flexural_0_chart_legendImage"].image, fit: [220, 400], alignment: "center", margin: [0, 0, 0, 20]},
                                {image: this.data_urls_prop["flexural_90_chart_legendImage"].image, fit: [220, 400], alignment: "center", margin: [0, 0, 0, 20]}
                            ]
                        ],
                    }
                })
                // pdfContent.push({text: about, alignment: "justify", margin: [0, 0, 0, 10]})
                // pdfContent.push({text: description, alignment: "justify", margin: [0, 0, 0, 0]})
            }
        }
    }
</script>