<template>
    <p>Alquiler</p>
    <div class="alquiler-container">
    <div>
      <label for="marca">Marca:</label>
      <select id="marca" v-model="idMarcaSeleccionada" required>
        <option value="">Seleccione una marca</option>
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
      </select>
    </div>

    <div>
      <label for="modelo">Modelo:</label>
      <select id="modelo" v-model="idModeloSeleccionado" :disabled="!idMarcaSeleccionada" required>
        <option value="">Seleccione un modelo</option>
        <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">{{ modelo.modelo }}</option>
      </select>
    </div>


    <div>  
      <button @click="botonVehiculosPulsado" :disabled="!idMarcaSeleccionada && !idModeloSeleccionado">Cargar vehiculos</button>
    </div>

    <template v-if="vehiculos.length != 0">
    <div>
      <label for="vehiculo">Vehículo:</label>
      <select id="vehiculo" v-model="idVehiculoSeleccionado" :disabled="!idModeloSeleccionado" required>
        <option value="">Seleccione un vehículo</option>
        <option v-for="vehiculo in vehiculos" :key="vehiculo.id" :value="vehiculo.id">
          {{ vehiculo.nombre }} - {{ vehiculo.precioDia }} €/día
        </option>
      </select>
    </div>

    <div>
      <label for="cliente">Cliente:</label>
      <select id="cliente" v-model="idClienteSeleccionado" required>
        <option value="">Seleccione un cliente</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }}</option>
      </select>
    </div>

    <div>
      <label for="dias">Número de días:</label>
      <input type="number" id="dias" v-model="nuevoAlquiler.dias" min="1" required>
    </div>

    <div>
      <label for="fechaInicio">Fecha de inicio:</label>
      <input type="date" id="fechaInicio" v-model="nuevoAlquiler.fechaInicio" required>
    </div>

    <button @click="realizarAlquiler" :disabled="!puedeAlquilar"> Realizar Alquiler</button>

    <div v-if="alquilerRealizado">
      <h3>Resumen de Alquiler</h3>
      <p>Marca: {{ nuevoAlquiler.marca.nombre }}</p>
      <p>Modelo: {{ nuevoAlquiler.modelo.modelo }}</p>
      <p>Cliente: {{ nuevoAlquiler.cliente.nombre }}</p>
      <p>DNI: {{ nuevoAlquiler.cliente.dni }}</p>
      <p>Precio Total: {{ precioTotal }} €</p>
    </div>
  </template>
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
      idMarcaSeleccionada: null,
      idModeloSeleccionado: null,
      idVehiculoSeleccionado: null,
      idClienteSeleccionado: null,
      alquilerRealizado: false,
      nuevoAlquiler: {
      dias: 0,
      fechaInicio: '',
      modelo: null,
      marca: null,
      cliente: null,
      vehiculo: null,
      }
    };
  },
  computed: {
    puedeAlquilar() {
      return this.idMarcaSeleccionada && this.idModeloSeleccionado && this.idVehiculoSeleccionado && this.idClienteSeleccionado && this.nuevoAlquiler.dias && this.nuevoAlquiler.fechaInicio;
    },
    vehiculoSeleccionado() {
      return this.vehiculos.find((vehiculo)=>   vehiculo.id == this.idVehiculoSeleccionado); 
    },
    clienteSeleccionado() {
      return this.clientes.find((cliente)=>   cliente.id == this.idClienteSeleccionado); 
    },
    modeloSeleccionado() {
      return this.modelos.find((modelo)=>   modelo.id == this.idModeloSeleccionado); 
    },
    marcaSeleccionada() {
      return this.marcas.find((marca)=>   marca.id == this.idMarcaSeleccionada); 
    },
    precioTotal() {
      return this.nuevoAlquiler.vehiculo.precioDia * this.nuevoAlquiler.dias + this.nuevoAlquiler.modelo.extraPorModelo;
    }
  },
  watch: {
    /* Se usa para observar el valor de la variable idMarcaSeleccionada, para listar los modelos*/
    async idMarcaSeleccionada(idMarca) {
      this.modelos = await this.obtenerModelos(idMarca);
    },
  },
  methods: {
    async obtenerMarcas() {
      try {
        const respuesta = await fetch('http://localhost:3000/marcas');
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        return await respuesta.json();
      } catch (error) {
        console.error('Error al cargar las marcas:', error);
        return [];
      }
    },

    async obtenerModelos(idMarca) {
      try {
        const respuesta = await fetch(`http://localhost:3000/modelos?idMarca=${idMarca}`);
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        return await respuesta.json();

      } catch (error) {
        console.error('Error al cargar las modelos:', error);
        return [];
      }
    },
    async cargarVehiculos() {
      try {
        const respuesta = await fetch(`http://localhost:3000/vehiculos?idModelo=${this.idModeloSeleccionado}`);
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
          this.vehiculos =  await respuesta.json();
    
      } catch (error) {
        console.error('Error al cargar las vehiculos:', error);
      }
    },
    async cargarClientes() {
      try {
        const respuesta = await fetch(`http://localhost:3000/clientes`);
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        this.clientes = await respuesta.json();

      } catch (error) {
        console.error('Error al cargar las vehiculos:', error);
        return [];
      }

    },
    async botonVehiculosPulsado() {
      await this.cargarClientes();
      await this.cargarVehiculos();
    },

    realizarAlquiler() {
      if (this.puedeAlquilar) {
        // Accion de realizar el alquiler
        // Calcula el precio total, incluyendo el extra por modelo si aplica
        this.nuevoAlquiler.marca = this.marcaSeleccionada;
        this.nuevoAlquiler.modelo = this.modeloSeleccionado;
        this.nuevoAlquiler.vehiculo = this.vehiculoSeleccionado;
        this.nuevoAlquiler.cliente = this.clienteSeleccionado;
        this.alquilerRealizado = true;
      }
    }
  },
  async mounted() {
    // Cargar datos de tus marcas, modelos, vehículos y clientes
    this.marcas = await this.obtenerMarcas()
  }
};
</script>
    
<style>

</style>