<template>
    <div class="izquierda"><MenuNavegacion></MenuNavegacion></div>
    <div class="derecha"><router-view/></div>
</template>

<script>
import MenuNavegacion from './components/MenuNavegacion.vue'


export default {
  name: 'App',
  components: {
    MenuNavegacion,
   
  },
   
}

</script>

<style>

.derecha{
margin-left: 250px;
}

</style>
