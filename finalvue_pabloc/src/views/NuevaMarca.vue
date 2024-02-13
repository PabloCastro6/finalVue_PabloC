<template>
    <p>Nueva Marca</p>
    <form @submit.prevent="crearMarca">
        <label for="nombre">Nombre</label><input id="nombre" v-model="nombre" type="text"><br>
        <label for="año">Año</label><input id="año" v-model="año" type="number"><br>
        <label for="pais">Pais</label><input id="pais" v-model="pais" type="text">
        <button type="submit">Crear</button>
    </form>
</template>
    
<script>
import bbdd from '@/assets/bbdd.json'
export default {
    name: 'NuevaMarca',
    data() {
        return {
            nombre:"",
            año:null,
            pais:""
        }
    },
    methods: {
        crearMarca() {
            console.log(this.nombre,this.año,this.pais)
            console.log(bbdd)

        }
    }
 


}
</script>
    
<style></style>