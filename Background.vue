<script setup>
import { ref } from "vue"

const darkMode = ref(false)
const showForm = ref(false)

function toggleMode(){
  darkMode.value = !darkMode.value
}

function toggleForm(){
  showForm.value = !showForm.value
}
</script>

<template>

<div :class="['container', darkMode ? 'night' : 'day']">

  <!-- fondo -->
  <div class="retro-background"></div>

  <!-- estrellas -->
  <div class="stars"></div>

  <!-- luna -->
  <div class="moon"></div>

  <!-- cometas -->
  <div class="comet comet1"></div>
  <div class="comet comet2"></div>
  <div class="comet comet3"></div>

  <!-- botón modo -->
  <button class="toggle" @click="toggleMode">
    {{ darkMode ? "🌙 Modo Noche" : "☀️ Modo Día" }}
  </button>

  <!-- BOTÓN CONTACTO -->
  <button class="contact-btn" @click="toggleForm">
    📩 Contacto
  </button>

  <!-- FORMULARIO -->
  <div v-if="showForm" class="formulario">
    <h2>Contáctame</h2>

    <input type="text" placeholder="Tu nombre" />
    <input type="email" placeholder="Tu correo" />
    <textarea placeholder="Tu mensaje"></textarea>

    <button class="send-btn">Enviar</button>
    <button class="close-btn" @click="toggleForm">Cerrar</button>
  </div>

</div>

</template>

<style>

/* contenedor */
.container{
min-height:100vh;
width:100%;
overflow:hidden;
position:relative;
}

/* BOTON MODO */
.toggle{
position:fixed;
top:20px;
left:20px;
padding:10px 20px;
background:#8b5cf6;
color:white;
border:none;
border-radius:20px;
cursor:pointer;
z-index:10;
}

/* BOTON CONTACTO */
.contact-btn{
position:fixed;
top:20px;
right:20px;
padding:10px 20px;
background:#ec4899;
color:white;
border:none;
border-radius:20px;
cursor:pointer;
z-index:10;
}

/* FORMULARIO */
.formulario{
position:fixed;
top:50%;
left:50%;
transform:translate(-50%, -50%);
background:#111;
color:white;
padding:30px;
border-radius:20px;
box-shadow:0 0 25px purple;
display:flex;
flex-direction:column;
gap:10px;
z-index:20;
width:300px;
}

.formulario input,
.formulario textarea{
padding:10px;
border:none;
border-radius:10px;
}

.send-btn{
background:green;
color:white;
padding:10px;
border:none;
border-radius:10px;
cursor:pointer;
}

.close-btn{
background:red;
color:white;
padding:10px;
border:none;
border-radius:10px;
cursor:pointer;
}

/* FONDO DIA */
.day .retro-background{
background: linear-gradient(
270deg,
#ffcad4,
#ffd6a5,
#caffbf,
#bde0fe,
#cdb4db
);
}

/* FONDO NOCHE */
.night .retro-background{
background: linear-gradient(
270deg,
#0f0c29,
#302b63,
#24243e,
#000000
);
}

.retro-background{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background-size:1000% 1000%;
animation: retroMove 20s ease infinite;
z-index:-10;
}

@keyframes retroMove{
0%{background-position:0% 50%;}
50%{background-position:100% 50%;}
100%{background-position:0% 50%;}
}

/* ESTRELLAS */
.stars{
position:fixed;
width:100%;
height:100%;
background-image:
radial-gradient(white 2px, transparent 2px),
radial-gradient(white 1px, transparent 1px);
background-size:60px 60px;
background-position:0 0,30px 30px;
opacity:0.5;
animation: starsMove 80s linear infinite;
z-index:-9;
}

@keyframes starsMove{
from{transform:translateY(0);}
to{transform:translateY(-800px);}
}

/* LUNA */
.moon{
position:fixed;
top:80px;
right:100px;
width:120px;
height:120px;
border-radius:50%;
background:radial-gradient(circle,#fff,#ddd,#bbb);
box-shadow:0 0 50px white;
z-index:-8;
}

/* COMETAS */
.comet{
position:fixed;
width:4px;
height:4px;
background:white;
border-radius:50%;
box-shadow:0 0 10px white,0 0 20px white;
animation: cometMove 6s linear infinite;
}

.comet1{
top:150px;
left:-100px;
animation-delay:0s;
}

.comet2{
top:300px;
left:-120px;
animation-delay:2s;
}

.comet3{
top:450px;
left:-140px;
animation-delay:4s;
}

@keyframes cometMove{
0%{
transform:translateX(0) translateY(0);
opacity:1;
}
100%{
transform:translateX(1400px) translateY(400px);
opacity:0;
}
}

</style>