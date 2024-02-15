// Importar componentes
// import Vue from 'vue';
import {createRouter,createWebHistory} from 'vue-router';
import Inicio from '@/views/Inicio.vue';
import Clientes from '@/views/Clientes.vue'
import Marcas from '@/views/Marcas.vue'
import Modelos from '@/views/Modelos.vue'
import NuevaMarca from '@/views/NuevaMarca.vue'
import NuevoModelo from '@/views/NuevoModelo.vue'
import Alquiler from '@/views/Alquiler.vue'


// Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes
  },

  {
    path: '/marcas',
    name: 'Marcas',
    component: Marcas,
  },

  {
    path: '/marcas/modelos',
    name: 'Modelos',
    component: Modelos
  },

  {
    path: '/marcas/nueva',
    name: 'Nueva Marca',
    component: NuevaMarca
  },

  {
    path: '/marcas/modelos/nuevo',
    name: 'Nuevo Modelo',
    component: NuevoModelo
  },


  {
    path: '/Alquiler',
    name: 'Alquiler',
    component: Alquiler
  }
  
  
];

const router = createRouter({
 history:createWebHistory(),
  base: process.env.BASE_URL,
  routes
});

export default router;
