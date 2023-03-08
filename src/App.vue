<script setup>
  import Header from "./components/Header.vue"
</script>

<template>
  <VApp>
    <Header></Header>

    <RouterView/>
    
    <VMain>
      
    </VMain>
    
  </VApp>
</template>

<script>
export default {
  data: () => ({
    app_input: {
        "waste": {
            "fvc_percent": undefined,
            "quantity_to": undefined,
            "size_bigger_1dot5_m": undefined,
            "type": undefined
        },
        "polymer": {
            "fvc_percent": undefined,
            "state_of_origin": undefined,
            "co2_equv_per_kg": undefined,
            "thermo_type": undefined,
            "matrix_type": undefined,
            "euro_per_kg": undefined,
            "feedstock_type": undefined
        },
        "separation": {
            "co2_equv_per_kg": undefined,
            "euro_per_kg": undefined,
            "type": undefined
        },
        "textile_process": {
            "throughput_kg_per_h": undefined,
            "co2_equv_per_kg": undefined,
            "euro_per_kg": undefined,
            "type": undefined,
            "mass_loss_percent": undefined,
            "areal_weight_g_per_sqm": undefined
        },
        "transport": {
            "co2_equv_per_kg": undefined,
            "euro_per_kg": undefined
        },
        "shredding_2": {
            "co2_equv_per_kg": undefined,
            "euro_per_kg": undefined,
            "type": undefined,
            "mass_loss_percent": undefined
        },
        "processing_2": {
            "co2_equv_per_kg": undefined,
            "euro_per_kg": undefined,
            "type": undefined,
            "mass_loss_percent": undefined,
            "wandstärke_mm": undefined
        },
        "shredding_1": {
            "co2_equv_per_kg": undefined,
            "euro_per_kg": undefined,
            "type": undefined,
            "mass_loss_percent": undefined
        },
        "processing_1": {
            "co2_equv_per_kg": undefined,
            "euro_per_kg": undefined,
            "type": undefined,
            "mass_loss_percent": undefined,
            "wandstärke_mm": undefined
        }
    }
  }),
};
</script>