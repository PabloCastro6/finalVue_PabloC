<template>
    <p>Marcas</p>
    <div>
    <h1>Listado de Marcas</h1>
    <ul>
      <li v-for="marca in marcas" :key="marca.id">
        {{ marca.nombre }} - Precio medio: {{ marca.precioMedio.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>
    
<script>
export default {
  name: 'Marcas',
  data() {
    return {
      marcas: [],
    };
  },
  mounted() {
  /*  this.cargarMarcasConPrecioMedio();
  },
  methods: {
   /* async cargarMarcasConPrecioMedio() {
      try {
        //Obtener marcas
      let marcasRespuesta = await fetch('http://localhost:3000/marcas');
      let marcas = await marcasRespuesta.json();

      // Obtener modelos
      let modelosRespuesta = await fetch('http://localhost:3000/modelos');
      let modelos = await modelosRespuesta.json();

      // Calcular el precio medio de los modelos para cada marca
      let marcasConPrecioMedio = marcas.map(marca => {
        // Filtrar los modelos de esta marca
        let modelosDeMarca = modelos.filter(modelo => modelo.idMarca === marca.id);
        // Calcular el precio medio
        let precioMedio = 
        
        // Añadir el precio medio a la información de la marca
        return {
          ...marca,
          precioMedio: precioMedio || 0 // Si no hay modelos, el precio medio es 0
        };
    });

      } catch (error) {
        console.error('Error al cargar marcas y modelos:', error);
      }
    },*/
  },
};
</script>
    
<style></style>