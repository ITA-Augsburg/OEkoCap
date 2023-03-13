<script setup>
  import Header from "./components/Header.vue"
</script>

<template>
  <VApp>
    <Header></Header>

    <RouterView
    :progressValue=footerProgressBar
    :button2enabled=button2enabled
    :button3enabled=button3enabled
    :button4enabled=button4enabled
    :button5enabled=button5enabled
    @clearAppInput="clearAppInput()"
    @updateInputFooter="updateInputFooter()"/>
    

    <VMain>
      
    </VMain>
    
  </VApp>
</template>

<script>
export default {
  data: () => ({
    button2enabled: false,
    button3enabled: false,
    button4enabled: false,
    button5enabled: false,
    footerProgressBar: 0,
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
  methods: {
    log() {
      console.log(this.app_input)
    },
    clearAppInput() {
      // console.log("App.vue clearAppInput() called")
      this.app_input = {
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
      // this.log()
    },
    updateInputFooter() {
      if(this.app_input.processing_1.type !== undefined &&
      this.app_input.processing_1.wandstärke_mm !== undefined) {
        this.footerProgressBar = 80
      } else if(this.app_input.textile_process.throughput_kg_per_h !== undefined &&
      this.app_input.textile_process.areal_weight_g_per_sqm !== undefined ) {
        this.footerProgressBar = 60
        this.button5enabled = true
      } else if(this.app_input.polymer.matrix_type !== undefined) {
        this.footerProgressBar = 40
        this.button4enabled = true
      } else if(this.app_input.separation.type !== undefined) {
        this.footerProgressBar = 20
        this.button3enabled = true
      } else if(this.app_input.waste.type !== undefined) {
        this.footerProgressBar = 0
        this.button2enabled = true
      }
    }
  },
};
</script>