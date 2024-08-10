<template>
  <Carousel :value="images" :numVisible="3" :numScroll="1"
            circular
            :autoplayInterval="1000"
            :responsiveOptions="carouselResponsiveOptions"
            >
    <template #item="slotProps">
      <div class="carousel-data">
        <img :src="slotProps.data.src" alt="" style="height: 64vh;" >
      </div>
    </template>
</Carousel>
</template>

<script setup>
import { ref } from 'vue';
const images = ref(Array(5).fill({src: 'public/demo/images/product/blue-band.jpg'}));
const carouselResponsiveOptions = ref([
  {breakpoint: '1024px', numVisible: 2, numScroll: 1},
  {breakpoint: '768px', numVisible: 1, numScroll: 1},
]);
</script>
