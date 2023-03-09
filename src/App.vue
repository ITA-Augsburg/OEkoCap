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
        "type": undefined,
        "quantity_to": undefined,
        "size_bigger_1dot5_m": undefined,
        "fvc_percent": undefined
      },
      "transport": {
        "euro_per_kg": undefined,
        "co2_equv_per_kg": undefined
      },
      "shredding_1": {
        "type": undefined,
        "mass_loss_percent": undefined,
        "euro_per_kg": undefined,
        "co2_equv_per_kg": undefined
      },
      "shredding_2": {
        "type": undefined,
        "mass_loss_percent": undefined,
        "euro_per_kg": undefined,
        "co2_equv_per_kg": undefined
      },
      "separation": {
        "type": undefined,
        "euro_per_kg": undefined,
        "co2_equv_per_kg": undefined
      },
      "polymer": {
        "thermo_type": undefined,
        "matrix_type": undefined,
        "fvc_percent": undefined,
        "feedstock_type": undefined,
        "state_of_origin": undefined,
        "euro_per_kg": undefined,
        "co2_equv_per_kg": undefined
      },
      "textile_process": {
        "type": undefined,
        "mass_loss_percent": undefined,
        "throughput_kg_per_h": undefined,
        "areal_weight_g_per_sqm": undefined,
        "co2_equv_per_kg": undefined,
        "euro_per_kg": undefined
      },
      "processing_1": {
        "type": undefined,
        "mass_loss_percent": undefined,
        "wandstärke_mm": undefined,
        "euro_per_kg": undefined,
        "co2_equv_per_kg": undefined
      },
      "processing_2": {
        "type": undefined,
        "mass_loss_percent": undefined,
        "wandstärke_mm": undefined,
        "euro_per_kg": undefined,
        "co2_equv_per_kg": undefined
      }
    }
  }),
};
</script>