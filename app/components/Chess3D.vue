<script setup>
import { onMounted, ref } from "vue"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const container = ref(null)

onMounted(() => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f5f5)

  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(250, 250)
  container.value.appendChild(renderer.domElement)

  // 💡 luces
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(5, 10, 5)
  scene.add(light)

  const ambient = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambient)

  // ♟️ TABLERO
  const size = 8
  const tileSize = 1

  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      const color = (x + z) % 2 === 0 ? 0xffffff : 0x333333

      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(tileSize, 0.1, tileSize),
        new THREE.MeshStandardMaterial({ color })
      )

      tile.position.set(
        x - size / 2 + 0.5,
        0,
        z - size / 2 + 0.5
      )

      scene.add(tile)
    }
  }

  // ♟️ FUNCION PARA CREAR PIEZAS
  function crearPieza(color, x, z) {
    const material = new THREE.MeshStandardMaterial({ color })

    // base
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32),
      material
    )
    base.position.set(x, 0.15, z)

    // cuerpo
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.25, 0.6, 32),
      material
    )
    body.position.set(x, 0.5, z)

    // cabeza
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 32),
      material
    )
    head.position.set(x, 0.9, z)

    scene.add(base, body, head)
  }

  // ♟️ PEONES
  for (let i = 0; i < 8; i++) {
    crearPieza(0xffffff, i - 3.5, -2.5) // blancas
    crearPieza(0x000000, i - 3.5, 2.5)  // negras
  }

  // 🎯 cámara
  camera.position.set(0, 6, 6)
  camera.lookAt(0, 0, 0)

  // 🖱️ controles
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enablePan = false
  controls.minDistance = 4
  controls.maxDistance = 10

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
  <div ref="container"></div>
</template>

<style>
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>