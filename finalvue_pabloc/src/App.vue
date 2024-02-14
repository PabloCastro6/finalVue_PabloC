<template>
    <div class="izquierda"><MenuNavegacion></MenuNavegacion></div>
    <div class="derecha"><router-view/></div>
</template>

<script>
import MenuNavegacion from './components/MenuNavegacion.vue'
import bbdd from '@/assets/bbdd.json'


export default {
  name: 'App',
  components: {
    MenuNavegacion,
   
  },
  mounted() {
    if (!localStorage.getItem("bbdd")) {
      localStorage.setItem("bbdd", JSON.stringify(bbdd))
    }
   
  }
}
</script>

<style>

.derecha{
margin-left: 250px;
}

</style>
