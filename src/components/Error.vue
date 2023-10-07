<template>

    <div class="input_area">

        <p class="text error_text">Error:<br>{{error_message_prop}}</p>

    </div>

</template>

<script>
/**
 * An error-message can be displayed in this component by passing error_message_prop.
 */
    export default {
        props: ["error_message_prop"],
        data() {
            return {
                
            }
        }
    }
</script>