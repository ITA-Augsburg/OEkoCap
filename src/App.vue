<script setup>
  import Header from "./components/Header.vue"
  import router from "./router"
</script>

<template>
  <VApp>
    <Header />

    <RouterView
    :startedCorrectly=startedCorrectly
    :progressValue=footerProgressBar
    :button2enabled=button2enabled
    :button3enabled=button3enabled
    :button4enabled=button4enabled
    :button5enabled=button5enabled
    :buttonCalculateEnabled=buttonCalculateEnabled

    :app_input_prop=app_input
    :waste_fine_checkbox_prop=waste_fine_checkbox
    :matrix_insertion_prop=matrixInsertionCheckbox
    :proc_moi_prop=processingMethodOfInsertion
    :app_output_prop=appOutput
    :error_message_prop=errorMessage
    @clearAppInput="clearAppInput()"
    @updateInputFooter="updateInputFooter()"
    @saveNewInputs="saveNewInputs($event)"
    @calculateButton="calculateButton()"
    @setStartedCorrectly="setStartedCorrectly()"
    @setErrorMessage="setErrorMessage($event)" />
    
    <VMain />
    
  </VApp>
</template>

<script>
/**
 * The ancestor to every vue-component.
 * app_input is defined here.
 */
import axios from 'axios';
export default {
  data: () => ({
    button2enabled: true,
    button3enabled: false,
    button4enabled: false,
    button5enabled: false,
    buttonCalculateEnabled: true,
    footerProgressBar: 0,

    startedCorrectly: false,

    waste_fine_checkbox: true,

    matrixInsertionCheckbox: false,
    processingMethodOfInsertion: undefined,

    appOutput: undefined,
    errorMessage: undefined,

    //default values are set here, these are passed to and shown in child-components
    app_input: {
      "waste": {
        "type": "End of Life",
        "quantity_to": 1,
        "size_bigger_1dot5_m": false,
        "fmc_percent": 60.00
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
        "fvc_percent": 30,
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
      /**
       * When user interacts with input-elements of input-pages, the new values are emitted to App.vue.
       * New values are saved in app_input.
       * Other app_input fields might need to be reset, since their values are dependent on earlier inputs. This is the case when the user goes back to earlier input-pages and makes changes to their inputs.
       * The input-footer is changed, buttons can get enabled or disabled.
       */
      // console.log(new_values)
      let waste = this.app_input.waste
      let transport = this.app_input.transport
      let shredding_1 = this.app_input.shredding_1
      let shredding_2 = this.app_input.shredding_2
      let separation = this.app_input.separation
      let polymer = this.app_input.polymer
      let textile_process = this.app_input.textile_process
      let processing_1 = this.app_input.processing_1
      let processing_2 = this.app_input.processing_2
      if(Object.prototype.hasOwnProperty.call(new_values, "waste_type")) {
        //reset textile values if shred_1 or _2 changed. Also lock button-5 (textile type values depend on shred values)
        if(
        shredding_1.type !== new_values.shred_1_type ||
        shredding_2.type !== new_values.shred_2_type) {
          textile_process.type = undefined
          textile_process.mass_loss_percent = undefined
          textile_process.throughput_kg_per_h = undefined
          textile_process.areal_weight_g_per_sqm = undefined
          textile_process.co2_equv_per_kg = undefined
          textile_process.euro_per_kg = undefined
          this.button5enabled = false
        }

        waste.type = new_values.waste_type
        waste.size_bigger_1dot5_m = new_values.waste_size

        shredding_1.type = new_values.shred_1_type
        shredding_1.mass_loss_percent = new_values.shred_1_ml
        shredding_1.euro_per_kg = new_values.shred_1_cost
        shredding_1.co2_equv_per_kg = new_values.shred_1_gwp
        shredding_2.type = new_values.shred_2_type
        shredding_2.mass_loss_percent = new_values.shred_2_ml
        shredding_2.euro_per_kg = new_values.shred_2_cost
        shredding_2.co2_equv_per_kg = new_values.shred_2_gwp
        
        transport.euro_per_kg = new_values.transport_cost
        transport.co2_equv_per_kg = new_values.transport_gwp

        this.waste_fine_checkbox = new_values.waste_fine_checkbox

        //unlock footer-button-2 if mandatory inputs for WasteView given
        if(waste.type !== undefined) {
          this.button2enabled = true
        }
        // this.logWaste()

      } else if(Object.prototype.hasOwnProperty.call(new_values, "sep_type")) {
        separation.type = new_values.sep_type
        separation.euro_per_kg = new_values.sep_cost
        separation.co2_equv_per_kg = new_values.sep_gwp

        //unlock footer-button-3 if mandatory inputs for SeparationView given
        if(separation.type !== undefined) {
          this.button3enabled = true
        }
        // this.logSep()

      } else if(Object.prototype.hasOwnProperty.call(new_values, "matrix_type")) {
        //reset processing values if matrix-type or matrix-method-of-insertion changes since processing values depend on matrix-type and matrix-method-of-insertion
        if(new_values.matrix_type !== polymer.thermo_type ||
        new_values.matrix_insertion !== this.matrixInsertionCheckbox) {
          processing_1.type = undefined
          processing_1.wandstärke_mm = undefined
          processing_2.type = undefined
          processing_2.wandstärke_mm = undefined
          this.processingMethodOfInsertion = undefined
          this.buttonCalculateEnabled = false
        }

        //reset textile values if matrix-method-of-insertion changes since textile values depend on matrix-method-of-insertion
        if(new_values.matrix_insertion !== this.matrixInsertionCheckbox) {
          textile_process.type = undefined
          textile_process.mass_loss_percent = undefined
          textile_process.throughput_kg_per_h = undefined
          textile_process.areal_weight_g_per_sqm = undefined
          textile_process.co2_equv_per_kg = undefined
          textile_process.euro_per_kg = undefined
        }

        polymer.thermo_type = new_values.matrix_type
        polymer.matrix_type = new_values.matrix_polymer
        polymer.fvc_percent = new_values.matrix_fmc
        this.matrixInsertionCheckbox = new_values.matrix_insertion
        polymer.euro_per_kg = new_values.matrix_cost
        polymer.co2_equv_per_kg = new_values.matrix_gwp

        //unlock footer-button-4 if mandatory inputs for MatrixView given
        //lock footer-button-4 and -5 if mandatory inputs for MatrixView switch back to undefined
        if(polymer.thermo_type !== undefined && 
        polymer.matrix_type !== undefined) {
          this.button4enabled = true
          this.button5enabled = false
          //also unlock footer-button-5 if user has alredy been on textileView
          if(textile_process.type !== undefined) {
            this.button5enabled = true
          }
        } else {
          this.button4enabled = false
          this.button5enabled = false
        }
        // this.logMatrix()

      } else if(Object.prototype.hasOwnProperty.call(new_values, "textile_type")) {
        textile_process.type = new_values.textile_type
        textile_process.mass_loss_percent = new_values.textile_ml
        textile_process.throughput_kg_per_h = new_values.textile_tp
        textile_process.areal_weight_g_per_sqm = new_values.textile_aw
        textile_process.euro_per_kg = new_values.textile_cost
        textile_process.co2_equv_per_kg = new_values.textile_gwp

        //unlock footer-button-5 if mandatory inputs for TextileView given
        if(textile_process.type !== undefined &&
        textile_process.throughput_kg_per_h !== undefined &&
        textile_process.areal_weight_g_per_sqm !== undefined) {
          this.button5enabled = true
        }

        //lock footer-button-5 if mandatory inputs for TextileView switch back to undefined
        if(textile_process.type === undefined ||
        textile_process.throughput_kg_per_h === undefined ||
        textile_process.areal_weight_g_per_sqm === undefined) {
          this.button5enabled = false
        }
        // this.logTextile()

      } else if(Object.prototype.hasOwnProperty.call(new_values, "proc_1_type")) {
        processing_1.type = new_values.proc_1_type
        processing_1.mass_loss_percent = new_values.proc_1_ml
        processing_1.wandstärke_mm = new_values.proc_wt
        processing_1.euro_per_kg = new_values.proc_1_cost
        processing_1.co2_equv_per_kg = new_values.proc_1_gwp

        processing_2.type = new_values.proc_2_type
        processing_2.mass_loss_percent = new_values.proc_2_ml
        if(new_values.proc_2_type === undefined) {
          processing_2.wandstärke_mm = undefined
        } else {
          processing_2.wandstärke_mm = new_values.proc_wt
        }
        processing_2.euro_per_kg = new_values.proc_2_cost
        processing_2.co2_equv_per_kg = new_values.proc_2_gwp

        this.processingMethodOfInsertion = new_values.proc_moi

        //unlock calculate-button if mandatory inputs for ProcessingView given
        //lock calculate-button if mandatory inputs for ProcessingView switch back to undefined
        if(polymer.thermo_type === "Thermoset") {
          if(
          ["Wet Compression Moulding", "Resin Transfer Moulding"].includes(processing_1.type) &&
          processing_1.wandstärke_mm !== undefined &&
          this.processingMethodOfInsertion !== undefined
          ||
          processing_1.type === "Prepreg Production" &&
          processing_2.type !== undefined &&
          processing_1.wandstärke_mm !== undefined &&
          this.processingMethodOfInsertion !== undefined
          ) {
            this.buttonCalculateEnabled = true
          } else {
            this.buttonCalculateEnabled = false
          }
        } else if(polymer.thermo_type === "Thermoplast") {
          if(processing_1.type === "Doublebeltpress (Organosheet Production)" &&
          processing_1.wandstärke_mm !== undefined &&
          processing_2.type !== undefined &&
          processing_2.wandstärke_mm !== undefined &&
          this.processingMethodOfInsertion !== undefined) {
            this.buttonCalculateEnabled = true
          } else if(processing_1.type === "Compression Moulding" &&
          processing_1.wandstärke_mm !== undefined &&
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
      /**
       * Updates the input-footer progress-bar.
       */
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
      /**
       * Resets app_input fields to their default values.
       */
      this.app_input = {
        "waste": {
          "type": "End of Life",
          "quantity_to": 1,
          "size_bigger_1dot5_m": false,
          "fmc_percent": 60.00
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
          "fvc_percent": 30,
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
      this.button2enabled = true
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
    formatAppInputKeys() {
      /**
       * When user is done manipulating the app_input and clicks on the calculate-button, then some app_input fields need changing, to be valid in the recycling.exe.
       * undefined values need to be changed to empty-strings; If there is only one shredding process, and it is saved in shredding_2, then it needs to be replaced to shredding_1; Some field-values may need renaming.
       */
      let waste = this.app_input.waste
      let transport = this.app_input.transport
      let shredding_1 = this.app_input.shredding_1
      let shredding_2 = this.app_input.shredding_2
      let separation = this.app_input.separation
      let polymer = this.app_input.polymer
      let textile_process = this.app_input.textile_process
      let processing_1 = this.app_input.processing_1
      let processing_2 = this.app_input.processing_2
      // undefined -> ""; End of Life -> EoL; 
      // waste
      if(waste.type === "End of Life") waste.type = "EoL"
      // transport
      if(transport.euro_per_kg === undefined) transport.euro_per_kg = ""
      if(transport.co2_equv_per_kg === undefined) transport.co2_equv_per_kg = ""
      // shredding 1 and 2
      // in some cases processing_1 is undefined and processing_2 is defined. In these cases switch their values.
      if(shredding_1.type === undefined) {
        shredding_1.type = shredding_2.type
        shredding_2.type = undefined
        shredding_1.mass_loss_percent = shredding_2.mass_loss_percent
        shredding_2.mass_loss_percent = undefined
        shredding_1.co2_equv_per_kg = shredding_2.co2_equv_per_kg
        shredding_2.co2_equv_per_kg = undefined
        shredding_1.euro_per_kg = shredding_2.euro_per_kg
        shredding_2.euro_per_kg = undefined
      }
      if(shredding_1.type === undefined) shredding_1.type = ""
      if(shredding_1.mass_loss_percent === undefined) shredding_1.mass_loss_percent = ""
      if(shredding_1.euro_per_kg === undefined) shredding_1.euro_per_kg = ""
      if(shredding_1.co2_equv_per_kg === undefined) shredding_1.co2_equv_per_kg = ""
      if(shredding_2.type === undefined) shredding_2.type = ""
      if(shredding_2.mass_loss_percent === undefined) shredding_2.mass_loss_percent = ""
      if(shredding_2.euro_per_kg === undefined) shredding_2.euro_per_kg = ""
      if(shredding_2.co2_equv_per_kg === undefined) shredding_2.co2_equv_per_kg = ""
      // separation
      if(separation.euro_per_kg === undefined) separation.euro_per_kg = ""
      if(separation.co2_equv_per_kg === undefined) separation.co2_equv_per_kg = ""
      // matrix
      if(polymer.euro_per_kg === undefined) polymer.euro_per_kg = ""
      if(polymer.co2_equv_per_kg === undefined) polymer.co2_equv_per_kg = ""
      // textile
      if(["Dry-laid", "Dry-laid with Thermoplastfiber"].includes(textile_process.type)) textile_process.type = "Carding"
      if(["Air-laid", "Air-laid with Thermoplastfiber"].includes(textile_process.type)) textile_process.type = "AirLaying"
      if(["Wet-laid", "Wet-laid with Thermoplastfiber"].includes(textile_process.type)) textile_process.type = "WetLaying"
      if(textile_process.euro_per_kg === undefined) textile_process.euro_per_kg = ""
      if(textile_process.co2_equv_per_kg === undefined) textile_process.co2_equv_per_kg = ""
      // processing
      if(processing_1.euro_per_kg === undefined) processing_1.euro_per_kg = ""
      if(processing_1.co2_equv_per_kg === undefined) processing_1.co2_equv_per_kg = ""
      if(processing_1.type === "Compression Moulding") {
        processing_1.type = "CompressionMoulding" //ist das in der recycling.exe gueltig?
        processing_2.type = ""
      }
      if(processing_1.type === "Doublebeltpress (Organosheet Production)") {
        if(this.processingMethodOfInsertion === "Thermoplastfiber") {
          processing_1.type = "DoubleBeltPressing"
          processing_2.type = "IRCompressionMoulding"
        } else if(this.processingMethodOfInsertion === "Thermoplast powder") {
          processing_1.type = "DoubleBeltPressingWithPowder"
          processing_2.type = "IRCompressionMoulding"
        } else if(this.processingMethodOfInsertion === "Thermoplast foil") {
          processing_1.type = "DoubleBeltPressingWithFoil"
          processing_2.type = "IRCompressionMoulding"
        }
      }
      if(processing_1.type === "Prepreg Production") processing_1.type = "PrepregProduction"
      if(processing_2.type === undefined) processing_2.type = ""
      if(processing_2.mass_loss_percent === undefined) processing_2.mass_loss_percent = ""
      if(
      ["0.34 kg/m³", "1.25 kg/m³", "2.25 kg/m³"].includes(processing_1.wandstärke_mm) ||
      ["0.34 kg/m³", "1.25 kg/m³", "2.25 kg/m³"].includes(processing_2.wandstärke_mm)) {
        if(
          processing_1.wandstärke_mm === "0.34 kg/m³" ||
          processing_2.wandstärke_mm === "0.34 kg/m³") {
          processing_1.wandstärke_mm = 0.5
          processing_2.wandstärke_mm = 0.5
        } else if(
          processing_1.wandstärke_mm === "1.25 kg/m³" ||
          processing_2.wandstärke_mm === "1.25 kg/m³") {
          processing_1.wandstärke_mm = 1
          processing_2.wandstärke_mm = 1
        } else {
          processing_1.wandstärke_mm = 2
          processing_2.wandstärke_mm = 2
        }
      }
      if(processing_2.wandstärke_mm === undefined) processing_2.wandstärke_mm = ""
      if(processing_2.euro_per_kg === undefined) processing_2.euro_per_kg = ""
      if(processing_2.co2_equv_per_kg === undefined) processing_2.co2_equv_per_kg = ""
    },
    calculateButton() {
      /**
       * Formats app_input for recycling.exe and sends it to the backend. When the backend is done processing, the output from recycling.exe is sent back here.
       * If a valid output is generated, then continues to ResultsView.
       * If the server is not responding or the recycling.exe throws an error or the generated output is invalid, then continues to ErrorView.
       */
      this.footerProgressBar = 99
      this.formatAppInputKeys()
      // this.log()

      //setTimeout(() => {
      //  router.push({name: "ResultsView"})
      //}, 8000);
      // console.log(this.app_input);
      let url1 = "http://85.215.180.183/call_server.php";
      //const {result1}=axios.post(url1,this.app_input);
      axios.post(url1,this.app_input,setTimeout(20000)).then(res => {             
        return res.data
      }).then(data => {
          // console.log(data)
          try {        
            let data1=JSON.stringify(data);      
            this.appOutput = data1.replaceAll("INFINITY", "null")
            this.appOutput = JSON.parse(this.appOutput)
            // console.log(this.appOutput)
          } catch (error) {
            this.errorMessage = "Internal error. No output could be generated based on the given input.(1)"
            router.push({name: "ErrorView"})
            // todo: save such inputs in the backend for debugging
            return
          }
          if(!(Object.prototype.hasOwnProperty.call(this.appOutput, "processes"))) {
            this.$emit("setErrorMessage", "Internal error. No output could be generated based on the given input.(2)")
            router.push({name: "ErrorView"})
            // todo: save such inputs in the backend for debugging
          }
          // if user left the loading screen (without reloading the website) then don't redirect to results
          // console.log(this.$route.name)
          if(this.$route.name !== "WaitingView") return
          router.push({name: "ResultsView"})
      })
      //if server not responding notify user
      .catch(rej => {
          // navigate to errorView, pass error as prop

          // console.log("Fehler beim Serveraufruf");
          console.log(rej);
          this.errorMessage = "Server not responding."
          // if user left the loading screen (without reloading the website) then don't redirect to results
          // console.log(this.$route.name)
          if(this.$route.name !== "WaitingView") return
          router.push({name: "ErrorView"})
      });         
    },
     checkOutputValidity(output) {
    //   /**
    //    * Checks wether the output is the expected json-string or an error-message. If error-message, redirects user to ErrorView. Else redirects to ResultsView.
    //    * Checks generated output for invalid values like INFINITY. Converts those into null, otherwise string can't be parsed into a json-object.
    //    * In ResultsView charts cannot be generated from null values, output-fields are checked again in results_charts_functions.js.
    //    */
       console.log(output)
       try {
         output = JSON.parse(output.replaceAll("INFINITY", "null"))
         console.log(output)
       } catch (error) {
         this.errorMessage = "Internal error. No output could be generated based on the given input."
         router.push({name: "ErrorView"})
         // todo: save such inputs in the backend for debugging
         return
       }
       if(!(Object.prototype.hasOwnProperty.call(output, "processes"))) {
         this.$emit("setErrorMessage", "Internal error. No output could be generated based on the given input.")
         router.push({name: "ErrorView"})
         // todo: save such inputs in the backend for debugging
       }
     },
    setStartedCorrectly() {
      /**
       * This function is emitted from StartView.
       * To prevent user from entering on an input-page via url, the variable startedCorrectly is checked.
       * When false, user is redirected to StartView. When true, user can continue to the input-page.
       * When StartView is loaded, startedCorrectly is set to true.
       * Example: user tries to start on url http://oekocap.com/processing then variable startedCorrectly is false and they're taken to the start-page.
       */
      this.startedCorrectly = true
    },
    setErrorMessage(message) {
      /**
       * Sets the error-messsage that is displayed on ErrorView.
       * This function is usually emitted form child-elements.
       */
      this.errorMessage = message
    },
    log() {
      /**
       * Logs app_input.
       */
      console.log(JSON.stringify(this.app_input, null, 2))
    },
    logWaste() {
      /**
       * Logs elements related to the WasteView.
       * Logs app_input.waste, .shredding_1, .shredding_2, .transportation.
       */
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
      /**
       * Logs elements related to the SeparationView.
       * Logs app_input.separation.
       */
      console.log(
        this.app_input.separation.type,
        this.app_input.separation.euro_per_kg,
        this.app_input.separation.co2_equv_per_kg
      )
    },
    logMatrix() {
      /**
       * Logs elements related to the MatrixView.
       * Logs app_input.polymer.
       */
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
      /**
       * Logs elements related to the TextileView.
       * Logs app_input.textile_process.
       */
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
      /**
       * Logs elements related to the ProcessingView.
       * Logs app_input.processing_1, .processing_2.
       */
      console.log(
        this.app_input.processing_1.type,
        this.app_input.processing_1.mass_loss_percent,
        this.app_input.processing_1.euro_per_kg,
        this.app_input.processing_1.co2_equv_per_kg,

        this.app_input.processing_2.type,
        this.app_input.processing_2.mass_loss_percent,
        this.app_input.processing_2.euro_per_kg,
        this.app_input.processing_2.co2_equv_per_kg,

        this.app_input.processing_1.wandstärke_mm,
        this.app_input.processing_2.wandstärke_mm,
        this.processingMethodOfInsertion,
      )
    },    
  },
}
</script>