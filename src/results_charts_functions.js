import Chart from "chart.js/auto"
import annotationPlugin from "chartjs-plugin-annotation"

// annotationPlugin for drawing ellipses in charts
Chart.register(annotationPlugin)

export function createCharts(output, test_benchmarks, test_benchmarks_2, test_benchmarks_ashby) {
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
    
    // gwp range bar-charts (output only, output-benchmark_1, ..., output-benchmark_n)

    let category = "gwp_charts"
    let parentId = "gwp_or_cost_charts"
    let title = "GWP range"
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
    addBarCharts(charts, category, name, title, barChartBenchmarkLabel, data, unit, parentId)
    name = undefined
    data = undefined

    for(let i=0; i<test_benchmarks.length; i++) {
        // output-benchmark_1, ..., output-benchmark_n
        name = "gwp_range_output_" + test_benchmarks[i].name.replaceAll(" ", "_") + "_chart"
        barChartBenchmarkLabel = test_benchmarks[i].name
        data = [
            [Math.round(output.gwp.minValue * 100) / 100, Math.round(output.gwp.maxValue * 100) / 100],
            [Math.round(test_benchmarks[i].gwp_min * 100)/100, Math.round(test_benchmarks[i].gwp_max * 100)/100]
        ]
        addBarCharts(charts, category, name, title, barChartBenchmarkLabel, data, unit, parentId)
        name = undefined
        data = undefined
        barChartBenchmarkLabel = undefined
    }
    
    // cost range bar-charts (output only, benchmark_1 only, ..., benchmark_n only, output-benchmark_1, ..., output-benchmark_n)

    category = "cost_charts"
    parentId = "gwp_or_cost_charts"
    title = "Cost range"
    unit = "€"

    // output only
    name = "cost_range_output_only_chart"
    barChartBenchmarkLabel = ""
    data = [
        [Math.round(output.cost.minValue_eur_per_kg * 100) / 100, Math.round(output.cost.maxValue_eur_per_kg * 100) / 100],
        [undefined, undefined]
    ]
    addBarCharts(charts, category, name, title, barChartBenchmarkLabel, data, unit, parentId)
    name = undefined
    data = undefined

    for(let i=0; i<test_benchmarks.length; i++) {
        // output-benchmark_1, ..., output-benchmark_n
        name = "cost_range_output_" + test_benchmarks[i].name.replaceAll(" ", "_") + "_chart"
        barChartBenchmarkLabel = test_benchmarks[i].name
        data = [
            [Math.round(output.cost.minValue_eur_per_kg * 100) / 100, Math.round(output.cost.maxValue_eur_per_kg * 100) / 100],
            [Math.round(test_benchmarks[i].cost_min * 100)/100, Math.round(test_benchmarks[i].cost_max * 100)/100]
        ]
        addBarCharts(charts, category, name, title, barChartBenchmarkLabel, data, unit, parentId)
        name = undefined
        data = undefined
        barChartBenchmarkLabel = undefined
    }

    // max gwp of each process pie-chart + custom legend (output)

    category = "max_gwp_per_process_charts"
    parentId = "gwp_or_cost_per_process_charts"
    title = "Maximal GWP of each process"
    unit = "kg CO²"

    // output
    name = "max_gwp_of_each_output_process_chart"
    pieChartLabels = []
    data = []
    pieChartColors = []
    output.processes.forEach((process, i) => {
        pieChartLabels.push(process.name)
        data.push(Math.round(process.maxGWPValue * 100) / 100)
        pieChartColors.push(randomColor(i+1, 1))
    })
    addPieCharts(charts, category, name, title, pieChartLabels, data, pieChartColors, unit, parentId)
    name = undefined
    data = undefined
    pieChartLabels = undefined
    pieChartColors = undefined

    // max total cost of each process pie-chart + custom legend (output)

    category = "max_cost_per_process_charts"
    parentId = "gwp_or_cost_per_process_charts"
    title = "Maximal cost of each process"
    unit = "€"
    
    // output
    name = "max_cost_of_each_output_process_chart"
    pieChartLabels = []
    data = []
    pieChartColors = []
    output.processes.forEach((process, i) => {
        pieChartLabels.push(process.name)
        data.push(Math.round(process.maxCostTotalInEur * 100) / 100)
        pieChartColors.push(randomColor(i+1, 1))
    })
    addPieCharts(charts, category, name, title, pieChartLabels, data, pieChartColors, unit, parentId)
    name = undefined
    data = undefined
    pieChartLabels = undefined
    pieChartColors = undefined

    // mechanical values ashby-charts (tensile-0, tensile-90, flexural-0, flexural-90)
    category = "mechanical_values_charts"
    parentId = "mechanical_values_charts"

    // tensile-0
    name = "tensile_0_chart"
    data = setAshbyChartData(output, test_benchmarks_ashby, "tensile", "0")
    addAshbyCharts(charts, category, name, data, parentId)

    // tensile-90
    name = "tensile_90_chart"
    data = setAshbyChartData(output, test_benchmarks_ashby, "tensile", "90")
    addAshbyCharts(charts, category, name, data, parentId)

    // flexural-0
    name = "flexural_0_chart"
    data = setAshbyChartData(output, test_benchmarks_ashby, "flexural", "0")
    addAshbyCharts(charts, category, name, data, parentId)

    // flexural-90
    name = "flexural_90_chart"
    data = setAshbyChartData(output, test_benchmarks_ashby, "flexural", "90")
    addAshbyCharts(charts, category, name, data, parentId)
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
        addBarCharts(charts, category, name, title, barChartBenchmarkLabel, processGwpRangeData, unit, parentId)

        category = "process_cost_per_kg_charts"
        parentId = "process_cost_per_kg_charts"
        name = output.processes[i].name + "_process_cost_per_kg_range_chart"
        title = output.processes[i].name + " Process Cost per Kg Range"
        unit = "€ / kg"
        addBarCharts(charts, category, name, title, barChartBenchmarkLabel, processCostPerKgRangeData, unit, parentId)

        category = "process_total_cost_charts"
        parentId = "process_total_cost_charts"
        name = output.processes[i].name + "_process_total_cost_range_chart"
        title = output.processes[i].name + " Process Total Cost Range"
        unit = "€"
        addBarCharts(charts, category, name, title, barChartBenchmarkLabel, processTotalCostRangeData, unit, parentId)
    }
    category = undefined
    parentId = undefined
    barChartBenchmarkLabel = undefined
    name = undefined
    title = undefined
    unit = undefined

    return charts
}

function createCanvasElement(id, className, parentId) {
    // creates a hidden <canvas> element and inserts it into the parent element.
    let newCanvas = document.createElement("canvas")
    newCanvas.id = id
    newCanvas.classList.add(className)
    newCanvas.classList.add("hidden_chart")
    document.getElementById(parentId).appendChild(newCanvas)
    // console.log(myCanvas)
    return newCanvas
}

function createBarChart(id, title, benchmarkLabel, data, unit, legendFontSize) {
    // format of data always [[a, b], [c, d]]
    return new Chart(id, {
        type: "bar",
        data: {
            labels: ["Result", benchmarkLabel],
            datasets: [
                {
                    data: checkBarChartData(data),
                    backgroundColor: [
                        "#55CD89",
                        "#F2F2F2"
                    ],
                    barThickness: 80,
                    borderWidth: 1,
                    borderColor: "#777",
                    // hoverBorderWidth: 2,
                    // hoverBorderColor: "#000",
                    borderSkipped: false,
                    hoverBackgroundColor: "#55CD89"
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
                    },
                    padding: {
                        bottom: 30
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
}

function addBarCharts(chartsObj, category, name, title, benchmarkLabel, data, unit, parentId) {
    // Prevents code duplication when creating charts.
    chartsObj[category][name] = {}
    chartsObj[category][name]["small_font"] = {}
    chartsObj[category][name]["normal_font"] = {}
    // create canvases and charts, save their id
    createCanvasElement((name + "_small_font"), "bar_chart", parentId)
    createBarChart((name + "_small_font"), title, benchmarkLabel, data, unit, 15)
    chartsObj[category][name]["small_font"] = name + "_small_font"

    createCanvasElement((name + "_normal_font"), "bar_chart", parentId)
    createBarChart((name + "_normal_font"), title, benchmarkLabel, data, unit, 20)
    chartsObj[category][name]["normal_font"] = name + "_normal_font"
}

function checkBarChartData(data) {
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
}

function createPieChart(id, title, labels, data, colors, unit, legendFontSize, parentId) {
    return new Chart(id, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
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
                    text: title,
                    font: {
                        size: 20
                    },
                    padding: {
                        bottom: 30
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
                    legendContainer.id = legendId + "_container"
                    legendContainer.classList.add("custom_legend_container")
                    legendContainer.classList.add("hidden_chart")
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
}

function addPieCharts(chartsObj, category, name, title, labels, data, colors, unit, parentId) {
    // Prevents code duplication when creating charts.
    chartsObj[category][name] = {}
    chartsObj[category][name]["small_font"] = {}
    chartsObj[category][name]["normal_font"] = {}
    // create canvases and charts, save their id
    createCanvasElement((name + "_small_font"), "pie_chart", parentId)
    createPieChart((name + "_small_font"), title, labels, data, colors, unit, 15, parentId)
    chartsObj[category][name]["small_font"] = name + "_small_font"

    createCanvasElement((name + "_normal_font"), "pie_chart", parentId)
    createPieChart((name + "_normal_font"), title, labels, data, colors, unit, 20, parentId)
    chartsObj[category][name]["normal_font"] = name + "_normal_font"
}

function createAshbyChart(id, data, legendFontSize, parentId) {
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
                    max: data.xAxisRange,
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
                    max: data.yAxisRange,
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
                    text: data.chartTitle,
                    font: {
                        size: 20
                    },
                    // padding: {
                    //     bottom: 30
                    // }
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
                    annotations: checkAshbyChartData(data)
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
                    legendContainer.id = legendId + "_container"
                    legendContainer.classList.add("custom_legend_container")
                    legendContainer.classList.add("hidden_chart")
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
}

function addAshbyCharts(chartsObj, category, name, data, parentId) {
    // Prevents code duplication when creating charts.
    chartsObj[category][name] = {}
    chartsObj[category][name]["small_font"] = {}
    chartsObj[category][name]["normal_font"] = {}
    // create canvases and charts, save their id
    createCanvasElement((name + "_small_font"), "ashby_chart", parentId)
    createAshbyChart((name + "_small_font"), data, 15, parentId)
    chartsObj[category][name]["small_font"] = name + "_small_font"

    createCanvasElement((name + "_normal_font"), "ashby_chart", parentId)
    createAshbyChart((name + "_normal_font"), data, 20, parentId)
    chartsObj[category][name]["normal_font"] = name + "_normal_font"
}

function checkAshbyChartData(data) {
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
}

function setAshbyChartData(output, benchmarks, mechArg1, mechArg2) { // this.test_output, this.test_benchmarks_ashby
    // picks data from output and benchmarks corresponding to the function-parameters
    // calculate minValue and maxValue of output-fields
    let outputMinMax = getMechanicalMinMaxValues(output)
    // calculate minValues and maxValues of benchmarks
    let benchmarksMinMax = {}
    for(let key in benchmarks) {
        benchmarksMinMax[key] = getMechanicalMinMaxValues(benchmarks[key])
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
            backgroundColor: randomColor(colorIndex, 0.4),
        }
        data.ellipses.push(newEllipse)
        data.names.push(key)
        colorIndex++
    }
    return data
}

function getMechanicalMinMaxValues(data) {
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
}

function randomColor(i, alpha) {
    /**
     * Generates a randomised color, that has the same saturation and lightness as the main green color.
     * Parameter i is needed for iterating in the wrapper function.
    */
    let h = (146 + i * 260) % 356, s = 55, l = 57
    // console.log("rgb(" + r +", " + g + ", " + b + ")")
    return "hsla(" + h + ", " + s + "%, " + l + "%, " + alpha + ")"
}