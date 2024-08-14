
<template>
       <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
          <router-link to="/" class="layout-topbar-logo">
            <LogoApp/>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
          <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
            <Button icon="pi pi-user" label="Masuk" @click="visible = true" aria-label="Masuk" raised />
            <Button icon="pi pi-user-plus" label="Daftar" @click="visible2 = true" aria-label="Daftar" raised/>

        </div>
    </div>
    

    <div class="layout-main-container">
       <div class="layout-main">
        <WelcomeApp/>
        </div>        
        <div class="layout-footer">
            Dhoty Beat by
            <a href="https://jjarfi.github.io" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">TRITON SOFTWARE</a> 
    </div>
       </div>

     <!-- DIALOG LOGIN -->
       <Dialog
      header="Selamat Datang !"
      v-model:visible="visible"
      :breakpoints="{ '960px': '75vw' }"
      :style="{ width: '30vw' }"
      :modal="true">
      <LoginDailogAppVue/>
    </Dialog>

    <!-- DIALOG SIGNUP -->
    <Dialog
      header="Silahkan Daftar"
      v-model:visible="visible2"
      :breakpoints="{ '960px': '75vw' }"
      :style="{ width: '30vw' }"
      :modal="true">
     <SignUpDailogApp/>
    </Dialog>
  
</template>

<script setup>
import { useLayout } from '@/layout/composables/layout';
import LogoApp from '@/layout/LogoApp.vue';
import { onMounted, ref } from "vue";
import LoginDailogAppVue from '../landingDialog/LoginDailogApp.vue';
import SignUpDailogApp from './../landingDialog/SignUpDialogApp.vue';

import WelcomeApp from './WelcomeApp.vue';
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

const visible = ref(false); 
const visible2 = ref(false); 

onMounted(() => {
    if (!isDarkTheme.value) {
        toggleDarkMode();
    }
});
</script>
<style scoped>
</style>
