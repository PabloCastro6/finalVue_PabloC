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
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

.derecha{
margin-left: 250px;
}

</style>
