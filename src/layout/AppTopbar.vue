<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
import AppProfil from './AppProfil.vue';
import LogoApp from './LogoApp.vue';
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
  
            <router-link to="/" class="layout-topbar-logo">
             <LogoApp/>
            </router-link>

        </div>

        <div class="layout-topbar-actions">
            
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action layout-topbar-action-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div>

                <!-- PESAN BELL -->
                <div class="relative">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-bell"></i>
                        <span>Messages</span>
                    </button> 
                </div>
               

                <!-- PROFIL -->
                <div class="relative">
                    <AppProfil />
                </div>
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .path-style {
    font-size: 10;
    fill: var(--primary-color); /* Ganti dengan warna atau variabel CSS sesuai kebutuhan */
  }
.blaco-bear {
    font-family: 'Arial', sans-serif;
    font-size: 3px;
    fill: var(--primary-color);
}
</style>
