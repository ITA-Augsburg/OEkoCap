<template>
    <!-- centered container with set width -->
    <div class="waiting_area">

        <!-- image-components of the loading-animation -->
        <div class="loading_logo_entry_point">
            <img :src="require('../assets/loading_cogs.png')" class="loading_img loading_cogs" />
            <img :src="require('../assets/loading_trunk_left.png')" class="loading_img loading_trunk_left" />
            <img :src="require('../assets/loading_trunk_right.png')" class="loading_img loading_trunk_right" />
            <img :src="require('../assets/loading_trunk_middle.png')" class="loading_img loading_trunk_middle" />
            <img :src="require('../assets/loading_leaves_left.png')" class="loading_img loading_leaves_left" />
            <img :src="require('../assets/loading_leaves_right.png')" class="loading_img loading_leaves_right" />
            <img :src="require('../assets/loading_leaves_middle.png')" class="loading_img loading_leaves_middle" />
        </div>

        <div class="text waiting_text">Your request is being processed...<br>This could take up to a minute.</div>

    </div>

</template>

<script>
/**
 * A loading-animation to make the time on this Earth a little bit more bearable.
 */
    export default {
        data() {
            return {
            }
        }
    }
</script>