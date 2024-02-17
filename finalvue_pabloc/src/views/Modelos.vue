<template>
    <div>
      <select v-model="marcaSeleccionada" @change="cargarModelosDeMarca">
        <option value="">Seleccione una marca</option>
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
          {{ marca.nombre }}
        </option>
      </select>
  
      <div v-if="modelosDeMarca.length > 0">
        <table>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Precio Medio/Día</th>
              <th>Extra por Modelo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="modelo in modelosDeMarca" :key="modelo.id">
              <td>{{ modelo.modelo }}</td>
              <td>{{ formatearMoneda(modelo.precioMedio) }}</td>
            <td>{{ formatearMoneda(modelo.extraPorModelo) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
export default {
  name: 'Modelos',
  data() {
    return {
      marcas: [],
      modelos: [],
      vehiculos: [],
      marcaSeleccionada: '',
      modelosDeMarca: [],
    };
  },
  methods: {
    formatearMoneda(value) {
      return `${value.toFixed(2)} €`;
    },
    async cargarModelosDeMarca() {
      if (!this.marcaSeleccionada) {
        this.modelosDeMarca = [];
        return;
      }
      const modelosDeMarca = this.modelos.filter(
        modelo => modelo.idMarca == this.marcaSeleccionada
      );
      for (let modelo of modelosDeMarca) {
        const vehiculosDelModelo = this.vehiculos.filter(
          vehiculo => vehiculo.idModelo === modelo.id
        );
        modelo.precioMedio = vehiculosDelModelo.reduce((acc, vehiculo) => acc + vehiculo.precioDia, 0) / vehiculosDelModelo.length;
        // No es necesario reasignar modelo.extraPorModelo si ya tiene un valor definido
      }
      this.modelosDeMarca = modelosDeMarca;
    },
    async cargarDatos() {
      // Aquí cargarías tus datos de la bbdd.json
      // Por ejemplo, puedes usar fetch para obtener los datos de un archivo local
      // Asegúrate de que la ruta a tu archivo bbdd.json es correcta
      try {
    const respuesta = await fetch('/bbdd.json');
    const datos = await respuesta.json();

    this.marcas = datos.marcas;
    this.modelos = datos.modelos;
    this.vehiculos = datos.vehiculos;
  } catch (error) {
    console.error('Error al cargar datos desde bbdd.json:', error);
  }
}
  },
  mounted() {
    this.cargarDatos();
  }
};
</script>
  
  <style>
  /* Estilos para tu tabla y select, etc. */
table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #ccc;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #eee;
}
  </style>
  