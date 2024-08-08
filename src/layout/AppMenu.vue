<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'BERANDA', icon: 'pi pi-fw pi-home', to: '/pages/dashboard' }]
    },
    {
        label: 'Menu',
        items: [
            { label: 'JUAL BEAT', icon: 'pi pi-fw pi-id-card', to: '/pages/beat' },
            { label: 'DAFTAR BEAT', icon: 'pi pi-fw pi-check-square', to: '/pages/listbeat' },
            { label: 'USERS', icon: 'pi pi-fw pi-users', to: '/pages/users', class: 'rotated-icon' },
            { label: 'TRANSAKSI', icon: 'pi pi-fw pi-list',  to: '/pages/transaksi', class: 'rotated-icon' },
            { label: 'RIWAYAT TRANSAKSI', icon: 'pi pi-fw pi-bookmark',  to: '/pages/riwayat', class: 'rotated-icon' }
            // { label: 'KELUAR', icon: 'pi pi-fw pi-power-off', class: 'rotated-icon' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
