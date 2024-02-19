// Importar componentes
// import Vue from 'vue';
import {createRouter,createWebHistory} from 'vue-router';
import Inicio from '@/views/Inicio.vue';

import Marcas from '@/views/Marcas.vue'
import NuevaMarca from '@/views/NuevaMarca.vue'
import Modelos from '@/views/Modelos.vue'
import NuevoModelo from '@/views/NuevoModelo.vue'

import Vehiculo from '@/views/Vehiculo.vue'
import NuevoVehiculo from '@/views/NuevoVehiculo.vue'
import Alquiler from '@/views/Alquiler.vue'

import Clientes from '@/views/Clientes.vue'



// Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/marcas',
    name: 'Marcas',
    component: Marcas
  },
  {
    path: '/marcas/nueva',
    name: 'Nueva Marca',
    component: NuevaMarca
  },
  {
    path: '/marcas/modelos',
    name: 'Modelos',
    component: Modelos
  },
  {
    path: '/marcas/modelos/nuevo',
    name: 'Nuevo Modelo',
    component: NuevoModelo
  },
  {
    path: '/vehiculo',
    name: 'Vehiculo',
    component: Vehiculo
  },
  {
    path: '/vehiculos/nuevo',
    name: 'Vehiculos',
    component: NuevoVehiculo
  },
  
  {
    path: '/vehiculos/alquiler',
    name: 'Alquiler',
    component: Alquiler
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes
  },
];

const router = createRouter({
 history:createWebHistory(),
  base: process.env.BASE_URL,
  routes
});

export default router;
