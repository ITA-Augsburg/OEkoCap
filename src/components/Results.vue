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
        v-on:update:model-value=[updateBarChart()]
        ></v-select>

        <canvas id="bar_chart" style="max-width: 420px;padding-left:30px;"></canvas>

        <canvas id="pie_chart"></canvas>

        <!-- TODO: eingene css klassen, styling -->
        <div class="processing_buttoncontainer">
            <div class="processing_clear_buttoncontainer">
                <!-- <RouterLink
                :to='{name:"StartView"}'> -->
                    <v-btn
                    :color=color_lightgrey
                    elevation="5"
                    width="225px"
                    height="55px"
                    ><p class="processing_clear_button_text">COST</p></v-btn>
                <!-- </RouterLink> -->
            </div>

            <div class="processing_calc_buttoncontainer">
                <!-- <RouterLink
                :to='{name:"WaitingView"}' -->
                    <v-btn
                    :color=color_green
                    elevation="5"
                    width="225px"
                    height="55px"
                    ><p class="processing_calc_button_text">GWP</p></v-btn>
                <!-- </RouterLink> -->
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        props: ["app_output_prop", "color_green"],
        emits: ["setErrorMessage"],
        mounted() {
            console.log(JSON.stringify(this.test_output, null, 2))

            this.checkOutput(),
            this.setup(),
            this.updateBarChart(),
            new Chart("bar_chart", {
                type: "bar",
                data: {
                    labels: [this.leftBarLabel, this.rightBarLabel],
                    datasets: [{
                        data: [[this.leftBarMin, this.leftBarMax], [this.rightBarMin, this.rightBarMax]],
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
                    }
                }
            })
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
                leftBarMin: 2.5,//placeholders
                leftBarMax: 5,
                rightBarMin: 2,
                rightBarMax: 7,
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
                        "gwp_min": 5,
                        "gwp_max": 10,
                        "cost_min": 15,
                        "cost_max": 20
                    },
                    {
                        "name": "process2",
                        "gwp_min": 5,
                        "gwp_max": 10,
                        "cost_min": 15,
                        "cost_max": 20
                    },
                    {
                            "name": "process3",
                            "gwp_min": 5,
                            "gwp_max": 10,
                            "cost_min": 15,
                            "cost_max": 20
                        },
                ],
            }
        },
        methods: {
            checkOutput() {
                if(!(Object.prototype.hasOwnProperty.call(this.test_output, "processes"))) {
                    this.$emit("setErrorMessage", "Invalid Input. No output could be generated based from the given input.")
                    router.push({name: "ErrorView"})
                }
            },
            setup() {
                this.process_options = []
                    for(let i=0; i<this.test_benchmarks.length; i++) {
                        this.process_options[i] = this.test_benchmarks[i].name
                    }
            },
            updateBarChart() {
                if(this.selected_process!==undefined) {
                    //TODO
                    return
                }
            }
        }
    }
</script>