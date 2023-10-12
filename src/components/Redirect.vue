<script>
import router from "../router"
/**
 * If the user enters on a url that doesn't exist then redirect them to the start.
 */
export default {
    mounted() {
        router.push({name: "StartView"})
    }
}
</script>