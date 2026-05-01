<template>
  <div :class="['container', darkMode ? 'dark' : 'light']">

    <!-- 🌸 SAKURA -->
    <div v-if="!darkMode" class="sakura">
      <span v-for="n in 30" :key="'petal'+n" class="petal" :style="petalStyle()"></span>
    </div>

    <!-- ✨ BRILLOS -->
    <div class="sparkles">
      <span v-for="n in 25" :key="'spark'+n" class="spark" :style="sparkStyle()"></span>
    </div>

    <!-- 🌙 ESTRELLAS -->
    <div v-if="darkMode" class="stars-bg">
      <div class="star" v-for="n in 60" :key="n" :style="starStyle()"></div>
    </div>

    <!-- 🐱 GATITOS -->
    <div v-else class="cats-bg">
      <div class="floating-cat" v-for="n in 12" :key="n" :style="catStyle()">🐱</div>
    </div>

    <!-- 💎 TARJETA -->
    <div class="card">

      <!-- BOTÓN -->
      <button class="toggle-btn" @click="toggleMode">
        {{ darkMode ? "🌙 Noche" : "☀️ Kawaii" }}
      </button>

      <!-- NAV -->
      <nav class="nav-menu">
        <button :class="{active: seccionActiva==='inicio'}" @click="seccionActiva='inicio'">🏠</button>
        <button :class="{active: seccionActiva==='acerca'}" @click="seccionActiva='acerca'">👤</button>
        <button :class="{active: seccionActiva==='contacto'}" @click="seccionActiva='contacto'">📞</button>
        <button :class="{active: seccionActiva==='proyectos'}" @click="seccionActiva='proyectos'">📂</button>
      </nav>

      <!-- INICIO -->
      <div v-if="seccionActiva==='inicio'" class="fade">
        <img src="/cass.jpg" class="cat">

        <ClientOnly>
          <ThreeModel />
        </ClientOnly>

        <h1>Roweena Isadora Sánchez Flores</h1>
        <p class="subtitle">Ingeniería en TIC 💜</p>
      </div>

      <!-- ACERCA -->
      <div v-if="seccionActiva==='acerca'" class="fade">
        <h3>Sobre mí</h3>
        <p>Me gusta crear páginas web, los gatitos 🐱, cosplay, anime y café ☕</p>
      </div>

      <!-- CONTACTO -->
      <div v-if="seccionActiva==='contacto'" class="fade">
        <p>📧 isawoodspines@gmail.com</p>
        <p>📞 5526747793</p>

        <div class="social-links">
          <a href="https://www.facebook.com/Dark.Star.2412" target="_blank">Facebook</a>
          <a href="https://www.instagram.com/cass.presley1/" target="_blank">Instagram</a>
          <a href="https://www.tiktok.com/@luzbel_morningstar1" target="_blank">TikTok</a>
        </div>
      </div>

      <!-- PROYECTOS -->
      <div v-if="seccionActiva==='proyectos'" class="fade">

        <!-- 🔥 BOTÓN NUEVO -->
        <div style="margin-bottom:15px;">
          <button class="btn-vercel" @click="irAPizzeria">
            🍕 Ver Pizzería Elmos
          </button>
        </div>

        <form @submit.prevent="guardarProyecto" class="form">

          <input v-model="nuevoProyecto.nombreUsuario" placeholder="Nombre completo" required>
          <input v-model="nuevoProyecto.correo" placeholder="Correo electrónico" required>
          <input v-model="nuevoProyecto.telefono" placeholder="Teléfono" required>
          <input v-model="nuevoProyecto.nombre" placeholder="Nombre del proyecto ✨" required>
          <textarea v-model="nuevoProyecto.descripcion" placeholder="Descripción..." required></textarea>
          <input v-model="nuevoProyecto.tecnologias" placeholder="Tecnologías 💻">

          <button :disabled="loading">
            <span v-if="!loading">💾 Guardar</span>
            <span v-else class="loader"></span>
          </button>

        </form>

        <p v-if="mensaje" class="mensaje-ok">{{ mensaje }}</p>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineAsyncComponent } from "vue"

const ThreeModel = defineAsyncComponent(() =>
  import("./components/ThreeModel.vue")
)

const darkMode = ref(false)
const seccionActiva = ref('inicio')
const loading = ref(false)
const mensaje = ref('')

function toggleMode() {
  darkMode.value = !darkMode.value
}

// 🔥 FUNCIÓN NUEVA
function irAPizzeria() {
  window.open("https://pizzeria-elmos.vercel.app/", "_blank")
}

const nuevoProyecto = reactive({
  nombreUsuario:'', correo:'', telefono:'',
  nombre:'', descripcion:'', tecnologias:''
})

async function guardarProyecto() {
  loading.value = true
  mensaje.value = ''

  try {
    const formData = new URLSearchParams()
    formData.append('nombreUsuario', nuevoProyecto.nombreUsuario)
    formData.append('correo', nuevoProyecto.correo)
    formData.append('telefono', nuevoProyecto.telefono)
    formData.append('nombreProyecto', nuevoProyecto.nombre)
    formData.append('descripcion', nuevoProyecto.descripcion)
    formData.append('tecnologias', nuevoProyecto.tecnologias)

    await fetch('https://script.google.com/macros/s/AKfycbxdFNOmCV7jqUhlplBIIAPggEjS_eBIWvGSzifncLtArW3VLoaGfkiP-efbtFb6BX5y/exec', {
      method: 'POST',
      body: formData
    })

    mensaje.value = "💜 Guardado con éxito"
    Object.keys(nuevoProyecto).forEach(k => nuevoProyecto[k] = '')

  } catch (err) {
    console.error(err)
    mensaje.value = "❌ Error al guardar"
  } finally {
    loading.value = false
  }
}

/* ANIMACIONES */
function starStyle() {
  return { left:Math.random()*100+'%', top:Math.random()*100+'%', width:(Math.random()*3+1)+'px', height:(Math.random()*3+1)+'px' }
}
function catStyle() {
  return { left:Math.random()*100+'%', top:Math.random()*100+'%', fontSize:(Math.random()*20+15)+'px' }
}
function petalStyle() {
  return { left:Math.random()*100+'%', animationDuration:(Math.random()*5+5)+'s', animationDelay:Math.random()*5+'s' }
}
function sparkStyle() {
  return { left:Math.random()*100+'%', top:Math.random()*100+'%', animationDelay:Math.random()*3+'s' }
}
</script>

<style>
/* TU CSS ORIGINAL */
.container{min-height:100vh; display:flex; justify-content:center; align-items:center; overflow:hidden; font-family:'Segoe UI',sans-serif;}
.light{background:linear-gradient(135deg,#fbcfe8,#ddd6fe);}
.dark{background:linear-gradient(135deg,#0f0c29,#302b63);}
.sakura{position:fixed;width:100%;height:100%;}
.petal{position:absolute;width:12px;height:12px;background:pink;border-radius:50% 50% 50% 0;animation:fall linear infinite;}
@keyframes fall{0%{transform:translateY(-10vh) rotate(0);}100%{transform:translateY(110vh) rotate(360deg);} }
.sparkles{position:fixed;width:100%;height:100%;}
.spark{position:absolute;width:3px;height:3px;background:white;border-radius:50%;animation:twinkle 2s infinite;}
.stars-bg{position:fixed;width:100%;height:100%;}
.star{position:absolute;background:white;border-radius:50%;}
.cats-bg{position:fixed;width:100%;height:100%;}
.floating-cat{position:absolute;animation:float 6s infinite;}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-20px);} }
.card{background:rgba(255,255,255,0.9);backdrop-filter:blur(15px);padding:30px;border-radius:25px;width:360px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);z-index:1;}
.nav-menu button{margin:5px;padding:10px;border:none;border-radius:15px;background:#eee;}
.active{background:linear-gradient(135deg,#a855f7,#ec4899);color:white;}
.cat{width:140px;border-radius:50%;border:4px solid #a855f7;}
.form input,.form textarea{width:100%;margin:10px 0;padding:12px;border-radius:15px;border:2px solid #ddd;}
.form button{width:100%;padding:12px;border-radius:20px;background:linear-gradient(135deg,#a855f7,#ec4899);color:white;}
.social-links{display:flex;justify-content:center;gap:10px;}
.social-links a{padding:8px 12px;border-radius:15px;background:#a855f7;color:white;}
.loader{border:3px solid white;border-top:3px solid transparent;border-radius:50%;width:18px;height:18px;animation:spin 1s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.fade{animation:fade 0.4s;}
@keyframes fade{from{opacity:0;transform:translateY(10px);}to{opacity:1;}}

/* 🔥 BOTÓN NUEVO */
.btn-vercel {
  width: 100%;
  padding: 12px;
  border-radius: 20px;
  border: none;
  background: linear-gradient(135deg,#ff7a18,#ffb347);
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn-vercel:hover {
  transform: scale(1.05);
}
</style>