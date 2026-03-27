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

    <!-- MENU -->
    <nav class="menu">
      <a href="#inicio">Inicio</a>
      <a href="#about">Sobre mí</a>
      <a href="#contact">Contacto</a>
    </nav>

    <!-- BOTÓN CONTACTO -->
    <button class="contact-btn" @click="toggleForm">
      📩 Contacto
    </button>

    <!-- estrellas -->
    <div class="stars"></div>

    <!-- soles -->
    <div class="sun sun1"></div>
    <div class="sun sun2"></div>
    <div class="sun sun3"></div>

    <!-- TARJETA -->
    <div id="inicio" class="card">

      <button class="toggle-btn" @click="toggleMode">
        {{ darkMode ? "🌙 Modo Noche" : "☀️ Modo Día" }}
      </button>

      <img src="/cass.jpg" class="cat" alt="foto" />

      <h1 id="about">
        ING. ROWEENA ISADORA<br>SÁNCHEZ FLORES
      </h1>

      <h2>Ingeniería en Tecnologías de la Información</h2>

      <div class="divider"></div>

      <p>💡 Habilidades: Manualidades, dibujar, cosplay, fotografía, páginas web y edits para TikTok</p>

      <p>📞 5526747793</p>

      <p>📧 ISAWOODSPINES@GMAIL.COM</p>

      <p>💗 Amo a Caifanes, Elvis Presley y los gatos</p>

      <div class="divider"></div>

      <p>Ciudad de México ✨</p>

      <!-- REDES -->
      <div id="contact" class="socials">

        <a href="https://www.facebook.com/Dark.Star.2412/" target="_blank" class="social-btn fb">
          Facebook
        </a>

        <a href="https://www.instagram.com/cass.presley1/" target="_blank" class="social-btn ig">
          Instagram
        </a>

        <a href="https://www.tiktok.com/@luzbel_morningstar1" target="_blank" class="social-btn tt">
          TikTok
        </a>

      </div>

    </div>

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
html{
  scroll-behavior:smooth;
}

body{
  margin:0;
  font-family:Arial;
}

.container{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  overflow:hidden;
  position:relative;
  transition:background 0.5s;
}

.day{
  background:linear-gradient(180deg,#a2d2ff,#bde0fe,#ffffff);
}

.night{
  background:black;
}

/* MENU */
.menu{
  position:fixed;
  top:20px;
  left:20px;
  display:flex;
  gap:15px;
  z-index:10;
}

.menu a{
  color:white;
  text-decoration:none;
  font-weight:bold;
}

/* BOTÓN CONTACTO */
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
  z-index:9999;
}

/* ESTRELLAS */
.stars{
  position:absolute;
  width:100%;
  height:100%;
  background:url("https://www.transparenttextures.com/patterns/stardust.png");
  animation: moveStars 60s linear infinite;
  opacity:0;
  transition:opacity 0.5s;
}

.night .stars{
  opacity:0.5;
}

@keyframes moveStars{
  0%{background-position:0 0;}
  100%{background-position:1000px 1000px;}
}

/* SOLES */
.sun{
  position:absolute;
  width:120px;
  height:120px;
  background:radial-gradient(circle,#fff176,#facc15,#f59e0b);
  border-radius:50%;
  box-shadow:0 0 40px #facc15;
  opacity:0;
  animation: floatSun 8s ease-in-out infinite;
  transition:opacity 0.5s;
}

.day .sun{
  opacity:0.8;
}

.night .sun{
  opacity:0;
}

.sun1{ top:80px; left:120px; }
.sun2{ bottom:120px; right:150px; }
.sun3{ top:200px; right:300px; }

@keyframes floatSun{
  0%{transform:translateY(0);}
  50%{transform:translateY(-20px);}
  100%{transform:translateY(0);}
}

/* TARJETA */
.card{
  position:relative;
  z-index:2;
  width:350px;
  background:#111;
  color:white;
  padding:30px;
  border-radius:20px;
  text-align:center;
  box-shadow:0 0 25px purple;
}

.cat{
  width:140px;
  border-radius:50%;
  border:4px solid purple;
  margin-bottom:15px;
}

.divider{
  height:2px;
  background:purple;
  margin:20px 0;
}

.toggle-btn{
  padding:10px 20px;
  border:none;
  border-radius:20px;
  background:purple;
  color:white;
  cursor:pointer;
  margin-bottom:15px;
}

/* REDES */
.socials{
  margin-top:20px;
  display:flex;
  justify-content:center;
  gap:15px;
}

.social-btn{
  padding:10px 20px;
  border-radius:20px;
  text-decoration:none;
  color:white;
  font-weight:bold;
  transition:0.3s;
}

.fb{ background:#1877f2; }

.ig{
  background:linear-gradient(45deg,#f58529,#dd2a7b,#8134af,#515bd4);
}

.tt{
  background:black;
}

.social-btn:hover{
  transform:scale(1.1);
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
  z-index:10000;
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
}

.close-btn{
  background:red;
  color:white;
  padding:10px;
  border:none;
  border-radius:10px;
}
</style>