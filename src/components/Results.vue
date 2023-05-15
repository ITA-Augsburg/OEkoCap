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

    </div>

</template>

<script>
    export default {
        props: ["app_output_prop"],
        data() {
            return {
            }
        }
    }
</script>