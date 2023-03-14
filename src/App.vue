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
    @updateInputFooter="updateInputFooter()"
    @saveNewInputs="saveNewInputs($event)"/>
    

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
    saveNewInputs(new_values) {
      // console.log("hi from App")
      // console.log(new_values)
      if(Object.prototype.hasOwnProperty.call(new_values, "waste_type")) {
        this.app_input.waste.type = new_values.waste_type
        this.app_input.waste.size_bigger_1dot5_m = new_values.waste_size
        this.app_input.waste.fvc_percent = new_values.waste_fvc
        if(new_values.waste_coarse === undefined) {
          this.app_input.shredding_1.type = "Fine"
          this.app_input.shredding_1.mass_loss_percent = new_values.waste_fine
          this.app_input.shredding_2.type = undefined
          this.app_input.shredding_2.mass_loss_percent = undefined
        } else {
          this.app_input.shredding_1.type = "Coarse"
          this.app_input.shredding_1.mass_loss_percent = new_values.waste_coarse
          this.app_input.shredding_2.type = "Fine"
          this.app_input.shredding_2.mass_loss_percent = new_values.waste_fine
        }
        this.app_input.transport.euro_per_kg = new_values.transport_cost
        this.app_input.transport.co2_equv_per_kg = new_values.transport_gwp

        // this.logWaste()
      } //else if(Object.prototype.hasOwnProperty.call(new_values, "todo"))
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
    log() {
      console.log(this.app_input)
    },
    logWaste() {
      console.log(
          this.app_input.waste.type,
          this.app_input.waste.size_bigger_1dot5_m,
          this.app_input.waste.fvc_percent,
          this.app_input.shredding_1.type,
          this.app_input.shredding_1.mass_loss_percent,
          this.app_input.shredding_2.type,
          this.app_input.shredding_2.mass_loss_percent,
          this.app_input.transport.euro_per_kg,
          this.app_input.transport.co2_equv_per_kg
        )
    },
  },
};
</script>