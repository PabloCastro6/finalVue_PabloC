<template>
  <h1>Clientes</h1>
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
                    this.limpiarFormulario(); 
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
      try {
        const respuesta = await fetch('http://localhost:3000/clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formCliente),
        });

        if (respuesta.ok) {
          const nuevoCliente = await respuesta.json();
          this.clientes.push(nuevoCliente);
          this.limpiarFormulario();
        } else {
          console.error('Error al agregar el cliente:', respuesta.statusText);
        }
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    },

    async modificarCliente() {
        // Método para actualizar un cliente existente
        // Agregar lógica para PUT/PATCH al servidor 
      try {
        const respuesta = await fetch(`http://localhost:3000/clientes/${this.clienteSeleccionado.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formCliente),
        });

        if (respuesta.ok) {
          const index = this.clientes.findIndex(c => c.id === this.clienteSeleccionado.id);
          this.clientes[index] = await respuesta.json();
          this.limpiarFormulario();
        } else {
          console.error('Error al modificar el cliente:', respuesta.statusText);
        }
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    },

    async eliminarCliente() {
        // Método para eliminar un cliente
        // Agregar lógica para DELETE al servidor 
      try {
        const respuesta = await fetch(`http://localhost:3000/clientes/${this.clienteSeleccionado.id}`, {
          method: 'DELETE',
        });

        if (respuesta.ok) {
          this.clientes = this.clientes.filter(c => c.id !== this.clienteSeleccionado.id);
          this.limpiarFormulario();
        } else {
          console.error('Error al eliminar el cliente:', respuesta.statusText);
        }
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
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
    justify-content: space-between; 
    padding: 20px; 
}

.clientes-listado {
    width: 40%; 
    margin-right: 20px; 
}

.clientes-listado ul {
    list-style-type: none; 
    padding: 0; 
}

.clientes-listado li {
    padding: 10px;
    border: 1px solid #ccc; 
    margin-bottom: 5px; 
    cursor: pointer; 
    background-color: #f9f9f9; 
}

.clientes-listado li:hover {
    background-color: #eaeaea;
}

.clientes-formulario {
    width: 55%; 
    padding: 20px;
    border: 1px solid #ccc; 
    border-radius: 5px; 
    background-color: #fff;
}

.clientes-formulario form {
    display: flex;
    flex-direction: column; 
}

.clientes-formulario input[type="text"] {
    margin-bottom: 10px; 
    padding: 8px;
    border: 1px solid #ccc; 
    border-radius: 4px; 
}

.clientes-formulario button {
    padding: 10px 15px;
    margin-right: 10px; 
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #5cb85c; 
    color: white; 
}

.clientes-formulario button:disabled {
    background-color: #cccccc; 
    cursor: not-allowed; 
}

.clientes-formulario button:not(:disabled):hover {
    opacity: 0.8; 
}
</style>
  