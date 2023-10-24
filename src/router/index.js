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
import GuidelinesView from '../views/GuidelinesView.vue'
import ProjectView from '../views/ProjectView.vue'
import ImprintView from '../views/ImprintView.vue'
import Redirect from '../components/Redirect.vue'

const props = {
    color_white: "#FFFFFF",
    color_black: "#000000",
    color_lightgrey: "#F2F2F2",
    color_grey: "#4A4A4A",
    color_green: "#55CD89",
    color_darkgreen: "#7fc79f",
}

const routes = [
    {
        path: "/:pathMatch(.*)*",
        name: "Redirect",
        component: Redirect
    },
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
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/separation",
        name: "SeparationView",
        component: SeparationView,
        props: {
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/matrix",
        name: "MatrixView",
        component: MatrixView,
        props: {
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/textile",
        name: "TextileView",
        component: TextileView,
        props: {
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/processing",
        name: "ProcessingView",
        component: ProcessingView,
        props: {
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
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/results",
        name: "ResultsView",
        component: ResultsView,
        props: {
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/error",
        name: "ErrorView",
        component: ErrorView,
        props: {
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/guidelines",
        name: "GuidelinesView",
        component: GuidelinesView,
        props: {
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/project",
        name: "ProjectView",
        component: ProjectView,
        props: {
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    },
    {
        path: "/imprint",
        name: "ImprintView",
        component: ImprintView,
        props: {
            color_green: props.color_green,
            color_lightgrey: props.color_lightgrey
        }
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
