<script setup>
import router from "@/router";
import Chart from "chart.js/auto"
</script>

<template>

    <div class="input_area">

        <p>{{app_output_prop}}</p>
        <!-- JSON.stringify(app_output_prop, null, 2) -->

        <v-select
        class="select results_process_select"
        label="Benchmark Process"
        single-line
        suffix="Benchmark"
        :items=process_options
        variant="solo"
        :bg-color=color_green
        v-model=this.selected_process
        v-on:update:model-value=[handleBenchmarkSelect()]
        ></v-select>

        <div class="results_buttoncontainer">
            <div class="results_gwp_buttoncontainer">
                <v-btn
                v-if=this.gwp_button_active
                @click=handleGwpButton()
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">GWP</p></v-btn>
                <v-btn
                v-if=!this.gwp_button_active
                @click=handleGwpButton()
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">GWP</p></v-btn>
            </div>

            <div class="results_cost_buttoncontainer">
                <v-btn
                v-if=this.cost_button_active
                @click=handleCostButton()
                :color=color_green
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text active_button_text">COST</p></v-btn>
                <v-btn
                v-if=!this.cost_button_active
                @click=handleCostButton()
                :color=color_lightgrey
                elevation="5"
                width="225px"
                height="55px"
                ><p class="results_button_text inactive_button_text">COST</p></v-btn>
            </div>
        </div>

        <canvas id="bar_chart" style="max-width: 420px;padding-left:30px;"></canvas>

        <canvas id="pie_chart"></canvas>

    </div>

</template>

<script>
    export default {
        props: ["app_output_prop", "color_green", "color_lightgrey"],
        emits: ["setErrorMessage"],
        mounted() {
            // console.log(JSON.stringify(this.test_output, null, 2))

            //check output validity
            if(!(Object.prototype.hasOwnProperty.call(this.test_output, "processes"))) {
                    this.$emit("setErrorMessage", "Invalid Input. No output could be generated based from the given input.")
                    router.push({name: "ErrorView"})
            }

            //fill benchmark-select element
            this.process_options = []
            for(let i=0; i<this.test_benchmarks.length; i++) {
                this.process_options[i] = this.test_benchmarks[i].name
            }

            //create initial barchart
            this.updateBarChart()
            new Chart("pie_chart", {
                type: "pie",
                data: {
                    labels: ["ResinTransferMoulding", "Carding", "Oxidation", "Pyrolysis"],
                    datasets: [{
                        label:"value",
                        data: [293.0, 109.0, 10.0, 96.0],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(123, 99, 132, 0.6)",
                            "rgba(45, 99, 132, 0.6)",
                            "rgba(33, 99, 34, 0.6)",
                        ],
                        borderWidth: 1,
                        borderColor: "#777",
                        hoverBorderWidth: 3,
                        hoverBorderColor: "#000"
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Title of this line chart",
                    },
                    layout: {
                        padding: 60
                    }
                }
            })

        },
        data() {
            return {
                process_options: [],
                selected_process: undefined,
                gwp_button_active: false,
                cost_button_active: false,
                barChart: undefined,
                barChartData: [[undefined, undefined], [undefined, undefined]],
                leftBarLabel: "Result",
                rightBarLabel: "Benchmark",

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
                test_benchmarks: [
                    {
                        "name": "process1",
                        "gwp_min": 500,
                        "gwp_max": 1000,
                        "cost_min": 1500,
                        "cost_max": 2000
                    },
                    {
                        "name": "process2",
                        "gwp_min": 600,
                        "gwp_max": 1100,
                        "cost_min": 1600,
                        "cost_max": 2100
                    },
                    {
                            "name": "process3",
                            "gwp_min": 700,
                            "gwp_max": 1200,
                            "cost_min": 1700,
                            "cost_max": 2200
                        },
                ],
            }
        },
        methods: {
            handleGwpButton() {
                this.gwp_button_active = true
                this.cost_button_active = false
                this.handleButton("gwp")
            },
            handleCostButton() {
                this.gwp_button_active = false
                this.cost_button_active = true
                this.handleButton("cost")
            },
            handleButton(id) {

                //depending on which button is "active", show gwp or cost of output
                switch(id) {
                    case "gwp":
                        this.leftBarLabel = "calculated gwp"
                        this.barChartData[0][0] = Math.round(this.test_output.gwp.minValue * 100)/100
                        this.barChartData[0][1] = Math.round(this.test_output.gwp.maxValue * 100)/100
                        break
                    case "cost":
                        this.leftBarLabel = "calculated cost"
                        this.barChartData[0][0] = Math.round(this.test_output.cost.minValue_eur_per_kg * 100)/100
                        this.barChartData[0][1] = Math.round(this.test_output.cost.maxValue_eur_per_kg * 100)/100
                        break
                }

                //benchmark needs to change from gwp to cost (and vice versa) if output switches
                this.handleBenchmarkSelect()
                // this.updateBarChart() happens in this.handleBenchmarkSelect() alredy
            },
            handleBenchmarkSelect() {
                this.test_benchmarks.forEach(element => {
                    if(this.selected_process === element.name) {
                        //depending on which button is "active", show gwp or cost of benchmark
                        if(this.gwp_button_active) {
                            this.rightBarLabel = element.name + " Benchmark gwp"
                            this.barChartData[1][0] = Math.round(element.gwp_min * 100)/100
                            this.barChartData[1][1] = Math.round(element.gwp_max * 100)/100
                        } else {
                            this.rightBarLabel = element.name + " Benchmark cost"
                            this.barChartData[1][0] = Math.round(element.cost_min * 100)/100
                            this.barChartData[1][1] = Math.round(element.cost_max * 100)/100
                        }
                    }
                })
                this.updateBarChart()
            },
            updateBarChart() {
                if(this.barChart !== undefined) this.barChart.destroy()
                this.barChart = new Chart("bar_chart", {
                    type: "bar",
                    data: {
                        labels: [this.leftBarLabel, this.rightBarLabel],
                        datasets: [{
                            data: this.barChartData,
                            backgroundColor: [
                                "red",
                                "blue"
                            ],
                            borderWidth: 1,
                            borderColor: "#777",
                            hoverBorderWidth: 3,
                            hoverBorderColor: "#000"
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Test Title",
                        },
                        animation: false
                    }
                })
            }
        }
    }
</script>