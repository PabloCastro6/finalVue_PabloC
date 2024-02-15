<template>
    <p>Vehiculos</p>

    <label for="marca">Marca</label>
    <select id="marca" v-model="marcaSeleccionada">
      <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
    </select><br>

    <label for="modelo">Modelo</label>
    <select id="modelo" v-model="modeloSeleccionado" :disabled="marcaSeleccionada == null"> <!--Al seleccionar una marca se habilita el select de modelo-->
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
        <td></td>
    </tr>
    </table>

</template>
    
<script>
export default {
    data() {
        return {
            marcas: [],
            modelos:[],
            vehiculos:[],
            marcaSeleccionada: null,
            modeloSeleccionado: null
        }
    

    },
    async mounted() {
        this.marcas = await this.obtenerMarcas()
    },
    watch:{
        /* Se usa para observar el valor de la variable marcaSeleccionada, para listar los modelos*/
        async marcaSeleccionada(idMarca) {
            this.modelos = await this.obtenerModelos(idMarca);
            this.vehiculos=[];
            this.modelos.forEach(async modelo  => { 
                console.log(modelo.id);
                this.vehiculos.push(...await this.obtenerVehiculos(modelo.id));

                
            });
           



        },
        /* Se usa para observar el valor de la variable modeloSeleccionado, para listar los vehiculos*/
        async modeloSeleccionado(idModelo) {
            this.vehiculos = await this.obtenerVehiculos(idModelo);

        }
    },
    methods:{
        
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
        return await respuesta.json();
        
      } catch (error) {
        console.error('Error al cargar las vehiculos:', error);
        return [];
      }
    },

    async obtenerVehiculosPorIdModelos(idModelos) {
      try {
        /*let filtro = "idModelo=";
        idModelo.forEach(idModelo => {

            
        });*/
        const respuesta = await fetch(`http://localhost:3000/vehiculos?idModelo=1&idModelo=2`); /*Filtar para varios modelos */
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        return await respuesta.json();
        
      } catch (error) {
        console.error('Error al cargar las vehiculos:', error);
        return [];
      }
    },

    
    async obtenerClientes(idVehiculo) {
      try {
        const respuesta = await fetch(`http://localhost:3000/clientes?idModelo=${idModelo}`); /* Acceder desde clientes a alquileres, vehiculo
        Obtener el cliente, que ha alquilado ese vehiculo*/
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        return await respuesta.json();
        
      } catch (error) {
        console.error('Error al cargar las vehiculos:', error);
        return [];
      }
    }

    }
}
</script>
    
<style></style>