<template>
    <div class="izquierda"><MenuNavegacion></MenuNavegacion></div>
    <div class="derecha"><router-view/></div>
</template>

<script>
import MenuNavegacion from './components/MenuNavegacion.vue'
// import bbdd from 'bbdd.json'


export default {
  name: 'App',
  components: {
    MenuNavegacion,
   
  },
  mounted() {
    this.cargarDatos();
  },
  methods: {
    async cargarDatos() {
      if (!localStorage.getItem("bbdd")) {
        try {
          const response = await fetch('bbdd.json');
          const data = await response.json();
          localStorage.setItem("bbdd", JSON.stringify(data));
        } catch (error) {
          console.error('No se pudo cargar el archivo JSON:', error);
        }
      }
    }
  }
}

</script>

<style>

.derecha{
margin-left: 250px;
}

</style>
