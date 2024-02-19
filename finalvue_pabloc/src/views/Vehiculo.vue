<template>
  <p>Vehiculos</p>

  <label for="marca">Marca</label>
  <select id="marca" v-model="marcaSeleccionada">
    <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
  </select><br>

  <label for="modelo">Modelo</label>
  <select id="modelo" v-model="modeloSeleccionado" :disabled="marcaSeleccionada == null">
    <!--Al seleccionar una marca se habilita el select de modelo-->
    <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">{{ modelo.modelo }}</option>
  </select><br>
  <table v-if="marcaSeleccionada != null">
    <tr>
      <th>MODELO</th>
      <th>PRECIO/DIA</th>
      <th>CLIENTES</th>
    </tr>
    <tr v-for="vehiculo in vehiculos" :key="vehiculo.id">
      <td>{{ vehiculo.idModelo }}</td>
      <td>{{ vehiculo.precioDia }}</td>
      <td><ul>
        <li v-for="cliente in vehiculo.clientes " :key="cliente.id">{{ cliente.nombre }}</li>
      </ul></td>
    </tr>
  </table>

  <button @click="mostrarFormularioNuevoVehiculo = true">Nuevo Vehículo</button>
  
  <nuevo-vehiculo v-if="mostrarFormularioNuevoVehiculo" :marcaPreseleccionada="marcaSeleccionada"
    :modeloPreseleccionado="modeloSeleccionado"></nuevo-vehiculo>
</template>

    
<script>
import NuevoVehiculo from '@/components/NuevoVehiculo.vue';

export default {
  components: {
    NuevoVehiculo
  },
  data() {
    return {
      marcas: [],
      modelos: [],
      vehiculos: [],
      marcaSeleccionada: null,
      modeloSeleccionado: null,
      mostrarFormularioNuevoVehiculo: false
    }


  },
  async mounted() {
    this.marcas = await this.obtenerMarcas()
  },
  watch: {
    /* Se usa para observar el valor de la variable marcaSeleccionada, para listar los modelos*/

    async marcaSeleccionada(idMarca) {
      this.modelos = await this.obtenerModelos(idMarca);
      this.vehiculos = [];
      this.modelos.forEach(async modelo => {
        this.vehiculos.push(...await this.obtenerVehiculosPorIdModelo(modelo.id));
      });




    },
    /* Se usa para observar el valor de la variable modeloSeleccionado, para listar los vehiculos*/
    async modeloSeleccionado(idModelo) {
      this.vehiculos = await this.obtenerVehiculosPorIdModelo(idModelo);

    }
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

    async obtenerVehiculosPorIdModelo(idModelo) {
      try {
        const respuesta = await fetch(`http://localhost:3000/vehiculos?idModelo=${idModelo}`);
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        const vehiculos =  await respuesta.json();
        for(const vehiculo of vehiculos) {
        vehiculo.clientes = await this.obtenerClientes(vehiculo.id); //Crear un array dentro de cada vehiculo con sus clientes
                
        }
          return  vehiculos;

      } catch (error) {
        console.error('Error al cargar las vehiculos:', error);
        return [];
      }
    },

    async obtenerClientes(idVehiculo) {
      try {
        const respuesta = await fetch(`http://localhost:3000/clientes`);  
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        const clientes =  await respuesta.json();

        const clientesFiltrados = clientes.filter((cliente) => {
          const alquileres = cliente.alquileres; 
          if(alquileres == null || alquileres.length == 0) {
            return false;
          }

          for (const alquiler of alquileres)  {
            if(alquiler.vehiculo == idVehiculo ) {
              return true;
            }

          }

          return false;
        })
        return clientesFiltrados;

      } catch (error) {
        console.error('Error al cargar las vehiculos:', error);
        return [];
      }
    },
  }
}
</script>
    
<style></style>