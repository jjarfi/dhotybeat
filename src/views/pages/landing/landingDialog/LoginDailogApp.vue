<template>
      <div>
        <div>
          <label for="username" class="block text-900 font-medium mb-2"
            >Username</label
          >
          <InputText
            id="username"
            type="text"
            class="w-full mb-3"
          />

          <label for="password" class="block text-900 font-medium mb-2"
            >Password</label
          >
          <InputText
            id="password"
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
                class="mr-2 " style="margin-top: 9px;"
              ></Checkbox>
            <label link for="rememberme1" style="margin-top: 7px;">Remember me</label>
            </div>
            <Button 
              class="no-underline ml-2 text-blue-500 text-right cursor-pointer" link as="router-link" to="/forgot"
              >lupa password?</Button>
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
</template>

<script setup>

</script>