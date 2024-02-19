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
    computed: {
        modelosFiltrados() {
            return this.modeloPreseleccionado ? this.modelos : this.modelos.filter(modelo => modelo.idMarca === this.marcaSeleccionada);
        },
    },
    methods: {
        async cargarDatos() {
            try {
                const respuesta = await fetch('/bbdd.json');
                const datos = await respuesta.json();
                this.marcas = datos.marcas;
                this.modelos = datos.modelos;
            } catch (error) {
                console.error('Error al cargar los datos:', error);
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
    mounted() {
        this.cargarDatos();
    }
}

</script>
  
<style>
h1 {
    text-align: center;
}
</style>
  