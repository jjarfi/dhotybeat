
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
            Dothy Beat by
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
      <div>
        <div>
          <label for="username" class="block text-900 font-medium mb-2"
            >Username</label
          >
          <InputText
            id="username"
            v-model="username"
            type="text"
            class="w-full mb-3"
          />

          <label for="password" class="block text-900 font-medium mb-2"
            >Password</label
          >
          <InputText
            id="password"
            v-model="password"
            type="password"
            required="true"
            :toggleMask="true"
            class="w-full mb-3"
          />

          <div class="flex align-items-center justify-content-between mb-6">
            <div class="flex align-items-center">
              <Checkbox
                id="rememberme1"
                :binary="true"
                v-model="checked"
                class="mr-2"
              ></Checkbox>
            <label for="rememberme1">Remember me</label>
            </div>
            <label 
              class="no-underline ml-2 text-blue-500 text-right cursor-pointer"  link as="router-link" to="/forgot"
              >lupa password?</label
            >
          </div>

          <Button
            label="Masuk"
            icon="pi pi-user"
            class="w-full" 
            as="router-link" 
            to="/pages/dashboard"
          ></Button>
        </div>
      </div>
      <Divider type="dotted" />
      <div class="flex justify-center">
        <AvatarGroup>
            <Avatar image="/demo/images/google.png" size="large" shape="circle" />
        </AvatarGroup>
    </div>
    </Dialog>

    <!-- DIALOG SIGNUP -->
    <Dialog
      header="Silahkan Daftar"
      v-model:visible="visible2"
      :breakpoints="{ '960px': '75vw' }"
      :style="{ width: '30vw' }"
      :modal="true"
    >
      <div>
        <div>
          <label for="username" class="block text-900 font-medium mb-2"
            >Email</label
          >
          <InputText
            id="username"
            v-model="username"
            type="text"
            class="w-full mb-3"
          />

          <label for="username" class="block text-900 font-medium mb-2"
            >Username</label
          >
          <InputText
            id="username"
            v-model="username"
            type="text"
            class="w-full mb-3"
          />


          <label for="password" class="block text-900 font-medium mb-2"
            >Password</label
          >
          <InputText
            id="password"
            v-model="password"
            type="password"
            required="true"
            :toggleMask="true"
            class="w-full mb-3"
          />

          <label for="password" class="block text-900 font-medium mb-2"
            >Ulangi Password</label
          >
          <InputText
            id="password"
            v-model="password"
            type="password"
            required="true"
            :toggleMask="true"
            class="w-full mb-3"
          />

          <div class="flex align-items-center justify-content-between mb-6">
           
          </div>

          <Button
            label="Daftar"
            icon="pi pi-user-plus"
            class="w-full"
          ></Button>
        </div>
      </div>
      <Divider type="dotted" />
      <div class="flex justify-center">
        <AvatarGroup>
            <Avatar image="/demo/images/google.png" size="large" shape="circle" />
        </AvatarGroup>
    </div>
     
    </Dialog>
  
</template>

<script setup>
import { useLayout } from '@/layout/composables/layout';
import LogoApp from '@/layout/LogoApp.vue';
import WelcomeApp from '@/layout/WelcomeApp.vue';
import { ref } from "vue";
const visible = ref(false);
const visible2 = ref(false);
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>
<style scoped>
</style>
