import Chart from "chart.js/auto"
import annotationPlugin from "chartjs-plugin-annotation"

export function createCharts(output, benchmarks) {
    /**
     * Creates every single chart that can possibly be selected.
     * Saves chart-ids in the charts-object.
     * Charts-elements can be manipulated by accessing these ids.
     */

    // annotationPlugin for drawing ellipses in charts
    Chart.register(annotationPlugin)

    let charts = {
        gwp_charts: {},
        cost_charts: {},
        max_gwp_per_process_charts: {},
        max_cost_per_process_charts: {},
        mechanical_values_charts: {},
        pdf_gwp_cost_charts: {}
    }
    
    let pieChartLabels = undefined
    let pieChartColors = undefined

    // gwp range bar-charts (output only, output-benchmark_1, ..., output-benchmark_n)

    let category = "gwp_charts"
    let parentId = "gwp_or_cost_charts"
    let title = "GWP range"
    let unit = "CO₂-eq./kg part"

    let data = undefined
    
    // output only
    let name = "gwp_range_output_only_chart"
    let barChartBenchmarkLabels = ["Result", undefined]
    if(output.gwp.minValue === null || output.gwp.maxValue === null) {
        data = [[undefined, undefined],[undefined, undefined]]
    } else {
        data = [
            [Math.round(output.gwp.minValue * 100) / 100, Math.round(output.gwp.maxValue * 100) / 100],
            [undefined, undefined]
        ]
    }
    addBarCharts(charts, category, name, title, barChartBenchmarkLabels, data, unit, parentId)
    name = undefined
    data = undefined

    for(let key in benchmarks) {
        // output-benchmark_1, ..., output-benchmark_n
        name = "gwp_range_output_" + key.replaceAll(" ", "_") + "_chart"
        barChartBenchmarkLabels = ["Result", benchmarks[key].name]
        if(output.gwp.minValue === null || output.gwp.maxValue === null) {
            data = [[undefined, undefined],[Math.round(benchmarks[key].gwp_min * 100)/100, Math.round(benchmarks[key].gwp_max * 100)/100]]
        } else {
            data = [
                [Math.round(output.gwp.minValue * 100) / 100, Math.round(output.gwp.maxValue * 100) / 100],
                [Math.round(benchmarks[key].gwp_min * 100)/100, Math.round(benchmarks[key].gwp_max * 100)/100]
            ]
        }
        // console.log(data)
        addBarCharts(charts, category, name, title, barChartBenchmarkLabels, data, unit, parentId)
        name = undefined
        data = undefined
        barChartBenchmarkLabels = undefined
    }
    
    // cost range bar-charts (output only, benchmark_1 only, ..., benchmark_n only, output-benchmark_1, ..., output-benchmark_n)

    category = "cost_charts"
    parentId = "gwp_or_cost_charts"
    title = "Cost range"
    unit = "€/kg part"

    // output only
    name = "cost_range_output_only_chart"
    barChartBenchmarkLabels = ["Result", undefined]
    if(output.cost.minValue_eur_per_kg === null || output.cost.maxValue_eur_per_kg === null) {
        data = [[undefined, undefined],[undefined, undefined]]
    } else {
        data = [
            [Math.round(output.cost.minValue_eur_per_kg * 100) / 100, Math.round(output.cost.maxValue_eur_per_kg * 100) / 100],
            [undefined, undefined]
        ]
    }
    addBarCharts(charts, category, name, title, barChartBenchmarkLabels, data, unit, parentId)
    name = undefined
    data = undefined

    for(let key in benchmarks) {
        // output-benchmark_1, ..., output-benchmark_n
        name = "cost_range_output_" + key.replaceAll(" ", "_") + "_chart"
        barChartBenchmarkLabels = ["Result", benchmarks[key].name]
        if(output.cost.minValue_eur_per_kg === null || output.cost.maxValue_eur_per_kg === null) {
            data = [
                [undefined, undefined],
                [Math.round(benchmarks[key].cost_per_kg_min * 100)/100, Math.round(benchmarks[key].cost_per_kg_max * 100)/100]
            ]   
        } else {
            data = [
                [Math.round(output.cost.minValue_eur_per_kg * 100) / 100, Math.round(output.cost.maxValue_eur_per_kg * 100) / 100],
                [Math.round(benchmarks[key].cost_per_kg_min * 100)/100, Math.round(benchmarks[key].cost_per_kg_max * 100)/100]
            ]
        }
        addBarCharts(charts, category, name, title, barChartBenchmarkLabels, data, unit, parentId)
        name = undefined
        data = undefined
        barChartBenchmarkLabels = undefined
    }

    // gwp and cost range barchart with output and every benchmark

    category = "pdf_gwp_cost_charts"
    parentId = "charts_for_pdf"
    title = "GWP range"
    unit = "CO₂-eq./kg part"

    name = "pdf_gwp_chart"
    barChartBenchmarkLabels = (output.gwp.minValue === null || output.gwp.maxValue === null)
        ? []
        : ["Result"]
    data = (output.gwp.minValue === null || output.gwp.maxValue === null)
        ? []
        : [[Math.round(output.gwp.minValue * 100) / 100, Math.round(output.gwp.maxValue * 100) / 100]]
    for(let key in benchmarks) {
        barChartBenchmarkLabels.push(benchmarks[key].name)
        data.push([Math.round(benchmarks[key].gwp_min * 100) / 100, Math.round(benchmarks[key].gwp_max * 100) / 100])
    }
    // addBarCharts(charts, category, name, title, barChartBenchmarkLabels, data, unit, parentId)
    createCanvasElement(name + "_normal_font", "pdf_bar_chart", "charts_for_pdf")
    createBarChart(name + "_normal_font", title, barChartBenchmarkLabels, data, unit, 15)
    charts.pdf_gwp_cost_charts[name] = {}
    charts.pdf_gwp_cost_charts[name]["normal_font"] = name + "_normal_font"
    name = undefined
    data = undefined
    barChartBenchmarkLabels = undefined

    category = "pdf_gwp_cost_charts"
    parentId = "charts_for_pdf"
    title = "Cost range"
    unit = "€/kg part"

    name = "pdf_cost_chart"
    barChartBenchmarkLabels = (output.cost.minValue_eur_per_kg === null || output.cost.maxValue_eur_per_kg === null)
        ? []
        : ["Result"]
    data = (output.cost.minValue_eur_per_kg === null || output.cost.maxValue_eur_per_kg === null)
        ? []
        : [[Math.round(output.cost.minValue_eur_per_kg * 100) / 100, Math.round(output.cost.maxValue_eur_per_kg * 100) / 100]]
    for(let key in benchmarks) {
        barChartBenchmarkLabels.push(benchmarks[key].name)
        data.push([Math.round(benchmarks[key].cost_per_kg_min * 100) / 100, Math.round(benchmarks[key].cost_per_kg_max * 100) / 100])
    }
    // addBarCharts(charts, category, name, title, barChartBenchmarkLabels, data, unit, parentId)
    createCanvasElement(name + "_normal_font", "pdf_bar_chart", "charts_for_pdf")
    createBarChart(name + "_normal_font", title, barChartBenchmarkLabels, data, unit, 15)
    charts.pdf_gwp_cost_charts[name] = {}
    charts.pdf_gwp_cost_charts[name]["normal_font"] = name + "_normal_font"
    name = undefined
    data = undefined
    barChartBenchmarkLabels = undefined

    // average gwp of each process pie-chart + custom legend (output)

    category = "max_gwp_per_process_charts"
    parentId = "gwp_or_cost_per_process_charts"
    title = "Average GWP of each process"
    unit = "CO₂-eq./kg part"

    // output
    name = "max_gwp_of_each_output_process_chart"
    pieChartLabels = []
    data = []
    pieChartColors = []
    let processesGwpOk = true
    let processesCostOk = true
    output.processes.forEach((process) => {
        if(process.minGWPValue === null || process.maxGWPValue === null) processesGwpOk = false
        if(process.minCostPerKg === null || process.maxCostPerKg === null) processesCostOk = false
    })
    if(processesGwpOk) {
        let counter = 0
        output.processes.forEach((process) => {
            if(process.name === "Oxidation") return // equivalent of continue in a for() loop
            pieChartLabels.push(process.name)
            let dataPoint = (process.maxGWPValue + process.minGWPValue) / 2
            data.push(Math.round(dataPoint * 100) / 100)
            pieChartColors.push(randomColor(counter, 1, output.processes.length, "pie"))
            counter++
        })
        addPieCharts(charts, category, name, title, pieChartLabels, data, pieChartColors, unit, parentId)
    }
    name = undefined
    data = undefined
    pieChartLabels = undefined
    pieChartColors = undefined

    // average cost/kg of each process pie-chart + custom legend (output)

    category = "max_cost_per_process_charts"
    parentId = "gwp_or_cost_per_process_charts"
    title = "Average cost of each process"
    unit = "€/kg part"
    
    // output
    name = "max_cost_of_each_output_process_chart"
    pieChartLabels = []
    data = []
    pieChartColors = []
    if(processesCostOk) {
        let counter = 0
        output.processes.forEach((process) => {
            if(process.name === "Oxidation") return // equivalent of continue in a for() loop
            pieChartLabels.push(process.name)
            let dataPoint = (process.minCostPerKg + process.maxCostPerKg) / 2
            data.push(Math.round(dataPoint * 100) / 100)
            pieChartColors.push(randomColor(counter, 1, output.processes.length, "pie"))
            counter++
        })
        addPieCharts(charts, category, name, title, pieChartLabels, data, pieChartColors, unit, parentId)
    }
    name = undefined
    data = undefined
    pieChartLabels = undefined
    pieChartColors = undefined

    // mechanical values ashby-charts (tensile-0, tensile-90, flexural-0, flexural-90)
    category = "mechanical_values_charts"
    parentId = "mechanical_values_charts"

    // tensile-0
    name = "tensile_0_chart"
    data = setAshbyChartData(output, benchmarks, "tensile", "0")
    addAshbyCharts(charts, category, name, data, parentId)

    // tensile-90
    name = "tensile_90_chart"
    data = setAshbyChartData(output, benchmarks, "tensile", "90")
    addAshbyCharts(charts, category, name, data, parentId)

    // flexural-0
    name = "flexural_0_chart"
    data = setAshbyChartData(output, benchmarks, "flexural", "0")
    addAshbyCharts(charts, category, name, data, parentId)

    // flexural-90
    name = "flexural_90_chart"
    data = setAshbyChartData(output, benchmarks, "flexural", "90")
    addAshbyCharts(charts, category, name, data, parentId)
    name = undefined
    data = undefined

    // console.log(JSON.stringify(charts, null, 4))
    return charts
}

function createCanvasElement(id, className, parentId) {
    /**
     * Creates a hidden <canvas> element and inserts it into the parent element.
     * Canvas elements are required for creating charts.
     */
    let newCanvas = document.createElement("canvas")
    newCanvas.id = id
    newCanvas.classList.add(className)
    newCanvas.classList.add("hidden_chart")
    document.getElementById(parentId).appendChild(newCanvas)
    // console.log(myCanvas)
    return newCanvas
}
function createBarChart(id, title, benchmarkLabels, data, unit, legendFontSize) {
    /**
     * Creates a Chart.js bar-chart with a legend.
     * The green column always represents the output data.
     * Format of bar-chart-data is always [[a, b], [c, d], ...].
    */
    
    // in the pdf there are only two bar-charts, one with the output-gwp and all benchmark-gwps; and one with the output-cost and all benchmark-costs.
    // output-gwp and output-cost can be null, in this case exclude the green color.
    let lotsOfColors = []
    if(benchmarkLabels[0] === "Result") {
        for(let i=0; i<benchmarkLabels.length; i++) {
            lotsOfColors.push(randomColor(i, 1, benchmarkLabels.length, "bar"))
        }
    } else {
        for(let i=1; i<benchmarkLabels.length + 1; i++) {
            lotsOfColors.push(randomColor(i, 1, benchmarkLabels.length + 1, "bar"))
        }
    }

    return new Chart(id, {
        type: "bar",
        data: {
            labels: benchmarkLabels,
            datasets: [
                {
                    data: checkBarChartData(data),
                    backgroundColor: benchmarkLabels.length <= 2
                        ? ["#55CD89", "#F2F2F2"]
                        : lotsOfColors,
                    barThickness: benchmarkLabels.length <= 2
                        ? 80
                        : undefined,
                    borderWidth: 1,
                    borderColor: "#777",
                    // hoverBorderWidth: 2,
                    // hoverBorderColor: "#000",
                    borderSkipped: false,
                    hoverBackgroundColor: "#55CD89",
                    categoryPercentage: benchmarkLabels.length <= 2
                        ? undefined
                        : 0.8,
                    barPercentage: benchmarkLabels.length <= 2
                        ? undefined
                        : 0.9
                }
            ]
        },
        options: {
            animation: false,
            hover: false,
            aspectRatio: 1.3,
            scales: {
                x: {
                    // grid: {
                    //     tickWidth: 2
                    // },
                    display: false,
                    ticks: {
                        display: true,
                        font: {
                            size: 20
                        }
                    }
                },
                y: {
                    min: 0,
                    ticks: {
                        font: {
                            size: benchmarkLabels.length <= 2
                                ? 18
                                : 30
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: benchmarkLabels.length <= 2
                            ? 20
                            : 40
                    },
                    padding: {
                        bottom: 30
                    }
                },
                legend: {
                    // maxWidth: 700,
                    position: "bottom",
                    labels: {
                        font: {
                            size: benchmarkLabels.length <= 2
                                ? legendFontSize
                                : 35
                        },
                        boxWidth: benchmarkLabels.length <= 2
                            ? 25
                            : 40,
                        boxHeight: benchmarkLabels.length <= 2
                            ? 25
                            : 40,
                        generateLabels: (chart) => {
                            if(data[0][0] === undefined && data[1][0] === undefined) {
                                return
                            } else if(data[0][0] === undefined) {
                                let localLabel = chart.data.labels[1]
                                if(chart.data.labels[1] === "Glasfiber-Fabric + Epoxy (Resin Transfer Molding)") {
                                    localLabel = "Glasfiber-Fabric + Epoxy (RTM)"
                                } else if(chart.data.labels[1] === "Glasfiber-Fabric + Epoxy (Wet Compression Molding)") {
                                    localLabel = "Glasfiber-Fabric + Epoxy (WCM)"
                                }
                                return [{
                                    text: localLabel + " range: [" + data[1][0] + ", " + data[1][1] + "] " + unit,
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
                                let localLabel = label
                                if(label === "Glasfiber-Fabric + Epoxy (Resin Transfer Molding)") {
                                    localLabel = "Glasfiber-Fabric + Epoxy (RTM)"
                                } else if(label === "Glasfiber-Fabric + Epoxy (Wet Compression Molding)") {
                                    localLabel = "Glasfiber-Fabric + Epoxy (WCM)"
                                }
                                return {
                                    text: localLabel + " range: [" + data[index][0] + ", " + data[index][1] + "] " + unit,
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
function addBarCharts(chartsObj, category, name, title, benchmarkLabels, data, unit, parentId) {
    /**
     * Function used in export function createCharts(...), to add bar-charts to the charts-object.
     * This function prevents code-duplication.
     */
    chartsObj[category][name] = {}
    chartsObj[category][name]["small_font"] = {}
    chartsObj[category][name]["normal_font"] = {}
    // create canvases and charts, save their id
    createCanvasElement((name + "_small_font"), "bar_chart", parentId)
    createBarChart((name + "_small_font"), title, benchmarkLabels, data, unit, 12)
    chartsObj[category][name]["small_font"] = name + "_small_font"

    createCanvasElement((name + "_normal_font"), "bar_chart", parentId)
    createBarChart((name + "_normal_font"), title, benchmarkLabels, data, unit, 15)
    chartsObj[category][name]["normal_font"] = name + "_normal_font"
}
function checkBarChartData(data) {
    /**
     * Bar-chart bars don't show if their min and max values are the same.
     * If min equals max, the bar-height is set to two percent of the y-axis length and positioned to center on the min (equals max) value.
     * Only the chart will be modified, the chart-legend will still show the original values.
     */
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
    /**
     * Creates a Chart.js pie-chart with a custom legend, that is in its own div-element.
     */
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
                        let localLabel = splitCamelCase(label)
                        let text = localLabel + ": " + percent + "% " + unit
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
function splitCamelCase(camelString) {
    /**
     * Takes a camel-case string and adds whitespaces before every uppercase character. An exception is the first character of the string.
     */
    let charArray = camelString.split("")
    let upperCaseIndexes = []
    let whitespaceString = camelString
    for(let i=charArray.length-1; i>0; i--) { // index 0 (the first char in the string) should not be included
        if(charArray[i] === charArray[i].toUpperCase()) {
            upperCaseIndexes.push(i)
        }
    }
    for(let i=0; i<upperCaseIndexes.length; i++) {
        let leftSlice = whitespaceString.slice(0, upperCaseIndexes[i])
        let rightSlice = whitespaceString.slice(upperCaseIndexes[i])
        whitespaceString = leftSlice + " " + rightSlice
    }
    return whitespaceString
}
function addPieCharts(chartsObj, category, name, title, labels, data, colors, unit, parentId) {
    /**
     * Function used in export function createCharts(...), to add pie-charts to the charts-object.
     * This function prevents code-duplication.
     */
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
    /**
     * Creates a Chart.js bubble-chart with a custom legend, that is in its own div-element.
     * Instead of passing data, ellipses are drawn through the annotationPlugin.
     */
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
    /**
     * Function used in export function createCharts(...), to add ashby-charts to the charts-object.
     * This function prevents code-duplication.
     */
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
    /**
     * For every ellipse, checks min and max values on each axis.
     * If min-max range < 3% of the axis-length then ellipse won't show well.
     * If min equals max then ellipse won't show.
     * Therefor the values for displaying the ellipse are modified, ellipse diameter will be three percent of axis-length.
     * Values in the legend won't be affected.
     */
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
function setAshbyChartData(output, benchmarks, mechArg1, mechArg2) {
    /**
     * picks data from output and benchmarks corresponding to tensile or flexural (mechArg1) and 0 or 90 (mechArg2).
     */
    // calculate minValue and maxValue of output-fields
    let outputMinMax = getMechanicalMinMaxValues(output, "output")
    // console.log(outputMinMax)
    // calculate minValues and maxValues of benchmarks
    let benchmarksMinMax = {}
    for(let key in benchmarks) {
        benchmarksMinMax[key] = getMechanicalMinMaxValues(benchmarks[key], "benchmark")
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
    let maxModulus = outputMinMax[selection_x].max === undefined || outputMinMax[selection_y].max === undefined ? 0 : outputMinMax[selection_x].max
    for(let key in benchmarksMinMax) {
        if(benchmarksMinMax[key][selection_x].max > maxModulus) {
            maxModulus = benchmarksMinMax[key][selection_x].max
        }
    }
    // determine y-axis maximum from output-strength and benchmark-strengths
    let maxStrength = outputMinMax[selection_y].max === undefined || outputMinMax[selection_x].max === undefined ? 0 : outputMinMax[selection_y].max
    for(let key in benchmarksMinMax) {
        if(benchmarksMinMax[key][selection_y].max > maxStrength) {
            maxStrength = benchmarksMinMax[key][selection_y].max
        }
    }

    let outputEllipse = {
        type: 'ellipse',
        xMin: outputMinMax[selection_x].min,
        xMax: outputMinMax[selection_x].max,
        yMin: outputMinMax[selection_y].min,
        yMax: outputMinMax[selection_y].max,
        backgroundColor: 'hsla(146, 55%, 57%, 0.45)'
    }
    let data = {
        ellipses: [],
        names: [],
        xAxisRange: maxModulus + maxModulus * 0.1,
        yAxisRange: maxStrength + maxStrength * 0.1,
        chartTitle: chartTitle
    }
    // if any undefined then exclude from data
    if(
        outputEllipse.xMin !== undefined &&
        outputEllipse.xMax !== undefined &&
        outputEllipse.yMin !== undefined &&
        outputEllipse.yMax !== undefined) {
            data.ellipses.push(outputEllipse)
            data.names.push("Result")
        }


    let colorIndex = 1 // the color corresponding to 0 is alredy in use (output-ellipse)
    for(let key in benchmarksMinMax) {
        let newEllipse = {
            type: 'ellipse',
            xMin: benchmarksMinMax[key][selection_x].min,
            xMax: benchmarksMinMax[key][selection_x].max,
            yMin: benchmarksMinMax[key][selection_y].min,
            yMax: benchmarksMinMax[key][selection_y].max,
            backgroundColor: randomColor(colorIndex, 0.45, 5, "ashby"),
        }
        data.ellipses.push(newEllipse)
        data.names.push(benchmarks[key].name)
        colorIndex++
    }
    return data
}
function getMechanicalMinMaxValues(data, source) {
    /**
     * Returns min- and max-values of output or benchmarks for the fields
     * tensileStrength0_MPa, tensileStrength90_MPa
     * tensileModulus0_GPa, tensileModulus90_GPa
     * flexuralStrength0_MPa, flexuralStrength90_MPa
     * flexuralModulus0_GPa, flexuralModulus90_GPa 
     */
    let values = {}
    let tempMin = undefined
    let tempMax = undefined

    let tensStren0 = undefined
    let tensStren90 = undefined
    let tensMod0 = undefined
    let tensMod90 = undefined
    let flexStren0 = undefined
    let flexStren90 = undefined
    let flexMod0 = undefined
    let flexMod90 = undefined
    switch(source) {
        case "output":
            tensStren0 = data.tensileStrength_MPa[0].tensileStrength0_MPa
            tensStren90 = data.tensileStrength_MPa[1].tensileStrength90_MPa
            tensMod0 = data.tensileModulus_GPa[0].tensileModulus0_GPa
            tensMod90 = data.tensileModulus_GPa[1].tensileModulus90_GPa
            flexStren0 = data.flexuralStrength_MPa[0].flexuralStrength0_MPa
            flexStren90 = data.flexuralStrength_MPa[1].flexuralStrength90_MPa
            flexMod0 = data.flexuralModulus_GPa[0].flexuralModulus0_GPa
            flexMod90 = data.flexuralModulus_GPa[1].flexuralModulus90_GPa
            break
        case "benchmark":
            tensStren0 = [data.tensile_strength_min, data.tensile_strength_max]
            tensStren90 = [data.tensile_strength_min, data.tensile_strength_max]
            tensMod0 = [data.tensile_modulus_min, data.tensile_modulus_max]
            tensMod90 = [data.tensile_modulus_min, data.tensile_modulus_max]
            flexStren0 = [data.flexural_strength_min, data.flexural_strength_max]
            flexStren90 = [data.flexural_strength_min, data.flexural_strength_max]
            flexMod0 = [data.flexural_modulus_min, data.flexural_modulus_max]
            flexMod90 = [data.flexural_modulus_min, data.flexural_modulus_max]
            break
        default:
            console.error("Invalid value for parameter 'source' in results_charts_functions.js getMechanicalMinMaxValues(...)")
            return undefined
    }
    let items = [tensStren0, tensStren90, tensMod0, tensMod90, flexStren0, flexStren90, flexMod0, flexMod90]
    let keyNames = ["tensStren0", "tensStren90", "tensMod0", "tensMod90", "flexStren0", "flexStren90", "flexMod0", "flexMod90"]
    for(let j=0; j<items.length; j++) {
        for(let i=0; i<items[j].length; i++) {
            
            if(source === "output") {
                // determine min
                if(tempMin === undefined || parseFloat(items[j][i].value) < tempMin) tempMin = parseFloat(items[j][i].value)
                // determine max
                if(tempMax === undefined || parseFloat(items[j][i].value) > tempMax) tempMax = parseFloat(items[j][i].value)
            } else if(source === "benchmark") {
                // determine min
                if(tempMin === undefined || parseFloat(items[j][i]) < tempMin) tempMin = parseFloat(items[j][i])
                // determine max
                if(tempMax === undefined || parseFloat(items[j][i]) > tempMax) tempMax = parseFloat(items[j][i])
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
function randomColor(i, alpha, numberOfElements, chart_type) {
    /**
     * Generates a randomised color, that has the same saturation and lightness as the main green color of the app.
     * Parameters:
     *     i: for iterating in the parent function.
     *     alpha: transparency-value.
     *     numberOfElements: number of elements of the parent function.
    */

    if(["bar", "pie", "ashby"].includes(chart_type) === false) {
        console.error("Invalid 'chart_type' parameter in randomColor(..) function in results_charts_functions.js.")
    }
    
    // if there aren't many processes, hand-pick a beautiful set of colors
    // else assign processes ugly colors that are as different as possible, picked by a machine
    if(numberOfElements <= 5 && ["bar", "pie"].includes(chart_type)) {
        switch(i) {
            case 0:
                return "#69ffaa" // lightest green
            case 1:
                return "#54cc88" // light
            case 2:
                return "#3f9966" // middle
            case 3:
                return "#2a6644" // dark
            case 4:
                return "#153322" // darkest
        }
    } else {
        // set interval depending on numberOfElements and start from 146
        let interval = 356 / numberOfElements
        let h = (146 + i * interval) % 356, s = 55, l = 57
        // console.log("hsla(" + h +"°, " + s + "%, " + l + "%, " + alpha + ")")
        return "hsla(" + h + ", " + s + "%, " + l + "%, " + alpha + ")"
    }
}
