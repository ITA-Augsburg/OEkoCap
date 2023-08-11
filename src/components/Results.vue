<script setup>
import router from "@/router";
import Chart from "chart.js/auto"
</script>

<template>

    <div class="input_area">

        <p>{{app_output_prop}}</p>
        <!-- JSON.stringify(app_output_prop, null, 2) -->

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

        <v-select
        class="select results_benchmark_process_select"
        label="Benchmark Processes"
        single-line
        suffix="Benchmark"
        :items=benchmark_process_options
        variant="solo"
        :bg-color=color_green
        v-model=this.selected_benchmark
        v-on:update:model-value=[handleBenchmarkSelect()]
        ></v-select>

        <canvas id="bar_chart"></canvas>

        <canvas id="pie_chart"></canvas>
        <!-- <div id="pie_chart_legend"></div> -->

        <v-select
        class="select results_process_select"
        label="Calculated Processes"
        single-line
        suffix="Process"
        :items=calculated_process_options
        variant="solo"
        :bg-color=color_green
        v-model=this.selected_process
        v-on:update:model-value=[handleProcessSelect()]
        ></v-select>

        <canvas id="bar_chart_2"></canvas>

    </div>

</template>

<script>
    export default {
        props: ["app_output_prop", "color_green", "color_lightgrey"],
        emits: ["setErrorMessage"],
        mounted() {
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

            // create initial charts
            this.updateBarChart()
            this.updatePieChart()
            this.updateBarChart2()

        },
        data() {
            return {
                benchmark_process_options: [],
                calculated_process_options: [],
                selected_benchmark: undefined,
                selected_process: undefined,
                gwp_button_active: false,
                cost_button_active: false,
                barChart: undefined,
                barChartData: [[undefined, undefined], [undefined, undefined]],
                leftBarLabel: "Result",
                rightBarLabel: "Benchmark",
                pieChart: undefined,
                pieChartData: [],
                pieChartTitle: "Calculated Processes",
                pieChartColors: [],
                barChart2: undefined,
                barChart2CalculatedDataset: [[undefined, undefined], [undefined, undefined], [undefined, undefined]],
                barChart2BenchmarkDataset: [[undefined, undefined], [undefined, undefined], [undefined, undefined]],

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
                ]
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
                        this.leftBarLabel = "Calculated GWP Range"
                        this.barChartData[0][0] = Math.round(this.test_output.gwp.minValue * 100) / 100
                        this.barChartData[0][1] = Math.round(this.test_output.gwp.maxValue * 100) / 100

                        this.pieChartTitle = "Maximal gwp of each Process"
                        this.test_output.processes.forEach((element, index) => {
                            this.pieChartData[index] = Math.round(element.maxGWPValue * 100) / 100
                        })
                        break
                    case "cost":
                        this.leftBarLabel = "Calculated Cost Range"
                        this.barChartData[0][0] = Math.round(this.test_output.cost.minValue_eur_per_kg * 100) / 100
                        this.barChartData[0][1] = Math.round(this.test_output.cost.maxValue_eur_per_kg * 100) / 100

                        this.pieChartTitle = "Maximal total cost of each Process"
                        this.test_output.processes.forEach((element, index) => {
                            this.pieChartData[index] = Math.round(element.maxCostTotalInEur * 100) / 100
                        })
                        break
                }

                let h = 56, s = 55, l = 57
                for(let i=0; i<this.pieChartData.length; i++) {
                    h += 90
                    h>360 ? h-=361 : ""
                    // console.log("rgb(" + r +", " + g + ", " + b + ")")
                    this.pieChartColors[i] = "hsl(" + h +", " + s + "%, " + l + "%)"
                }
                // console.log(this.pieChartColors)

                //benchmark needs to change from gwp to cost (and vice versa) if output switches
                this.handleBenchmarkSelect()
                // this.updateBarChart() happens in this.handleBenchmarkSelect() alredy
                this.updatePieChart()
            },
            handleBenchmarkSelect() {
                this.test_benchmarks.forEach(element => {
                    if(this.selected_benchmark === element.name) {
                        //depending on which button is "active", show gwp or cost of benchmark
                        if(this.gwp_button_active) {
                            this.rightBarLabel = element.name + " Benchmark GWP Range"
                            this.barChartData[1][0] = Math.round(element.gwp_min * 100)/100
                            this.barChartData[1][1] = Math.round(element.gwp_max * 100)/100
                        } else {
                            this.rightBarLabel = element.name + " Benchmark Cost Range"
                            this.barChartData[1][0] = Math.round(element.cost_min * 100)/100
                            this.barChartData[1][1] = Math.round(element.cost_max * 100)/100
                        }
                    }
                })
                this.updateBarChart()
            },
            handleProcessSelect() {

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
                                this.color_green,
                                this.color_lightgrey
                            ],
                            barThickness: 80,
                            borderWidth: 1,
                            borderColor: "#777",
                            hoverBorderWidth: 2,
                            hoverBorderColor: "#000",
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
                            ticks: {
                                display: (this.barChartData[0][0]!==undefined || this.barChartData[1][0]!==undefined) ? true : false,
                                font: {
                                    size: 18
                                }
                            }
                          }
                        },
                        plugins: {
                            legend: {
                                display: (this.barChartData[0][0]!==undefined || this.barChartData[1][0]!==undefined) ? true : false,
                                position: "bottom",
                                labels: {
                                    font: {
                                        size: 20
                                    },
                                    boxWidth: 25,
                                    boxHeight: 25,
                                    generateLabels: (chart) => {
                                        if(this.barChartData[0][0] === undefined) {
                                            return [{
                                                text: "Min: " + this.barChartData[1][0] + ", Max: " + this.barChartData[1][1],
                                                strokeStyle: chart.data.datasets[0].borderColor[1],
                                                fillStyle: chart.data.datasets[0].backgroundColor[1]
                                            }]
                                        } else if(this.barChartData[1][0] === undefined) {
                                            return [{
                                                text: "Min: " + this.barChartData[0][0] + ", Max: " + this.barChartData[0][1],
                                                strokeStyle: chart.data.datasets[0].borderColor[0],
                                                fillStyle: chart.data.datasets[0].backgroundColor[0]
                                            }]
                                        }
                                        return chart.data.labels.map((label, index) => {
                                            return {
                                                text: "Min: " + this.barChartData[index][0] + ", Max: " + this.barChartData[index][1],
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
            updatePieChart() {
                if(this.pieChart !== undefined) this.pieChart.destroy()
                
                this.pieChart = new Chart("pie_chart", {
                    type: "pie",
                    data: {
                        labels: ["ResinTransferMoulding", "Carding", "Oxidation", "Pyrolysis"],
                        datasets: [{
                            data: this.pieChartData,
                            backgroundColor: this.pieChartColors,
                            borderWidth: 1,
                            borderColor: "#777",
                            hoverBorderWidth: 3,
                            hoverBorderColor: "#000"
                        }]
                    },
                    options: {
                        animation: false,
                        hover: false,
                        aspectRatio: 1,
                        plugins: {
                            title: {
                                display: true,
                                text: this.pieChartTitle,
                                font: {
                                    size: 20
                                }
                            },
                            legend: {
                                // display: false,
                                position: "bottom",
                                display: (this.pieChartData[0]!==undefined) ? true : false,
                                labels: {
                                    font: {
                                        size: 20
                                    },
                                    boxWidth: 25,
                                    boxHeight: 25,
                                    generateLabels: (chart) => {
                                        return chart.data.labels.map((label, index) => {
                                            return {
                                                text: label + ": " + this.pieChartData[index] + " (" + this.calculatePieChartPercent(index) + "%)",
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
                        },
                    },
                    // If legend-items need to be underneath each other, this is the way
                    // plugins: [{
                    //     beforeInit: function(chart) {
                    //     if (chart.canvas.id === "pie_chart") {
                    //         const ul = document.createElement('ul');
                    //         chart.data.labels.forEach((label, i) => {
                    //         ul.innerHTML += `
                    //             <li>
                    //             <span style="background-color: ${ chart.data.datasets[0].backgroundColor[i] }">
                    //                 ${ chart.data.datasets[0].data[i] }
                    //             </span>
                    //             ${ label }
                    //             </li>
                    //         `;
                    //         });

                    //         return document.getElementById("pie_chart_legend").appendChild(ul);
                    //     }

                    //     return;
                    //     }
                    // }]
                })
            },
            calculatePieChartPercent(index) {
                let sum = 0
                this.pieChartData.forEach((element) => {
                    sum += element
                })
                let element = (this.pieChartData[index] / (sum / 100))
                return Math.round(element * 100) / 100
            },
            updateBarChart2() {
                if(this.barChart2 !== undefined) this.barChart2.destroy()
                this.barChart2 = new Chart("bar_chart_2", {
                    type: "bar",
                    data: {
                        labels: ["GWP Range", "Cost/Kg Range", "Total Cost Range"],
                        datasets: [
                            {
                                data: this.barChart2CalculatedDataset,
                                backgroundColor: [
                                    this.color_green,
                                    // this.color_lightgrey
                                ],
                                barThickness: 20,
                                borderWidth: 1,
                                borderColor: "#777",
                                hoverBorderWidth: 2,
                                hoverBorderColor: "#000",
                                borderSkipped: false,
                                hoverBackgroundColor: this.color_green
                            },
                            {
                                data: this.barChart2BenchmarkDataset,
                                backgroundColor: [
                                    // this.color_green,
                                    this.color_lightgrey
                                ],
                                barThickness: 20,
                                borderWidth: 1,
                                borderColor: "#777",
                                hoverBorderWidth: 2,
                                hoverBorderColor: "#000",
                                borderSkipped: false,
                                hoverBackgroundColor: this.color_green
                            }
                        ]
                    },
                    options: {
                        animation: false,
                        hover: false,
                        aspectRatio: 1.3,
                        // scales: {
                        //   x: {
                        //     ticks: {
                        //         font: {
                        //             size: 20
                        //         }
                        //     }
                        //   },
                        //   y: {
                        //     ticks: {
                        //         display: (this.barChart2Data[0][0]!==undefined || this.barChart2Data[1][0]!==undefined) ? true : false,
                        //         font: {
                        //             size: 18
                        //         }
                        //     }
                        //   }
                        // },
                        plugins: {
                            // legend: {
                            //     display: (this.barChart2Data[0][0]!==undefined || this.barChart2Data[1][0]!==undefined) ? true : false,
                            //     position: "bottom",
                            //     labels: {
                            //         font: {
                            //             size: 20
                            //         },
                            //         boxWidth: 25,
                            //         boxHeight: 25,
                            //         generateLabels: (chart) => {
                            //             if(this.barChart2Data[0][0] === undefined) {
                            //                 return [{
                            //                     text: "Min: " + this.barChart2Data[1][0] + ", Max: " + this.barChart2Data[1][1],
                            //                     strokeStyle: chart.data.datasets[0].borderColor[1],
                            //                     fillStyle: chart.data.datasets[0].backgroundColor[1]
                            //                 }]
                            //             } else if(this.barChart2Data[1][0] === undefined) {
                            //                 return [{
                            //                     text: "Min: " + this.barChart2Data[0][0] + ", Max: " + this.barChart2Data[0][1],
                            //                     strokeStyle: chart.data.datasets[0].borderColor[0],
                            //                     fillStyle: chart.data.datasets[0].backgroundColor[0]
                            //                 }]
                            //             }
                            //             return chart.data.labels.map((label, index) => {
                            //                 return {
                            //                     text: "Min: " + this.barChart2Data[index][0] + ", Max: " + this.barChart2Data[index][1],
                            //                     strokeStyle: chart.data.datasets[0].borderColor[index],
                            //                     fillStyle: chart.data.datasets[0].backgroundColor[index]
                            //                 }
                            //             })
                            //         }
                            //     }
                            // },
                            tooltip: {
                                enabled: false
                            }
                        }
                    }
                })
            }
        }
    }
</script>