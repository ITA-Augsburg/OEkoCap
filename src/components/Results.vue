<script setup>
import router from "@/router";
import { createCharts } from "../results_charts_functions.js"
import html2canvas from "html2canvas"
</script>

<template>

    <div class="results_area">

        <div class="results_buttoncontainer">
            <div class="results_left_buttoncontainer">
                <v-btn
                v-if=this.gwp_button_active
                @click='handleUI("gwp")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">GWP</p></v-btn>
                <v-btn
                v-if=!this.gwp_button_active
                @click='handleUI("gwp")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">GWP</p></v-btn>
            </div>

            <div class="results_right_buttoncontainer">
                <v-btn
                v-if=this.cost_button_active
                @click='handleUI("cost")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">COST</p></v-btn>
                <v-btn
                v-if=!this.cost_button_active
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
        label="Benchmark Calculations"
        single-line
        suffix="Benchmark"
        :items=benchmark_options
        variant="solo"
        :bg-color=color_green
        v-model=this.selected_benchmark
        v-on:update:model-value='handleUI("benchmark_select")' />

        <div id="gwp_or_cost_charts" />

        <div id="gwp_or_cost_per_process_charts" />

        <div class="results_buttoncontainer">
            <div class="results_left_buttoncontainer">
                <v-btn
                v-if=this.tensile_button_active
                @click='handleUI("tensile")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">TENSILE</p></v-btn>
                <v-btn
                v-if=!this.tensile_button_active
                @click='handleUI("tensile")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">TENSILE</p></v-btn>
            </div>

            <div class="results_right_buttoncontainer">
                <v-btn
                v-if=this.flexural_button_active
                @click='handleUI("flexural")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">FLEXURAL</p></v-btn>
                <v-btn
                v-if=!this.flexural_button_active
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
                v-if=this.zero_button_active
                @click='handleUI("zero")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">0°</p></v-btn>
                <v-btn
                v-if=!this.zero_button_active
                @click='handleUI("zero")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">0°</p></v-btn>
            </div>

            <div class="results_right_buttoncontainer">
                <v-btn
                v-if=this.ninety_button_active
                @click='handleUI("ninety")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">90°</p></v-btn>
                <v-btn
                v-if=!this.ninety_button_active
                @click='handleUI("ninety")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">90°</p></v-btn>
            </div>
        </div>

        <div id="mechanical_values_charts" />
        
        <v-select
        class="select results_process_select"
        label="Calculated Processes"
        single-line
        suffix="Process"
        :items=calculated_processes
        variant="solo"
        :bg-color=color_green
        v-model=this.selected_process
        v-on:update:model-value='handleUI("benchmark_select_2")' />

        <div id="process_gwp_charts" />

        <div id="process_cost_per_kg_charts" />

        <div id="process_total_cost_charts" />

    </div>

</template>

<script>
    export default {
        props: ["app_output_prop", "color_green", "color_lightgrey"],
        emits: ["setErrorMessage", "chartsAsImages"],
        mounted() {

            // check output validity
            if(!(Object.prototype.hasOwnProperty.call(this.test_output, "processes"))) {
                    this.$emit("setErrorMessage", "Invalid Input. No output could be generated based from the given input.")
                    router.push({name: "ErrorView"})
            }

            // fill benchmark-select element
            this.benchmark_options = []
            for(let i=0; i<this.test_benchmarks.length; i++) {
                this.benchmark_options[i] = this.test_benchmarks[i].name
            }

            // fill calculated-processes-select element
            this.calculated_processes = []
            for(let i=0; i<this.test_output.processes.length; i++) {
                this.calculated_processes[i] = this.test_output.processes[i].name
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

            this.charts = createCharts(this.test_output, this.test_benchmarks, this.test_benchmarks_2, this.test_benchmarks_ashby)
            console.log(JSON.stringify(this.charts, null, 4))
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
                
                calculated_processes: [],
                selected_process: undefined,

                charts: undefined,

                test_output: {
                    "gwp": {
                        "minValue": 714.3512406919333,
                        "maxValue": 7400.289657831437
                    },
                    "processes": [
                        {
                            "maxCostPerKg": 293.0,
                            "maxGWPValue": 2292.0,
                            "maxCostTotalInEur": 2489312.5500000003,
                            "minGWPValue": 293.0,
                            "name": "ResinTransferMoulding",
                            "minCostPerKg": 293.0,
                            "position": 4,
                            "minCostTotalInEur": 318223.6375
                        },
                        {
                            "maxCostPerKg": 109.0,
                            "maxGWPValue": 2108.0,
                            "maxCostTotalInEur": 1081404.0,
                            "minGWPValue": 109.0,
                            "name": "Carding",
                            "minCostPerKg": 109.0,
                            "position": 3,
                            "minCostTotalInEur": 55917.0
                        },
                        {
                            "maxCostPerKg": 0.0,
                            "maxGWPValue": 10.0,
                            "maxCostTotalInEur": 0.0,
                            "minGWPValue": 10.0,
                            "name": "Oxidation",
                            "minCostPerKg": 0.0,
                            "position": 2,
                            "minCostTotalInEur": 0.0
                        },
                        {
                            "maxCostPerKg": 96.0,
                            "maxGWPValue": 10.0,
                            "maxCostTotalInEur": 1990250.0,
                            "minGWPValue": 10.0,
                            "name": "Pyrolysis",
                            "minCostPerKg": 96.0,
                            "position": 1,
                            "minCostTotalInEur": 91200.0
                        }
                    ],
                    "flexuralStrength_MPa": [
                        {
                            "flexuralStrength0_MPa": [
                                {
                                    "value": "96.0"
                                }
                            ]
                        },
                        {
                            "flexuralStrength90_MPa": [
                                {
                                    "value": "24.0"
                                },
                                {
                                    "value": "100.0"
                                }
                            ]
                        }
                    ],
                    "cost": {
                        "minValue_eur_per_kg": "595.4203592021821",
                        "maxValue_eur_per_kg": "6569.307577658338"
                    },
                    "materials": {
                        "matrix": "EP"
                    },
                    "tensileModulus_GPa": [
                        {
                            "tensileModulus0_GPa": [
                                {
                                    "value": "17.0"
                                },
                                {
                                    "value": "93.0"
                                }
                            ]
                        },
                        {
                            "tensileModulus90_GPa": [
                                {
                                    "value": "97.0"
                                }
                            ]
                        }
                    ],
                    "flexuralModulus_GPa": [
                        {
                            "flexuralModulus0_GPa": [
                                {
                                    "value": "95.0"
                                }
                            ]
                        },
                        {
                            "flexuralModulus90_GPa": [
                                {
                                    "value": "99.0"
                                }
                            ]
                        }
                    ],
                    "tensileStrength_MPa": [
                        {
                            "tensileStrength0_MPa": [
                                {
                                    "value": "18.0"
                                },
                                {
                                    "value": "94.0"
                                }
                            ]
                        },
                        {
                            "tensileStrength90_MPa": [
                                {
                                    "value": "98.0"
                                }
                            ]
                        }
                    ]
                },
                // benchmark used in the first bar chart
                test_benchmarks: [
                    {
                        "name": "benchmark 1",
                        "gwp_min": 500,
                        "gwp_max": 1000,
                        "cost_min": 1500,
                        "cost_max": 2000
                    },
                    {
                        "name": "benchmark 2",
                        "gwp_min": 600,
                        "gwp_max": 1100,
                        "cost_min": 1600,
                        "cost_max": 2100
                    },
                    {
                        "name": "benchmark 3",
                        "gwp_min": 700,
                        "gwp_max": 1200,
                        "cost_min": 1700,
                        "cost_max": 2200
                    },
                ],
                // benchmark used in the second bar chart
                test_benchmarks_2: [
                    {
                        "name": "ResinTransferMoulding",
                        "gwp_min": 500,
                        "gwp_max": 1000,
                        "cost_per_kg_min": 300,
                        "cost_per_kg_max": 600,
                        "total_cost_min": 1500,
                        "total_cost_max": 2000
                    },
                    {
                        "name": "Carding",
                        "gwp_min": 600,
                        "gwp_max": 1100,
                        "cost_per_kg_min": 200,
                        "cost_per_kg_max": 500,
                        "total_cost_min": 1600,
                        "total_cost_max": 2100
                    },
                    {
                        "name": "Oxidation",
                        "gwp_min": 700,
                        "gwp_max": 1200,
                        "cost_per_kg_min": 500,
                        "cost_per_kg_max": 700,
                        "total_cost_min": 1700,
                        "total_cost_max": 2200
                    },
                    {
                        "name": "Pyrolysis",
                        "gwp_min": 500,
                        "gwp_max": 1500,
                        "cost_per_kg_min": 400,
                        "cost_per_kg_max": 800,
                        "total_cost_min": 1300,
                        "total_cost_max": 2800
                    },
                ],
                test_benchmarks_ashby: {
                    benchmark_1: {
                        "flexuralStrength_MPa": [
                            {
                                "flexuralStrength0_MPa": [
                                    {
                                        "value": "45.0"
                                    },
                                    {
                                        "value": "97.0"
                                    }
                                ]
                            },
                            {
                                "flexuralStrength90_MPa": [
                                    {
                                        "value": "69.0"
                                    }
                                ]
                            }
                        ],
                        "tensileModulus_GPa": [
                            {
                                "tensileModulus0_GPa": [
                                    {
                                        "value": "24.0"
                                    },
                                    {
                                        "value": "88.0"
                                    }
                                ]
                            },
                            {
                                "tensileModulus90_GPa": [
                                    {
                                        "value": "82.0"
                                    },
                                    {
                                        "value": "110.0"
                                    }
                                ]
                            }
                        ],
                        "flexuralModulus_GPa": [
                            {
                                "flexuralModulus0_GPa": [
                                    {
                                        "value": "15.0"
                                    },
                                    {
                                        "value": "25.0"
                                    },
                                    {
                                        "value": "44.0"
                                    }
                                ]
                            },
                            {
                                "flexuralModulus90_GPa": [
                                    {
                                        "value": "72.0"
                                    }
                                ]
                            }
                        ],
                        "tensileStrength_MPa": [
                            {
                                "tensileStrength0_MPa": [
                                    {
                                        "value": "79.0"
                                    },
                                    {
                                        "value": "95.0"
                                    }
                                ]
                            },
                            {
                                "tensileStrength90_MPa": [
                                    {
                                        "value": "89.0"
                                    },
                                    {
                                        "value": "99.0"
                                    }
                                ]
                            }
                        ]
                    },
                    benchmark_2: {
                        "flexuralStrength_MPa": [
                            {
                                "flexuralStrength0_MPa": [
                                    {
                                        "value": "20.0"
                                    },
                                    {
                                        "value": "40.0"
                                    }
                                ]
                            },
                            {
                                "flexuralStrength90_MPa": [
                                    {
                                        "value": "24.0"
                                    },
                                    {
                                        "value": "53.0"
                                    }
                                ]
                            }
                        ],
                        "tensileModulus_GPa": [
                            {
                                "tensileModulus0_GPa": [
                                    {
                                        "value": "52.0"
                                    },
                                    {
                                        "value": "58.0"
                                    }
                                ]
                            },
                            {
                                "tensileModulus90_GPa": [
                                    {
                                        "value": "51.0"
                                    },
                                    {
                                        "value": "60.0"
                                    }
                                ]
                            }
                        ],
                        "flexuralModulus_GPa": [
                            {
                                "flexuralModulus0_GPa": [
                                    {
                                        "value": "7.0"
                                    },
                                    {
                                        "value": "15.0"
                                    }
                                ]
                            },
                            {
                                "flexuralModulus90_GPa": [
                                    {
                                        "value": "48.0"
                                    },
                                    {
                                        "value": "60.0"
                                    }
                                ]
                            }
                        ],
                        "tensileStrength_MPa": [
                            {
                                "tensileStrength0_MPa": [
                                    {
                                        "value": "17.0"
                                    },
                                    {
                                        "value": "64.0"
                                    }
                                ]
                            },
                            {
                                "tensileStrength90_MPa": [
                                    {
                                        "value": "3.0"
                                    }
                                ]
                            }
                        ]
                    },
                    benchmark_3: {
                        "flexuralStrength_MPa": [
                            {
                                "flexuralStrength0_MPa": [
                                    {
                                        "value": "13.0"
                                    }
                                ]
                            },
                            {
                                "flexuralStrength90_MPa": [
                                    {
                                        "value": "67.0"
                                    },
                                    {
                                        "value": "95.0"
                                    }
                                ]
                            }
                        ],
                        "tensileModulus_GPa": [
                            {
                                "tensileModulus0_GPa": [
                                    {
                                        "value": "1.0"
                                    },
                                    {
                                        "value": "36.0"
                                    }
                                ]
                            },
                            {
                                "tensileModulus90_GPa": [
                                    {
                                        "value": "19.0"
                                    }
                                ]
                            }
                        ],
                        "flexuralModulus_GPa": [
                            {
                                "flexuralModulus0_GPa": [
                                    {
                                        "value": "45.0"
                                    }
                                ]
                            },
                            {
                                "flexuralModulus90_GPa": [
                                    {
                                        "value": "90.0"
                                    }
                                ]
                            }
                        ],
                        "tensileStrength_MPa": [
                            {
                                "tensileStrength0_MPa": [
                                    {
                                        "value": "45.0"
                                    },
                                    {
                                        "value": "60.0"
                                    }
                                ]
                            },
                            {
                                "tensileStrength90_MPa": [
                                    {
                                        "value": "42.0"
                                    }
                                ]
                            }
                        ]
                    }
                },

            }
        },
        methods: {
            handleUI(id) {
                // depending on button- and select-states and viewport-width, show corresponding charts (and custom-legends)
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
                    case "benchmark_select_2":
                        this.updateProcessBarCharts(this.selected_process)
                        break
                    case "resize":
                        // charts resize themselves, custom legends must be switched manually
                        // max_gwp_per_process_charts and mechanical_values_charts have custom-legends
                        this.gwp_button_active ?
                            this.updateMaxGwpMaxCostPieChart("max_gwp_per_process_charts", "max_gwp_of_each_output_process_chart") :
                            this.updateMaxGwpMaxCostPieChart("max_cost_per_process_charts", "max_cost_of_each_output_process_chart")
                        this.updateMechanicalValuesAshbyChart()
                        break
                }
            },
            hideElementChildren(id) {
                // adds "hidden_chart" css-class to every child of the element.
                for(let i=0; i<document.getElementById(id).children.length; i++) {
                            // console.log(document.getElementById("gwp_or_cost_charts").children[i])
                            document.getElementById(id).children[i].classList.add("hidden_chart")
                        }
            },
            unhideElement(id) {
                // removes "hidden_chart" from element
                document.getElementById(id).classList.remove("hidden_chart")
            },
            updateGwpCostBarChart(chartCategory, chartName, chartNamefragment) {
                // make sure every chart of this section is hidden
                this.hideElementChildren("gwp_or_cost_charts")
                // unhide chart according to button- and select-states, viewport-width
                // bar-chart
                if(this.selected_benchmark === undefined) {
                    this.wideWindow ?
                        this.unhideElement(this.charts[chartCategory][chartName].normal_font) :
                        this.unhideElement(this.charts[chartCategory][chartName].small_font)
                } else {
                    for(let i=0; i<this.test_benchmarks.length; i++) {
                        if(this.selected_benchmark === this.test_benchmarks[i].name) {
                            let benchmarkName = this.test_benchmarks[i].name.replaceAll(" ", "_")
                            this.wideWindow ?
                                this.unhideElement(this.charts[chartCategory][chartNamefragment + benchmarkName + "_chart"].normal_font) :
                                this.unhideElement(this.charts[chartCategory][chartNamefragment + benchmarkName + "_chart"].small_font)
                        }
                    }
                }
            },
            updateMaxGwpMaxCostPieChart(chartCategory, chartName) {
                // make sure every chart (and custom-legend) of this section is hidden
                this.hideElementChildren("gwp_or_cost_per_process_charts")
                // unhide charts (and custom-legends) according to viewport-width
                // pie-chart + legend
                if(this.wideWindow) {
                    this.unhideElement(this.charts[chartCategory][chartName].normal_font)
                    this.unhideElement(this.charts[chartCategory][chartName].normal_font + "_legend_container")
                } else {
                    this.unhideElement(this.charts[chartCategory][chartName].small_font)
                    this.unhideElement(this.charts[chartCategory][chartName].small_font + "_legend_container")
                }
            },
            updateMechanicalValuesAshbyChart() {
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
            updateProcessBarCharts(selected_process) {
                // make sure every chart of these section are hidden
                this.hideElementChildren("process_gwp_charts")
                this.hideElementChildren("process_cost_per_kg_charts")
                this.hideElementChildren("process_total_cost_charts")

                let gwpChartName = selected_process + "_process_gwp_range_chart"
                let costPerKgChartName = selected_process + "_process_cost_per_kg_range_chart"
                let totalCostChartName = selected_process + "_process_total_cost_range_chart"

                if(this.wideWindow) {
                    this.unhideElement(this.charts.process_gwp_charts[gwpChartName].normal_font)
                    this.unhideElement(this.charts.process_cost_per_kg_charts[costPerKgChartName].normal_font)
                    this.unhideElement(this.charts.process_total_cost_charts[totalCostChartName].normal_font)
                } else {
                    this.unhideElement(this.charts.process_gwp_charts[gwpChartName].small_font)
                    this.unhideElement(this.charts.process_cost_per_kg_charts[costPerKgChartName].small_font)
                    this.unhideElement(this.charts.process_total_cost_charts[totalCostChartName].small_font)
                }
            },
            sendChartsAsImages() {
                // sends charts as images to results_footer component for use in pdf.
                let images = []
                // hand-pick charts
                let selectedId = undefined
                let selectedChart = undefined
                let selectedLegend = undefined

                // gwp_charts gwp_range_output_benchmark_1_chart ... gwp_range_output_benchmark_n_chart
                for(let key in this.charts.gwp_charts) {
                    if(key === "gwp_range_output_only_chart") continue
                    // canvas to image -> .toDataURL(), chart.js chart to image -> .toBase64Image()
                    selectedChart = document.getElementById(this.charts.gwp_charts[key].normal_font)
                    images.push({name: key, image: selectedChart.toDataURL()})
                }

                // cost_charts cost_range_output_benchmark_1_chart ... cost_range_output_benchmark_n_chart
                for(let key in this.charts.cost_charts) {
                    if(key === "cost_range_output_only_chart") continue
                    selectedChart = document.getElementById(this.charts.cost_charts[key].normal_font)
                    images.push({name: key, image: selectedChart.toDataURL()})
                }
                
                // max_gwp_per_process_charts max_gwp_of_each_output_process_chart + custom-legend
                selectedId = this.charts.max_gwp_per_process_charts.max_gwp_of_each_output_process_chart.normal_font
                selectedChart = document.getElementById(selectedId)
                images.push({name: "max_gwp_of_each_output_process_chart", image: selectedChart.toDataURL()})

                selectedLegend = document.getElementById(selectedId + "_legend_container")
                this.htmlElementToCanvas(selectedLegend, "max_gwp_of_each_output_process_chart_legend", images)

                // max_cost_per_process_charts max_cost_of_each_output_process_chart + custom-legend
                selectedId = this.charts.max_cost_per_process_charts.max_cost_of_each_output_process_chart.normal_font
                selectedChart = document.getElementById(selectedId)
                images.push({name: "max_cost_of_each_output_process_chart", image: selectedChart.toDataURL()})

                selectedLegend = document.getElementById(selectedId + "_legend_container")
                this.htmlElementToCanvas(selectedLegend, "max_cost_of_each_output_process_chart_legend", images)

                // mechanical_values_charts tensile_0_chart tensile_90_chart flexural_0_chart flexural_90_chart + custom-legend
                for(let key in this.charts.mechanical_values_charts) {
                    selectedId = this.charts.mechanical_values_charts[key].normal_font
                    selectedChart = document.getElementById(selectedId)
                    images.push({name: key, image: selectedChart.toDataURL()})

                    selectedLegend = document.getElementById(selectedId + "_legend_container")
                    this.htmlElementToCanvas(selectedLegend, key, images)
                }

                // process_gwp_charts process1_process_gwp_range_chart ... processn_process_gwp_range_chart
                for(let key in this.charts.process_gwp_charts) {
                    selectedChart = document.getElementById(this.charts.process_gwp_charts[key].normal_font)
                    images.push({name: key, image: selectedChart.toDataURL()})
                }
                // process_cost_per_kg_charts process1_process_cost_per_kg_range_chart ... processn_process_cost_per_kg_range_chart
                for(let key in this.charts.process_cost_per_kg_charts) {
                    selectedChart = document.getElementById(this.charts.process_cost_per_kg_charts[key].normal_font)
                    images.push({name: key, image: selectedChart.toDataURL()})
                }
                // process_total_cost_charts process1_process_total_cost_range_chart ... processn_process_total_cost_range_chart
                for(let key in this.charts.process_total_cost_charts) {
                    selectedChart = document.getElementById(this.charts.process_total_cost_charts[key].normal_font)
                    images.push({name: key, image: selectedChart.toDataURL()})
                }
                
                this.$emit("chartsAsImages", images)
            },
            htmlElementToCanvas(element, name, container) {
                // converts html-elements to canvas-elements. Canvas-elements can then be converted to images.
                // html2canvas needs the element to be visible.
                element.classList.remove("hidden_chart")
                html2canvas(element, {logging: false}).then(function(canvas) {
                    container.push({name: name, image: canvas.toDataURL()})
                        // document.body.appendChild(canvas)
                })
                element.classList.add("hidden_chart")
            }
        }
    }
</script>