<script>
import router from "../router"
/**
 * If the user enters on a url that doesn't exist then redirect them to the start.
 * This component is only referenced in roter/index.js and is supposed to redirect the user when they enter on a subfolder that doesn't exist, for example oekocap.org/foo. 
 */
export default {
    mounted() {
        router.push({name: "StartView"})
    }
}
</script>