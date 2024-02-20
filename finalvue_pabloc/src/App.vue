<template>
    <div class="menu-lateral">
      <router-link to="/" class="logo">
        <img src="./assets/img/LOGO RentingCar.png" alt="Logo Empresa">
      </router-link>
      <ul class="menu-principal">
        <li>
          <router-link to="/">Inicio</router-link>
        </li>
        <li>
          <router-link to="/marcas">Marcas</router-link>
        <ul class="submenu">
          <li><router-link to="/marcas/nueva">Nueva marca</router-link></li>
          <li><router-link to="/marcas/modelos">Modelos</router-link></li>
          <li><router-link to="/marcas/modelos/nuevo">Nuevo Modelo</router-link></li>
        </ul>
      </li>
      <li>
        <router-link to="/vehiculo">Vehiculos</router-link>
        <ul class="submenu">
          <li><router-link to="/vehiculos/nuevo">Nuevo vehículo</router-link></li>
          <li><router-link to="/vehiculos/alquiler">Alquiler</router-link></li>
        </ul>
      </li>
      <li>
        <router-link to="/clientes">Clientes</router-link>
      </li>
    </ul>
  </div>
    <div class="derecha"><router-view/></div>
</template>

<script>
//import MenuNavegacion from './components/MenuNavegacion.vue'


export default {
  name: 'App',
  components: {
   
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

.menu-lateral {
    width: 250px;
    height: 100%;
    position: fixed;
    background-color: #34495e;
    padding-top: 20px;
    box-shadow: 2px 0 5px rgba(0,0,0,0.2);
  }
  
  .logo img {
    display: block;
    margin: 0 auto 20px;
    width: 80%;
  }
  
  .menu-principal {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: left;
    color: white;
    text-transform: uppercase;
  }
  
  .menu-principal > li {
    margin-bottom: 10px;
  }
  
  .menu-principal a {
    padding: 10px 15px;
    display: block;
    color: white;
    text-decoration: none;
    transition: background-color 0.3s;
  }
  

</style>
