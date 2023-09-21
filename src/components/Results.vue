<script setup>
import router from "@/router";
import Chart from "chart.js/auto"
import annotationPlugin from "chartjs-plugin-annotation"
</script>

<template>

    <div class="results_area">

        <!-- <p>{{app_output_prop}}</p> -->
        <!-- JSON.stringify(app_output_prop, null, 2) -->

        <div class="results_buttoncontainer">
            <div class="results_left_buttoncontainer">
                <v-btn
                v-if=this.gwp_button_active
                @click='handleButton("gwp")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">GWP</p></v-btn>
                <v-btn
                v-if=!this.gwp_button_active
                @click='handleButton("gwp")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">GWP</p></v-btn>
            </div>

            <div class="results_right_buttoncontainer">
                <v-btn
                v-if=this.cost_button_active
                @click='handleButton("cost")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">COST</p></v-btn>
                <v-btn
                v-if=!this.cost_button_active
                @click='handleButton("cost")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">COST</p></v-btn>
            </div>
        </div>

        <v-select
        class="select results_benchmark_process_select"
        label="Benchmark Processes"
        single-line
        suffix="Benchmark"
        :items=benchmark_process_options
        variant="solo"
        :bg-color=color_green
        v-model=this.selected_benchmark
        v-on:update:model-value=[handleBenchmarkSelect()] />

        <canvas
        v-if="this.barChartData[0][0] !== undefined || this.barChartData[1][0] !== undefined"
        id="bar_chart" class="bar_chart" />
        <div id="gwp_or_cost_charts" />

        <canvas
        v-if="this.pieChartData[0] !== undefined"
        id="pie_chart" />
        <div class="custom_legend_container">
            <div id="pie_chart_legend" style="width: fit-content;"></div>
        </div>
        <div id="gwp_or_cost_per_process_charts" />

        <div class="results_buttoncontainer">
            <div class="results_left_buttoncontainer">
                <v-btn
                v-if=this.tensile_button_active
                @click='handleButton("tensile")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">TENSILE</p></v-btn>
                <v-btn
                v-if=!this.tensile_button_active
                @click='handleButton("tensile")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">TENSILE</p></v-btn>
            </div>

            <div class="results_right_buttoncontainer">
                <v-btn
                v-if=this.flexural_button_active
                @click='handleButton("flexural")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">FLEXURAL</p></v-btn>
                <v-btn
                v-if=!this.flexural_button_active
                @click='handleButton("flexural")'
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
                @click='handleButton("zero")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">0°</p></v-btn>
                <v-btn
                v-if=!this.zero_button_active
                @click='handleButton("zero")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">0°</p></v-btn>
            </div>

            <div class="results_right_buttoncontainer">
                <v-btn
                v-if=this.ninety_button_active
                @click='handleButton("ninety")'
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">90°</p></v-btn>
                <v-btn
                v-if=!this.ninety_button_active
                @click='handleButton("ninety")'
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">90°</p></v-btn>
            </div>
        </div>

        <canvas
        v-if="this.ashbyChartData !== undefined"
        id="ashby_chart" class="ashby_chart" />
        <div class="custom_legend_container">
            <div id="ashby_chart_legend" style="width: fit-content;"></div>
        </div>
        <div id="mechanical_values_charts" />
        
        <v-select
        class="select results_process_select"
        label="Calculated Processes"
        single-line
        suffix="Process"
        :items=calculated_process_options
        variant="solo"
        :bg-color=color_green
        v-model=this.selected_process
        v-on:update:model-value=[handleProcessSelect()] />

        <canvas
        v-if="this.barChartProcessGwpRangeData[0] !== undefined"
        id="bar_chart_process_gwp_range" class="bar_chart" />
        <div id="process_gwp_charts" />

        <canvas
        v-if="this.barChartProcessCostPerKgRangeData[0] !== undefined"
        id="bar_chart_process_cost_per_kg_range" class="bar_chart" />
        <div id="process_cost_per_kg_charts" />

        <canvas
        v-if="this.barChartProcessTotalCostRangeData[0] !== undefined"
        id="bar_chart_process_total_cost_range" class="bar_chart" />
        <div id="process_total_cost_charts" />

    </div>

</template>

<script>
    export default {
        props: ["app_output_prop", "color_green", "color_lightgrey"],
        emits: ["setErrorMessage", "chartsAsImages"],
        mounted() {
            // annotationPlugin for drawing ellipses in charts
            Chart.register(annotationPlugin)
            // console.log(JSON.stringify(this.test_output, null, 2))

            // check output validity
            if(!(Object.prototype.hasOwnProperty.call(this.test_output, "processes"))) {
                    this.$emit("setErrorMessage", "Invalid Input. No output could be generated based from the given input.")
                    router.push({name: "ErrorView"})
            }

            // fill benchmark-select element
            this.benchmark_process_options = []
            for(let i=0; i<this.test_benchmarks.length; i++) {
                this.benchmark_process_options[i] = this.test_benchmarks[i].name
            }

            // fill calculated-processes-select element
            this.calculated_process_options = []
            for(let i=0; i<this.test_output.processes.length; i++) {
                this.calculated_process_options[i] = this.test_output.processes[i].name
            }

            //if window-width passes through the value 500px, redraw charts (with different legend font size)
            window.addEventListener("resize", () => {
                if(this.wideWindow === false && window.innerWidth >= 500) {
                    this.wideWindow = true
                    this.updateAllCharts()
                } else if(this.wideWindow === true && window.innerWidth < 500) {
                    this.wideWindow = false
                    this.updateAllCharts()
                }
            })

            // get data for pie-chart from output; create colors and extract labels
            for(let i=0; i<this.test_output.processes.length; i++) {
                    this.pieChartColors[i] = this.randomColor(i, 1)
                    this.pieChartLabels[i] = this.test_output.processes[i].name
                }
            // console.log(this.pieChartColors)

            this.charts = this.createCharts(this.test_output, this.test_benchmarks, this.test_benchmarks_2, this.test_benchmarks_ashby)
            // document.getElementById("gwp_range_output_only_chart_small_font").classList.remove("hidden_chart")
            // this.charts.gwp_charts.gwp_range_output_only_chart.small_font.canvas.classList.remove("hidden_chart")
        },
        data() {
            return {
                legendFont: 20,
                legendFontS: 15,
                wideWindow: window.innerWidth >= 500 ? true : false,

                benchmark_process_options: [],
                selected_benchmark: undefined,
                gwp_button_active: false,
                cost_button_active: false,
                tensile_button_active: false,
                flexural_button_active: false,
                zero_button_active: false,
                ninety_button_active: false,

                barChart: undefined,
                barChartData: [[undefined, undefined], [undefined, undefined]],
                leftBarLabel: "Result",
                rightBarLabel: "Benchmark",

                pieChart: undefined,
                pieChartData: [],
                pieChartTitle: "Calculated Processes",
                pieChartLabels: [],
                pieChartColors: [],

                ashbyChart: undefined,
                ashbyChartData: undefined,
                
                calculated_process_options: [],
                selected_process: undefined,
                barChartProcessGwpRange: undefined,
                barChartProcessCostPerKgRange: undefined,
                barChartProcessTotalCostRange: undefined,
                barChartProcessGwpRangeData: [],
                barChartProcessCostPerKgRangeData: [],
                barChartProcessTotalCostRangeData: [],

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

                charts: undefined
            }
        },
        methods: {
            createCharts(output, test_benchmarks, test_benchmarks_2, test_benchmarks_ashby) {
                // creates every single chart that can possibly be selected. A chart consists of a <canvas> element and a Chart variable.
                let charts = {
                    gwp_charts: {},
                    cost_charts: {},
                    max_gwp_per_process_charts: {},
                    max_cost_per_process_charts: {},
                    mechanical_values_charts: {},
                    process_gwp_charts: {},
                    process_cost_per_kg_charts: {},
                    process_total_cost_charts: {}
                }
                
                // gwp range bar-charts (output only, benchmark_1 only, ..., benchmark_n only, output-benchmark_1, ..., output-benchmark_n)

                let category = "gwp_charts"
                let parentId = "gwp_or_cost_charts"
                let title = "GWP Range"
                let unit = "kg CO²"
                
                let pieChartLabels = undefined
                let pieChartColors = undefined
                
                // output only
                let name = "gwp_range_output_only_chart"
                let barChartBenchmarkLabel = ""
                let data = [
                    [Math.round(output.gwp.minValue * 100) / 100, Math.round(output.gwp.maxValue * 100) / 100],
                    [undefined, undefined]
                ]
                this.addBarCharts(charts, category, name, title, barChartBenchmarkLabel, data, unit, parentId)
                name = undefined
                data = undefined

                for(let i=0; i<test_benchmarks.length; i++) {
                    // benchmark_1 only, ..., benchmark_n only
                    name = "gwp_range_" + test_benchmarks[i].name.replaceAll(" ", "_") + "_only_chart"
                    barChartBenchmarkLabel = test_benchmarks[i].name
                    data = [
                        [undefined, undefined],
                        [Math.round(test_benchmarks[i].gwp_min * 100)/100, Math.round(test_benchmarks[i].gwp_max * 100)/100]
                    ]
                    this.addBarCharts(charts, category, name, title, barChartBenchmarkLabel, data, unit, parentId)
                    name = undefined
                    data = undefined

                    // output-benchmark_1, ..., output-benchmark_n
                    name = "gwp_range_output_" + test_benchmarks[i].name.replaceAll(" ", "_") + "_chart"
                    data = [
                        [Math.round(output.gwp.minValue * 100) / 100, Math.round(output.gwp.maxValue * 100) / 100],
                        [Math.round(test_benchmarks[i].gwp_min * 100)/100, Math.round(test_benchmarks[i].gwp_max * 100)/100]
                    ]
                    this.addBarCharts(charts, category, name, title, barChartBenchmarkLabel, data, unit, parentId)
                    name = undefined
                    data = undefined
                    barChartBenchmarkLabel = undefined
                }
                
                // cost range bar-charts (output only, benchmark_1 only, ..., benchmark_n only, output-benchmark_1, ..., output-benchmark_n)

                category = "cost_charts"
                parentId = "gwp_or_cost_charts"
                title = "Cost Range"
                unit = "€"

                // output only
                name = "cost_range_output_only_chart"
                barChartBenchmarkLabel = ""
                data = [
                    [Math.round(output.cost.minValue_eur_per_kg * 100) / 100, Math.round(output.cost.maxValue_eur_per_kg * 100) / 100],
                    [undefined, undefined]
                ]
                this.addBarCharts(charts, category, name, title, barChartBenchmarkLabel, data, unit, parentId)
                name = undefined
                data = undefined

                for(let i=0; i<test_benchmarks.length; i++) {
                    // benchmark_1 only, ..., benchmark_n only
                    name = "cost_range_" + test_benchmarks[i].name.replaceAll(" ", "_") + "_only_chart"
                    barChartBenchmarkLabel = test_benchmarks[i].name
                    data = [
                        [undefined, undefined],
                        [Math.round(test_benchmarks[i].cost_min * 100)/100, Math.round(test_benchmarks[i].cost_max * 100)/100]
                    ]
                    this.addBarCharts(charts, category, name, title, barChartBenchmarkLabel, data, unit, parentId)
                    name = undefined
                    data = undefined

                    // output-benchmark_1, ..., output-benchmark_n
                    name = "cost_range_output_" + test_benchmarks[i].name.replaceAll(" ", "_") + "_chart"
                    data = [
                        [Math.round(output.cost.minValue_eur_per_kg * 100) / 100, Math.round(output.cost.maxValue_eur_per_kg * 100) / 100],
                        [Math.round(test_benchmarks[i].cost_min * 100)/100, Math.round(test_benchmarks[i].cost_max * 100)/100]
                    ]
                    this.addBarCharts(charts, category, name, title, barChartBenchmarkLabel, data, unit, parentId)
                    name = undefined
                    data = undefined
                    barChartBenchmarkLabel = undefined
                }

                // max gwp of each process pie-chart + custom legend (output)

                category = "max_gwp_per_process_charts"
                parentId = "gwp_or_cost_per_process_charts"
                title = "Maximal GWP of each Process"
                unit = "kg CO²"

                // output
                name = "max_gwp_of_each_output_process_chart"
                pieChartLabels = []
                data = []
                pieChartColors = []
                output.processes.forEach((process, i) => {
                    pieChartLabels.push(process.name)
                    data.push(Math.round(process.maxGWPValue * 100) / 100)
                    pieChartColors.push(this.randomColor(i+1, 1))
                })
                this.addPieCharts(charts, category, name, title, pieChartLabels, data, pieChartColors, unit, parentId)
                name = undefined
                data = undefined
                pieChartLabels = undefined
                pieChartColors = undefined

                // max total cost of each process pie-chart + custom legend (output)

                category = "max_cost_per_process_charts"
                parentId = "gwp_or_cost_per_process_charts"
                title = "Maximal Cost of each Process"
                unit = "€"
                
                // output
                name = "max_cost_of_each_output_process_chart"
                pieChartLabels = []
                data = []
                pieChartColors = []
                output.processes.forEach((process, i) => {
                    pieChartLabels.push(process.name)
                    data.push(Math.round(process.maxCostTotalInEur * 100) / 100)
                    pieChartColors.push(this.randomColor(i+1, 1))
                })
                this.addPieCharts(charts, category, name, title, pieChartLabels, data, pieChartColors, unit, parentId)
                name = undefined
                data = undefined
                pieChartLabels = undefined
                pieChartColors = undefined

                // mechanical values ashby-charts (tensile-0, tensile-90, flexural-0, flexural-90)
                category = "mechanical_values_charts"
                parentId = "mechanical_values_charts"

                // tensile-0
                name = "tensile_0_chart"
                data = this.setAshbyChartData(output, test_benchmarks_ashby, "tensile", "0")
                this.addAshbyCharts(charts, category, name, data, parentId)

                // tensile-90
                name = "tensile_90_chart"
                data = this.setAshbyChartData(output, test_benchmarks_ashby, "tensile", "90")
                this.addAshbyCharts(charts, category, name, data, parentId)

                // flexural-0
                name = "flexural_0_chart"
                data = this.setAshbyChartData(output, test_benchmarks_ashby, "flexural", "0")
                this.addAshbyCharts(charts, category, name, data, parentId)

                // flexural-90
                name = "flexural_90_chart"
                data = this.setAshbyChartData(output, test_benchmarks_ashby, "flexural", "90")
                this.addAshbyCharts(charts, category, name, data, parentId)
                name = undefined
                data = undefined

                // process gwp range (output_process_1-corresponding_benchmark, ..., output_process_n-corresponding_benchmark)
                // process cost/kg range (output_process_1-corresponding_benchmark, ..., output_process_n-corresponding_benchmark)
                // process total cost range (output_process_1-corresponding_benchmark, ..., output_process_n-corresponding_benchmark)
                for(let i=0; i< output.processes.length; i++) {
                    let processGwpRangeData = []
                    let processCostPerKgRangeData = []
                    let processTotalCostRangeData = []
                    let minGwp = Math.round(output.processes[i].minGWPValue * 100)/100
                    let maxGwp = Math.round(output.processes[i].maxGWPValue * 100)/100
                    let minCostKg = Math.round(output.processes[i].minCostPerKg * 100)/100
                    let maxCostKg = Math.round(output.processes[i].maxCostPerKg * 100)/100
                    let minCostTotal = Math.round(output.processes[i].minCostTotalInEur * 100)/100
                    let maxCostTotal = Math.round(output.processes[i].maxCostTotalInEur * 100)/100

                    processGwpRangeData[0] = [minGwp, maxGwp]
                    processCostPerKgRangeData[0] = [minCostKg, maxCostKg]
                    processTotalCostRangeData[0] = [minCostTotal, maxCostTotal]

                    // look for a corresponding process in the benchmarks
                    for(let j=0; j<test_benchmarks_2.length; j++) {
                        if(test_benchmarks_2[j].name === output.processes[i].name) {
                            let minGwp = Math.round(test_benchmarks_2[j].gwp_min * 100)/100
                            let maxGwp = Math.round(test_benchmarks_2[j].gwp_max * 100)/100
                            let minCostKg = Math.round(test_benchmarks_2[j].cost_per_kg_min * 100)/100
                            let maxCostKg = Math.round(test_benchmarks_2[j].cost_per_kg_max * 100)/100
                            let minCostTotal = Math.round(test_benchmarks_2[j].total_cost_min * 100)/100
                            let maxCostTotal = Math.round(test_benchmarks_2[j].total_cost_max * 100)/100
                            processGwpRangeData[1] = [minGwp, maxGwp]
                            processCostPerKgRangeData[1] = [minCostKg, maxCostKg]
                            processTotalCostRangeData[1] = [minCostTotal, maxCostTotal]
                            break
                        }
                    }

                    category = "process_gwp_charts"
                    parentId = "process_gwp_charts"
                    barChartBenchmarkLabel = "Benchmark"

                    name = output.processes[i].name + "_process_gwp_range_chart"
                    title = output.processes[i].name + " Process GWP Range"
                    unit = "kg CO²"
                    this.addBarCharts(charts, category, name, title, barChartBenchmarkLabel, processGwpRangeData, unit, parentId)

                    category = "process_cost_per_kg_charts"
                    parentId = "process_cost_per_kg_charts"
                    name = output.processes[i].name + "_process_cost_per_kg_range_chart"
                    title = output.processes[i].name + " Process Cost per Kg Range"
                    unit = "€ / kg"
                    this.addBarCharts(charts, category, name, title, barChartBenchmarkLabel, processCostPerKgRangeData, unit, parentId)

                    category = "process_total_cost_charts"
                    parentId = "process_total_cost_charts"
                    name = output.processes[i].name + "_process_total_cost_range_chart"
                    title = output.processes[i].name + " Process Total Cost Range"
                    unit = "€"
                    this.addBarCharts(charts, category, name, title, barChartBenchmarkLabel, processTotalCostRangeData, unit, parentId)
                }
                category = undefined
                parentId = undefined
                barChartBenchmarkLabel = undefined
                name = undefined
                title = undefined
                unit = undefined

                return charts
            },
            createCanvasElement(id, className, parentId) {
                // creates a hidden <canvas> element and inserts it into the parent element.
                let newCanvas = document.createElement("canvas")
                newCanvas.id = id
                newCanvas.classList.add(className)
                // newCanvas.classList.add("hidden_chart")
                document.getElementById(parentId).appendChild(newCanvas)
                // console.log(myCanvas)
                return newCanvas
            },
            createBarChart(id, title, benchmarkLabel, data, unit, legendFontSize) {
                // format of data always [[a, b], [c, d]]
                return new Chart(id, {
                    type: "bar",
                    data: {
                        labels: ["Result", benchmarkLabel],
                        datasets: [
                            {
                                data: this.checkBarChartData(data),
                                backgroundColor: [
                                    this.color_green,
                                    this.color_lightgrey
                                ],
                                barThickness: 80,
                                borderWidth: 1,
                                borderColor: "#777",
                                // hoverBorderWidth: 2,
                                // hoverBorderColor: "#000",
                                borderSkipped: false,
                                hoverBackgroundColor: this.color_green
                            }
                        ]
                    },
                    options: {
                        animation: false,
                        hover: false,
                        aspectRatio: 1.3,
                        scales: {
                            x: {
                            ticks: {
                                font: {
                                    size: 20
                                }
                            }
                            },
                            y: {
                            min: 0,
                            ticks: {
                                font: {
                                    size: 18
                                }
                            }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: title,
                                font: {
                                    size: 20
                                }
                            },
                            legend: {
                                position: "bottom",
                                labels: {
                                    font: {
                                        size: legendFontSize
                                    },
                                    boxWidth: 25,
                                    boxHeight: 25,
                                    generateLabels: (chart) => {
                                            if(data[0][0] === undefined) {
                                                return [{
                                                    text: chart.data.labels[1] + " range: [" + data[1][0] + ", " + data[1][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[1],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[1]
                                                }]
                                            } else if(data[1][0] === undefined) {
                                                return [{
                                                    text: chart.data.labels[0] + " range: [" + data[0][0] + ", " + data[0][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[0],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[0]
                                                }]
                                            }
                                            return chart.data.labels.map((label, index) => {
                                                return {
                                                    text: label + " range: [" + data[index][0] + ", " + data[index][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[index],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[index]
                                                }
                                            })
                                        }
                                }
                            },
                            tooltip: {
                                enabled: false
                            }
                        }
                    }
                })
            },
            addBarCharts(chartsObj, category, name, title, benchmarkLabel, data, unit, parentId) {
                // Prevents code duplication when creating charts.
                chartsObj[category][name] = {}
                chartsObj[category][name]["small_font"] = {}
                chartsObj[category][name]["normal_font"] = {}
                // create and save canvases and charts
                chartsObj[category][name]["small_font"]["canvas"] = this.createCanvasElement((name + "_small_font"), "bar_chart", parentId)
                chartsObj[category][name]["small_font"]["chart"] = this.createBarChart((name + "_small_font"), title, benchmarkLabel, data, unit, 15)

                chartsObj[category][name]["normal_font"]["canvas"] = this.createCanvasElement((name + "_normal_font"), "bar_chart", parentId)
                chartsObj[category][name]["normal_font"]["chart"] = this.createBarChart((name + "_normal_font"), title, benchmarkLabel, data, unit, 20)
            },
            checkBarChartData(data) {
                //bars dont show if their min and max values are the same. In this case the values for drawing the bar will be modified. The legend will still show the accurate values.
                let modifiedData = []
                let chartHeight = data[0][0]
                let minBarHeight = undefined
                for(let i=0; i<data.length; i++) {
                    for(let j=0; j<data[0].length; j++) {
                        data[i][j] > chartHeight ? chartHeight = data[i][j] : ""
                    }
                }
                minBarHeight = (chartHeight / 100) * 2
                for(let i=0; i<data.length; i++) {
                    let barHeight = Math.abs(data[i][1] - data[i][0])
                    if(barHeight < minBarHeight) {
                        // bar height will be 2% of y-axis height
                        let difference = minBarHeight - barHeight
                        let newMin = data[i][0] - (difference / 2)
                        let newMax = data[i][1] + (difference / 2)
                        if(newMin < 0) {
                            modifiedData.push([0, (newMax + Math.abs(newMin))])
                        } else {
                            modifiedData.push([newMin, newMax])
                        }
                    } else {
                        modifiedData.push([data[i][0], data[i][1]])
                    }
                }
                return modifiedData
            },
            createPieChart(id, title, labels, data, colors, unit, legendFontSize, parentId) {
                return new Chart(id, {
                    type: "pie",
                    data: {
                        labels: labels, // this.pieChartLabels,
                        datasets: [{
                            data: data, // this.pieChartData,
                            backgroundColor: colors, // this.pieChartColors,
                            borderWidth: 1,
                            borderColor: "#777",
                            // hoverBorderWidth: 3,
                            // hoverBorderColor: "#000"
                        }]
                    },
                    options: {
                        animation: false,
                        hover: false,
                        aspectRatio: 1.3,
                        plugins: {
                            title: {
                                display: true,
                                text: title, // this.pieChartTitle,
                                font: {
                                    size: 20
                                }
                            },
                            legend: {
                                display: false,
                            //     position: "bottom",
                            //     // display: (this.pieChartData[0]!==undefined) ? true : false,
                            //     labels: {
                            //         font: {
                            //             size: window.innerWidth >= 500 ? this.legendFont : this.legendFontS
                            //         },
                            //         boxWidth: 25,
                            //         boxHeight: 25,
                            //         generateLabels: (chart) => {
                            //             let unit = this.gwp_button_active ? " kg CO²" : " €"
                            //             return chart.data.labels.map((label, index) => {
                            //                 return {
                            //                     text: label + ": " + this.pieChartData[index] + unit + " (" + this.calculatePieChartPercent(index) + "%)",
                            //                     strokeStyle: chart.data.datasets[0].borderColor[index],
                            //                     fillStyle: chart.data.datasets[0].backgroundColor[index]
                            //                 }
                            //             })
                            //         }
                            //     }
                            },
                            tooltip: {
                                enabled: false
                            }
                        },
                    },
                    // Creating legend here to separate it from the chart itself. If not decoupled then chart size depends on the size of the legend (more legend items = smaller chart)
                    plugins: [{
                        beforeInit: function(chart) {
                            if(chart.canvas.id === id) {
                                let legendId = id + "_legend"
                                //create legend-container
                                const legendContainer = document.createElement("div")
                                legendContainer.classList.add("custom_legend_container")
                                // legendContainer.classList.add("hidden_chart")
                                legendContainer.innerHTML =
                                `
                                <div id=${legendId} style="width: fit-content;"></div>
                                `
                                // append legend-conainer after the corresponding charts canvas element
                                document.getElementById(parentId).appendChild(legendContainer)

                                const customLegend = document.getElementById(legendId)
                                customLegend.innerHTML = ``
                                chart.data.labels.forEach((label, i) => {
                                    // calculate percentage-value of a process
                                    let sum = 0
                                    chart.data.datasets[0].data.forEach((number) => {
                                        sum += number
                                    })
                                    let pieSlice = (chart.data.datasets[0].data[i] / (sum / 100))
                                    let percent = Math.round(pieSlice * 100) / 100
                                    let text = label + ": " + chart.data.datasets[0].data[i] + " " + unit + " (" + percent + "%)"
                                    customLegend.innerHTML += 
                                    `
                                        <div style="display: flex; width: fit-content">
                                            <div style="width: 30px; height: 30px; background-color: ${chart.data.datasets[0].backgroundColor[i]}; border: 1px solid black;"></div>
                                            <div style="font-size: ${legendFontSize}px; margin-left: 10px;">
                                                ${text}
                                            </div>
                                        </div>
                                    `
                                })
                            }
                        }
                    }]
                })
            },
            addPieCharts(chartsObj, category, name, title, labels, data, colors, unit, parentId) {
                // Prevents code duplication when creating charts.
                chartsObj[category][name] = {}
                chartsObj[category][name]["small_font"] = {}
                chartsObj[category][name]["normal_font"] = {}
                // create and save canvases and charts
                chartsObj[category][name]["small_font"]["canvas"] = this.createCanvasElement((name + "_small_font"), "pie_chart", parentId)
                chartsObj[category][name]["small_font"]["chart"] = this.createPieChart((name + "_small_font"), title, labels, data, colors, unit, 15, parentId)

                chartsObj[category][name]["normal_font"]["canvas"] = this.createCanvasElement((name + "_normal_font"), "pie_chart", parentId)
                chartsObj[category][name]["normal_font"]["chart"] = this.createPieChart((name + "_normal_font"), title, labels, data, colors, unit, 20, parentId)
            },
            createAshbyChart(id, data, legendFontSize, parentId) {
                return new Chart(id, {
                    type: "bubble",
                    data: {},
                    options: {
                        animation: false,
                        hover: false,
                        aspectRatio: 1,
                        scales: {
                            x: {
                                min: 0,
                                max: data.xAxisRange, // this.ashbyChartData.xAxisRange,
                                title: {
                                    display: true,
                                    text: "Modulus",
                                    font: {
                                        size: 20
                                    }
                                },
                                ticks: {
                                    font: {
                                        size: 18
                                    }
                                }
                            },
                            y: {
                                min: 0,
                                max: data.yAxisRange, // this.ashbyChartData.yAxisRange,
                                title: {
                                    display: true,
                                    text: "Strength",
                                    font: {
                                        size: 20
                                    }
                                },
                                ticks: {
                                    font: {
                                        size: 18
                                    }
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: data.chartTitle, // this.ashbyChartData.chartTitle,
                                font: {
                                    size: 20
                                }
                            },
                            legend: {
                                display: false,
                                // position: 'bottom',
                                // labels: {
                                //     font: {
                                //         size: window.innerWidth >= 500 ? this.legendFont : this.legendFontS
                                //     },
                                //     boxWidth: 25,
                                //     boxHeight: 25,
                                //     generateLabels: () => {
                                //         let labels = []
                                //         for(let i=0; i<this.ashbyChartData.ellipses.length; i++) {
                                //             labels.push({
                                //                 text: "Strength Min: " + this.ashbyChartData.ellipses[i].yMin + " MPa, Strength Max: " + this.ashbyChartData.ellipses[i].yMax + " MPa",
                                //                 strokeStyle: "#000000",
                                //                 fillStyle: this.ashbyChartData.ellipses[i].backgroundColor
                                //             })
                                //             labels.push({
                                //                 text: "Modulus Min: " + this.ashbyChartData.ellipses[i].xMin + " GPa, Modulus Max: " + this.ashbyChartData.ellipses[i].xMax + " GPa",
                                //                 strokeStyle: "#000000",
                                //                 fillStyle: this.ashbyChartData.ellipses[i].backgroundColor
                                //             })
                                //         }
                                //         return labels
                                //     }
                                // },
                            },
                            tooltip: {
                                enabled: false
                            },
                            annotation: {
                                annotations: this.checkAshbyChartData(data)
                            }
                        }
                    },
                    plugins: [{
                        beforeInit: function(chart) {
                            // Creating legend here to separate it from the chart itself. If not decoupled then chart size depends on the size of the legend (more legend items = smaller chart)
                            if(chart.canvas.id === id) {
                                let legendId = id + "_legend"
                                //create legend-container
                                const legendContainer = document.createElement("div")
                                legendContainer.classList.add("custom_legend_container")
                                // legendContainer.classList.add("hidden_chart")
                                legendContainer.innerHTML =
                                `
                                <div id=${legendId} style="width: fit-content;"></div>
                                `
                                // append legend-conainer after the corresponding charts canvas element
                                document.getElementById(parentId).appendChild(legendContainer)

                                const customLegend = document.getElementById(legendId)
                                customLegend.innerHTML = ``
                                data.ellipses.forEach((ellipse, i) => {
                                    let roundedStrengthMin = Math.round(ellipse.yMin * 100) / 100
                                    let roundedStrengthMax = Math.round(ellipse.yMax * 100) / 100
                                    let roundedModulusMin = Math.round(ellipse.xMin * 100) / 100
                                    let roundedModulusMax = Math.round(ellipse.xMax * 100) / 100
                                    // console.log(roundedStrengthMin + " " + roundedStrengthMax + " " + roundedModulusMin + " " + roundedModulusMax)
                                    // console.log(ellipse.yMin + " " + ellipse.yMax + " " + ellipse.xMin + " " + ellipse.xMax)
                                    let strengthText = "Strength range: [" + roundedStrengthMin + ", " + roundedStrengthMax + "] MPa"
                                    let modulusText = "Modulus range: [" + roundedModulusMin + ", " + roundedModulusMax + "] GPa"
                                    customLegend.innerHTML += 
                                    `
                                        <div style="font-size: 18px;">
                                            ${data.names[i]}    
                                        </div>
                                        <div style="display: flex; width: fit-content">
                                            <div style="width: 30px; height: 30px; background-color: ${ellipse.backgroundColor}; border: 1px solid black;"></div>
                                            <div style="font-size: ${legendFontSize}px; margin-left: 10px;">
                                                ${strengthText}
                                            </div>
                                        </div>
                                        <div style="display: flex; width: fit-content">
                                            <div style="width: 30px; height: 30px; background-color: ${ellipse.backgroundColor}; border: 1px solid black;"></div>
                                            <div style="font-size: ${legendFontSize}px; margin-left: 10px;">
                                                ${modulusText}
                                            </div>
                                        </div>
                                    `
                                })
                            }
                        }
                    }]
                })
            },
            addAshbyCharts(chartsObj, category, name, data, parentId) {
                // Prevents code duplication when creating charts.
                chartsObj[category][name] = {}
                chartsObj[category][name]["small_font"] = {}
                chartsObj[category][name]["normal_font"] = {}
                // create and save canvases and charts
                chartsObj[category][name]["small_font"]["canvas"] = this.createCanvasElement((name + "_small_font"), "ashby_chart", parentId)
                chartsObj[category][name]["small_font"]["chart"] = this.createAshbyChart((name + "_small_font"), data, 15, parentId)

                chartsObj[category][name]["normal_font"]["canvas"] = this.createCanvasElement((name + "_normal_font"), "ashby_chart", parentId)
                chartsObj[category][name]["normal_font"]["chart"] = this.createAshbyChart((name + "_normal_font"), data, 20, parentId)
            },
            checkAshbyChartData(data) {
                // for every ellipse check min and max values on each axis. If min-max range < 3% of the axis-range then ellipse won't show well. If min==max then ellipse won't show. Therefor modify values. Values in the legend won't be affected.
                let modifiedData = {
                    ellipses: [],
                    xAxisRange: data.xAxisRange,
                    yAxisRange: data.yAxisRange,
                    chartTitle: data.chartTitle
                }
                for(let i=0; i<data.ellipses.length; i++) {
                    let newEllipse = {
                        type: 'ellipse',
                        xMin: data.ellipses[i].xMin,
                        xMax: data.ellipses[i].xMax,
                        yMin: data.ellipses[i].yMin,
                        yMax: data.ellipses[i].yMax,
                        backgroundColor: data.ellipses[i].backgroundColor
                    }
                    // compare xMin and xMax, modify them if needed
                    let currentWidth = Math.abs(newEllipse.xMax - newEllipse.xMin)
                    let threePercentWidth = modifiedData.xAxisRange * 0.03
                    if(currentWidth < threePercentWidth) {
                        let sidePadding = (threePercentWidth - currentWidth) / 2 // to be added left and right
                        newEllipse.xMin = newEllipse.xMin - sidePadding
                        newEllipse.xMax = newEllipse.xMax + sidePadding
                    }
                    // compare yMin and yMax, modify them if needed
                    let currentHeight = Math.abs(newEllipse.yMax - newEllipse.yMin)
                    let threePercentHeight = modifiedData.yAxisRange * 0.03
                    if(currentHeight < threePercentHeight) {
                        let sidePadding = (threePercentHeight - currentHeight) / 2 // to be added above and below
                        newEllipse.yMin = newEllipse.yMin - sidePadding
                        newEllipse.yMax = newEllipse.yMax + sidePadding
                    }
                    modifiedData.ellipses[i] = newEllipse
                }
                // console.log(JSON.stringify(data, null, 2))
                // console.log(JSON.stringify(modifiedData, null, 2))
                return modifiedData.ellipses
            },
            setAshbyChartData(output, benchmarks, mechArg1, mechArg2) { // this.test_output, this.test_benchmarks_ashby
                // picks data from output and benchmarks corresponding to the function-parameters
                // calculate minValue and maxValue of output-fields
                let outputMinMax = this.getMechanicalMinMaxValues(output)
                // calculate minValues and maxValues of benchmarks
                let benchmarksMinMax = {}
                for(let key in benchmarks) {
                    benchmarksMinMax[key] = this.getMechanicalMinMaxValues(benchmarks[key])
                }
                // create data based on function-parameters
                let selection_x = undefined
                let selection_y = undefined
                let chartTitle = undefined
                if(mechArg1 === "tensile" && mechArg2 === "0") {
                    //tensStren0 tensMod0
                    selection_x = "tensMod0"
                    selection_y = "tensStren0"
                    chartTitle = "Tensileness range at 0°"

                } else if(mechArg1 === "tensile" && mechArg2 === "90") {
                    //tensStren90 tensMod90
                    selection_x = "tensMod90"
                    selection_y = "tensStren90"
                    chartTitle = "Tensileness range at 90°"

                } else if(mechArg1 === "flexural" && mechArg2 === "0") {
                    //flexStren0 flexMod0
                    selection_x = "flexMod0"
                    selection_y = "flexStren0"
                    chartTitle = "Flexuralness range at 0°"

                } else if(mechArg1 === "flexural" && mechArg2 === "90") {
                    //flexStren90 flexMod90
                    selection_x = "flexMod90"
                    selection_y = "flexStren90"
                    chartTitle = "Flexuralness range at 90°"

                } else {
                    console.error("Invalid mechArg1 and/or mechArg2 argument in setAshbyChartData(...)")
                    return undefined
                }

                // determine x-axis maximum from output-modulus and benchmark-moduluses
                let maxModulus = outputMinMax[selection_x].max
                for(let key in benchmarksMinMax) {
                    if(benchmarksMinMax[key][selection_x].max > maxModulus) {
                        maxModulus = benchmarksMinMax[key][selection_x].max
                    }
                }
                // determine y-axis maximum from output-strength and benchmark-strengths
                let maxStrength = outputMinMax[selection_y].max
                for(let key in benchmarksMinMax) {
                    if(benchmarksMinMax[key][selection_y].max > maxStrength) {
                        maxStrength = benchmarksMinMax[key][selection_y].max
                    }
                }

                let data = {
                    ellipses: [{
                        type: 'ellipse',
                        xMin: outputMinMax[selection_x].min,
                        xMax: outputMinMax[selection_x].max,
                        yMin: outputMinMax[selection_y].min,
                        yMax: outputMinMax[selection_y].max,
                        backgroundColor: 'hsla(146, 55%, 57%, 0.4)'
                    }],
                    names: ["Result"],
                    xAxisRange: maxModulus + maxModulus * 0.1,
                    yAxisRange: maxStrength + maxStrength * 0.1,
                    chartTitle: chartTitle
                }

                let colorIndex = 1 // the color corresponding to 0 is alredy in use (output-ellipse)
                for(let key in benchmarksMinMax) {
                    let newEllipse = {
                        type: 'ellipse',
                        xMin: benchmarksMinMax[key][selection_x].min,
                        xMax: benchmarksMinMax[key][selection_x].max,
                        yMin: benchmarksMinMax[key][selection_y].min,
                        yMax: benchmarksMinMax[key][selection_y].max,
                        backgroundColor: this.randomColor(colorIndex, 0.4),
                    }
                    data.ellipses.push(newEllipse)
                    data.names.push(key)
                    colorIndex++
                }
                return data
            },
            getMechanicalMinMaxValues(data) {
                /* returns min- and max-values of output for the fields
                tensileStrength0_MPa, tensileStrength90_MPa
                tensileModulus0_GPa, tensileModulus90_GPa
                flexuralStrength0_MPa, flexuralStrength90_MPa
                flexuralModulus0_GPa, flexuralModulus90_GPa */
                let values = {}
                let tempMin = undefined
                let tempMax = undefined
                let tensStren0 = data.tensileStrength_MPa[0].tensileStrength0_MPa
                let tensStren90 = data.tensileStrength_MPa[1].tensileStrength90_MPa
                let tensMod0 = data.tensileModulus_GPa[0].tensileModulus0_GPa
                let tensMod90 = data.tensileModulus_GPa[1].tensileModulus90_GPa
                let flexStren0 = data.flexuralStrength_MPa[0].flexuralStrength0_MPa
                let flexStren90 = data.flexuralStrength_MPa[1].flexuralStrength90_MPa
                let flexMod0 = data.flexuralModulus_GPa[0].flexuralModulus0_GPa
                let flexMod90 = data.flexuralModulus_GPa[1].flexuralModulus90_GPa
                let items = [tensStren0, tensStren90, tensMod0, tensMod90, flexStren0, flexStren90, flexMod0, flexMod90]
                let keyNames = ["tensStren0", "tensStren90", "tensMod0", "tensMod90", "flexStren0", "flexStren90", "flexMod0", "flexMod90"]
                for(let j=0; j<items.length; j++) {
                    for(let i=0; i<items[j].length; i++) {
                        // determine min
                        if(tempMin === undefined || parseFloat(items[j][i].value) < tempMin) {
                            tempMin = parseFloat(items[j][i].value)
                        }
                        // determine max
                        if(tempMax === undefined || parseFloat(items[j][i].value) > tempMax) {
                            tempMax = parseFloat(items[j][i].value)
                        }
                    }
                    // save in values
                    values[keyNames[j]] = {"min": tempMin, "max": tempMax}
                    // reset tempMin, tempMax
                    tempMin = undefined
                    tempMax = undefined
                }

                // console.log(JSON.stringify(values, null, 2))
                return values
            },
            randomColor(i, alpha) {
                /**
                 * Generates a randomised color, that has the same saturation and lightness as the main green color.
                 * Parameter i is needed for iterating in the wrapper function.
                */
                let h = (146 + i * 260) % 356, s = 55, l = 57
                // console.log("rgb(" + r +", " + g + ", " + b + ")")
                return "hsla(" + h + ", " + s + "%, " + l + "%, " + alpha + ")"
            },


            // above all the methods needed for createCharts(...) to work; generate every single chart
            // below methods with functionality to create charts on-demand based on button-states


            handleButton(id) {
                //depending on which button is "active", show gwp or cost of output
                switch(id) {
                    case "gwp":
                        this.gwp_button_active = true
                        this.cost_button_active = false
                        this.barChartData[0][0] = Math.round(this.test_output.gwp.minValue * 100) / 100
                        this.barChartData[0][1] = Math.round(this.test_output.gwp.maxValue * 100) / 100

                        this.pieChartTitle = "Maximal GWP of each Process"
                        this.test_output.processes.forEach((element, index) => {
                            this.pieChartData[index] = Math.round(element.maxGWPValue * 100) / 100
                        })
                        break
                    case "cost":
                        this.gwp_button_active = false
                        this.cost_button_active = true
                        this.barChartData[0][0] = Math.round(this.test_output.cost.minValue_eur_per_kg * 100) / 100
                        this.barChartData[0][1] = Math.round(this.test_output.cost.maxValue_eur_per_kg * 100) / 100

                        this.pieChartTitle = "Maximal total cost of each Process"
                        this.test_output.processes.forEach((element, index) => {
                            this.pieChartData[index] = Math.round(element.maxCostTotalInEur * 100) / 100
                        })
                        break
                    case "tensile":
                        this.tensile_button_active = true
                        this.flexural_button_active = false
                        this.determineAshbyChartData()
                        break
                    case "flexural":
                        this.tensile_button_active = false
                        this.flexural_button_active = true
                        this.determineAshbyChartData()
                        break
                    case "zero":
                        this.zero_button_active = true
                        this.ninety_button_active = false
                        this.determineAshbyChartData()
                        break
                    case "ninety":
                        this.zero_button_active = false
                        this.ninety_button_active = true
                        this.determineAshbyChartData()
                        break
                }

                //benchmark needs to change from gwp to cost (and vice versa) if output switches
                //Initially canvas-elements are missing, in order for a chart to render for the first time,
                //some time is needed until the canvas-element is added
                if(document.getElementById("bar_chart") === null || document.getElementById("pie_chart") === null) {
                    setTimeout(() => {
                        this.handleBenchmarkSelect()
                        // this.updateBarChart() happens in this.handleBenchmarkSelect() alredy
                        this.updatePieChart()
                        this.sendChartsAsImages()
                    }, 50)
                } else {
                    this.handleBenchmarkSelect()
                    // this.updateBarChart() happens in this.handleBenchmarkSelect() alredy
                    this.updatePieChart()
                    this.sendChartsAsImages()
                }

                if(document.getElementById("ashby_chart") === null) {
                    setTimeout(() => {
                        this.updateAshbyChart()
                    }, 50);
                } else {
                    this.updateAshbyChart()
                }
            },
            handleBenchmarkSelect() {
                this.test_benchmarks.forEach(element => {
                    if(this.selected_benchmark === element.name) {
                        //depending on which button is "active", show gwp or cost of benchmark
                        if(this.gwp_button_active) {
                            this.rightBarLabel = "Benchmark" //element.name + " Benchmark"
                            this.barChartData[1][0] = Math.round(element.gwp_min * 100)/100
                            this.barChartData[1][1] = Math.round(element.gwp_max * 100)/100
                        } else {
                            this.rightBarLabel = "Benchmark" //element.name + " Benchmark"
                            this.barChartData[1][0] = Math.round(element.cost_min * 100)/100
                            this.barChartData[1][1] = Math.round(element.cost_max * 100)/100
                        }
                    }
                })
                if(document.getElementById("bar_chart") === null) {
                    setTimeout(() => {
                        this.updateBarChart()
                }, 50);
                } else {
                    this.updateBarChart()
                }
            },
            handleProcessSelect() {
                // fill this.barChartProcessGwpRangeData[0], barChartProcessCostPerKgRangeData[0], barChartProcessTotalCostRangeData[0]
                for(let i=0; i<this.test_output.processes.length; i++) {
                    if(this.test_output.processes[i].name === this.selected_process) {
                        let minGwp = Math.round(this.test_output.processes[i].minGWPValue * 100)/100
                        let maxGwp = Math.round(this.test_output.processes[i].maxGWPValue * 100)/100
                        let minCostKg = Math.round(this.test_output.processes[i].minCostPerKg * 100)/100
                        let maxCostKg = Math.round(this.test_output.processes[i].maxCostPerKg * 100)/100
                        let minCostTotal = Math.round(this.test_output.processes[i].minCostTotalInEur * 100)/100
                        let maxCostTotal = Math.round(this.test_output.processes[i].maxCostTotalInEur * 100)/100
                        this.barChartProcessGwpRangeData[0] = [minGwp , maxGwp]
                        this.barChartProcessCostPerKgRangeData[0] = [minCostKg , maxCostKg]
                        this.barChartProcessTotalCostRangeData[0] = [minCostTotal ,maxCostTotal]
                        break
                    }
                }

                // check if a benchmark exists for selected process
                for(let i=0; i<this.test_benchmarks_2.length; i++) {
                    if(this.test_benchmarks_2[i].name === this.selected_process) {
                        // fill // fill this.barChartProcessGwpRangeData[1], barChartProcessCostPerKgRangeData[1], barChartProcessTotalCostRangeData[1]
                        let minGwp = Math.round(this.test_benchmarks_2[i].gwp_min * 100)/100
                        let maxGwp = Math.round(this.test_benchmarks_2[i].gwp_max * 100)/100
                        let minCostKg = Math.round(this.test_benchmarks_2[i].cost_per_kg_min * 100)/100
                        let maxCostKg = Math.round(this.test_benchmarks_2[i].cost_per_kg_max * 100)/100
                        let minCostTotal = Math.round(this.test_benchmarks_2[i].total_cost_min * 100)/100
                        let maxCostTotal = Math.round(this.test_benchmarks_2[i].total_cost_max * 100)/100
                        this.barChartProcessGwpRangeData[1] = [minGwp , maxGwp]
                        this.barChartProcessCostPerKgRangeData[1] = [minCostKg , maxCostKg]
                        this.barChartProcessTotalCostRangeData[1] = [minCostTotal ,maxCostTotal]
                        break
                    }
                    // if no benchmark found for selected process then leave benchmark data empty
                    if(i === (this.test_benchmarks_2.length - 1)) {
                        this.barChartProcessGwpRangeData[1] = [undefined, undefined]
                        this.barChartProcessCostPerKgRangeData[1] = [undefined, undefined]
                        this.barChartProcessTotalCostRangeData[1] = [undefined, undefined]
                        break
                    }
                }
                
                //Initially canvas-elements are missing, in order for a chart to render for the first time,
                //some time is needed until the canvas-element is added
                if(
                document.getElementById("bar_chart_process_gwp_range") === null ||
                document.getElementById("bar_chart_process_cost_per_kg_range") === null ||
                document.getElementById("bar_chart_process_total_cost_range") === null) {
                    setTimeout(() => {
                        this.updateBarChartProcessGwpRange()
                        this.updateBarChartProcessCostPerKgRange()
                        this.updateBarChartProcessTotalCostRange()
                        this.sendChartsAsImages()
                    }, 50)
                } else {
                    this.updateBarChartProcessGwpRange()
                    this.updateBarChartProcessCostPerKgRange()
                    this.updateBarChartProcessTotalCostRange()
                    this.sendChartsAsImages()
                }
            },
            updateBarChart() {
                if(this.barChart !== undefined) {
                    this.barChart.destroy()
                }
                if(this.barChartData[0][0] !== undefined || this.barChartData[1][0] !== undefined) {
                    this.barChart = new Chart("bar_chart", {
                        type: "bar",
                        data: {
                            labels: [this.leftBarLabel, this.rightBarLabel],
                            datasets: [{
                                data: this.checkBarChartData(this.barChartData),
                                backgroundColor: [
                                    this.color_green,
                                    this.color_lightgrey
                                ],
                                barThickness: 80,
                                borderWidth: 1,
                                borderColor: "#777",
                                // hoverBorderWidth: 2,
                                // hoverBorderColor: "#000",
                                borderSkipped: false,
                                hoverBackgroundColor: this.color_green
                            }]
                        },
                        options: {
                            animation: false,
                            hover: false,
                            aspectRatio: 1.3,
                            scales: {
                            x: {
                                ticks: {
                                    font: {
                                        size: 20
                                    }
                                }
                            },
                            y: {
                                min: 0,
                                ticks: {
                                    display: (this.barChartData[0][0]!==undefined || this.barChartData[1][0]!==undefined) ? true : false,
                                    font: {
                                        size: 18
                                    }
                                }
                            }
                            },
                            plugins: {
                                title: {
                                    display: true,
                                    text: this.gwp_button_active ? "GWP Range" : "Cost Range",
                                    font: {
                                        size: 20
                                    }
                                },
                                legend: {
                                    display: (this.barChartData[0][0]!==undefined || this.barChartData[1][0]!==undefined) ? true : false,
                                    position: "bottom",
                                    labels: {
                                        font: {
                                            size: window.innerWidth >= 500 ? this.legendFont : this.legendFontS
                                        },
                                        boxWidth: 25,
                                        boxHeight: 25,
                                        generateLabels: (chart) => {
                                            let unit = this.gwp_button_active ? " kg CO²" : " €"
                                            if(this.barChartData[0][0] === undefined) {
                                                return [{
                                                    text: this.rightBarLabel + " range: [" + this.barChartData[1][0] + ", " + this.barChartData[1][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[1],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[1]
                                                }]
                                            } else if(this.barChartData[1][0] === undefined) {
                                                return [{
                                                    text: this.leftBarLabel + " range: [" + this.barChartData[0][0] + ", " + this.barChartData[0][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[0],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[0]
                                                }]
                                            }
                                            return chart.data.labels.map((label, index) => {
                                                return {
                                                    text: label + " range: [" + this.barChartData[index][0] + ", " + this.barChartData[index][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[index],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[index]
                                                }
                                            })
                                        }
                                    }
                                },
                                tooltip: {
                                    enabled: false
                                }
                            }
                        }
                    })
                }
            },
            updatePieChart() {
                if(this.pieChart !== undefined) {
                    this.pieChart.destroy()
                }
                if(this.pieChartData[0] !== undefined) {
                    this.pieChart = new Chart("pie_chart", {
                        type: "pie",
                        data: {
                            labels: this.pieChartLabels,
                            datasets: [{
                                data: this.pieChartData,
                                backgroundColor: this.pieChartColors,
                                borderWidth: 1,
                                borderColor: "#777",
                                // hoverBorderWidth: 3,
                                // hoverBorderColor: "#000"
                            }]
                        },
                        options: {
                            animation: false,
                            hover: false,
                            aspectRatio: 1.3,
                            plugins: {
                                title: {
                                    display: true,
                                    text: this.pieChartTitle,
                                    font: {
                                        size: 20
                                    }
                                },
                                legend: {
                                    display: false,
                                //     position: "bottom",
                                //     // display: (this.pieChartData[0]!==undefined) ? true : false,
                                //     labels: {
                                //         font: {
                                //             size: window.innerWidth >= 500 ? this.legendFont : this.legendFontS
                                //         },
                                //         boxWidth: 25,
                                //         boxHeight: 25,
                                //         generateLabels: (chart) => {
                                //             let unit = this.gwp_button_active ? " kg CO²" : " €"
                                //             return chart.data.labels.map((label, index) => {
                                //                 return {
                                //                     text: label + ": " + this.pieChartData[index] + unit + " (" + this.calculatePieChartPercent(index) + "%)",
                                //                     strokeStyle: chart.data.datasets[0].borderColor[index],
                                //                     fillStyle: chart.data.datasets[0].backgroundColor[index]
                                //                 }
                                //             })
                                //         }
                                //     }
                                },
                                tooltip: {
                                    enabled: false
                                }
                            },
                        },
                        // Creating legend here to separate it from the chart itself. If not decoupled then chart size depends on the size of the legend (more legend items = smaller chart)
                        plugins: [{
                            beforeInit: function(chart) {
                                if (chart.canvas.id === "pie_chart") {
                                    const customLegend = document.getElementById("pie_chart_legend")
                                    customLegend.innerHTML = ``
                                    let unit = this.gwp_button_active ? " kg CO²" : " €"
                                    let fontSize = window.innerWidth >= 500 ? 20 : 15
                                    chart.data.labels.forEach((label, i) => {
                                        // calculate percentage-value of a process
                                        let sum = 0
                                        chart.data.datasets[0].data.forEach((element) => {
                                            sum += element
                                        })
                                        let element = (chart.data.datasets[0].data[i] / (sum / 100))
                                        let percent = Math.round(element * 100) / 100
                                        let text = label + ": " + chart.data.datasets[0].data[i] + unit + " (" + percent + "%)"
                                        customLegend.innerHTML += 
                                        `
                                            <div style="display: flex; width: fit-content">
                                                <div style="width: 30px; height: 30px; background-color: ${chart.data.datasets[0].backgroundColor[i]}; border: 1px solid black;"></div>
                                                <div style="font-size: ${fontSize}px; margin-left: 10px;">
                                                    ${text}
                                                </div>
                                            </div>
                                        `
                                    })
                                }
                            }
                        }]
                    })
                }
            },
            calculatePieChartPercent(index) {
                let sum = 0
                this.pieChartData.forEach((element) => {
                    sum += element
                })
                let element = (this.pieChartData[index] / (sum / 100))
                return Math.round(element * 100) / 100
            },
            updateBarChartProcessGwpRange() {
                if(this.barChartProcessGwpRange !== undefined) {
                    this.barChartProcessGwpRange.destroy()
                }
                if(this.barChartProcessGwpRangeData[0] !== undefined) {
                    this.barChartProcessGwpRange = new Chart("bar_chart_process_gwp_range", {
                        type: "bar",
                        data: {
                            labels: ["Result", "Benchmark"],
                            datasets: [
                                {
                                    data: this.checkBarChartData(this.barChartProcessGwpRangeData),
                                    backgroundColor: [
                                        this.color_green,
                                        this.color_lightgrey
                                    ],
                                    barThickness: 80,
                                    borderWidth: 1,
                                    borderColor: "#777",
                                    // hoverBorderWidth: 2,
                                    // hoverBorderColor: "#000",
                                    borderSkipped: false,
                                    hoverBackgroundColor: this.color_green
                                }
                            ]
                        },
                        options: {
                            animation: false,
                            hover: false,
                            aspectRatio: 1.3,
                            scales: {
                              x: {
                                ticks: {
                                    font: {
                                        size: 20
                                    }
                                }
                              },
                              y: {
                                min: 0,
                                ticks: {
                                    font: {
                                        size: 18
                                    }
                                }
                              }
                            },
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Process GWP Range",
                                    font: {
                                        size: 20
                                    }
                                },
                                legend: {
                                    position: "bottom",
                                    labels: {
                                        font: {
                                            size: window.innerWidth >= 500 ? this.legendFont : this.legendFontS
                                        },
                                        boxWidth: 25,
                                        boxHeight: 25,
                                        generateLabels: (chart) => {
                                            let unit = " kg CO²"
                                            if(this.barChartProcessGwpRangeData[1][0] === undefined) {
                                                return [{
                                                    text: "Result range: [" + this.barChartProcessGwpRangeData[0][0] + ", " + this.barChartProcessGwpRangeData[0][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[0],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[0]
                                                }]
                                            }
                                            return chart.data.labels.map((label, index) => {
                                                return {
                                                    text: label + " range: [" + this.barChartProcessGwpRangeData[index][0] + ", " + this.barChartProcessGwpRangeData[index][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[index],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[index]
                                                }
                                            })
                                        }
                                    }
                                },
                                tooltip: {
                                    enabled: false
                                }
                            }
                        }
                    })
                }
            },
            updateBarChartProcessCostPerKgRange() {
                if(this.barChartProcessCostPerKgRange !== undefined) {
                    this.barChartProcessCostPerKgRange.destroy()
                }
                if(this.barChartProcessCostPerKgRangeData[0] !== undefined) {
                    this.barChartProcessCostPerKgRange = new Chart("bar_chart_process_cost_per_kg_range", {
                        type: "bar",
                        data: {
                            labels: ["Result", "Benchmark"],
                            datasets: [
                                {
                                    data: this.checkBarChartData(this.barChartProcessCostPerKgRangeData),
                                    backgroundColor: [
                                        this.color_green,
                                        this.color_lightgrey
                                    ],
                                    barThickness: 80,
                                    borderWidth: 1,
                                    borderColor: "#777",
                                    // hoverBorderWidth: 2,
                                    // hoverBorderColor: "#000",
                                    borderSkipped: false,
                                    hoverBackgroundColor: this.color_green
                                }
                            ]
                        },
                        options: {
                            animation: false,
                            hover: false,
                            aspectRatio: 1.3,
                            scales: {
                              x: {
                                ticks: {
                                    font: {
                                        size: 20
                                    }
                                }
                              },
                              y: {
                                min: 0,
                                ticks: {
                                    font: {
                                        size: 18
                                    }
                                }
                              }
                            },
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Process Cost per Kg Range",
                                    font: {
                                        size: 20
                                    }
                                },
                                legend: {
                                    position: "bottom",
                                    labels: {
                                        font: {
                                            size: window.innerWidth >= 500 ? this.legendFont : this.legendFontS
                                        },
                                        boxWidth: 25,
                                        boxHeight: 25,
                                        generateLabels: (chart) => {
                                            let unit = " € / kg"
                                            if(this.barChartProcessCostPerKgRangeData[1][0] === undefined) {
                                                return [{
                                                    text: "Result range: [" + this.barChartProcessCostPerKgRangeData[0][0] + ", " + this.barChartProcessCostPerKgRangeData[0][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[0],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[0]
                                                }]
                                            }
                                            return chart.data.labels.map((label, index) => {
                                                return {
                                                    text: label + " range: [" + this.barChartProcessCostPerKgRangeData[index][0] + ", " + this.barChartProcessCostPerKgRangeData[index][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[index],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[index]
                                                }
                                            })
                                        }
                                    }
                                },
                                tooltip: {
                                    enabled: false
                                }
                            }
                        }
                    })
                }
            },
            updateBarChartProcessTotalCostRange() {
                if(this.barChartProcessTotalCostRange !== undefined) {
                    this.barChartProcessTotalCostRange.destroy()
                }
                if(this.barChartProcessTotalCostRangeData[0] !== undefined) {
                    this.barChartProcessTotalCostRange = new Chart("bar_chart_process_total_cost_range", {
                        type: "bar",
                        data: {
                            labels: ["Result", "Benchmark"],
                            datasets: [
                                {
                                    data: this.checkBarChartData(this.barChartProcessTotalCostRangeData),
                                    backgroundColor: [
                                        this.color_green,
                                        this.color_lightgrey
                                    ],
                                    barThickness: 80,
                                    borderWidth: 1,
                                    borderColor: "#777",
                                    // hoverBorderWidth: 2,
                                    // hoverBorderColor: "#000",
                                    borderSkipped: false,
                                    hoverBackgroundColor: this.color_green
                                }
                            ]
                        },
                        options: {
                            animation: false,
                            hover: false,
                            aspectRatio: 1.3,
                            scales: {
                              x: {
                                ticks: {
                                    font: {
                                        size: 20
                                    }
                                }
                              },
                              y: {
                                min: 0,
                                ticks: {
                                    font: {
                                        size: 18
                                    }
                                }
                              }
                            },
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Process Total Cost Range",
                                    font: {
                                        size: 20
                                    }
                                },
                                legend: {
                                    position: "bottom",
                                    labels: {
                                        font: {
                                            size: window.innerWidth >= 500 ? this.legendFont : this.legendFontS
                                        },
                                        boxWidth: 25,
                                        boxHeight: 25,
                                        generateLabels: (chart) => {
                                            let unit = " €"
                                            if(this.barChartProcessTotalCostRangeData[1][0] === undefined) {
                                                return [{
                                                    text: "Result range: [" + this.barChartProcessTotalCostRangeData[0][0] + ", " + this.barChartProcessTotalCostRangeData[0][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[0],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[0]
                                                }]
                                            }
                                            return chart.data.labels.map((label, index) => {
                                                return {
                                                    text: label + " range: [" + this.barChartProcessTotalCostRangeData[index][0] + ", " + this.barChartProcessTotalCostRangeData[index][1] + "] " + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[index],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[index]
                                                }
                                            })
                                        }
                                    }
                                },
                                tooltip: {
                                    enabled: false
                                }
                            }
                        }
                    })
                }
            },
            updateAshbyChart() {
                if(this.ashbyChart !== undefined) {
                    this.ashbyChart.destroy()
                }
                if(this.ashbyChartData !== undefined) {
                    this.updateAshbyChartLegend()
                    this.ashbyChart = new Chart("ashby_chart", {
                        type: "bubble",
                        data: {},
                        options: {
                            animation: false,
                            hover: false,
                            aspectRatio: 1,
                            scales: {
                                x: {
                                    min: 0,
                                    max: this.ashbyChartData.xAxisRange,
                                    title: {
                                        display: true,
                                        text: "Modulus",
                                        font: {
                                            size: 20
                                        }
                                    },
                                    ticks: {
                                        font: {
                                            size: 18
                                        }
                                    }
                                },
                                y: {
                                    min: 0,
                                    max: this.ashbyChartData.yAxisRange,
                                    title: {
                                        display: true,
                                        text: "Strength",
                                        font: {
                                            size: 20
                                        }
                                    },
                                    ticks: {
                                        font: {
                                            size: 18
                                        }
                                    }
                                }
                            },
                            plugins: {
                                title: {
                                    display: true,
                                    text: this.ashbyChartData.chartTitle,
                                    font: {
                                        size: 20
                                    }
                                },
                                legend: {
                                    display: false,
                                    // position: 'bottom',
                                    // labels: {
                                    //     font: {
                                    //         size: window.innerWidth >= 500 ? this.legendFont : this.legendFontS
                                    //     },
                                    //     boxWidth: 25,
                                    //     boxHeight: 25,
                                    //     generateLabels: () => {
                                    //         let labels = []
                                    //         for(let i=0; i<this.ashbyChartData.ellipses.length; i++) {
                                    //             labels.push({
                                    //                 text: "Strength Min: " + this.ashbyChartData.ellipses[i].yMin + " MPa, Strength Max: " + this.ashbyChartData.ellipses[i].yMax + " MPa",
                                    //                 strokeStyle: "#000000",
                                    //                 fillStyle: this.ashbyChartData.ellipses[i].backgroundColor
                                    //             })
                                    //             labels.push({
                                    //                 text: "Modulus Min: " + this.ashbyChartData.ellipses[i].xMin + " GPa, Modulus Max: " + this.ashbyChartData.ellipses[i].xMax + " GPa",
                                    //                 strokeStyle: "#000000",
                                    //                 fillStyle: this.ashbyChartData.ellipses[i].backgroundColor
                                    //             })
                                    //         }
                                    //         return labels
                                    //     }
                                    // },
                                },
                                tooltip: {
                                    enabled: false
                                },
                                annotation: {
                                    annotations: this.checkAshbyChartData(this.ashbyChartData)
                                }
                            }
                        },
                    })
                }
            },
            updateAshbyChartLegend() {
                // Creating legend here to separate it from the chart itself. If not decoupled then chart size depends on the size of the legend (more legend items = smaller chart)
                const customLegend = document.getElementById("ashby_chart_legend")
                customLegend.innerHTML = ``
                let fontSize = window.innerWidth >= 500 ? 20 : 15
                this.ashbyChartData.ellipses.forEach((ellipse, i) => {
                    let roundedStrengthMin = Math.round(ellipse.yMin * 100) / 100
                    let roundedStrengthMax = Math.round(ellipse.yMax * 100) / 100
                    let roundedModulusMin = Math.round(ellipse.xMin * 100) / 100
                    let roundedModulusMax = Math.round(ellipse.xMax * 100) / 100
                    // console.log(roundedStrengthMin + " " + roundedStrengthMax + " " + roundedModulusMin + " " + roundedModulusMax)
                    // console.log(ellipse.yMin + " " + ellipse.yMax + " " + ellipse.xMin + " " + ellipse.xMax)
                    let strengthText = "Strength range: [" + roundedStrengthMin + ", " + roundedStrengthMax + "] MPa"
                    let modulusText = "Modulus range: [" + roundedModulusMin + ", " + roundedModulusMax + "] GPa"
                    customLegend.innerHTML += 
                    `
                        <div style="font-size: 18px;">
                            ${this.ashbyChartData.names[i]}    
                        </div>
                        <div style="display: flex; width: fit-content">
                            <div style="width: 30px; height: 30px; background-color: ${ellipse.backgroundColor}; border: 1px solid black;"></div>
                            <div style="font-size: ${fontSize}px; margin-left: 10px;">
                                ${strengthText}
                            </div>
                        </div>
                        <div style="display: flex; width: fit-content">
                            <div style="width: 30px; height: 30px; background-color: ${ellipse.backgroundColor}; border: 1px solid black;"></div>
                            <div style="font-size: ${fontSize}px; margin-left: 10px;">
                                ${modulusText}
                            </div>
                        </div>
                    `
                })
            },
            determineAshbyChartData() {
                if(
                !this.tensile_button_active && !this.flexural_button_active ||
                !this.zero_button_active && !this.ninety_button_active) {
                    // User needs to select a button on both lines (tensile-flexural, zero-ninety)
                    this.ashbyChartData = undefined
                } else {
                    // calculate minValue and maxValue of output-fields
                    let outputMinMax = this.getMechanicalMinMaxValues(this.test_output)
                    // calculate minValues and maxValues of benchmarks
                    let benchmarksMinMax = {}
                    for(let key in this.test_benchmarks_ashby) {
                        benchmarksMinMax[key] = this.getMechanicalMinMaxValues(this.test_benchmarks_ashby[key])
                    }
                    // fill ashbyChartData based on button-states
                    let selection_x = undefined
                    let selection_y = undefined
                    let chartTitle = undefined
                    if(this.tensile_button_active && this.zero_button_active) {
                        //tensStren0 tensMod0
                        selection_x = "tensMod0"
                        selection_y = "tensStren0"
                        chartTitle = "Tensileness range at 0°"

                    } else if(this.tensile_button_active && this.ninety_button_active) {
                        //tensStren90 tensMod90
                        selection_x = "tensMod90"
                        selection_y = "tensStren90"
                        chartTitle = "Tensileness range at 90°"

                    } else if(this.flexural_button_active && this.zero_button_active) {
                        //flexStren0 flexMod0
                        selection_x = "flexMod0"
                        selection_y = "flexStren0"
                        chartTitle = "Flexuralness range at 0°"

                    } else if(this.flexural_button_active && this.ninety_button_active) {
                        //flexStren90 flexMod90
                        selection_x = "flexMod90"
                        selection_y = "flexStren90"
                        chartTitle = "Flexuralness range at 90°"

                    }

                    // determine x-axis maximum from output-modulus and benchmark-moduluses
                    let maxModulus = outputMinMax[selection_x].max
                        for(let key in benchmarksMinMax) {
                            if(benchmarksMinMax[key][selection_x].max > maxModulus) {
                                maxModulus = benchmarksMinMax[key][selection_x].max
                            }
                        }
                        // determine y-axis maximum from output-strength and benchmark-strengths
                        let maxStrength = outputMinMax[selection_y].max
                        for(let key in benchmarksMinMax) {
                            if(benchmarksMinMax[key][selection_y].max > maxStrength) {
                                maxStrength = benchmarksMinMax[key][selection_y].max
                            }
                        }

                        this.ashbyChartData = {
                            ellipses: [{
                                type: 'ellipse',
                                xMin: outputMinMax[selection_x].min,
                                xMax: outputMinMax[selection_x].max,
                                yMin: outputMinMax[selection_y].min,
                                yMax: outputMinMax[selection_y].max,
                                backgroundColor: 'hsla(146, 55%, 57%, 0.4)'
                            }],
                            names: ["Result"],
                            xAxisRange: maxModulus + maxModulus * 0.1,
                            yAxisRange: maxStrength + maxStrength * 0.1,
                            chartTitle: chartTitle
                        }

                        let colorIndex = 1 // the color corresponding to 0 is alredy in use (output-ellipse)
                        for(let key in benchmarksMinMax) {
                            let newEllipse = {
                                type: 'ellipse',
                                xMin: benchmarksMinMax[key][selection_x].min,
                                xMax: benchmarksMinMax[key][selection_x].max,
                                yMin: benchmarksMinMax[key][selection_y].min,
                                yMax: benchmarksMinMax[key][selection_y].max,
                                backgroundColor: this.randomColor(colorIndex, 0.4),
                            }
                            this.ashbyChartData.ellipses.push(newEllipse)
                            this.ashbyChartData.names.push(key)
                            colorIndex++
                        }
                }
            },
            // minimum(numbers) {
            //     // returns the smallest number from the numbers array
            //     let temp = undefined
            //     for(let i=0; i<numbers.length; i++) {
            //         if(temp === undefined || temp > numbers[i]) temp = numbers[i]
            //     }
            //     return temp
            // },
            // maximum(numbers) {
            //     // returns the largest number from the numbers array
            //     let temp = undefined
            //     for(let i=0; i<numbers.length; i++) {
            //         if(temp === undefined || temp < numbers[i]) temp = numbers[i]
            //     }
            //     return temp
            // },
            updateAllCharts() {
                this.updateBarChart()
                this.updatePieChart()
                this.updateAshbyChart()
                this.updateBarChartProcessGwpRange()
                this.updateBarChartProcessCostPerKgRange()
                this.updateBarChartProcessTotalCostRange()
            },
            sendChartsAsImages() {
                // send currently displayed charts as images to results_footer component for pdf
                let images = []
                let charts = [this.barChart, this.pieChart, this.barChartProcessGwpRange, this.barChartProcessCostPerKgRange, this.barChartProcessTotalCostRange]
                // check which charts exist
                for(let i=0; i<charts.length; i++) {
                    if(charts[i] !== undefined) {
                        images.push({index: i, image: charts[i].toBase64Image()})
                    }
                }
                // send existing charts as images
                this.$emit("chartsAsImages", images)
            }
        }
    }
</script>