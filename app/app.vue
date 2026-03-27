<template>
  <div :class="['container', darkMode ? 'dark' : 'light']">

    <!-- FONDO ANIMADO DE ESTRELLAS (NOCHE) -->
    <div v-if="darkMode" class="stars-bg">
      <div class="star" v-for="n in 50" :key="'star-'+n" :style="starStyle(n)"></div>
    </div>

    <!-- FONDO ANIMADO DE GATITOS (DÍA) -->
    <div v-if="!darkMode" class="cats-bg">
      <div class="floating-cat" v-for="n in 8" :key="'cat-'+n" :style="catStyle(n)">🐱</div>
    </div>

    <div class="card">

      <!-- BOTÓN MODO OSCURO/CLARO -->
      <button class="toggle-btn" @click="toggleMode">
        {{ darkMode ? "🌙 Modo Noche" : "☀️ Modo Día" }}
      </button>

      <!-- MENÚ DE NAVEGACIÓN -->
      <nav class="nav-menu">
        <button
          :class="['nav-btn', seccionActiva === 'inicio' ? 'active' : '']"
          @click="seccionActiva = 'inicio'">
          🏠 Inicio
        </button>
        <button
          :class="['nav-btn', seccionActiva === 'acerca' ? 'active' : '']"
          @click="seccionActiva = 'acerca'">
          👤 Acerca de Mí
        </button>
        <button
          :class="['nav-btn', seccionActiva === 'contacto' ? 'active' : '']"
          @click="seccionActiva = 'contacto'">
          📞 Contacto
        </button>
        <button
          :class="['nav-btn', seccionActiva === 'proyectos' ? 'active' : '']"
          @click="seccionActiva = 'proyectos'">
          📂 Proyectos
        </button>
      </nav>

      <!-- SECCIÓN: INICIO -->
      <div v-if="seccionActiva === 'inicio'" class="seccion">
        <img src="/cass.jpg" class="cat" alt="Foto" />
        <h1>ROWEENA ISADORA<br />SÁNCHEZ FLORES</h1>
        <h2>Ingeniería en Tecnologías de la Información y Comunicaciones</h2>
        <div class="divider"></div>
        <div class="skills">
          💡 <strong>Habilidades:</strong><br />
          Manualidades y creación de páginas web
        </div>
        <p class="info">💗 <strong>Gustos:</strong><br />
          AMO CAIFANES, A ELVIS PRESLEY,HACER MANUALIDADES,ESCUCHAR MÚSICA,VER ANIME ,HACER COSPLAY, EDITS DE COSAS QUE ME GUSTAN Y A LOS GATITOS ESPONJOSOS
        </p>

        <!-- REDES SOCIALES (CORREGIDAS) -->
        <div class="social-links">
          <a href="https://www.facebook.com/Dark.Star.2412" target="_blank" rel="noopener noreferrer" class="social-btn facebook">📘 Facebook</a>
          <a href="https://www.instagram.com/cass.presley1/" target="_blank" rel="noopener noreferrer" class="social-btn instagram">📸 Instagram</a>
          <a href="https://www.tiktok.com/@luzbel_morningstar1?_r=1&amp;_t=ZS-94wPYviIv4S" target="_blank" rel="noopener noreferrer" class="social-btn tiktok">🎵 TikTok</a>
        </div>

        <p class="footer">Ciudad de México, México 💜✨</p>
      </div>

      <!-- SECCIÓN: ACERCA DE MÍ -->
      <div v-if="seccionActiva === 'acerca'" class="seccion">
        <h3>👤 Acerca de Mí</h3>
        <div class="divider"></div>
        <p class="about-text">
          ¡Hola! Soy <strong>Roweena Isadora Sánchez Flores</strong>,
          Ingeniera en Tecnologías de la Información y Comunicaciones.
        </p>
        <p class="about-text">
          Me gusta la tecnología,los ultimos avances tecnológicos las manualidades y crear páginas web .
          En mi tiempo libre disfruto escuchando a Caifanes y Elvis Presley
          mientras acaricio gatitos esponjosos,tomando un cafesito con leche . 🐱
        </p>,
        <p class="about-text">
          <strong>Mi misión:</strong> Combinar creatividad y tecnología
          para desarrollar soluciones innovadoras.
        </p>
      </div>

      <!-- SECCIÓN: CONTACTO -->
      <div v-if="seccionActiva === 'contacto'" class="seccion">
        <h3>📞 Contacto</h3>
        <div class="divider"></div>
        <p class="contactame">✨ ¡Contáctame! ✨</p>
        <div class="contact-info">
          <p class="info">📞 <strong>Teléfono:</strong> 5526747793</p>
          <p class="info">📧 <strong>Correo:</strong><br />ISAWOODSPINES@GMAIL.COM</p>
          <p class="info">📍 <strong>Ubicación:</strong> Ciudad de México, México</p>
        </div>

<div class="social-links">
  <a href="https://www.facebook.com/Dark.Star.2412" target="_blank" rel="noopener noreferrer" class="social-btn facebook" aria-label="Facebook en nueva pestaña">📘 Facebook</a>
  <a href="https://www.instagram.com/cass.presley1/" target="_blank" rel="noopener noreferrer" class="social-btn instagram" aria-label="Instagram en nueva pestaña">📸 Instagram</a>
  <a href="https://www.tiktok.com/@luzbel_morningstar1?_r=1&amp;_t=ZS-94wPYviIv4S" target="_blank" rel="noopener noreferrer" class="social-btn tiktok" aria-label="TikTok en nueva pestaña">🎵 TikTok</a>
</div>
        <p class="mensaje-contacto">
          ¡Estoy disponible para proyectos y colaboraciones!
          No dudes en escribirme. 💜
        </p>
      </div>

      <!-- SECCIÓN: PROYECTOS CON FORMULARIO -->
      <div v-if="seccionActiva === 'proyectos'" class="seccion">
        <h3>📂 Proyectos</h3>
        <div class="divider"></div>

        <form @submit.prevent="guardarProyecto" class="form-proyecto">
          <div class="form-group">
            <label>Nombre del Proyecto:</label>
            <input v-model="nuevoProyecto.nombre" type="text" required placeholder="Ej: Mi página web" />
          </div>
          <div class="form-group">
            <label>Descripción:</label>
            <textarea v-model="nuevoProyecto.descripcion" required placeholder="Describe tu proyecto..."></textarea>
          </div>
          <div class="form-group">
            <label>Tecnologías usadas:</label>
            <input v-model="nuevoProyecto.tecnologias" type="text" placeholder="Ej: HTML, CSS, Vue" />
          </div>
          <button type="submit" class="btn-guardar">💾 Guardar Proyecto</button>
        </form>

        <div v-if="proyectosGuardados.length > 0" class="proyectos-lista">
          <h4>📋 Proyectos Guardados:</h4>
          <div v-for="(proyecto, index) in proyectosGuardados" :key="index" class="proyecto-item">
            <strong>{{ proyecto.nombre }}</strong>
            <p>{{ proyecto.descripcion }}</p>
            <small>🛠️ {{ proyecto.tecnologias }}</small>
            <button @click="eliminarProyecto(index)" class="btn-eliminar">❌</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const darkMode = ref(false);
function toggleMode() {
  darkMode.value = !darkMode.value;
}

const seccionActiva = ref('inicio');

const nuevoProyecto = reactive({
  nombre: '',
  descripcion: '',
  tecnologias: ''
});

const proyectosGuardados = ref([]);

function guardarProyecto() {
  proyectosGuardados.value.push({
    nombre: nuevoProyecto.nombre,
    descripcion: nuevoProyecto.descripcion,
    tecnologias: nuevoProyecto.tecnologias
  });
  nuevoProyecto.nombre = '';
  nuevoProyecto.descripcion = '';
  nuevoProyecto.tecnologias = '';
  alert('¡Proyecto guardado! 🎉');
}

function eliminarProyecto(index) {
  proyectosGuardados.value.splice(index, 1);
}

// Función para posicionar estrellas aleatoriamente
function starStyle(n) {
  const size = Math.random() * 3 + 1;
  return {
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    width: size + 'px',
    height: size + 'px',
    animationDelay: Math.random() * 3 + 's',
    animationDuration: (Math.random() * 2 + 1) + 's'
  };
}

// Función para posicionar gatitos aleatoriamente
function catStyle(n) {
  return {
    left: Math.random() * 90 + '%',
    top: Math.random() * 90 + '%',
    fontSize: (Math.random() * 20 + 15) + 'px',
    animationDelay: Math.random() * 5 + 's',
    animationDuration: (Math.random() * 4 + 3) + 's'
  };
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.5s ease;
  position: relative;
  overflow: hidden;
}

.light {
  background: linear-gradient(135deg, #f3e8ff, #d8b4fe);
}

.dark {
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
}

/* ===== FONDO DE ESTRELLAS (NOCHE) ===== */
.stars-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle 2s infinite ease-in-out;
  box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.5);
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

/* ===== FONDO DE GATITOS (DÍA) ===== */
.cats-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-cat {
  position: absolute;
  animation: floatCat 5s infinite ease-in-out;
  opacity: 0.6;
}

@keyframes floatCat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(-5deg); }
  75% { transform: translateY(-25px) rotate(3deg); }
}

/* ===== TARJETA ===== */
.card {
  width: 380px;
  padding: 25px;
  border-radius: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.dark .card {
  background: rgba(31, 41, 55, 0.95);
  color: white;
}

.cat {
  width: 130px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 4px solid #a855f7;
}

h1 { font-size: 20px; color: #6b21a8; margin: 10px 0; }
.dark h1 { color: #e9d5ff; }
h2 { font-size: 13px; color: #7c3aed; margin-bottom: 10px; }
.dark h2 { color: #c4b5fd; }
h3 { color: #7c3aed; margin-bottom: 10px; }
.dark h3 { color: #c084fc; }

.divider {
  height: 2px;
  background: #c084fc;
  margin: 15px 0;
}

.skills {
  background: #f3e8ff;
  padding: 12px;
  border-radius: 12px;
  font-size: 13px;
  margin-bottom: 12px;
}

.dark .skills { background: #374151; }

.info { font-size: 13px; margin: 8px 0; }
.footer { margin-top: 15px; font-size: 14px; }

.toggle-btn {
  margin-bottom: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background: #a855f7;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: #9333ea;
  transform: scale(1.05);
}

/* ===== REDES SOCIALES ===== */
.social-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 15px 0;
}

.social-btn {
  padding: 8px 15px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s;
  color: white;
}

.social-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.social-btn.facebook { background: linear-gradient(135deg, #1877f2, #0d5bbd); }
.social-btn.instagram { background: linear-gradient(135deg, #e1306c, #833ab4, #fd1d1d); }
.social-btn.whatsapp { background: linear-gradient(135deg, #25d366, #128c7e); }
.social-btn.tiktok { background: linear-gradient(135deg, #000000, #ff0050); }
.social-btn.twitter { background: linear-gradient(135deg, #1da1f2, #0d8ecf); }

/* ===== MENÚ DE NAVEGACIÓN ===== */
.nav-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-bottom: 20px;
}

.nav-btn {
  padding: 8px 12px;
  border: 2px solid #a855f7;
  border-radius: 12px;
  background: transparent;
  color: #a855f7;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.nav-btn:hover, .nav-btn.active {
  background: #a855f7;
  color: white;
  transform: scale(1.05);
}

.dark .nav-btn { border-color: #c084fc; color: #c084fc; }
.dark .nav-btn:hover, .dark .nav-btn.active { background: #c084fc; color: #1f2937; }

.seccion { animation: fadeIn 0.4s ease; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.about-text { font-size: 13px; margin: 10px 0; text-align: left; line-height: 1.6; }

.contactame { font-size: 22px; color: #a855f7; font-weight: bold; margin: 15px 0; }
.dark .contactame { color: #c084fc; }

.contact-info { background: #f3e8ff; padding: 15px; border-radius: 15px; margin: 15px 0; }
.dark .contact-info { background: #374151; }

.mensaje-contacto { font-size: 12px; font-style: italic; margin-top: 15px; }

.form-proyecto { text-align: left; }

.form-group { margin-bottom: 12px; }

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #6b21a8;
}

.dark .form-group label { color: #c084fc; }

.form-group input, .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #c084fc;
  border-radius: 10px;
  font-size: 12px;
  box-sizing: border-box;
}

.form-group textarea { height: 70px; resize: none; }

.dark .form-group input, .dark .form-group textarea {
  background: #374151;
  color: white;
  border-color: #7c3aed;
}

.btn-guardar {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-guardar:hover {
  transform: scale(1.02);
  box-shadow: 0 5px 15px rgba(168, 85, 247, 0.4);
}

.proyectos-lista { margin-top: 20px; text-align: left; }

.proyectos-lista h4 { color: #7c3aed; margin-bottom: 10px; font-size: 14px; }
.dark .proyectos-lista h4 { color: #c084fc; }

.proyecto-item {
  background: #f3e8ff;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
}

.dark .proyecto-item { background: #374151; }

.proyecto-item strong { color: #6b21a8; font-size: 14px; }
.dark .proyecto-item strong { color: #e9d5ff; }

.proyecto-item p { font-size: 12px; margin: 5px 0; }

.proyecto-item small { font-size: 11px; color: #7c3aed; }
.dark .proyecto-item small { color: #a78bfa; }

.btn-eliminar {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
}
</style>