<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const displayConfirmation = ref(false);

const { layoutConfig, setPrimary, setSurface, setPreset, isDarkTheme, setMenuMode } = useLayout();


const menu = ref();
const items = ref([
    {
        items: [
            {
                label: 'Refresh',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Pesan',
                icon: 'pi pi-bell'
            },
            {
                label: 'Akun',
                icon: 'pi pi-user',
                command: (event) => {
                   openAccount();
                 }
            },
            {
                label: 'Keluar',
                icon: 'pi pi-power-off',
                command: (event) => {
                   openConfirmation();
                 }
            }
        ]
    }
]);

const yesConfirmation = () => {
  logout();
};


const openConfirmation = () => {
  displayConfirmation.value = true;
};

const toggle = (event) => {
    menu.value.toggle(event);
};

function logout() {
  router.push("/");
}

function openAccount() {
  router.push("/pages/account");
}

const closeConfirmation = () => {
  displayConfirmation.value = false;
};

</script>

<template>
  <Button type="button" icon="pi pi-user" @click="toggle"  rounded aria-haspopup="true" aria-controls="overlay_menu" />
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />

  <Dialog
    header="Konfirmasi Keluar"
    v-model:visible="displayConfirmation"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="flex align-items-center justify-content-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span>Apa anda yakin ingin keluar ?</span>
    </div>
    <template #footer>
      <Button
        label="Tidak"
        icon="pi pi-times"
        @click="closeConfirmation"
        class="p-button-text"
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        @click="yesConfirmation"
        class="p-button-text"
        autofocus
      />
    </template>
  </Dialog>
</template>
