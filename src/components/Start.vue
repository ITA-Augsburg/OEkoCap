<template>

    <div class="start_area">

        <p class="text start_text">
            Multi-criteria calculation tool for carbon fiber recycling
        </p>

        <v-btn
        class="start_button"
        v-bind:color=color_green
        elevation="5"
        width="160px"
        height="47px"
        ><p class="start_button_text">Start</p></v-btn>

    </div>

</template>

<script>
export default {
    props: ["color_green"],
  data: () => ({
  }),
};
</script>