<template>
    <p>Nueva Marca</p>
    <form @submit.prevent="crearMarca">
        <label for="nombre">Nombre</label><input id="nombre" v-model="nombre" type="text"><br>
        <label for="año">Año</label><input id="año" v-model="año" type="number"><br>
        <label for="pais">Pais</label><input id="pais" v-model="pais" type="text">
        <button type="submit">Crear Marca</button>
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
    
<style>
form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}


p {
    font-size: 24px;
    color: #333;
    text-align: center;
}


label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-size: 16px;
}


input[type="text"],
input[type="number"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}


button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

br {
    display: none;
}

</style>