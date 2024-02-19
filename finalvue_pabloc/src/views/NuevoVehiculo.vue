<template>
    <div class="nuevo-vehiculo">
      <h1>Nuevo Vehículo</h1>
      <form @submit.prevent="agregarVehiculo">
        <label for="marca">Marca:</label>
        <select id="marca" v-model="nuevoVehiculo.idMarca" :disabled="marcaPreseleccionada">
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
            {{ marca.nombre }}
          </option>
        </select>
  
        
        <label for="modelo">Modelo:</label>
        <select id="modelo" v-model="nuevoVehiculo.idModelo" >
          <option v-for="modelo in modelosFiltrados" :key="modelo.id" :value="modelo.id">
            {{ modelo.modelo }}
          </option>
        </select>
  
        
        <input type="number" v-model.number="nuevoVehiculo.precioDia" placeholder="Precio por día" />
        <input type="number" v-model.number="nuevoVehiculo.puertas" placeholder="Número de puertas" />
        <label>
          <input type="checkbox" v-model="nuevoVehiculo.sillaInfantil" />
          ¿Incluye silla infantil?
        </label>
  
        <button type="submit">Agregar Vehículo</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      marcaPreseleccionada: Number,
      modeloPreseleccionado: Number,
    },
    data() {
      return {
        marcas: [],
        modelos: [],
        vehiculos: [],
        nuevoVehiculo: {
          idMarca: this.marcaPreseleccionada || null,
          idModelo: this.modeloPreseleccionado || null,
          precioDia: null,
          puertas: null,
          sillaInfantil: false,
        },
      };
    },
    computed: {
      modelosFiltrados() {
        return this.modeloPreseleccionado ? this.modelos : this.modelos.filter(modelo => modelo.idMarca === this.nuevoVehiculo.idMarca);
      },
    },
    methods: {
      async cargarDatos() {
        try {
          const respuesta = await fetch('/bbdd.json');
          const datos = await respuesta.json();
          this.marcas = datos.marcas;
          this.modelos = datos.modelos;
          this.vehiculos = datos.vehiculos;
        } catch (error) {
          console.error('Error al cargar los datos:', error);
        }
      },
      async agregarVehiculo() {
    try {
      const respuesta = await fetch('/views/vehiculos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.nuevoVehiculo),
      });

      if (respuesta.ok) {
        const vehiculoAgregado = await respuesta.json();
        console.log('Vehículo agregado con éxito:', vehiculoAgregado);
      } else {
        console.error('Error al agregar el vehículo:', respuesta);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  },
},
mounted() {
  this.cargarDatos();
}
  }

  </script>
  
  <style>
  h1{
    text-align: center;
  }
  </style>
  