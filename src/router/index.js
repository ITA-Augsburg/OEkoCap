import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import WasteView from '../views/WasteView.vue'
import SeparationView from '../views/SeparationView.vue'
import MatrixView from '../views/MatrixView.vue'
import TextileView from '../views/TextileView.vue'
import ProcessingView from '../views/ProcessingView.vue'
import WaitingView from '../views/WaitingView.vue'
import ResultsView from '../views/ResultsView.vue'
import ErrorView from '../views/ErrorView.vue'

const props = {
    color_white: "#FFFFFF",
    color_black: "#000000",
    color_lightgrey: "#F2F2F2",
    color_grey: "#4A4A4A",
    color_green: "#55CD89",
    color_darkgreen: "#7fc79f",

    subheader_waste: "WASTE",
    subheader_separation: "SEPARATION",
    subheader_matrix: "MATRIX",
    subheader_textile: "TEXTILE",
    subheader_processing: "PROCESSING",
    subheader_empty: "⠀",
    subheader_results: "RESULTS",
    subheader_error: "ERROR"
}

const routes = [
    {
        path: "/",
        name: "StartView",
        component: StartView,
        props: {
            color_green: props.color_green
        }
    },
    {
        path: "/waste",
        name: "WasteView",
        component: WasteView,
        props: {
            subheader_waste: props.subheader_waste,
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/separation",
        name: "SeparationView",
        component: SeparationView,
        props: {
            subheader_separation: props.subheader_separation,
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/matrix",
        name: "MatrixView",
        component: MatrixView,
        props: {
            subheader_matrix: props.subheader_matrix,
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/textile",
        name: "TextileView",
        component: TextileView,
        props: {
            subheader_textile: props.subheader_textile,
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/processing",
        name: "ProcessingView",
        component: ProcessingView,
        props: {
            subheader_processing: props.subheader_processing,
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey,
            color_darkgreen: props.color_darkgreen
        }
    },
    {
        path: "/waiting",
        name: "WaitingView",
        component: WaitingView,
        props: {
            subheader_empty: props.subheader_empty,
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/results",
        name: "ResultsView",
        component: ResultsView,
        props: {
            subheader_results: props.subheader_results,
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/error",
        name: "ErrorView",
        component: ErrorView,
        props: {
            subheader_error: props.subheader_error,
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
