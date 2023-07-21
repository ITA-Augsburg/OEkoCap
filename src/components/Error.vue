<template>

    <div class="input_area">

        <p class="text error_text">Error:<br>{{error_message_prop}}</p>

    </div>

</template>

<script>
    export default {
        props: ["error_message_prop"],
        data() {
            return {
                
            }
        }
    }
</script>