
<template>
    <div class="layout-topbar">
     <div class="layout-topbar-logo-container">
         <router-link to="/" class="layout-topbar-logo">
             <LogoApp/>
         </router-link>
     </div>
 </div>
 <div class="layout-main-container">
   <div class="layout-main flex items-center justify-center ">
    <div class="card flex justify-center">
        <div class="flex flex-col items-center">
            <div class="font-bold text-xl mb-2">Autentikasi Akun Anda</div>
            <p class="text-surface-500 dark:text-surface-400 block mb-8">Masukkan kode yang dikirimkan ke email Anda.</p>
            <div class="card flex justify-center">
             <InputOtp v-model="value" integerOnly />
    </div>
            <div class="flex justify-between mt-8 self-stretch">
                <Button label="Kirim ulang kode" link class="p-0"></Button>
                <Button label="Verifikasi kode"></Button>
            </div>
        </div>
    </div>
   </div>      
   <div class="layout-footer">
         Dothy Beat by
         <a href="https://jjarfi.github.io" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">TRITON SOFTWARE</a> 
 </div>
    </div>
</template>
<script setup>
import LogoApp from '@/layout/LogoApp.vue';
import { ref } from 'vue';
const value = ref(null);
</script>

<style scoped>

</style>

