<script setup>
import router from "@/router";
import Chart from "chart.js/auto"
</script>

<template>

    <div class="input_area">

        <!-- <p>{{app_output_prop}}</p> -->
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

        <canvas
        v-if="this.barChartData[0][0] !== undefined || this.barChartData[1][0] !== undefined"
        id="bar_chart" class="bar_chart"></canvas>

        <canvas
        v-if="this.pieChartData[0] !== undefined"
        id="pie_chart"></canvas>
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

        <canvas
        v-if="this.barChartProcessGwpRangeData[0] !== undefined"
        id="bar_chart_process_gwp_range" class="bar_chart"></canvas>

        <canvas
        v-if="this.barChartProcessCostPerKgRangeData[0] !== undefined"
        id="bar_chart_process_cost_per_kg_range" class="bar_chart"></canvas>

        <canvas
        v-if="this.barChartProcessTotalCostRangeData[0] !== undefined"
        id="bar_chart_process_total_cost_range" class="bar_chart"></canvas>

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

            //if window-width passes through the value 500px, redraw charts (with different legend font size)
            window.addEventListener("resize", () => {
                if(this.wideWindow === false && window.innerWidth >= 500) {
                    console.log("got big")
                    this.updateAllCharts()
                    this.wideWindow = true
                } else if(this.wideWindow === true && window.innerWidth < 500) {
                    console.log("got small")
                    this.updateAllCharts()
                    this.wideWindow = false
                }
            })
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
                barChart: undefined,
                barChartData: [[undefined, undefined], [undefined, undefined]],
                leftBarLabel: "Calculated",
                rightBarLabel: "Benchmark",

                pieChart: undefined,
                pieChartData: [],
                pieChartTitle: "Calculated Processes",
                pieChartColors: [],
                
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
                        this.leftBarLabel = "Calculated"
                        this.barChartData[0][0] = Math.round(this.test_output.gwp.minValue * 100) / 100
                        this.barChartData[0][1] = Math.round(this.test_output.gwp.maxValue * 100) / 100

                        this.pieChartTitle = "Maximal GWP of each Process"
                        this.test_output.processes.forEach((element, index) => {
                            this.pieChartData[index] = Math.round(element.maxGWPValue * 100) / 100
                        })
                        break
                    case "cost":
                        this.leftBarLabel = "Calculated"
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
                //Initially canvas-elements are missing, in order for a chart to render for the first time,
                //some time is needed until the canvas-element is added
                if(document.getElementById("bar_chart") === null || document.getElementById("pie_chart") === null) {
                    setTimeout(() => {
                        this.handleBenchmarkSelect()
                        // this.updateBarChart() happens in this.handleBenchmarkSelect() alredy
                        this.updatePieChart()
                    }, 50)
                } else {
                    this.handleBenchmarkSelect()
                    // this.updateBarChart() happens in this.handleBenchmarkSelect() alredy
                    this.updatePieChart()
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
                    }, 50)
                } else {
                    this.updateBarChartProcessGwpRange()
                    this.updateBarChartProcessCostPerKgRange()
                    this.updateBarChartProcessTotalCostRange()
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
                                                    text: "Min: " + this.barChartData[1][0] + unit + ", Max: " + this.barChartData[1][1] + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[1],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[1]
                                                }]
                                            } else if(this.barChartData[1][0] === undefined) {
                                                return [{
                                                    text: "Min: " + this.barChartData[0][0] + unit + ", Max: " + this.barChartData[0][1] + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[0],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[0]
                                                }]
                                            }
                                            return chart.data.labels.map((label, index) => {
                                                return {
                                                    text: "Min: " + this.barChartData[index][0] + unit + ", Max: " + this.barChartData[index][1] + unit,
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
                            labels: ["ResinTransferMoulding", "Carding", "Oxidation", "Pyrolysis"],
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
                                            size: window.innerWidth >= 500 ? this.legendFont : this.legendFontS
                                        },
                                        boxWidth: 25,
                                        boxHeight: 25,
                                        generateLabels: (chart) => {
                                            let unit = this.gwp_button_active ? " kg CO²" : " €"
                                            return chart.data.labels.map((label, index) => {
                                                return {
                                                    text: label + ": " + this.pieChartData[index] + unit + " (" + this.calculatePieChartPercent(index) + "%)",
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
                            labels: ["Calculated", "Benchmark"],
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
                                                    text: "Min: " + this.barChartProcessGwpRangeData[0][0] + unit + ", Max: " + this.barChartProcessGwpRangeData[0][1] + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[0],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[0]
                                                }]
                                            }
                                            return chart.data.labels.map((label, index) => {
                                                return {
                                                    text: "Min: " + this.barChartProcessGwpRangeData[index][0] + unit + ", Max: " + this.barChartProcessGwpRangeData[index][1] + unit,
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
                            labels: ["Calculated", "Benchmark"],
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
                                                    text: "Min: " + this.barChartProcessCostPerKgRangeData[0][0] + unit + ", Max: " + this.barChartProcessCostPerKgRangeData[0][1] + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[0],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[0]
                                                }]
                                            }
                                            return chart.data.labels.map((label, index) => {
                                                return {
                                                    text: "Min: " + this.barChartProcessCostPerKgRangeData[index][0] + unit + ", Max: " + this.barChartProcessCostPerKgRangeData[index][1] + unit,
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
                            labels: ["Calculated", "Benchmark"],
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
                                                    text: "Min: " + this.barChartProcessTotalCostRangeData[0][0] + unit + ", Max: " + this.barChartProcessTotalCostRangeData[0][1] + unit,
                                                    strokeStyle: chart.data.datasets[0].borderColor[0],
                                                    fillStyle: chart.data.datasets[0].backgroundColor[0]
                                                }]
                                            }
                                            return chart.data.labels.map((label, index) => {
                                                return {
                                                    text: "Min: " + this.barChartProcessTotalCostRangeData[index][0] + unit + ", Max: " + this.barChartProcessTotalCostRangeData[index][1] + unit,
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
            updateAllCharts() {
                this.updateBarChart()
                this.updatePieChart()
                this.updateBarChartProcessGwpRange()
                this.updateBarChartProcessCostPerKgRange()
                this.updateBarChartProcessTotalCostRange()
            }
        }
    }
</script>