<template>
    <p>Marcas</p>
    <div>
    <h1>Listado de Marcas</h1>
    <ul>
      <li v-for="marca in marcas" :key="marca.id" @click="cargarModelos(marca.id)">
        {{ marca.nombre }} - Precio medio: {{ marca.precioMedio.toFixed(2) }}
        
        <ul v-if="marcaSeleccionada === marca.id">
          <li v-for="modelo in modelosPorMarca[marca.id]" :key="modelo.id">
            {{ modelo.nombre }} - Precio por día: {{ modelo.precioDia }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
    
<script>
//Cambiar el formato, tiene que listar las marcas y que se muestren siempre, cuando se haga click salgan los modelos de cada marca
export default {
  name: 'Marcas',
  data() {
    return {
      marcas: [],
      modelosPorMarca: {},
      marcaSeleccionada: null,
    };
  },
  mounted() {
    this.cargarMarcasConPrecioMedio();
  },
  methods: {
    async cargarMarcasConPrecioMedio() {
      try {
        const marcasRespuesta = await fetch('http://localhost:3000/marcas');
        const marcas = await marcasRespuesta.json();

        const modelosRespuesta = await fetch('http://localhost:3000/modelos');
        const modelos = await modelosRespuesta.json();

        const marcasConPrecioMedio = marcas.map(marca => {
          const modelosDeMarca = modelos.filter(modelo => modelo.idMarca === marca.id);
          const precioMedio = modelosDeMarca.reduce((acum, modelo) => acum + modelo.extraPorModelo, 0) / (modelosDeMarca.length || 1);
          return { ...marca, precioMedio };
        });

        this.marcas = marcasConPrecioMedio.sort((a, b) => b.precioMedio - a.precioMedio);
      } catch (error) {
        console.error('Error al cargar marcas y modelos:', error);
      }
    },

    async cargarModelos(marcaId) {
      this.marcaSeleccionada = marcaId;
      try {
        const modelosRespuesta = await fetch(`http://localhost:3000/modelos?marcaId=${marcaId}`);
        const modelos = await modelosRespuesta.json();
        this.modelosPorMarca = {
          ...this.modelosPorMarca,
          [marcaId]: modelos
        };
      } catch (error) {
        console.error(`Error al cargar modelos para la marca ${marcaId}:`, error);
      }
    }
  }
};
</script>
    
<style>

/* Contenedor Principal */
.menu-lateral {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: #333;
  padding: 20px;
}

.derecha {
  margin-left: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Lista de Marcas */
.listado-marcas {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%; 
}

.listado-marcas li {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.listado-marcas li:hover {
  transform: translateY(-5px);
}

/* Sublista de Modelos */
.listado-modelos {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
}

.listado-modelos li {
  background-color: #f9f9f9;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
}
</style>