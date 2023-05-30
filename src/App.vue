<script setup>
  import Header from "./components/Header.vue"
import router from "./router";
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
    :buttonCalculateEnabled=buttonCalculateEnabled

    :waste_type_prop=this.app_input.waste.type
    :waste_size_prop=this.app_input.waste.size_bigger_1dot5_m
    :waste_fmc_prop=this.app_input.waste.fmc_percent
    :waste_coarse_prop=setWasteCoarseProp()
    :waste_coarse_cost_prop=setWasteCoarseCostProp()
    :waste_coarse_gwp_prop=setWasteCoarseGwpProp()
    :waste_fine_prop=setWasteFineProp()
    :waste_fine_cost_prop=setWasteFineCostProp()
    :waste_fine_gwp_prop=setWasteFineGwpProp()
    :waste_transport_cost_prop=this.app_input.transport.euro_per_kg
    :waste_transport_gwp_prop=this.app_input.transport.co2_equv_per_kg

    :sep_type_prop=this.app_input.separation.type
    :sep_cost_prop=this.app_input.separation.euro_per_kg
    :sep_gwp_prop=this.app_input.separation.co2_equv_per_kg

    :matrix_thermo_type_prop=this.app_input.polymer.thermo_type
    :matrix_polymer_prop=this.app_input.polymer.matrix_type
    :matrix_fmc_prop=this.app_input.polymer.fvc_percent
    :matrix_insertion_prop=this.matrixInsertionCheckbox
    :matrix_cost_prop=this.app_input.polymer.euro_per_kg
    :matrix_gwp_prop=this.app_input.polymer.co2_equv_per_kg

    :textile_type_prop=this.app_input.textile_process.type
    :textile_ml_prop=this.app_input.textile_process.mass_loss_percent
    :textile_tp_prop=this.app_input.textile_process.throughput_kg_per_h
    :textile_aw_prop=this.app_input.textile_process.areal_weight_g_per_sqm
    :textile_cost_prop=this.app_input.textile_process.euro_per_kg
    :textile_gwp_prop=this.app_input.textile_process.co2_equv_per_kg

    :proc_1_type_prop=this.app_input.processing_1.type
    :proc_1_ml_prop=this.app_input.processing_1.mass_loss_percent
    :proc_1_wt_prop=this.app_input.processing_1.wandstärke_mm
    :proc_1_cost_prop=this.app_input.processing_1.euro_per_kg
    :proc_1_gwp_prop=this.app_input.processing_1.co2_equv_per_kg
    
    :proc_2_type_prop=this.app_input.processing_2.type
    :proc_2_ml_prop=this.app_input.processing_2.mass_loss_percent
    :proc_2_wt_prop=this.app_input.processing_2.wandstärke_mm
    :proc_2_cost_prop=this.app_input.processing_2.euro_per_kg
    :proc_2_gwp_prop=this.app_input.processing_2.co2_equv_per_kg

    :proc_moi_prop=this.processingMethodOfInsertion

    :app_output_prop=this.appOutput

    @clearAppInput="clearAppInput()"
    @updateInputFooter="updateInputFooter()"
    @saveNewInputs="saveNewInputs($event)"
    @calculateButton="calculateButton()"/>
    

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
    buttonCalculateEnabled: true,
    footerProgressBar: 0,

    matrixInsertionCheckbox: false,
    processingMethodOfInsertion: undefined,

    appOutput: undefined,

    //default values are set here, these are passed to and visualized in child-components
    app_input: {
      "waste": {
        "type": undefined,
        "quantity_to": 1,
        "size_bigger_1dot5_m": false,
        "fmc_percent": 60.00
      },
      "transport": {
        "euro_per_kg": undefined,
        "co2_equv_per_kg": undefined
      },
      "shredding_1": {
        "type": "Coarse",
        "mass_loss_percent": undefined,
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
        "feedstock_type": "biodegredable",
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
        "mass_loss_percent": 10,
        "wandstärke_mm": undefined,
        "euro_per_kg": undefined,
        "co2_equv_per_kg": undefined
      },
      "processing_2": {
        "type": undefined,
        "mass_loss_percent": 10,
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
        this.app_input.waste.fmc_percent = new_values.waste_fmc
        if(new_values.waste_coarse === undefined) {
          this.app_input.shredding_1.type = "Fine"
          this.app_input.shredding_1.mass_loss_percent = new_values.waste_fine
          this.app_input.shredding_1.euro_per_kg = new_values.waste_fine_cost
          this.app_input.shredding_1.co2_equv_per_kg = new_values.waste_fine_gwp
          this.app_input.shredding_2.type = undefined
          this.app_input.shredding_2.mass_loss_percent = undefined
          this.app_input.shredding_2.euro_per_kg = undefined
          this.app_input.shredding_2.co2_equv_per_kg = undefined
        } else {
          this.app_input.shredding_1.type = "Coarse"
          this.app_input.shredding_1.mass_loss_percent = new_values.waste_coarse
          this.app_input.shredding_1.euro_per_kg = new_values.waste_coarse_cost
          this.app_input.shredding_1.co2_equv_per_kg = new_values.waste_coarse_gwp
          this.app_input.shredding_2.type = "Fine"
          this.app_input.shredding_2.mass_loss_percent = new_values.waste_fine
          this.app_input.shredding_2.euro_per_kg = new_values.waste_fine_cost
          this.app_input.shredding_2.co2_equv_per_kg = new_values.waste_fine_gwp
        }
        this.app_input.transport.euro_per_kg = new_values.transport_cost
        this.app_input.transport.co2_equv_per_kg = new_values.transport_gwp

        //if coarse present then shred1type coarse and shred2type fine, else shred1type fine and shred2type undefined
        this.setWasteCoarseProp()
        this.setWasteCoarseCostProp()
        this.setWasteCoarseGwpProp()
        this.setWasteFineProp()
        this.setWasteFineCostProp()
        this.setWasteFineGwpProp()

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
        //reset processing values if matrix-type or matrix-method-of-insertion changes since processing values depend on matrix-type and matrix-method-of-insertion
        if(new_values.matrix_type !== this.app_input.polymer.thermo_type ||
        new_values.matrix_insertion !== this.matrixInsertionCheckbox) {
          this.app_input.processing_1.type = undefined
          this.app_input.processing_1.wandstärke_mm = undefined
          this.app_input.processing_2.type = undefined
          this.app_input.processing_2.wandstärke_mm = undefined
          this.processingMethodOfInsertion = undefined
          this.buttonCalculateEnabled = false
        }

        //reset textile values if matrix-method-of-insertion changes since textile values depend on matrix-method-of-insertion
        if(new_values.matrix_insertion !== this.matrixInsertionCheckbox) {
          this.app_input.textile_process.type = undefined
          this.app_input.textile_process.mass_loss_percent = undefined
          this.app_input.textile_process.throughput_kg_per_h = undefined
          this.app_input.textile_process.areal_weight_g_per_sqm = undefined
          this.app_input.textile_process.co2_equv_per_kg = undefined
          this.app_input.textile_process.euro_per_kg = undefined
        }

        this.app_input.polymer.thermo_type = new_values.matrix_type
        this.app_input.polymer.matrix_type = new_values.matrix_polymer
        this.app_input.polymer.fvc_percent = new_values.matrix_fmc
        this.matrixInsertionCheckbox = new_values.matrix_insertion
        this.app_input.polymer.euro_per_kg = new_values.matrix_cost
        this.app_input.polymer.co2_equv_per_kg = new_values.matrix_gwp

        //unlock footer-button-4 if mandatory inputs for MatrixView given
        //lock footer-button-4 and -5 if mandatory inputs for MatrixView switch back to undefined
        if(this.app_input.polymer.thermo_type !== undefined && 
        this.app_input.polymer.matrix_type !== undefined) {
          this.button4enabled = true
          this.button5enabled = false
          //also unlock footer-button-5 if user has alredy been on textileView
          if(this.app_input.textile_process.type !== undefined) {
            this.button5enabled = true
          }
        } else {
          this.button4enabled = false
          this.button5enabled = false
        }
        // this.logMatrix()

      } else if(Object.prototype.hasOwnProperty.call(new_values, "textile_type")) {
        this.app_input.textile_process.type = new_values.textile_type
        this.app_input.textile_process.mass_loss_percent = new_values.textile_ml
        this.app_input.textile_process.throughput_kg_per_h = new_values.textile_tp
        this.app_input.textile_process.areal_weight_g_per_sqm = new_values.textile_aw
        this.app_input.textile_process.euro_per_kg = new_values.textile_cost
        this.app_input.textile_process.co2_equv_per_kg = new_values.textile_gwp

        //unlock footer-button-5 if mandatory inputs for TextileView given
        if(this.app_input.textile_process.type !== undefined &&
        this.app_input.textile_process.throughput_kg_per_h !== undefined &&
        this.app_input.textile_process.areal_weight_g_per_sqm !== undefined) {
          this.button5enabled = true
        }

        //lock footer-button-5 if mandatory inputs for TextileView switch back to undefined
        if(this.app_input.textile_process.type === undefined ||
        this.app_input.textile_process.throughput_kg_per_h === undefined ||
        this.app_input.textile_process.areal_weight_g_per_sqm === undefined) {
          this.button5enabled = false
        }
        // this.logTextile()

      } else if(Object.prototype.hasOwnProperty.call(new_values, "proc_1_type")) {
        this.app_input.processing_1.type = new_values.proc_1_type
        this.app_input.processing_1.mass_loss_percent = new_values.proc_1_ml
        this.app_input.processing_1.wandstärke_mm = new_values.proc_1_wt
        this.app_input.processing_1.euro_per_kg = new_values.proc_1_cost
        this.app_input.processing_1.co2_equv_per_kg = new_values.proc_1_gwp

        this.app_input.processing_2.type = new_values.proc_2_type
        this.app_input.processing_2.mass_loss_percent = new_values.proc_2_ml
        this.app_input.processing_2.wandstärke_mm = new_values.proc_2_wt
        this.app_input.processing_2.euro_per_kg = new_values.proc_2_cost
        this.app_input.processing_2.co2_equv_per_kg = new_values.proc_2_gwp

        this.processingMethodOfInsertion = new_values.proc_moi

        //unlock calculate-button if mandatory inputs for ProcessingView given
        //lock calculate-button if mandatory inputs for ProcessingView switch back to undefined
        if(this.app_input.polymer.thermo_type === "Thermoset") {
          if(this.app_input.processing_1.type !== undefined &&
          this.app_input.processing_1.wandstärke_mm !== undefined &&
          this.processingMethodOfInsertion !== undefined) {
          this.buttonCalculateEnabled = true
          } else {
            this.buttonCalculateEnabled = false
          }
        } else if(this.app_input.polymer.thermo_type === "Thermoplast") {
          if(this.app_input.processing_1.type !== undefined &&
          this.app_input.processing_1.wandstärke_mm !== undefined &&
          this.app_input.processing_2.type !== undefined &&
          this.app_input.processing_2.wandstärke_mm !== undefined &&
          this.processingMethodOfInsertion !== undefined) {
          this.buttonCalculateEnabled = true
          } else {
            this.buttonCalculateEnabled = false
          }
        }
        

        // this.logProcessing()
      }
    },
    updateInputFooter() {
      if(this.footerProgressBar === 99) return
      else if(this.app_input.textile_process.throughput_kg_per_h !== undefined &&
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
      // this.calculateButton()
      // console.log("App.vue clearAppInput() called")
      this.app_input = {
        "waste": {
          "type": undefined,
          "quantity_to": 1,
          "size_bigger_1dot5_m": false,
          "fmc_percent": 60.00
        },
        "transport": {
          "euro_per_kg": undefined,
          "co2_equv_per_kg": undefined
        },
        "shredding_1": {
          "type": "Coarse",
          "mass_loss_percent": undefined,
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
          "feedstock_type": "biodegredable",
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
          "mass_loss_percent": 10,
          "wandstärke_mm": undefined,
          "euro_per_kg": undefined,
          "co2_equv_per_kg": undefined
        },
        "processing_2": {
          "type": undefined,
          "mass_loss_percent": 10,
          "wandstärke_mm": undefined,
          "euro_per_kg": undefined,
          "co2_equv_per_kg": undefined
        }
      }
      this.button2enabled = false
      this.button3enabled = false
      this.button4enabled = false
      this.button5enabled = false
      this.buttonCalculateEnabled = false
      this.footerProgressBar = 0
      this.matrixInsertionCheckbox = false
      this.processingMethodOfInsertion = undefined
      this.appOutput = undefined
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
    setWasteCoarseCostProp() {
      if(this.app_input.shredding_1.type === undefined) {
        return undefined
      } else if(this.app_input.shredding_1.type === "Coarse") {
        return this.app_input.shredding_1.euro_per_kg
      } else if(this.app_input.shredding_1.type === "Fine") {
        return undefined
      }
    },
    setWasteCoarseGwpProp() {
      if(this.app_input.shredding_1.type === undefined) {
        return undefined
      } else if(this.app_input.shredding_1.type === "Coarse") {
        return this.app_input.shredding_1.co2_equv_per_kg
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
    setWasteFineCostProp() {
      if(this.app_input.shredding_1.type === undefined) {
        return undefined
      } else if(this.app_input.shredding_1.type === "Coarse") {
        return this.app_input.shredding_2.euro_per_kg
      } else if(this.app_input.shredding_1.type === "Fine") {
        return this.app_input.shredding_1.euro_per_kg
      }
    },
    setWasteFineGwpProp() {
      if(this.app_input.shredding_1.type === undefined) {
        return undefined
      } else if(this.app_input.shredding_1.type === "Coarse") {
        return this.app_input.shredding_2.co2_equv_per_kg
      } else if(this.app_input.shredding_1.type === "Fine") {
        return this.app_input.shredding_1.co2_equv_per_kg
      }
    },
    formatAppInputKeys() {
      //undefined -> ""; End of Life -> EoL; 
      //waste
      if(this.app_input.waste.type === "End of Life") this.app_input.waste.type = "EoL"
      //transport
      if(this.app_input.transport.euro_per_kg === undefined) this.app_input.transport.euro_per_kg = ""
      if(this.app_input.transport.co2_equv_per_kg === undefined) this.app_input.transport.co2_equv_per_kg = ""
      //shredding 1 and 2
      if(this.app_input.shredding_1.euro_per_kg === undefined) this.app_input.shredding_1.euro_per_kg = ""
      if(this.app_input.shredding_1.co2_equv_per_kg === undefined) this.app_input.shredding_1.co2_equv_per_kg = ""
      if(this.app_input.shredding_2.type === undefined) this.app_input.shredding_2.type = ""
      if(this.app_input.shredding_2.mass_loss_percent === undefined) this.app_input.shredding_2.mass_loss_percent = ""
      if(this.app_input.shredding_2.euro_per_kg === undefined) this.app_input.shredding_2.euro_per_kg = ""
      if(this.app_input.shredding_2.co2_equv_per_kg === undefined) this.app_input.shredding_2.co2_equv_per_kg = ""
      //separation
      if(this.app_input.separation.euro_per_kg === undefined) this.app_input.separation.euro_per_kg = ""
      if(this.app_input.separation.co2_equv_per_kg === undefined) this.app_input.separation.co2_equv_per_kg = ""
      //matrix
      if(this.app_input.polymer.euro_per_kg === undefined) this.app_input.polymer.euro_per_kg = ""
      if(this.app_input.polymer.co2_equv_per_kg === undefined) this.app_input.polymer.co2_equv_per_kg = ""
      //textile
      if(this.app_input.textile_process.type === "Dry-laid") this.app_input.textile_process.type = "Carding"
      if(this.app_input.textile_process.type === "Air-laid") this.app_input.textile_process.type = "AirLaying"
      if(this.app_input.textile_process.type === "Wet-laid") this.app_input.textile_process.type = "WetLaying"
      if(this.app_input.textile_process.type === "Dry-laid with Thermoplastfiber") this.app_input.textile_process.type = "Carding"
      if(this.app_input.textile_process.type === "Air-laid with Thermoplastfiber") this.app_input.textile_process.type = "AirLaying"
      if(this.app_input.textile_process.type === "Wet-laid with Thermoplastfiber") this.app_input.textile_process.type = "WetLaying"
      if(this.app_input.textile_process.euro_per_kg === undefined) this.app_input.textile_process.euro_per_kg = ""
      if(this.app_input.textile_process.co2_equv_per_kg === undefined) this.app_input.textile_process.co2_equv_per_kg = ""
      //processing
      if(this.app_input.processing_1.euro_per_kg === undefined) this.app_input.processing_1.euro_per_kg = ""
      if(this.app_input.processing_1.co2_equv_per_kg === undefined) this.app_input.processing_1.co2_equv_per_kg = ""
      if(this.processingMethodOfInsertion === "Thermoplastfiber") {
        this.app_input.processing_1.type = "DoubleBeltPressing"
        this.app_input.processing_2.type = "IRCompressionMoulding"
      } else if(this.processingMethodOfInsertion === "Thermoplast powder") {
        this.app_input.processing_1.type = "DoubleBeltPressingWithPowder"
        this.app_input.processing_2.type = "IRCompressionMoulding"
      } else if(this.processingMethodOfInsertion === "Thermoplast foil") {
        this.app_input.processing_1.type = "DoubleBeltPressingWithFoil"
        this.app_input.processing_2.type = "IRCompressionMoulding"
      }
      if(this.app_input.processing_2.type === undefined) this.app_input.processing_2.type = ""
      if(this.app_input.processing_2.mass_loss_percent === undefined) this.app_input.processing_2.mass_loss_percent = ""
      if(this.app_input.processing_2.wandstärke_mm === undefined) this.app_input.processing_2.wandstärke_mm = ""
      if(this.app_input.processing_2.euro_per_kg === undefined) this.app_input.processing_2.euro_per_kg = ""
      if(this.app_input.processing_2.co2_equv_per_kg === undefined) this.app_input.processing_2.co2_equv_per_kg = ""
    },
    calculateButton() {
      this.footerProgressBar = 99
      this.formatAppInputKeys()
      this.log()
      
      // console.log(JSON.stringify(this.app_input))
      let url1 = "https://localhost/meine_dateien/ita_webapp_back/submit_input.php";
        fetch(url1, {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            // origin: "12.34.56.78:80",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.app_input)
        }).then(res => {
            return res.text();
        }).then(data => {
            // console.log("in then block");
            console.log(data);
            let url2 = "https://localhost/meine_dateien/ita_webapp_back/get_output.php"
            return fetch(url2, {
              method: "POST",
              mode: "cors",
              headers: {"Content-Type": "application/text"},
              body: data
            })
        }).then(res => {
          return res.text()
        }).then(data => {
          console.log(data)
          this.appOutput = data;
          router.push({name: "ResultsView"})
        })
        //if server not responding notify user
        .catch(rej => {
            // navigate to errorView, pass error as prop

            // console.log("Fehler beim Serveraufruf");
            console.log("in catch block");
            console.log(rej);
            router.push({name: "ErrorView"})
        });
    },
    log() {
      console.log(JSON.stringify(this.app_input, null, 2))
    },
    logWaste() {
      console.log(
        this.app_input.waste.type,
        this.app_input.waste.size_bigger_1dot5_m,
        this.app_input.waste.fmc_percent,
        this.app_input.shredding_1.type,
        this.app_input.shredding_1.mass_loss_percent,
        this.app_input.shredding_1.euro_per_kg,
        this.app_input.shredding_1.co2_equv_per_kg,
        this.app_input.shredding_2.type,
        this.app_input.shredding_2.mass_loss_percent,
        this.app_input.shredding_2.euro_per_kg,
        this.app_input.shredding_2.co2_equv_per_kg,
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
    },
    logTextile() {
      console.log(
        this.app_input.textile_process.type,
        this.app_input.textile_process.mass_loss_percent,
        this.app_input.textile_process.throughput_kg_per_h,
        this.app_input.textile_process.areal_weight_g_per_sqm,
        this.app_input.textile_process.euro_per_kg,
        this.app_input.textile_process.co2_equv_per_kg
      )
    },
    logProcessing() {
      console.log(
        this.app_input.processing_1.type,
        this.app_input.processing_2.type,
        this.app_input.processing_1.mass_loss_percent,
        this.app_input.processing_1.wandstärke_mm,
        this.processingMethodOfInsertion,
        this.app_input.processing_1.euro_per_kg,
        this.app_input.processing_1.co2_equv_per_kg,
        // this.app_input.processing_2.mass_loss_percent,
        // this.app_input.processing_2.wandstärke_mm,
        // this.app_input.processing_2.euro_per_kg,
        // this.app_input.processing_2.co2_equv_per_kg
      )
    }
  },
};
</script>