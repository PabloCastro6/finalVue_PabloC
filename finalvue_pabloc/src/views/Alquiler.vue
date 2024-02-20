<template>
    <p>Alquiler</p>
    <div class="alquiler-container">
    <div>
      <label for="marca">Marca:</label>
      <select id="marca" v-model="marcaSeleccionada" @change="cargarModelos">
        <option value="">Seleccione una marca</option>
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
      </select>
    </div>

    <div>
      <label for="modelo">Modelo:</label>
      <select id="modelo" v-model="modeloSeleccionado" :disabled="!marcaSeleccionada">
        <option value="">Seleccione un modelo</option>
        <option v-for="modelo in modelosFiltrados" :key="modelo.id" :value="modelo.id">{{ modelo.nombre }}</option>
      </select>
    </div>

    <div>
      <label for="vehiculo">Vehículo:</label>
      <select id="vehiculo" v-model="vehiculoSeleccionado" :disabled="!modeloSeleccionado">
        <option value="">Seleccione un vehículo</option>
        <option v-for="vehiculo in vehiculosFiltrados" :key="vehiculo.id" :value="vehiculo">
          {{ vehiculo.nombre }} - {{ vehiculo.precioDia }} €/día
        </option>
      </select>
    </div>

    <div>
      <label for="cliente">Cliente:</label>
      <select id="cliente" v-model="clienteSeleccionado">
        <option value="">Seleccione un cliente</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }}</option>
      </select>
    </div>

    <div>
      <label for="dias">Número de días:</label>
      <input type="number" id="dias" v-model="dias" min="1" required>
    </div>

    <div>
      <label for="fechaInicio">Fecha de inicio:</label>
      <input type="date" id="fechaInicio" v-model="fechaInicio" required>
    </div>

    <button @click="realizarAlquiler" :disabled="!puedeAlquilar">Alquilar</button>

    <div v-if="alquilerRealizado">
      <h3>Resumen de Alquiler</h3>
      <p>Marca: {{ vehiculoSeleccionado.marca }}</p>
      <p>Modelo: {{ vehiculoSeleccionado.modelo }}</p>
      <p>Cliente: {{ clienteSeleccionado.nombre }}</p>
      <p>Precio Total: {{ precioTotal }} €</p>
    </div>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      marcas: [],
      modelos: [],
      vehiculos: [],
      clientes: [],
      marcaSeleccionada: null,
      modeloSeleccionado: null,
      vehiculoSeleccionado: null,
      clienteSeleccionado: null,
      dias: '',
      fechaInicio: '',
      alquilerRealizado: false,
      precioTotal: 0
    };
  },
  computed: {
    modelosFiltrados() {
      return this.modelos.filter(modelo => modelo.idMarca === this.marcaSeleccionada);
    },
    vehiculosFiltrados() {
      return this.vehiculos.filter(vehiculo => vehiculo.idModelo === this.modeloSeleccionado);
    },
    puedeAlquilar() {
      return this.marcaSeleccionada && this.modeloSeleccionado && this.vehiculoSeleccionado && this.clienteSeleccionado && this.dias && this.fechaInicio;
    }
  },
  methods: {
    cargarModelos() {
      // Aquí cargar los modelos basado en la marca seleccionada
    },
    realizarAlquiler() {
      if (this.puedeAlquilar) {
        // Accion de realizar el alquiler
        // Calcula el precio total, incluyendo el extra por modelo si aplica
        this.alquilerRealizado = true;
      }
    }
  },
  mounted() {
    // Cargar datos de tus marcas, modelos, vehículos y clientes
  }
};
</script>
    
<style>

</style>