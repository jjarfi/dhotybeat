<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref } from 'vue';

const { getPrimary, getSurface, isDarkTheme } = useLayout();
const chartData = ref(null);
const chartOptions = ref(null);

// Data for carousel items
const items = ref([
  { src: 'public\demo\images\logo-white.svg', alt: 'Image 1' },
  { src: 'public\demo\images\logo-white.svg', alt: 'Image 2' },
  { src: 'public\demo\images\logo-white.svg', alt: 'Image 3' },
  { src: 'public\demo\images\logo-white.svg', alt: 'Image 4' },
  { src: 'public\demo\images\logo-white.svg', alt: 'Image 5' }
]);

// Active item index
const activeIndex = ref(0);

// Function to go to the next item
const nextItem = () => {
  activeIndex.value = (activeIndex.value + 1) % items.value.length;
};

// Function to go to the previous item
const prevItem = () => {
  activeIndex.value = (activeIndex.value - 1 + items.value.length) % items.value.length;
};

onMounted(() => {
  
});


const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};


</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Sample</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">sample</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">24 sample </span>
                <span class="text-muted-color">sample sample</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Sample</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">$2.100</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-dollar text-orange-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">%52+ </span>
                <span class="text-muted-color">sample sample</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Sample</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">28441</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">520 </span>
                <span class="text-muted-color">sample sample</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Sample</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">152 sample</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-comment text-purple-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">85 </span>
                <span class="text-muted-color">sample</span>
            </div>
        </div>

       <!-- CARAOUSEL -->

    </div>
</template>