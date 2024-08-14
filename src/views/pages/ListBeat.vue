<script setup>
import { ProductService } from '@/service/ProductService';

import IconPause from '@/layout/dhotyapps/pause.png';
import IconPlay from '@/layout/dhotyapps/play.png';
import { onMounted, ref } from 'vue';

const products = ref(null);
const picklistProducts = ref(null);
const orderlistProducts = ref(null);
const options = ref(['list', 'grid']);
const layout = ref('list');

const visibleBottom = ref(true);

function closeDrawer() {
  visibleBottom.value = false;
}

onMounted(() => {
    ProductService.getProductsSmall().then((data) => {
        products.value = data.slice(0, 6);
        picklistProducts.value = [data, []];
        orderlistProducts.value = data;
    });
});

const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};

const isPlaying = ref(false);

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};

</script>

<template>
    <div class="flex flex-col">
        
        
        <div class="card" style="padding-left: 10px; padding-right: 10px;">

            <!-- <div class="font-semibold text-xl">Daftar Beat</div> -->
            <DataView :value="products" :layout="layout" >
                
                <!-- <template #header>
                    <div class="flex justify-end">
                        <SelectButton v-model="layout" :options="options" :allowEmpty="false">
                            <template #option="{ option }">
                                <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
                            </template>
                        </SelectButton>
                    </div>
                </template> -->

                <template #list="slotProps">
                    <div class="flex flex-col">
                        <div v-for="(item, index) in slotProps.items" :key="index">
                            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface': index !== 0 }">
                                <div class="md:w-40 relative">
                                    <img
      class="block xl:block mx-auto rounded w-full"
      :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`"
      :alt="item.name"
    />
    <div
      class="absolute inset-0 flex items-center justify-center"
      @click="togglePlay">
    <div class="audio__player-play-icon">
        <img
        :src="isPlaying ? IconPause : IconPlay"
        class="w-12 h-12 cursor-pointer"
        alt="Play/Pause Icon"/>
    </div>       
      
    </div>
                                </div>                           
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                            <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                                        </div>
                                        <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                            <div
                                                class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                                style="
                                                    border-radius: 30px;
                                                    box-shadow:
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                                                "
                                            >
                                                <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                                <i class="pi pi-download text-yellow-500"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-8">
                                        <span class="text-xl font-semibold">Rp. {{ item.price }}</span>
                                        <div class="flex flex-row-reverse md:flex-row gap-2">
                                            <!-- <Button icon="pi pi-heart" outlined></Button> -->
                                            <Button icon="pi pi-download" label="Download" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class=" md:flex-initial whitespace-nowrap"></Button>
                                            <Button icon="pi pi-shopping-cart" @click="visibleBottom = true" label="Beli" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial whitespace-nowrap" ></Button>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </template>
            </DataView>  
        </div>
    </div>
</template>

<style scoped>
.audio__player-play-icon {
    /* position: absolute; */
    top: 2.1rem;
    left: 3.7rem;
    background: #f0f0f0;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.5rem;
    opacity: 0.8;
  }
  .audio__player-play-icon img {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    border-radius: 9999px;
  }
</style>




  

  
