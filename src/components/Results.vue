<script setup>
import html2canvas from "html2canvas"
import benchmarks from "../process_benchmarks.json"
import { createCharts } from "../results_charts_functions.js" 
</script>

<template>

    <!-- centered container with set width -->
    <div class="results_area">

        <!-- container for the buttons "GWP" and "COST" -->
        <div class="results_buttoncontainer">

            <!-- GWP-button, depending wether the button is active or not, the maincolor or the grey version will display -->
            <div class="results_left_buttoncontainer">

                <!-- maincolor version -->
                <v-btn
                v-if=gwp_button_active
                @click='handleUI("gwp")'
                :color=color_main
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">GWP</p></v-btn>

                <!-- grey version -->
                <v-btn
                v-if=!gwp_button_active
                @click='handleUI("gwp")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">GWP</p></v-btn>
            </div>

            <!-- COST-button, depending wether the button is active or not, the maincolor or the grey version will display -->
            <div class="results_right_buttoncontainer">

                <!-- maincolor version -->
                <v-btn
                v-if=cost_button_active
                @click='handleUI("cost")'
                :color=color_main
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">COST</p></v-btn>

                <!-- grey version -->
                <v-btn
                v-if=!cost_button_active
                @click='handleUI("cost")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">COST</p></v-btn>
            </div>
        </div>

        <!-- benchmark dropdown -->
        <v-select
        class="select select_maincolor results_benchmark_process_select"
        label="Benchmarks"
        single-line
        :items=benchmark_options
        variant="solo"
        :bg-color=color_main
        v-model=selected_benchmark
        v-on:update:model-value='handleUI("benchmark_select")' />

        <div id="gwp_or_cost_charts" />
        <br><br>

        <!-- container that holds the gwp- or cost-piechart depending on the active button above -->
        <div id="gwp_or_cost_per_process_charts" />

        <!-- container for the buttons "tensile" and "flexural" -->
        <div class="results_buttoncontainer">

            <!-- tensile-button, depending wether the button is active or not, the maincolor or the grey version will display -->
            <div class="results_left_buttoncontainer">

                <!-- maincolor version -->
                <v-btn
                v-if=tensile_button_active
                @click='handleUI("tensile")'
                :color=color_main
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">TENSILE</p></v-btn>

                <!-- grey version -->
                <v-btn
                v-if=!tensile_button_active
                @click='handleUI("tensile")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">TENSILE</p></v-btn>
            </div>

            <!-- flexural-button, depending wether the button is active or not, the maincolor or the grey version will display -->
            <div class="results_right_buttoncontainer">

                <!-- maincolor version -->
                <v-btn
                v-if=flexural_button_active
                @click='handleUI("flexural")'
                :color=color_main
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">FLEXURAL</p></v-btn>

                <!-- grey version -->
                <v-btn
                v-if=!flexural_button_active
                @click='handleUI("flexural")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">FLEXURAL</p></v-btn>
            </div>
        </div>

        <!-- container for the buttons "zero degree" and "ninety degree" -->
        <div class="results_buttoncontainer">

            <!-- zero-button, depending wether the button is active or not, the maincolor or the grey version will display -->
            <div class="results_left_buttoncontainer">

                <!-- maincolor version -->
                <v-btn
                v-if=zero_button_active
                @click='handleUI("zero")'
                :color=color_main
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">0°</p></v-btn>

                <!-- grey version -->
                <v-btn
                v-if=!zero_button_active
                @click='handleUI("zero")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">0°</p></v-btn>
            </div>

            <!-- ninety-button, depending wether the button is active or not, the maincolor or the grey version will display -->
            <div class="results_right_buttoncontainer">

                <!-- maincolor version -->
                <v-btn
                v-if=ninety_button_active
                @click='handleUI("ninety")'
                :color=color_main
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">90°</p></v-btn>

                <!-- grey version -->
                <v-btn
                v-if=!ninety_button_active
                @click='handleUI("ninety")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">90°</p></v-btn>
            </div>
        </div>

        <!-- container that holds the ashbychart, depending on the combination of the four buttons above -->
        <div id="mechanical_values_charts" />

        
    </div>
    
    <!-- the charts are converted to images, when the result-page loads. In order to create images from the charts, they need to be displayed in the dom. Charts that are needed in image-form are displayed here for a split-second, while the package html2canvas converts them. Then they are hidden and remain hidden. Chart-images are needed in the pdf. -->
    <div id="charts_for_pdf" style="width: 1000px;" />

</template>

<script>
/**
 * After the output is delivered from the server, charts are created from it, information is visualised in this component.
 * Props:
 * app_output_prop (json): output from the recycling.exe from the server.
 * startedCorrectly (boolean): false on initialisation, if user enters website on oekocap.org/results, then they're sent to the start-page. startedCorrectly is set to true on the start-page.
 * Emits:
 * chartsAsImages (array of json-objects, containing images as dataUrls): sends chart-images to the parent and ultimately to Results_footer.vue.
 */
    export default {
        props: ["app_output_prop", "startedCorrectly", "color_main", "color_lightgrey"],
        emits: ["chartsAsImages"],
        mounted() {
            /**
             * Creates charts from output and benchmarks.
             * Also creates data-urls of the charts for use when creating the pdf in Results_footer.vue.
             */
            
            this.actual_output = this.app_output_prop
            
            // for testing the results-page, modify the next two lines and also follow the instructions in readme.md
            // this.actual_output = this.test_output // for testing enable this line (real output will be ignored)
            if(!this.startedCorrectly) return // for testing disable this line

            // fill benchmark-select element
            this.benchmark_options = []
            for(let key in this.benchmarks) {
                this.benchmark_options.push(this.benchmarks[key].name)
            }

            //if window-width passes through the value 500px, redraw charts (with different legend font size)
            window.addEventListener("resize", () => {
                if(this.wideWindow === false && window.innerWidth >= 500) {
                    this.wideWindow = true
                    this.handleUI("resize")
                } else if(this.wideWindow === true && window.innerWidth < 500) {
                    this.wideWindow = false
                    this.handleUI("resize")
                }
            })

            this.charts = createCharts(this.actual_output, this.benchmarks)
            // console.log(JSON.stringify(this.charts, null, 4))
            this.safariBarchartImages = this.createBarchartImagesForSafari()
            // console.log(JSON.stringify(this.safariBarchartImages, null, 4))
            this.sendChartsAsImages()

            // Chart.js charts don't resize correctly on Safari. If on safari and window.innerwidth small then display a picture of the chart instead of the chart. This is a bad workaround but I couldn't get it to work otherwise.
            this.chromeAgent = navigator.userAgent.indexOf("Chrome") > -1
            // Detect Safari
            this.safariAgent = navigator.userAgent.indexOf("Safari") > -1
            // Discard Safari since it also matches Chrome
            if ((this.chromeAgent) && (this.safariAgent)) this.safariAgent = false
            // console.log(this.safariAgent)
            

        },
        data() {
            return {
                legendFont: 20,
                legendFontS: 15,
                wideWindow: window.innerWidth >= 500 ? true : false,
                chromeAgent: undefined,
                safariAgent: undefined,
                safariBarchartImages: undefined,

                benchmark_options: [],
                selected_benchmark: undefined,
                gwp_button_active: false,
                cost_button_active: false,
                tensile_button_active: false,
                flexural_button_active: false,
                zero_button_active: false,
                ninety_button_active: false,

                charts: undefined,

                actual_output: undefined,

                // when testing, set actual_output to test_output in mounted()
                test_output: benchmarks.test_output_from_recycling_v5_1,
                benchmarks: benchmarks.benchmarks
            }
        },
        methods: {
            handleUI(id) {
                /**
                 * Depending on button- and select-states and viewport-width, shows the corresponding charts (and custom-legends)
                 */
                switch(id) {
                    case "gwp":
                        this.gwp_button_active = true
                        this.cost_button_active = false

                        this.updateGwpCostBarChart("gwp_charts", "gwp_range_output_only_chart", "gwp_range_output_")
                        this.updateMaxGwpMaxCostPieChart("max_gwp_per_process_charts", "max_gwp_of_each_output_process_chart")
                        break
                    case "cost":
                        this.gwp_button_active = false
                        this.cost_button_active = true

                        this.updateGwpCostBarChart("cost_charts", "cost_range_output_only_chart", "cost_range_output_")
                        this.updateMaxGwpMaxCostPieChart("max_cost_per_process_charts", "max_cost_of_each_output_process_chart")
                        break
                    case "benchmark_select":
                        if(!this.gwp_button_active && !this.cost_button_active) break
                        this.gwp_button_active ? this.handleUI("gwp") : this.handleUI("cost")
                        break
                    case "tensile":
                        this.tensile_button_active = true
                        this.flexural_button_active = false
                        this.updateMechanicalValuesAshbyChart()
                        break
                    case "flexural":
                        this.tensile_button_active = false
                        this.flexural_button_active = true
                        this.updateMechanicalValuesAshbyChart()
                        break
                    case "zero":
                        this.zero_button_active = true
                        this.ninety_button_active = false
                        this.updateMechanicalValuesAshbyChart()
                        break
                    case "ninety":
                        this.zero_button_active = false
                        this.ninety_button_active = true
                        this.updateMechanicalValuesAshbyChart()
                        break
                    case "resize":
                        // charts resize themselves, custom legends must be switched manually
                        // max_gwp_per_process_charts and mechanical_values_charts have custom-legends
                        if(this.gwp_button_active) {
                            this.updateGwpCostBarChart("gwp_charts", "gwp_range_output_only_chart", "gwp_range_output_")
                            this.updateMaxGwpMaxCostPieChart("max_gwp_per_process_charts", "max_gwp_of_each_output_process_chart")
                        }
                        if(this.cost_button_active) {
                            this.updateGwpCostBarChart("cost_charts", "cost_range_output_only_chart", "cost_range_output_")
                            this.updateMaxGwpMaxCostPieChart("max_cost_per_process_charts", "max_cost_of_each_output_process_chart")
                        }
                        this.updateMechanicalValuesAshbyChart()
                        break
                }
            },
            hideElementChildren(id) {
                /**
                 * Adds "hidden_chart" css-class to every child of the passed element.
                 */
                for(let i=0; i<document.getElementById(id).children.length; i++) {
                            // console.log(document.getElementById("gwp_or_cost_charts").children[i])
                            document.getElementById(id).children[i].classList.add("hidden_chart")
                        }
            },
            unhideElement(id) {
                /**
                 * Removes "hidden_chart" css-class from the passed element.
                 */
                document.getElementById(id).classList.remove("hidden_chart")
            },
            updateGwpCostBarChart(chartCategory, chartName, chartNamefragment) {
                /**
                 * Updates only the gwp/cost bar-chart. Hides every element first, then unhides the one thats information has been passed.
                 */
                // make sure every chart of this section is hidden
                this.hideElementChildren("gwp_or_cost_charts")
                // unhide chart according to button- and select-states, viewport-width
                // bar-chart
                if(this.selected_benchmark === undefined) {
                    if(this.wideWindow) {
                        this.unhideElement(this.charts[chartCategory][chartName].normal_font)
                        this.unhideElement(this.charts[chartCategory][chartName].normal_font + "_legend_container")
                    } else {
                        if(this.safariAgent === undefined || !this.safariAgent) {
                            this.unhideElement(this.charts[chartCategory][chartName].small_font)
                        } else {
                            this.unhideElement(chartName + "_chartImage")
                        }

                        this.unhideElement(this.charts[chartCategory][chartName].small_font + "_legend_container")
                    }
                } else {
                    for(let key in this.benchmarks) {
                        if(this.selected_benchmark === this.benchmarks[key].name) {
                            let benchmarkName = key.replaceAll(" ", "_")
                            if(this.wideWindow) {
                                this.unhideElement(this.charts[chartCategory][chartNamefragment + benchmarkName + "_chart"].normal_font)
                                this.unhideElement(this.charts[chartCategory][chartNamefragment + benchmarkName + "_chart"].normal_font + "_legend_container")
                            } else {
                                if(this.safariAgent === undefined || !this.safariAgent) {
                                    this.unhideElement(this.charts[chartCategory][chartNamefragment + benchmarkName + "_chart"].small_font)
                                }
                                else {
                                    this.unhideElement(chartNamefragment + benchmarkName + "_chart" + "_chartImage")
                                }

                                this.unhideElement(this.charts[chartCategory][chartNamefragment + benchmarkName + "_chart"].small_font + "_legend_container")
                            }
                        }
                    }
                }
            },
            updateMaxGwpMaxCostPieChart(chartCategory, chartName) {
                /**
                 * Updates only the gwp-per-process/cost-per-process pie-chart. Hides every element first, then unhides the one thats information has been passed.
                 * The legend of this pie-chart is separated from the chart and must be handled on its own here.
                 */
                // make sure every chart (and custom-legend) of this section is hidden
                this.hideElementChildren("gwp_or_cost_per_process_charts")
                // unhide charts (and custom-legends) according to viewport-width
                // pie-chart + legend
                    try {
                        if(this.wideWindow) {
                            this.unhideElement(this.charts[chartCategory][chartName].normal_font)
                            this.unhideElement(this.charts[chartCategory][chartName].normal_font + "_legend_container")
                        } else {
                            this.unhideElement(this.charts[chartCategory][chartName].small_font)
                            this.unhideElement(this.charts[chartCategory][chartName].small_font + "_legend_container")
                        }
                    } catch(error) {
                        // a process in output.processes has a null value forminGWPValue ormaxGWPValue or minCostPerKg or maxCostPerKg
                        return
                    }
            },
            updateMechanicalValuesAshbyChart() {
                /**
                 * Updates only the mechanical-values ashby-chart. Hides every element first, then unhides the one thats information has been passed.
                 * The legend of this ashby-chart is separated from the chart and must be handled on its own here.
                 */
                // Checks if a selection has been made for (tensile or flexural) and (0 or 90)
                if(!this.tensile_button_active && !this.flexural_button_active || !this.zero_button_active && !this.ninety_button_active) return
                // make sure every chart of this section is hidden
                this.hideElementChildren("mechanical_values_charts")
                if(this.tensile_button_active && this.zero_button_active) {
                    if(this.wideWindow) {
                        this.unhideElement(this.charts.mechanical_values_charts.tensile_0_chart.normal_font)
                        this.unhideElement(this.charts.mechanical_values_charts.tensile_0_chart.normal_font + "_legend_container")
                    } else {
                        this.unhideElement(this.charts.mechanical_values_charts.tensile_0_chart.small_font)
                        this.unhideElement(this.charts.mechanical_values_charts.tensile_0_chart.small_font + "_legend_container")
                    }
                } else if(this.tensile_button_active && this.ninety_button_active) {
                    if(this.wideWindow) {
                        this.unhideElement(this.charts.mechanical_values_charts.tensile_90_chart.normal_font)
                        this.unhideElement(this.charts.mechanical_values_charts.tensile_90_chart.normal_font + "_legend_container")
                    } else {
                        this.unhideElement(this.charts.mechanical_values_charts.tensile_90_chart.small_font)
                        this.unhideElement(this.charts.mechanical_values_charts.tensile_90_chart.small_font + "_legend_container")
                    }
                } else if(this.flexural_button_active && this.zero_button_active) {
                    if(this.wideWindow) {
                        this.unhideElement(this.charts.mechanical_values_charts.flexural_0_chart.normal_font)
                        this.unhideElement(this.charts.mechanical_values_charts.flexural_0_chart.normal_font + "_legend_container")
                    } else {
                        this.unhideElement(this.charts.mechanical_values_charts.flexural_0_chart.small_font)
                        this.unhideElement(this.charts.mechanical_values_charts.flexural_0_chart.small_font + "_legend_container")
                    }
                } else if(this.flexural_button_active && this.ninety_button_active) {
                    if(this.wideWindow) {
                        this.unhideElement(this.charts.mechanical_values_charts.flexural_90_chart.normal_font)
                        this.unhideElement(this.charts.mechanical_values_charts.flexural_90_chart.normal_font + "_legend_container")
                    } else {
                        this.unhideElement(this.charts.mechanical_values_charts.flexural_90_chart.small_font)
                        this.unhideElement(this.charts.mechanical_values_charts.flexural_90_chart.small_font + "_legend_container")
                    }
                }
            },
            createBarchartImagesForSafari() {
                /**
                 * So barcharts appear streched in the Safari browser, or at least on small viewport widths. It might be a problem in the chart.js code, I really tried getting this to work.
                 * This function offers a temporary solution. It creates images of the problematic charts. These are then displayed exclusively in Safari on small viewport widths.
                 */

                let images = {}
                let selectedChart = undefined

                // gwp and cost charts to images. Images do not contain the legends. Legends are rendered separately. 
                for(let key in this.charts.gwp_charts) {
                    // canvas to image -> .toDataURL(), chart.js chart to image -> .toBase64Image()
                    selectedChart = document.getElementById(this.charts.gwp_charts[key].normal_font)
                    // images.push({type: "bar", name: key, image: selectedChart.toDataURL()})
                    this.htmlElementToCanvas(selectedChart, undefined, key, "bar", images)
                }
                for(let key in this.charts.cost_charts) {
                    selectedChart = document.getElementById(this.charts.cost_charts[key].normal_font)
                    // images.push({type: "bar", name: key, image: selectedChart.toDataURL()})
                    this.htmlElementToCanvas(selectedChart, undefined, key, "bar", images)
                }

                // insert images into the gwp_or_cost_charts div
                for(let entry in images) {
                    // console.log(images[entry])
                    // console.log(entry)
                    // console.log(images[entry].image)
                    let image = new Image()
                    image.src = images[entry].image
                    image.alt = "chart_image"
                    image.id = entry
                    image.classList.add("safari_barchart_image")
                    document.getElementById("gwp_or_cost_charts").prepend(image)
                    document.getElementById(image.id).classList.add("hidden_chart")
                }
                return images
            },
            sendChartsAsImages() {
                /**
                 * Creates and sends data-urls of some of the charts. These are used when creating the pdf in Results_footer.vue.
                 */
                let images = []
                // hand-pick charts
                let selectedId = undefined
                let selectedChart = undefined
                let selectedLegend = undefined

                // gwp and cost bar-charts with output and every benchmark + custom-legend
                let pdf_gwp_barchart = document.getElementById("pdf_gwp_chart_normal_font")
                let pdf_gwp_barchart_legend = document.getElementById("pdf_gwp_chart_normal_font_legend_container")
                let pdf_cost_barchart = document.getElementById("pdf_cost_chart_normal_font")
                let pdf_cost_barchart_legend = document.getElementById("pdf_cost_chart_normal_font_legend_container")
                this.htmlElementToCanvas(pdf_gwp_barchart, pdf_gwp_barchart_legend, "gwp_bar_chart", "bar", images)
                this.htmlElementToCanvas(pdf_cost_barchart, pdf_cost_barchart_legend, "cost_bar_chart", "bar", images)
                // images["pdf_gwp_chart_normal_font_chartImage"] = {type: "bar", image: pdf_gwp_barchart.toDataURL()}
                // images["pdf_cost_chart_normal_font_legendImage"] = {type: "bar", image: pdf_cost_barchart.toDataURL()}
                
                // max_gwp_per_process_charts max_gwp_of_each_output_process_chart + custom-legend
                // pie-chart might not exist, depending on the recycling.exe output
                if(this.charts.max_gwp_per_process_charts.max_gwp_of_each_output_process_chart === undefined) {
                    images["max_gwp_of_each_output_process_chart_chartImage"] = {type: "pie", image: undefined}
                    images["max_gwp_of_each_output_process_chart_legendImage"] = {type: "pie", image: undefined}
                } else {
                    selectedId = this.charts.max_gwp_per_process_charts.max_gwp_of_each_output_process_chart.normal_font
                    selectedChart = document.getElementById(selectedId)
                    selectedLegend = document.getElementById(selectedId + "_legend_container")
                    this.htmlElementToCanvas(selectedChart, selectedLegend, "max_gwp_of_each_output_process_chart", "pie", images)
                }

                // max_cost_per_process_charts max_cost_of_each_output_process_chart + custom-legend
                // pie-chart might not exist, depending on the recycling.exe output
                if(this.charts.max_cost_per_process_charts.max_cost_of_each_output_process_chart === undefined) {
                    images["max_cost_of_each_output_process_chart_chartImage"] = {type: "pie", image: undefined}
                    images["max_cost_of_each_output_process_chart_legendImage"] = {type: "pie", image: undefined}
                } else  {
                    selectedId = this.charts.max_cost_per_process_charts.max_cost_of_each_output_process_chart.normal_font
                    selectedChart = document.getElementById(selectedId)
                    selectedLegend = document.getElementById(selectedId + "_legend_container")
                    this.htmlElementToCanvas(selectedChart, selectedLegend, "max_cost_of_each_output_process_chart", "pie", images)
                }

                // mechanical_values_charts tensile_0_chart tensile_90_chart flexural_0_chart flexural_90_chart + custom-legend
                for(let key in this.charts.mechanical_values_charts) {
                    selectedId = this.charts.mechanical_values_charts[key].normal_font
                    selectedChart = document.getElementById(selectedId)
                    selectedLegend = document.getElementById(selectedId + "_legend_container")
                    this.htmlElementToCanvas(selectedChart, selectedLegend, key, "ashby", images)
                }
                
                // console.log(images)
                this.$emit("chartsAsImages", images)
            },
            htmlElementToCanvas(selectedChart, selectedLegend, name, type, container) {
                /**
                 * Converts html-elements to canvas-elements. Canvas-elements can then be converted to data-urls.
                 * html2canvas needs the element to be visible in the DOM, so the element corresponding to the passed information must be temporarily made visible. After html2canvas is done, elements are hidden again.
                 */
                selectedChart.classList.remove("hidden_chart")
                if(selectedLegend !== undefined) selectedLegend.classList.remove("hidden_chart")

                // Chart to DataUrl
                // container.push({type: type, name: name + "_chartImage", image: selectedChart.toDataURL()})
                container[name + "_chartImage"] = {type: type, image: selectedChart.toDataURL()}
                selectedChart.classList.add("hidden_chart")
                // let image = new Image()
                // image.src = selectedChart.toDataURL()
                // document.body.appendChild(image)

                // Legend to DataUrl
                if(selectedLegend !== undefined) {
                    html2canvas(selectedLegend, {logging: false}).then(function(canvas) {
                        // container.push({type: type, image: canvas.toDataURL()})
                        container[name + "_legendImage"] = {type: type, image: canvas.toDataURL()}
                        // document.body.appendChild(canvas)
                    })
                    selectedLegend.classList.add("hidden_chart")
                }
            }
        }
    }
</script>