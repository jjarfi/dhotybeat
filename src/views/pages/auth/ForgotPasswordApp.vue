
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
        
        <div class="bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 ">
            <div class="font-bold text-xl mb-2">Lupa password ?</div>
            <p class="text-surface-500 dark:text-surface-400 block mb-8">Link reset password akan dikirimkan ke email Anda.</p>
                <div>
                    <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                    <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8 mr-3" />
                
                    <Button label="Kirim" icon="pi pi-send" raised class="mb-3"></Button>
                </div>
                <!-- <Divider type="dotted" /> -->
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
</script>
