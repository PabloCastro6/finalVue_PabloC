<template>
    <p>Nuevo Modelo</p>
    <form @submit.prevent="crearModelo">
    <label for="marca">Marca</label>
    <select id="marca" v-model="marca">
        <option v-for="marca in marcas" :value="marca.id">{{ marca.nombre }}</option>
    </select><br>
    <label for="modelo">Modelo</label>
    <input id="modelo" v-model="modelo" type="text"><br>
    <label for="pais">País</label>
    <input id="pais" v-model="pais" type="text"><br>
    <label for="precioExtra">Precio extra</label>
    <input id="precioExtra" v-model="precioExtra" type="number"><br>
    <button type="submit">Crear Modelo</button>
</form>
    
    </template>
    
    <script>
    export default {
    
    }
    </script>
    
    <style>
    /* Estilos generales del formulario */
form {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

/* Estilos para las etiquetas */
label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-size: 16px;
}

/* Estilos para los inputs y select */
input[type="text"],
input[type="number"],
select {
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

/* Estilos para el botón de envío */
button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

/* Mejora visual para el formulario */
br {
    display: none;
}
    </style>