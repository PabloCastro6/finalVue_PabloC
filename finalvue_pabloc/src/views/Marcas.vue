<template>
  <div class="contenedor">
    <!-- Listado de Marcas -->
    <div class="marcas">
      <h1>Listado de Marcas</h1>
      <ul>
        <li v-for="marca in marcasOrdenadas" :key="marca.id" @click="marcaSeleccionada = marca">
          {{ marca.nombre }} - Precio medio: {{ marca.precioMedio.toFixed(2) }} €
        </li>
      </ul>
    </div>
    <!-- Modelos de la Marca Seleccionada -->
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
      vehiculos: [], // Agregar vehículos aquí
      marcaSeleccionada: null,
    };
  },
  computed: {
    marcasOrdenadas() {
       // Crea una copia del array de marcas y luego ordena esa copia
      return  [...this.marcas].sort((a, b) => b.precioMedio - a.precioMedio);
    },
    modelosDeMarcaSeleccionada() {
      if (!this.marcaSeleccionada) return [];
      // Filtra modelos por la marca seleccionada y encuentra su precio en los vehículos
      return this.modelos
        .filter(modelo => modelo.idMarca === this.marcaSeleccionada.id)
        .map(modelo => {
          // Encuentra vehículos para este modelo
          const vehiculo = this.vehiculos.find(v => v.idModelo === modelo.id);
          // Añade precioDia al modelo, si el vehículo existe
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

        // Calcula el precio medio de los modelos para cada marca
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
  flex-basis: 45%; /* Ajusta el ancho de cada columna */
  border: 1px solid #ccc; /* Borde para delimitar las áreas */
  padding: 20px;
  border-radius: 8px; /* Bordes redondeados */
  background-color: #f9f9f9; /* Fondo claro */
}

.marcas li, .modelos li {
  cursor: pointer;
  margin: 5px 0;
  list-style-type: none; /* Quitar estilos de lista */
  padding: 10px;
  border-bottom: 1px solid #eee; /* Borde sutil entre elementos */
}

.marcas li:hover, .modelos li:hover {
  background-color: #eaeaea; /* Cambio de color al pasar el ratón */
}

.marcas h1, .modelos h2 {
  color: #333; /* Color de texto para los títulos */
  margin-bottom: 20px; /* Espacio después del título */
}
</style>  
