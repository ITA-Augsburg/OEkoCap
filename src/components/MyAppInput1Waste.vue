<template>

    <div class="inputarea">

        <v-select
        class="typeinput"
        label="Type"
        :items="['Cut-Off', 'End of Life']"
        variant="solo"
        density="comfortable"
        bg-color="#55CD89"
        color="#FFFFFF"
        ></v-select>

        <v-checkbox
        class="wastesizecheckbox"
        label="Waste Size > 1.5m"
        color="#55CD89"
        ></v-checkbox>

        <v-checkbox
        class="desizingcheckbox"
        label="Desizing"
        color="#55CD89"
        disabled="true"
        ></v-checkbox>

        <p class="fibertext">Fiber volume content</p>
        <v-slider
        class="myslider"
        color="#55CD89"
        thumb-color="#55CD89"
        thumb-size="20"
        ></v-slider>
        <p class="fiberpercentage">89%</p>
        
        <v-switch
        class="myswitch"
        label="Consider Transportation"
        inset
        color="#55CD89"
        ></v-switch>

        <p class="coarsetext">Coarse Shredding - Mass loss</p>
        <v-slider
        class="myslider"
        color="#55CD89"
        thumb-color="#55CD89"
        thumb-size="20"
        ></v-slider>
        <p class="coarsepercentage">89%</p>

        <p class="finetext">Fine Shredding - Mass loss</p>
        <v-slider
        class="myslider"
        color="#55CD89"
        thumb-color="#55CD89"
        thumb-size="20"
        ></v-slider>
        <p class="finepercentage">89%</p>

        <v-switch
        class="myswitch"
        label="Expert mode"
        inset
        color="#55CD89"
        ></v-switch>

    </div>

</template>