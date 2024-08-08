<script setup>
import { ProductService } from '@/service/ProductService';
import { useToast } from 'primevue/usetoast';
import { onMounted } from 'vue';

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
});

const toast = useToast();



</script>

<template>
    <div class="card align-items-center justify-content-center">
        <Fluid class="flex mt-8">
        <div class="card flex flex-col gap-4 w-full">
            <div class="font-semibold text-xl">Pengaturan Akun</div>
            <div class="flex flex-col md:flex-row gap-4">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-user"></i>
                    </InputGroupAddon>
                    <InputText placeholder="Nama Depan" />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-user"></i>
                    </InputGroupAddon>
                    <InputText placeholder="Nama Belakang" />
                </InputGroup>
            </div>
            <div class="flex flex-col md:flex-row gap-4">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-user"></i>
                    </InputGroupAddon>
                    <InputText placeholder="Username" />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-at"></i>
                    </InputGroupAddon>
                    <InputText placeholder="Email" />
                </InputGroup>
            </div>
            <div class="flex flex-col md:flex-row gap-4">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-phone"></i>
                    </InputGroupAddon>
                    <InputText placeholder="No Handphone" />
                </InputGroup>
                <InputGroup>
                    
                    <InputText placeholder="Password" />
                    <Button label="Ubah Password" icon="pi pi-lock-open" />
                </InputGroup>
            </div>
            <Button label="Update Akun" icon="pi pi-send" raised  class="mb-3" style="width: fit-content;"></Button>
         
        </div>

    </Fluid>

    </div>
    
   
  </template>