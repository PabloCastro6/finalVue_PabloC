<template>
    <p>Nuevo Modelo</p>
    <form @submit.prevent="crearModelo">
    <label for="marca">Marca</label>
    <select id="marca" v-model="marcaSeleccionada">
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
    </select><br>
    <label for="modelo">Modelo</label>
    <input id="modelo" v-model="modelo" type="text"><br>
    <label for="pais">País</label>
    <input id="pais" v-model="pais" type="text"><br>
    <label for="precioExtra">Precio extra</label>
    <input id="precioExtra" v-model="precioExtra" type="number"><br>
    <button type="submit">Obtener Modelo</button>
</form>
    
    </template>
    
    <script>
   // import bbdd from '@/assets/bbdd.json'

export default {
    name: 'NuevoModelo',
    data() {
        return {
            marcas:[],
            marcaSeleccionada: null,
            Modelo:null,
            PrecioExtra:""
        }
    },
    mounted() {
        
        this.cargarMarcas();
    },
    methods: {
       /* crearModelo() {
            console.log(this.nombre,this.año,this.pais)
            console.log(bbdd)

        }*/
        async cargarMarcas() {
      try {
        // Asume que tu proyecto Vue se sirve en localhost y el archivo está en la carpeta public
        const respuesta = await fetch('/bbdd.json');
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        const datos = await respuesta.json();
        this.marcas = datos.marcas;
      } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
      }
    },
  },
};
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