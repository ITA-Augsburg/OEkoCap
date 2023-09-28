<template>

    <div class="input_area">

        <div class="loading_logo_entry_point">
            <img :src="require('../assets/loading_cogs.png')" class="loading_img loading_cogs" />
            <img :src="require('../assets/loading_trunk.png')" class="loading_img loading_trunk" />
            <img :src="require('../assets/loading_leaves.png')" class="loading_img loading_leaves" />
        </div>

    <div class="text waiting_text">Your request is being processed...<br>Please wait.</div>

    </div>

</template>

<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>