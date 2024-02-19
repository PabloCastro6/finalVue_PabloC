<template>
    <div class="nuevo-vehiculo">
        <h1>Nuevo Vehículo</h1>
        <form @submit.prevent="agregarVehiculo">
            <label for="marca">Marca:</label>
            <select id="marca" v-model="marcaSeleccionada" :disabled="marcaPreseleccionada != null">
                <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
                    {{ marca.nombre }}
                </option>
            </select>


            <label for="modelo">Modelo:</label>
            <select id="modelo" v-model="nuevoVehiculo.idModelo"
                :disabled="modeloPreseleccionado != null || marcaSeleccionada == null">
                <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">
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
    name: "nuevo-vehiculo",
    props: {
        marcaPreseleccionada: Number,
        modeloPreseleccionado: Number,
    },
    data() {
        return {
            marcas: [],
            modelos: [],
            vehiculos: [],
            marcaSeleccionada: this.marcaPreseleccionada || null,
            nuevoVehiculo: {
                idModelo: this.modeloPreseleccionado || null,
                precioDia: null,
                puertas: null,
                sillaInfantil: false,
            },
        };
    },
    watch: {

        async marcaSeleccionada(idMarca) {
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

        async agregarVehiculo() {
            console.log(this.nuevoVehiculo)
            try {
                await fetch('http://localhost:3000/vehiculos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.nuevoVehiculo),
                });
            } catch (error) {
                //error

            }
        },
    },
    async mounted() {
        this.marcas = await this.obtenerMarcas();
        if(this.marcaPreseleccionada) {
            this.modelos = await this.obtenerModelos(this.marcaPreseleccionada);
        }
    }

}


</script>
  
<style>
h1 {
    text-align: center;
}
</style>
  