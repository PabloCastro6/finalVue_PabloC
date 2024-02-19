<template>
  <div class="contenedor">
    <div class="marcas">
      <h1>Listado de Marcas</h1>
      <ul>
        <li v-for="marca in marcasOrdenadas" :key="marca.id" @click="marcaSeleccionada = marca">
          {{ marca.nombre }} - Precio medio: {{ marca.precioMedio.toFixed(2) }} €
        </li>
      </ul>
    </div>
    <div class="modelos" v-if="marcaSeleccionada">
      <h2>Modelos de {{ marcaSeleccionada.nombre }}</h2>
      <ul>
        <li v-for="modelo in modelosDeMarcaSeleccionada" :key="modelo.id">
          {{ modelo.modelo }} - Precio: {{ modelo.precioDia }} €/día
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Marcas',
  data() {
    return {
      marcas: [],
      modelos: [],
      vehiculos: [], 
      marcaSeleccionada: null,
    };
  },
  computed: {
    marcasOrdenadas() {
      return  [...this.marcas].sort((a, b) => b.precioMedio - a.precioMedio);
    },
    modelosDeMarcaSeleccionada() {
      if (!this.marcaSeleccionada) return [];
      
      return this.modelos
        .filter(modelo => modelo.idMarca === this.marcaSeleccionada.id)
        .map(modelo => {
          const vehiculo = this.vehiculos.find(v => v.idModelo === modelo.id);
          return { ...modelo, precioDia: vehiculo ? vehiculo.precioDia : 'No disponible' };
        });
    }
  },
  async mounted() {
    await this.cargarDatos();
  },
  methods: {
    async cargarDatos() {
      try {
        const respuesta = await fetch('/bbdd.json');
        const { marcas, modelos, vehiculos } = await respuesta.json();
        this.modelos = modelos;
        this.vehiculos = vehiculos;

        this.marcas = marcas.map(marca => {
          const modelosDeMarca = modelos.filter(modelo => modelo.idMarca === marca.id);
          const precios = modelosDeMarca.map(modelo => {
            const vehiculo = vehiculos.find(v => v.idModelo === modelo.id);
            return vehiculo ? vehiculo.precioDia : 0;
          });
          const precioMedio = precios.length ? precios.reduce((acc, precio) => acc + precio, 0) / precios.length : 0;
          return { ...marca, precioMedio };
        });
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    },
  }
}
</script>

<style>
.contenedor {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.marcas, .modelos {
  flex-basis: 45%; 
  border: 1px solid #ccc; 
  padding: 20px;
  border-radius: 8px; 
  background-color: #f9f9f9; 
}

.marcas li, .modelos li {
  cursor: pointer;
  margin: 5px 0;
  list-style-type: none; 
  padding: 10px;
  border-bottom: 1px solid #eee; 
}

.marcas li:hover, .modelos li:hover {
  background-color: #eaeaea; 
}

.marcas h1, .modelos h2 {
  color: #333; 
  margin-bottom: 20px; 
}
</style>  
