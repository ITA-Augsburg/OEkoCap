<script setup>
import html2canvas from "html2canvas"
import benchmarks from "../process_benchmarks.json"
import { createCharts } from "../results_charts_functions.js" 
</script>

<template>

    <div class="results_area">

        <div class="results_buttoncontainer">
            <div class="results_left_buttoncontainer">
                <v-btn
                v-if=gwp_button_active
                @click='handleUI("gwp")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">GWP</p></v-btn>
                <v-btn
                v-if=!gwp_button_active
                @click='handleUI("gwp")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">GWP</p></v-btn>
            </div>

            <div class="results_right_buttoncontainer">
                <v-btn
                v-if=cost_button_active
                @click='handleUI("cost")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">COST</p></v-btn>
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

        <v-select
        class="select results_benchmark_process_select"
        label="Benchmarks"
        single-line
        :items=benchmark_options
        variant="solo"
        :bg-color=color_green
        v-model=selected_benchmark
        v-on:update:model-value='handleUI("benchmark_select")' />

        <div id="gwp_or_cost_charts" />

        <div id="gwp_or_cost_per_process_charts" />

        <div class="results_buttoncontainer">
            <div class="results_left_buttoncontainer">
                <v-btn
                v-if=tensile_button_active
                @click='handleUI("tensile")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">TENSILE</p></v-btn>
                <v-btn
                v-if=!tensile_button_active
                @click='handleUI("tensile")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">TENSILE</p></v-btn>
            </div>

            <div class="results_right_buttoncontainer">
                <v-btn
                v-if=flexural_button_active
                @click='handleUI("flexural")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">FLEXURAL</p></v-btn>
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

        <div class="results_buttoncontainer">
            <div class="results_left_buttoncontainer">
                <v-btn
                v-if=zero_button_active
                @click='handleUI("zero")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">0°</p></v-btn>
                <v-btn
                v-if=!zero_button_active
                @click='handleUI("zero")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">0°</p></v-btn>
            </div>

            <div class="results_right_buttoncontainer">
                <v-btn
                v-if=ninety_button_active
                @click='handleUI("ninety")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">90°</p></v-btn>
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

        <div id="mechanical_values_charts" />

        
    </div>
    
    <div id="charts_for_pdf" style="width: 1000px;" />

</template>

<script>
/**
 * After the output is delivered from the server, charts are created from it, information is visualised in this component.
 */
    export default {
        props: ["app_output_prop", "startedCorrectly", "color_green", "color_lightgrey"],
        emits: ["setErrorMessage", "chartsAsImages"],
        mounted() {
            /**
             * Creates charts from output and benchmarks.
             * Also creates data-urls of the charts for use when creating the pdf in Results_footer.vue.
             */
            
            this.exe_output = this.app_output_prop
            
            // for testing the results-page, modify the next two lines and the mounted() in ResultsView.vue.
            // this.exe_output = this.test_output // for testing enable this line (real output will be ignored)
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

            this.charts = createCharts(this.exe_output, this.benchmarks)
            // console.log(JSON.stringify(this.charts, null, 4))
            this.sendChartsAsImages()
        },
        data() {
            return {
                legendFont: 20,
                legendFontS: 15,
                wideWindow: window.innerWidth >= 500 ? true : false,

                benchmark_options: [],
                selected_benchmark: undefined,
                gwp_button_active: false,
                cost_button_active: false,
                tensile_button_active: false,
                flexural_button_active: false,
                zero_button_active: false,
                ninety_button_active: false,

                charts: undefined,

                exe_output: undefined,

                // when testing, set exe_output to test_output in mounted()
                test_output: benchmarks.test_output_1,
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
                    this.wideWindow ?
                        this.unhideElement(this.charts[chartCategory][chartName].normal_font) :
                        this.unhideElement(this.charts[chartCategory][chartName].small_font)
                } else {
                    for(let key in this.benchmarks) {
                        if(this.selected_benchmark === this.benchmarks[key].name) {
                            let benchmarkName = key.replaceAll(" ", "_")
                            this.wideWindow ?
                                this.unhideElement(this.charts[chartCategory][chartNamefragment + benchmarkName + "_chart"].normal_font) :
                                this.unhideElement(this.charts[chartCategory][chartNamefragment + benchmarkName + "_chart"].small_font)
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
            sendChartsAsImages() {
                /**
                 * Creates and sends data-urls of the charts for use when creating the pdf in Results_footer.vue.
                 */
                let images = []
                // hand-pick charts
                let selectedId = undefined
                let selectedChart = undefined
                let selectedLegend = undefined

                // gwp_charts gwp_range_output_benchmark_1_chart ... gwp_range_output_benchmark_n_chart
                // for(let key in this.charts.gwp_charts) {
                //     if(key === "gwp_range_output_only_chart") continue
                //     // canvas to image -> .toDataURL(), chart.js chart to image -> .toBase64Image()
                //     selectedChart = document.getElementById(this.charts.gwp_charts[key].normal_font)
                //     images.push({type: "bar", name: key, image: selectedChart.toDataURL()})
                // }

                // cost_charts cost_range_output_benchmark_1_chart ... cost_range_output_benchmark_n_chart
                // for(let key in this.charts.cost_charts) {
                //     if(key === "cost_range_output_only_chart") continue
                //     selectedChart = document.getElementById(this.charts.cost_charts[key].normal_font)
                //     images.push({type: "bar", name: key, image: selectedChart.toDataURL()})
                // }

                // gwp and cost bar-charts with output and every benchmark
                let pdf_gwp_barchart = document.getElementById("pdf_gwp_chart_normal_font")
                let pdf_cost_barchart = document.getElementById("pdf_cost_chart_normal_font")
                images["pdf_gwp_chart_normal_font_chartImage"] = {type: "bar", image: pdf_gwp_barchart.toDataURL()}
                images["pdf_cost_chart_normal_font_legendImage"] = {type: "bar", image: pdf_cost_barchart.toDataURL()}
                
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
                selectedLegend.classList.remove("hidden_chart")

                // Chart to DataUrl
                // container.push({type: type, name: name + "_chartImage", image: selectedChart.toDataURL()})
                container[name + "_chartImage"] = {type: type, image: selectedChart.toDataURL()}
                // let image = new Image()
                // image.src = selectedChart.toDataURL()
                // document.body.appendChild(image)
                // Legend to DataUrl
                html2canvas(selectedLegend, {logging: false}).then(function(canvas) {
                    // container.push({type: type, image: canvas.toDataURL()})
                    container[name + "_legendImage"] = {type: type, image: canvas.toDataURL()}
                    // document.body.appendChild(canvas)
                })
                selectedChart.classList.add("hidden_chart")
                selectedLegend.classList.add("hidden_chart")
            }
        }
    }
</script>