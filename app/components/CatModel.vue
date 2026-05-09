<script setup>
import { onMounted, ref } from "vue"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const container = ref(null)

onMounted(() => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f5f5)

  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer({ antialias: true })

  // 🔥 TAMAÑO CONTROLADO
  renderer.setSize(250, 250)

  container.value.appendChild(renderer.domElement)

  // 💡 luces
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(5, 5, 5)
  scene.add(light)

  const ambient = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambient)

  // 🐱 modelo
  const loader = new GLTFLoader()
  loader.load(
    "https://threejs.org/examples/models/gltf/Flamingo.glb",
    (gltf) => {
      const cat = gltf.scene

      cat.scale.set(0.02, 0.02, 0.02)

      // 🔥 centrar
      const box = new THREE.Box3().setFromObject(cat)
      const center = box.getCenter(new THREE.Vector3())
      cat.position.sub(center)

      // 🔥 enderezar modelo
      cat.rotation.x = Math.PI / 2

      scene.add(cat)
    }
  )

  // 🎯 cámara
  camera.position.set(0, 1, 3)

  // 🖱️ controles
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 2
  controls.maxDistance = 5
  controls.enablePan = false

  // 🔄 animación
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<template>
  <!-- 🔥 contenedor controlado -->
  <div ref="container" class="container-3d"></div>
</template>

<style>
/* ✅ SOLO afecta el modelo 3D */
.container-3d {
  width: 250px;
  height: 250px;
  margin: 20px auto;
}
</style>