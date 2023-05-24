<script setup>
    import Chart from "chart.js/auto"
</script>

<template>

    <div class="input_area">

        <!-- <p class="text results_summary_text">Summary</p>
        <p class="text results_process_text">Process 1: XY</p>
        <p class="text results_process_text">Process 2: XY</p>
        <p class="text results_process_text">Process 3: XY</p>
        <p class="text results_process_text">Process 4: XY</p>
        <p class="text results_process_text">Process 5: XY</p>
        <p class="text results_fs_text">Flexural strength</p>
        <p class="text results_fs_0_text">0 grad: XY - XY</p>
        <p class="text results_fs_90_text">90 grad: XY - XY</p>
        <p class="text results_tm_text">Tensile modulus</p>
        <p class="text results_tm_0_text">0 grad: XY - XY</p>
        <p class="text results_tm_90_text">90 grad: XY - XY</p>
        <p class="text results_gwp_text">Global warming potential</p>
        <p class="text results_gwp_value_text">kg CO2-äq./kg: XY - XY</p> -->

        <p>{{app_output_prop}}</p>
        <!-- JSON.stringify(app_output_prop, null, 2) -->

        <canvas id="line_chart" style="max-width: 420px;padding-left:30px;"></canvas>
        <canvas id="bar_chart" style="max-width: 420px;padding-left:30px;"></canvas>
        <canvas id="pie_chart"></canvas>
        <canvas id="gwp_minmax" style="max-width: 420px;padding-left:30px;"></canvas>
        <canvas id="flexuralStrength0_MPa" style="max-width: 420px;padding-left:30px;margin-top:50px;"></canvas>

    </div>

</template>

<script>
    export default {
        props: ["app_output_prop", "color_green"],
        mounted() {
            new Chart("line_chart", {
                type: "line",
                data: {
                    labels: ["A", "B", "C", "D"],
                    datasets: [{
                        label:"red",
                        data: [4, 2, 1, 5,],
                        backgroundColor: [
                            // "rgba(255, 99, 132, 0.6)",
                            // "rgba(123, 99, 132, 0.6)",
                            // "rgba(45, 99, 132, 0.6)",
                            // "rgba(33, 99, 34, 0.6)",
                            "red"
                        ],
                        borderWidth: 1, borderColor: "#777", hoverBorderWidth: 3, hoverBorderColor: "#000"
                    },
                    {
                        label:"blue",
                        data: [1, 2, 4, 5,],
                        backgroundColor: [
                            "blue"
                        ],
                        borderWidth: 1, borderColor: "#777", hoverBorderWidth: 3, hoverBorderColor: "#000"
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Title of this line chart",
                            font: {
                                size: 20
                            }
                        },
                        legend: {
                            position: "right",
                            labels: {
                                color: "black",
                                font: {
                                    size: 15
                                }
                            }
                        }
                    }
                },
            })

            new Chart("bar_chart", {
                type: "bar",
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
                    }
                }
            })

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

            new Chart("gwp_minmax", {
                type: "bar",
                data: {
                    labels: ["min", "max"],
                    datasets: [{
                        label:"Global Warming Potential",
                        data: [714.3512406919333, 7400.289657831437],
                        backgroundColor: [
                            this.color_green,
                            "red"
                        ],
                        borderWidth: 1,
                        borderColor: "#777",
                        hoverBorderWidth: 3,
                        hoverBorderColor: "#000"
                    }]
                },
                options: {
                    plugins: {
                        title: {
                        display: true,
                        text: "Global Warming Potential",
                        font: {
                            size: 20
                        }
                        },
                    }
                }
            })

            new Chart("flexuralStrength0_MPa", {
                type: "line",
                data: {
                    labels: ["value1", "value2", "value3", "value4", "value5", "value6", "value7"],
                    datasets: [{
                        label: "flexuralStrength0_MPa",
                        data: [26, 27, 29, 30, 32, 110, 117],
                        backgroundColor: this.color_green,
                        borderWidth: 1, borderColor: "#777", hoverBorderWidth: 3, hoverBorderColor: "#000"
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "flexuralStrength0_MPa",
                            font: {
                                size: 20
                            }
                        },
                        legend: {
                            position: "bottom",
                            labels: {
                                color: "black",
                                font: {
                                    size: 15
                                }
                            }
                        }
                    }
                },
            })
        },
        data() {
            return {
                
            }
        }
    }
</script>