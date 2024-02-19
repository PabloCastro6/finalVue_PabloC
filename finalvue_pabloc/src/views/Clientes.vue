<template>
    <div class="clientes-container">
        <div class="clientes-listado">
            <ul>
                <li v-for="cliente in clientes" :key="cliente.id" @click="seleccionarCliente(cliente)">
                    {{ cliente.nombre }}
                </li>
            </ul>
        </div>


        <div class="clientes-formulario">
            <form @submit.prevent="clienteSeleccionado ? modificarCliente() : agregarCliente()">
                <input type="text" v-model="formCliente.nombre" placeholder="Nombre del cliente" />
                <input type="text" v-model="formCliente.dni" placeholder="DNI del cliente" />

                <button type="submit" :disabled="clienteSeleccionado">Alta</button>
                <button type="button" @click="modificarCliente" :disabled="!clienteSeleccionado">Modificar</button>
                <button type="button" @click="eliminarCliente" :disabled="!clienteSeleccionado">Eliminar</button>
            </form>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            clientes: [],
            clienteSeleccionado: null,
            formCliente: {
                nombre: '',
                dni: '',
            },
        };
    },
    mounted() {
        this.cargarClientes();
    },
    methods: {
        async cargarClientes() {
            try {
                const respuesta = await fetch('http://localhost:3000/clientes');
                if (respuesta.ok) {
                    const clientes = await respuesta.json();
                    this.clientes = clientes;
                    this.limpiarFormulario(); // Limpiar formulario
                } else {
                    console.error('Error al dar de alta el cliente:', respuesta);
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
            }
        },
        seleccionarCliente(cliente) {
            this.clienteSeleccionado = cliente;
            this.formCliente = { ...cliente };
        },
        async agregarCliente() {
            // Método para añadir un nuevo cliente
            // Agregar lógica para POST al servidor 
            this.limpiarFormulario();
        },
        async modificarCliente() {
            // Método para actualizar un cliente existente
            // Agregar lógica para PUT/PATCH al servidor 
            this.limpiarFormulario();
        },
        async eliminarCliente() {
            // Método para eliminar un cliente
            // Agregar lógica para DELETE al servidor o eliminación local
            this.limpiarFormulario();
        },
        limpiarFormulario() {
            this.clienteSeleccionado = null;
            this.formCliente = { nombre: '', dni: '' };
        }
    },
};
</script>
  
<style>
.clientes-container {
    display: flex;
}

.clientes-listado {
    width: 50%;
    /* Estilos adicionales */
}

.clientes-formulario {
    width: 50%;
    /* Estilos adicionales */
}

/* Estilos adicionales para botones, input, etc. */
</style>
  