<template>
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
</template>

<script setup>
</script>