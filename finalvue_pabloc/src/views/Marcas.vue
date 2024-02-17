<template>
  <div class="contenedor">
    <div class="marcas">
      <h1>Listado de Marcas</h1>
      <ul>
        <li v-for="marca in marcas" :key="marca.id" @click="seleccionarMarca(marca)">
          {{ marca.nombre }} - Precio medio: {{ marca.precioMedio.toFixed(2) }} €
        </li>
      </ul>
    </div>
    <div class="modelos" v-if="marcaSeleccionada">
      <h2>Modelos de {{ marcaSeleccionada.nombre }}</h2>
      <ul>
        <li v-for="modelo in modelosDeMarcaSeleccionada" :key="modelo.id">
          {{ modelo.modelo }} - {{ modelo.precioDia }} €/día
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
      marcaSeleccionada: null,
    };
  },
  computed: {
    modelosDeMarcaSeleccionada() {
      if (!this.marcaSeleccionada) return [];
      return this.modelos.filter(modelo => modelo.idMarca === this.marcaSeleccionada.id)
        .map(modelo => {
          const vehiculo = this.vehiculos.find(vehiculo => vehiculo.idModelo === modelo.id);
          return {
            ...modelo,
            precioDia: vehiculo ? vehiculo.precioDia : 'No disponible'
          };
        });
    }
  },
  mounted() {
    this.cargarMarcasYModelos();
  },
  methods: {
    seleccionarMarca(marca) {
      this.marcaSeleccionada = marca;
    },
    async cargarMarcasYModelos() {
      try {
        const [marcasRespuesta, modelosRespuesta, vehiculosRespuesta] = await Promise.all([
          fetch('http://localhost:3000/marcas'),
          fetch('http://localhost:3000/modelos'),
          fetch('http://localhost:3000/vehiculos')
        ]);
        const marcas = await marcasRespuesta.json();
        this.modelos = await modelosRespuesta.json();
        this.vehiculos = await vehiculosRespuesta.json();

        this.marcas = marcas.map(marca => {
          const modelosDeMarca = this.modelos.filter(modelo => modelo.idMarca === marca.id);
          const precios = modelosDeMarca.map(modelo => {
            const vehiculo = this.vehiculos.find(vehiculo => vehiculo.idModelo === modelo.id);
            return vehiculo ? vehiculo.precioDia : 0;
          });

          const precioMedio = precios.reduce((acc, precio) => acc + precio, 0) / (precios.length || 1);
          return { ...marca, precioMedio };
        });
      } catch (error) {
        console.error('Error al cargar marcas y modelos:', error);
      }
    }
  }
}
</script>

<style>
.contenedor {
  display: flex;
  justify-content: start;
  align-items: flex-start;
  padding: 20px;
}

.marcas, .modelos {
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  background-color: #fff;
  width: calc(50% - 40px); 
  max-height: 80vh;
  overflow-y: auto; 
}

.marcas li, .modelos li {
  cursor: pointer;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  list-style-type: none; 
  transition: background-color 0.3s, transform 0.3s;
}

.marcas h1, .modelos h2 {
  color: #333;
  text-align: center;
}
</style>
