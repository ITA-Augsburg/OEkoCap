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

        <canvas
        v-if="this.pieChartData[0] !== undefined"
        id="pie_chart" />
        <!-- <div id="pie_chart_legend"></div> -->

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
        id="ashby_chart" class="bar_chart" />

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

        <canvas
        v-if="this.barChartProcessCostPerKgRangeData[0] !== undefined"
        id="bar_chart_process_cost_per_kg_range" class="bar_chart" />

        <canvas
        v-if="this.barChartProcessTotalCostRangeData[0] !== undefined"
        id="bar_chart_process_total_cost_range" class="bar_chart" />

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
                    this.updateAllCharts()
                    this.wideWindow = true
                } else if(this.wideWindow === true && window.innerWidth < 500) {
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
                tensile_button_active: false,
                flexural_button_active: false,
                zero_button_active: false,
                ninety_button_active: false,

                barChart: undefined,
                barChartData: [[undefined, undefined], [undefined, undefined]],
                leftBarLabel: "Calculated",
                rightBarLabel: "Benchmark",

                pieChart: undefined,
                pieChartData: [],
                pieChartTitle: "Calculated Processes",
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
                ],
            }
        },
        methods: {
            handleButton(id) {
                //depending on which button is "active", show gwp or cost of output
                switch(id) {
                    case "gwp":
                        this.gwp_button_active = true
                        this.cost_button_active = false
                        this.leftBarLabel = "Calculated"
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
                        this.leftBarLabel = "Calculated"
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
                        this.setAshbyChartData()
                        break
                    case "flexural":
                        this.tensile_button_active = false
                        this.flexural_button_active = true
                        this.setAshbyChartData()
                        break
                    case "zero":
                        this.zero_button_active = true
                        this.ninety_button_active = false
                        this.setAshbyChartData()
                        break
                    case "ninety":
                        this.zero_button_active = false
                        this.ninety_button_active = true
                        this.setAshbyChartData()
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
            updateAshbyChart() {
                if(this.ashbyChart !== undefined) {
                    this.ashbyChart.destroy()
                }
                if(this.ashbyChartData !== undefined) {
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
                                            size: 16
                                        }
                                    },
                                    ticks: {
                                        font: {
                                            size: 20
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
                                            size: 16
                                        }
                                    },
                                    ticks: {
                                        font: {
                                            size: 20
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
                                    display: true,
                                    position: 'bottom',
                                    labels: {
                                        font: {
                                            size: window.innerWidth >= 500 ? this.legendFont : this.legendFontS
                                        },
                                        boxWidth: 25,
                                        boxHeight: 25,
                                        generateLabels: () => {
                                            return [
                                                {
                                                    text: "Strength Min: " + this.ashbyChartData.ellipses[0].yMin + ", Strength Max: " + this.ashbyChartData.ellipses[0].yMax,
                                                    strokeStyle: "#000000",
                                                    fillStyle: this.ashbyChartData.ellipses[0].backgroundColor
                                                },
                                                {
                                                    text: "Modulus Min: " + this.ashbyChartData.ellipses[0].xMin + ", Modulus Max: " + this.ashbyChartData.ellipses[0].xMax,
                                                    strokeStyle: "#000000",
                                                    fillStyle: this.ashbyChartData.ellipses[0].backgroundColor
                                                }
                                            ]
                                        }
                                    },
                                },
                                tooltip: {
                                    enabled: false
                                },
                                annotation: {
                                    annotations: this.checkAshbyChartData(this.ashbyChartData)
                                }
                            }
                        }
                    })
                }
            },
            setAshbyChartData() {
                if(
                !this.tensile_button_active && !this.flexural_button_active ||
                !this.zero_button_active && !this.ninety_button_active) {
                    // User needs to select a button on both lines (tensile-flexural, zero-ninety)
                    this.ashbyChartData = undefined
                } else {
                    // calculate minValue and maxValue of output-fields
                    let values = this.getOutputMinMaxValues()
                    // fill ashbyChartData based on button-states
                    if(this.tensile_button_active && this.zero_button_active) {
                        //tensStren0 tensMod0

                        this.ashbyChartData = {
                            ellipses: [{
                                type: 'ellipse',
                                xMin: values.tensMod0.min,
                                xMax: values.tensMod0.max,
                                yMin: values.tensStren0.min,
                                yMax: values.tensStren0.max,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            }],
                            xAxisRange: values.tensMod0.max + values.tensMod0.max * 0.1,
                            yAxisRange: values.tensStren0.max + values.tensStren0.max * 0.1,
                            chartTitle: "Tensileness range at 0°"
                        }

                    } else if(this.tensile_button_active && this.ninety_button_active) {
                        //tensStren90 tensMod90

                        this.ashbyChartData = {
                            ellipses: [{
                                type: 'ellipse',
                                xMin: values.tensMod90.min,
                                xMax: values.tensMod90.max,
                                yMin: values.tensStren90.min,
                                yMax: values.tensStren90.max,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            }],
                            xAxisRange: values.tensMod90.max + values.tensMod90.max * 0.1,
                            yAxisRange: values.tensStren90.max + values.tensStren90.max * 0.1,
                            chartTitle: "Tensileness range at 90°"
                        }

                    } else if(this.flexural_button_active && this.zero_button_active) {
                        //flexStren0 flexMod0

                        this.ashbyChartData = {
                            ellipses: [{
                                type: 'ellipse',
                                xMin: values.flexMod0.min,
                                xMax: values.flexMod0.max,
                                yMin: values.flexStren0.min,
                                yMax: values.flexStren0.max,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            }],
                            xAxisRange: values.flexMod0.max + values.flexMod0.max * 0.1,
                            yAxisRange: values.flexStren0.max + values.flexStren0.max * 0.1,
                            chartTitle: "Flexuralness range at 0°"
                        }

                    } else if(this.flexural_button_active && this.ninety_button_active) {
                        //flexStren90 flexMod90

                        this.ashbyChartData = {
                            ellipses: [{
                                type: 'ellipse',
                                xMin: values.flexMod90.min,
                                xMax: values.flexMod90.max,
                                yMin: values.flexStren90.min,
                                yMax: values.flexStren90.max,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            }],
                            xAxisRange: values.flexMod90.max + values.flexMod90.max * 0.1,
                            yAxisRange: values.flexStren90.max + values.flexStren90.max * 0.1,
                            chartTitle: "Flexuralness range at 90°"
                        }

                    }
                }
            },
            getOutputMinMaxValues() {
                /* returns min- and max-values of output for the fields
                tensileStrength0_MPa, tensileStrength90_MPa
                tensileModulus0_GPa, tensileModulus90_GPa
                flexuralStrength0_MPa, flexuralStrength90_MPa
                flexuralModulus0_GPa, flexuralModulus90_GPa */
                let values = {}
                let tempMin = undefined
                let tempMax = undefined
                let tensStren0 = this.test_output.tensileStrength_MPa[0].tensileStrength0_MPa
                let tensStren90 = this.test_output.tensileStrength_MPa[1].tensileStrength90_MPa
                let tensMod0 = this.test_output.tensileModulus_GPa[0].tensileModulus0_GPa
                let tensMod90 = this.test_output.tensileModulus_GPa[1].tensileModulus90_GPa
                let flexStren0 = this.test_output.flexuralStrength_MPa[0].flexuralStrength0_MPa
                let flexStren90 = this.test_output.flexuralStrength_MPa[1].flexuralStrength90_MPa
                let flexMod0 = this.test_output.flexuralModulus_GPa[0].flexuralModulus0_GPa
                let flexMod90 = this.test_output.flexuralModulus_GPa[1].flexuralModulus90_GPa
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

                console.log(JSON.stringify(values, null, 2))
                return values
            },
            checkAshbyChartData(data) {
                // for every ellipse check min and max values on each axis. If min-max range < 1% of the axis-range then ellipse won't show well. If min==max then ellipse won't show. Therefor modify values. Values in the legend won't be affected.
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
                    let twoPercentWidth = modifiedData.xAxisRange * 0.02
                    if(currentWidth < twoPercentWidth) {
                        let sidePadding = (twoPercentWidth - currentWidth) / 2 // to be added left and right
                        newEllipse.xMin = newEllipse.xMin - sidePadding
                        newEllipse.xMax = newEllipse.xMax + sidePadding
                    }
                    // compare yMin and yMax, modify them if needed
                    let currentHeight = Math.abs(newEllipse.yMax - newEllipse.yMin)
                    let twoPercentHeight = modifiedData.yAxisRange * 0.02
                    if(currentHeight < twoPercentHeight) {
                        let sidePadding = (twoPercentHeight - currentHeight) / 2 // to be added above and below
                        newEllipse.yMin = newEllipse.yMin - sidePadding
                        newEllipse.yMax = newEllipse.yMax + sidePadding
                    }
                    modifiedData.ellipses[i] = newEllipse
                }
                // console.log(JSON.stringify(data, null, 2))
                // console.log(JSON.stringify(modifiedData, null, 2))
                return modifiedData.ellipses
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