<template>

<div class="card" >
  <div class="flex flex-col md:flex-row" style="height:64vh">
                <div class="md:w-8/12">
                  <CarouselApp/>
                </div>
                <div >
                    <Divider layout="vertical" class="!hidden md:!flex"></Divider>
                    <Divider layout="horizontal" class="!flex md:!hidden" align="center"></Divider>
                </div>
                <div class="w-full md:w-4/12 flex items-center justify-center py-5">
                    <!-- <Button label="Sign Up" icon="pi pi-user-plus" severity="success" class="w-full max-w-[17.35rem] mx-auto"></Button> -->
                </div>
            </div>
        </div>

</template>

<script setup>
import { ref } from "vue";
import CarouselApp from './CarouselApp.vue';
const visible = ref(false);
const visible2 = ref(false);

</script>
  
<style scoped>
.svg-container {
  width: auto;
  display: flex;
  justify-content: center;
}

.responsive-svg {
  width: auto;
  height: 60;
  max-width: 300%;
}
</style>