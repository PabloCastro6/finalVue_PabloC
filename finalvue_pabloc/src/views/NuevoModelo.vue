<template>
    <p>Nuevo Modelo</p>
    <form @submit.prevent="crearModelo">
    <label for="marca">Marca</label>
    <select id="marca" v-model="marcaSeleccionada" required>
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
    </select><br>
    <label for="modelo">Modelo</label>
    <input id="modelo" v-model="modelo" type="text" required><br>
    <label for="pais">País</label>
    <input id="pais" v-model="pais" type="text" required><br>
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
        async crearModelo() {
    const nuevoModelo = {
      nombre: this.nombre,
      año: this.año, 
      pais: this.pais,
    };
    
    try {
      const respuesta = await fetch('http://localhost:3000/modelos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoModelo),
      });

      if (!respuesta.ok) {
        throw new Error('Error al crear el modelo');
      }

     /* const modeloCreado = await respuesta.json();*/
      /*console.log('Modelo creado:', modeloCreado);*/
      
    } catch (error) {
      console.error('Error al crear el modelo:', error);
    }
  },
        async cargarMarcas() {
  try {
    const respuesta = await fetch('http://localhost:3000/marcas');
    if (!respuesta.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    const datos = await respuesta.json();
    this.marcas = datos;
  } catch (error) {
    console.error('Error al cargar las marcas:', error);
  }
}



  },
};
    </script>
    
    <style>
   
form {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}


label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-size: 16px;
}


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


br {
    display: none;
}
    </style>