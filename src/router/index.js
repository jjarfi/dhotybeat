import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/pages',
            component: AppLayout,
            children: [
                {
                    path: '/pages/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
             
                {
                    path: '/pages/listbeat',
                    name: 'listbeat',
                    component: () => import('@/views/pages/ListBeat.vue')
                },
               
                {
                    path: '/pages/beat',
                    name: 'beat',
                    component: () => import('@/views/pages/Beat.vue')
                },
                {
                    path: '/pages/users',
                    name: 'users',
                    component: () => import('@/views/pages/Users.vue')
                },
                {
                    path: '/pages/transaksi',
                    name: 'transaksi',
                    component: () => import('@/views/pages/Transaksi.vue')
                },
                {
                    path: '/pages/riwayat',
                    name: 'riwayat',
                    component: () => import('@/views/pages/RiwayatTransaksi.vue')
                },
                {
                    path: '/pages/account',
                    name: 'account',
                    component: () => import('@/views/pages/Account.vue')
                }
            
            ]
        },
        {
            path: '/',
            name: 'dhoty',
            component: () => import('@/views/DhotyApp.vue')
        },
        {
            path: '/forgot',
            name: 'auth',
            component: () => import('@/views/pages/auth/ForgotPass.vue')
        }
    ]
});

export default router;
