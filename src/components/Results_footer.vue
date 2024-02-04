<script setup>
    import Copyright_text from "./Copyright_text.vue"
    import { splitCamelCase } from "../results_charts_functions"
    import benchmarks from "../process_benchmarks.json"
    import pdfMake from "pdfmake/build/pdfmake"
    import pdfFonts from "pdfmake/build/vfs_fonts"
    pdfMake.vfs = pdfFonts.pdfMake.vfs
</script>

<template>
    <!-- container for height definition -->
    <div class="results_footer">

        <!-- container for centering -->
        <div class="footer_content">

            <!-- pdf-download button -->
            <div class="results_pdf_buttoncontainer">
                <v-btn
                @click=handlePdfButton()
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_pdf_button_text">download as pdf</p></v-btn>
            </div>
        
            <Copyright_text />

        </div>
    </div>

    <img :src='require("../assets/logo_oekocap_schwarz.png")' style="display: none;"  id="oekocap_logo_black_results">
    <img :src='require("../assets/logos_together_with_cu.png")' style="display: none;"  id="logos_together_results">
    <!-- <img :src='require("../assets/cu_logo_colored.png")' style="display: none;"  id="cu_logo"> -->
    <!-- <img :src='require("../assets/frauenhofer_logo.png")' style="display: none;"  id="frauenhofer_logo_results">
    <img :src='require("../assets/logo_bundesm_wirtschaft_klimaschutz.png")' style="display: none;"  id="bundesm_logo_results">
    <img :src='require("../assets/ita_logo_bunt.png")' style="display: none;"  id="ita_logo_results"> -->
</template>

<script>
/**
 * Holds a button for creating a pdf from the contents of Results.vue.
 * The button is disabled for the time being and this feature is put on the backlog.
 * Props:
 * app_input_prop (json): the input-json that goes into recycling.exe on the server. This input is always updated when user interacts with any of the input-elements on the input-pages.
 * data_urls_prop (array of json-objects containing chart-image dataUrls): when results-page is initialised, this prop is populated. See Results.vue.
 */
    export default {
        props: ["color_lightgrey", "app_input_prop", "data_urls_prop"],
        mounted() {
            // setTimeout(() => {
            //     console.log(this.data_urls_prop)
            // }, 5000);
            this.actual_input = this.app_input_prop

            // comment this in for testing the pdf
            // this.actual_input = this.test_input
        },
        data: () => ({
            actual_input: undefined,

            // this is only for testing pdf input visualisation
            test_input: benchmarks.test_input
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
                // let cu_logo = this.imageToDataUrl("cu_logo")
                // let frauenhofer_logo = this.imageToDataUrl("frauenhofer_logo_results")
                // let bundesm_logo = this.imageToDataUrl("bundesm_logo_results")
                // let ita_logo = this.imageToDataUrl("ita_logo_results")

                let content = [
                    { image: headerLogo, width: 180, margin: [ 0, 0, 0, 20], alignment: "center" },
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
                    //             { image: cu_logo, fit:[150, 150], alignment: "right", margin: [ 0, 7, 40, 0 ] }
                    //             ]]
                    //         }

                    //         image: cu_logo, fit:[50, 50], alignment: "right", margin: [ 0, 10, 20, 0 ]
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
            addInputsToPdf(pdfContent) {
                /**
                 * Creates a section listing the inputs.
                 */

                let waste_type = this.actual_input.waste.type === "EoL" ? "End of Life" : this.actual_input.waste.type

                pdfContent.push({text: "Inputs", fontSize: 14, alignment: "center", bold: true, margin: [0, 0, 0, 20]})

                // waste, transport, shredding 1, shredding 2, separation
                pdfContent.push(
                    {
                        layout: "lightHorizontalLines",
                        table: {
                            headerRows: 1,
                            widths: ["*", "*", "*", "*", "*", "*"],
                            body: [
                                [
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "WASTE", fontSize: 8, alignment: "center"},
                                    {text: "TRANSPORT", fontSize: 8, alignment: "center"},
                                    {text: "SHREDDING\nSTEP 1", fontSize: 8, alignment: "center"},
                                    {text: "SHREDDING\nSTEP 2", fontSize: 8, alignment: "center"},
                                    {text: "SEPARATION", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "type", fontSize: 8, alignment: "center"},
                                    {text: waste_type, fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.shredding_1.type, fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.shredding_2.type, fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.separation.type), fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "gwp", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.transport.co2_equv_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.shredding_1.co2_equv_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.shredding_2.co2_equv_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.separation.co2_equv_per_kg), fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "cost", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.transport.euro_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.shredding_1.euro_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.shredding_2.euro_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.separation.euro_per_kg), fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "mass loss (%)", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.shredding_1.mass_loss_percent, fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.shredding_2.mass_loss_percent, fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ]
                            ]
                        }
                    },
                    {text: "", margin: [0, 0, 0, 20]}
                )

                // polymer, textile process, processing 1, processing 2
                pdfContent.push(
                    {
                        layout: "lightHorizontalLines",
                        table: {
                            headerRows: 1,
                            widths: ["*", "*", "*", "*", "*", "*"],
                            body: [
                                [
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "POLYMER", fontSize: 8, alignment: "center"},
                                    {text: "TEXTILE\nPROCESS", fontSize: 8, alignment: "center"},
                                    {text: "PROCESSING\nSTEP 1", fontSize: 8, alignment: "center"},
                                    {text: "PROCESSING\nSTEP 2", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "type", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.textile_process.type, fontSize: 8, alignment: "center"},
                                    {text: splitCamelCase(this.actual_input.processing_1.type), fontSize: 8, alignment: "center"},
                                    {text: splitCamelCase(this.actual_input.processing_2.type), fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "gwp", fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.polymer.co2_equv_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.textile_process.co2_equv_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.processing_1.co2_equv_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.processing_2.co2_equv_per_kg), fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "cost", fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.polymer.euro_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.textile_process.euro_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.processing_1.euro_per_kg), fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.processing_2.euro_per_kg), fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "mass loss (%)", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.textile_process.mass_loss_percent, fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.processing_1.mass_loss_percent, fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.processing_2.mass_loss_percent), fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "thermo type", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.polymer.thermo_type, fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "matrix type", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.polymer.matrix_type, fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "fiber volume\ncontent (%)", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.polymer.fvc_percent, fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "feedstock type", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.polymer.feedstock_type, fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "state of origin", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.polymer.state_of_origin, fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "throughput\n(kg/h)", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.textile_process.throughput_kg_per_h, fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "areal weight\n(g/m²)", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.textile_process.areal_weight_g_per_sqm, fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ],
                                [
                                    {text: "wall thickness", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"},
                                    {text: this.actual_input.processing_1.wandstärke_mm, fontSize: 8, alignment: "center"},
                                    {text: this.checkInputString(this.actual_input.processing_2.wandstärke_mm), fontSize: 8, alignment: "center"},
                                    {text: "", fontSize: 8, alignment: "center"}
                                ]
                            ]
                        }
                    },
                    {text: "", pageBreak: "after"}
                )
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
                let description = " " // "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat"
                
                // bar charts
                pdfContent.push({
                    layout: "noBorders",
                    table: {
                        headerRows: 0,
                        widths: [180, "auto"],
                        body: [
                            [
                                {text: description, rowSpan: 2, fontSize: 10, alignment: "justify"},
                                {image: this.data_urls_prop["gwp_bar_chart_chartImage"].image, fit: [200, 400], alignment: "center", margin: [0, 30, 0, 10]},
                                // {image: this.data_urls_prop["cost_bar_chart_chartImage"].image, fit: [220, 400], alignment: "center", margin: [0, 30, 0, 10]},
                            ],
                            [
                                {},
                                {image: this.data_urls_prop["gwp_bar_chart_legendImage"].image, fit: [360, 400], alignment: "center", margin: [0, 0, 0, 20]},
                                // {image: this.data_urls_prop["cost_bar_chart_legendImage"].image, fit: [360, 400], alignment: "center", margin: [0, 0, 0, 20]},
                            ]
                        ],
                    }
                    
                })
                pdfContent.push({
                    layout: "noBorders",
                    table: {
                        headerRows: 0,
                        widths: [180, "auto"],
                        body: [
                            [
                                {text: description, rowSpan: 2, fontSize: 10, alignment: "justify"},
                                // {image: this.data_urls_prop["gwp_bar_chart_chartImage"].image, fit: [200, 400], alignment: "center", margin: [0, 30, 0, 10]},
                                {image: this.data_urls_prop["cost_bar_chart_chartImage"].image, fit: [220, 400], alignment: "center", margin: [0, 30, 0, 10]},
                            ],
                            [
                                {},
                                // {image: this.data_urls_prop["gwp_bar_chart_legendImage"].image, fit: [360, 400], alignment: "center", margin: [0, 0, 0, 20]},
                                {image: this.data_urls_prop["cost_bar_chart_legendImage"].image, fit: [360, 400], alignment: "center", margin: [0, 0, 0, 20]},
                            ]
                        ],
                    }
                    
                },
                {text: "", pageBreak: "after"})

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
                    },
                    {text: "", pageBreak: "after"})
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
                    },
                    {text: "", pageBreak: "after"})
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
                    },
                    {text: "", pageBreak: "after"})
                    // pdfContent.push({text: about, alignment: "justify", margin: [0, 0, 0, 10]})
                    // pdfContent.push({text: description, alignment: "justify", margin: [0, 0, 0, 0], pageBreak: 'after'})
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