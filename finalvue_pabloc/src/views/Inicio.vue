<template>
    <div class="inicio">
      <h1>Bienvenido a RentingCar</h1>
      <img src="../assets/img/LOGO RentingCar.png" alt="Logo de RentingCar" class="logo">
    </div>
  </template>
  
  <script>
  export default {
    name: 'PaginaInicio'
  }
  </script>
  
  <style scoped>
  .inicio {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  
  .inicio .logo {
    max-width: 300px;
    margin-top: 20px;
  }
  </style>
  