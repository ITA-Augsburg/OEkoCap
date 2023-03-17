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

    :waste_type_prop=this.app_input.waste.type
    :waste_size_prop=this.app_input.waste.size_bigger_1dot5_m
    :waste_fvc_prop=this.app_input.waste.fvc_percent
    :waste_coarse_prop=setWasteCoarseProp()
    :waste_fine_prop=setWasteFineProp()
    :waste_transport_cost_prop=this.app_input.transport.euro_per_kg
    :waste_transport_gwp_prop=this.app_input.transport.co2_equv_per_kg

    :sep_type_prop=this.app_input.separation.type
    :sep_cost_prop=this.app_input.separation.euro_per_kg
    :sep_gwp_prop=this.app_input.separation.co2_equv_per_kg

    :matrix_thermo_type_prop=this.app_input.polymer.thermo_type
    :matrix_polymer_prop=this.app_input.polymer.matrix_type
    :matrix_fvc_prop=this.app_input.polymer.fvc_percent
    :matrix_insertion_prop=this.matrixInsertionCheckbox
    :matrix_cost_prop=this.app_input.polymer.euro_per_kg
    :matrix_gwp_prop=this.app_input.polymer.co2_equv_per_kg

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

    matrixInsertionCheckbox: false,

    //default values are set here, these are passed to and visualized in child-components
    app_input: {
      "waste": {
        "type": undefined,
        "quantity_to": 1,
        "size_bigger_1dot5_m": false,
        "fvc_percent": 60.00
      },
      "transport": {
        "euro_per_kg": undefined,
        "co2_equv_per_kg": undefined
      },
      "shredding_1": {
        "type": "Coarse",
        "mass_loss_percent": 5.0,
        "euro_per_kg": undefined,
        "co2_equv_per_kg": undefined
      },
      "shredding_2": {
        "type": "Fine",
        "mass_loss_percent": 5.0,
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
        "fvc_percent": 25,
        "feedstock_type": "fossilbased",
        "state_of_origin": "virgin",
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

        //if coarse present then shred1type coarse and shred2type fine, else shred1type fine and shred2type undefined
        this.setWasteCoarseProp()
        this.setWasteFineProp()

        //unlock footer-button-2 if mandatory inputs for WasteView given
        if(this.app_input.waste.type !== undefined) {
          this.button2enabled = true
        }
        // this.logWaste()

      } else if(Object.prototype.hasOwnProperty.call(new_values, "sep_type")) {
        this.app_input.separation.type = new_values.sep_type
        this.app_input.separation.euro_per_kg = new_values.sep_cost
        this.app_input.separation.co2_equv_per_kg = new_values.sep_gwp

        //unlock footer-button-3 if mandatory inputs for SeparationView given
        if(this.app_input.separation.type !== undefined) {
          this.button3enabled = true
        }
        // this.logSep()

      } else if(Object.prototype.hasOwnProperty.call(new_values, "matrix_type")) {
        this.app_input.polymer.thermo_type = new_values.matrix_type
        this.app_input.polymer.matrix_type = new_values.matrix_polymer
        this.app_input.polymer.fvc_percent = new_values.matrix_fvc
        this.matrixInsertionCheckbox = new_values.matrix_insertion
        this.app_input.polymer.euro_per_kg = new_values.matrix_cost
        this.app_input.polymer.co2_equv_per_kg = new_values.matrix_gwp

        //unlock footer-button-4 if mandatory inputs for MatrixView given
        if(this.app_input.polymer.thermo_type !== undefined && 
        this.app_input.polymer.matrix_type !== undefined) {
          this.button4enabled = true
        }
        // this.logMatrix()

      }
    },
    updateInputFooter() {
      if(this.app_input.processing_1.type !== undefined &&
      this.app_input.processing_1.wandstärke_mm !== undefined) {
        this.footerProgressBar = 99
      } else if(this.app_input.textile_process.throughput_kg_per_h !== undefined &&
      this.app_input.textile_process.areal_weight_g_per_sqm !== undefined ) {
        this.footerProgressBar = 80
      } else if(this.app_input.polymer.matrix_type !== undefined) {
        this.footerProgressBar = 60
      } else if(this.app_input.separation.type !== undefined) {
        this.footerProgressBar = 40
      } else if(this.app_input.waste.type !== undefined) {
        this.footerProgressBar = 20
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
    setWasteCoarseProp() {
      if(this.app_input.shredding_1.type === undefined) {
        return undefined
      } else if(this.app_input.shredding_1.type === "Coarse") {
        return this.app_input.shredding_1.mass_loss_percent
      } else if(this.app_input.shredding_1.type === "Fine") {
        return undefined
      }
    },
    setWasteFineProp() {
      if(this.app_input.shredding_1.type === undefined) {
        return undefined
      } else if(this.app_input.shredding_1.type === "Coarse") {
        return this.app_input.shredding_2.mass_loss_percent
      } else if(this.app_input.shredding_1.type === "Fine") {
        return this.app_input.shredding_1.mass_loss_percent
      }
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
    logSep() {
      console.log(
        this.app_input.separation.type,
        this.app_input.separation.euro_per_kg,
        this.app_input.separation.co2_equv_per_kg
      )
    },
    logMatrix() {
      console.log(
        this.app_input.polymer.thermo_type,
        this.app_input.polymer.matrix_type,
        this.app_input.polymer.fvc_percent,
        this.matrixInsertionCheckbox,
        this.app_input.polymer.euro_per_kg,
        this.app_input.polymer.co2_equv_per_kg
      )
    }
  },
};
</script>