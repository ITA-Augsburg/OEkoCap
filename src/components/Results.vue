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
        label="Process"
        single-line
        suffix="Process"
        :items=process_options
        variant="solo"
        :bg-color=color_green
        v-model=this.selected_process
        v-on:update:model-value=[]
        ></v-select>

        <canvas id="pie_chart"></canvas>



        <!-- <canvas id="line_chart" style="max-width: 420px;padding-left:30px;"></canvas> -->
        <!-- <canvas id="bar_chart" style="max-width: 420px;padding-left:30px;"></canvas> -->
        <!-- <canvas id="gwp_minmax" style="max-width: 420px;padding-left:30px;"></canvas> -->
        <!-- <canvas id="flexuralStrength0_MPa" style="max-width: 420px;padding-left:30px;margin-top:50px;"></canvas> -->

    </div>

</template>

<script>
    export default {
        props: ["app_output_prop", "color_green"],
        emits: ["setErrorMessage"],
        mounted() {

            this.setup()

            // new Chart("line_chart", {
            //     type: "line",
            //     data: {
            //         labels: ["A", "B", "C", "D"],
            //         datasets: [{
            //             label:"red",
            //             data: [4, 2, 1, 5,],
            //             backgroundColor: [
            //                 // "rgba(255, 99, 132, 0.6)",
            //                 // "rgba(123, 99, 132, 0.6)",
            //                 // "rgba(45, 99, 132, 0.6)",
            //                 // "rgba(33, 99, 34, 0.6)",
            //                 "red"
            //             ],
            //             borderWidth: 1, borderColor: "#777", hoverBorderWidth: 3, hoverBorderColor: "#000"
            //         },
            //         {
            //             label:"blue",
            //             data: [1, 2, 4, 5,],
            //             backgroundColor: [
            //                 "blue"
            //             ],
            //             borderWidth: 1, borderColor: "#777", hoverBorderWidth: 3, hoverBorderColor: "#000"
            //         }]
            //     },
            //     options: {
            //         plugins: {
            //             title: {
            //                 display: true,
            //                 text: "Title of this line chart",
            //                 font: {
            //                     size: 20
            //                 }
            //             },
            //             legend: {
            //                 position: "right",
            //                 labels: {
            //                     color: "black",
            //                     font: {
            //                         size: 15
            //                     }
            //                 }
            //             }
            //         }
            //     },
            // })

            // new Chart("bar_chart", {
            //     type: "bar",
            //     data: {
            //         labels: ["A", "B", "C", "D"],
            //         datasets: [{
            //             label:"numbers",
            //             data: [4, 2, 1, 5,],
            //             backgroundColor: [
            //                 "rgba(255, 99, 132, 0.6)",
            //                 "rgba(123, 99, 132, 0.6)",
            //                 "rgba(45, 99, 132, 0.6)",
            //                 "rgba(33, 99, 34, 0.6)",
            //             ],
            //             borderWidth: 1,
            //             borderColor: "#777",
            //             hoverBorderWidth: 3,
            //             hoverBorderColor: "#000"
            //         }]
            //     },
            //     options: {
            //         title: {
            //             display: true,
            //             text: "Title of this line chart",
            //         }
            //     }
            // })

            new Chart("pie_chart", {
                type: "pie",
                data: {
                    labels: ["A", "B", "C", "D"],
                    datasets: [{
                        label:"numbers",
                        data: [4, 2, 1, 5,],
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

            // new Chart("gwp_minmax", {
            //     type: "bar",
            //     data: {
            //         labels: ["min", "max"],
            //         datasets: [{
            //             label:"Global Warming Potential",
            //             data: [714.3512406919333, 7400.289657831437],
            //             backgroundColor: [
            //                 this.color_green,
            //                 "red"
            //             ],
            //             borderWidth: 1,
            //             borderColor: "#777",
            //             hoverBorderWidth: 3,
            //             hoverBorderColor: "#000"
            //         }]
            //     },
            //     options: {
            //         plugins: {
            //             title: {
            //             display: true,
            //             text: "Global Warming Potential",
            //             font: {
            //                 size: 20
            //             }
            //             },
            //         }
            //     }
            // })

            // new Chart("flexuralStrength0_MPa", {
            //     type: "line",
            //     data: {
            //         labels: ["value1", "value2", "value3", "value4", "value5", "value6", "value7"],
            //         datasets: [{
            //             label: "flexuralStrength0_MPa",
            //             data: [26, 27, 29, 30, 32, 110, 117],
            //             backgroundColor: this.color_green,
            //             borderWidth: 1, borderColor: "#777", hoverBorderWidth: 3, hoverBorderColor: "#000"
            //         }]
            //     },
            //     options: {
            //         plugins: {
            //             title: {
            //                 display: true,
            //                 text: "flexuralStrength0_MPa",
            //                 font: {
            //                     size: 20
            //                 }
            //             },
            //             legend: {
            //                 position: "bottom",
            //                 labels: {
            //                     color: "black",
            //                     font: {
            //                         size: 15
            //                     }
            //                 }
            //             }
            //         }
            //     },
            // })

        },
        data() {
            return {
                process_options: [],
                selected_process: undefined,

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
            }
        },
        methods: {
            setup() {
                this.process_options = []
                //check if output is valid, if valid fill process_options with output processes, if not valid go to errorView
                if(Object.prototype.hasOwnProperty.call(this.test_output, "processes")) {
                    // console.log("valid output")
                    for(let i=0; i<this.test_output.processes.length; i++) {
                        this.process_options[i] = this.test_output.processes[i].name
                    }
                } else {
                    // console.log("invalid output")
                    this.$emit("setErrorMessage", "Invalid input")
                    router.push({name: "ErrorView"})
                }
            }
        }
    }
</script>