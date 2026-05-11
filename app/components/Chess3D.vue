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
  renderer.setSize(400, 400)
  container.value.appendChild(renderer.domElement)

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  let selectedPiece = null

  const tiles = []
  const pieces = []

  // 💡 luces
  scene.add(new THREE.AmbientLight(0xffffff, 0.8))
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(5, 10, 5)
  scene.add(light)

  // ♟️ TABLERO
  for (let x = 0; x < 8; x++) {
    for (let z = 0; z < 8; z++) {
      const color = (x + z) % 2 === 0 ? 0xffffff : 0x444444

      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.1, 1),
        new THREE.MeshStandardMaterial({ color })
      )

      tile.position.set(x - 3.5, 0, z - 3.5)
      tile.userData = { type: "tile" }

      scene.add(tile)
      tiles.push(tile)
    }
  }

  // ♟️ CREAR PIEZA SEGÚN TIPO
  function crearPieza(tipo, color, x, z) {
    const material = new THREE.MeshStandardMaterial({
      color: color === "w" ? 0xffffff : 0x000000
    })

    let geometry

    switch (tipo) {
      case "p": geometry = new THREE.CylinderGeometry(0.25, 0.25, 0.6, 32); break
      case "r": geometry = new THREE.BoxGeometry(0.5, 0.7, 0.5); break
      case "n": geometry = new THREE.ConeGeometry(0.3, 0.8, 32); break
      case "b": geometry = new THREE.CylinderGeometry(0.2, 0.3, 0.9, 32); break
      case "q": geometry = new THREE.CylinderGeometry(0.3, 0.35, 1.1, 32); break
      case "k": geometry = new THREE.CylinderGeometry(0.35, 0.4, 1.2, 32); break
    }

    const pieza = new THREE.Mesh(geometry, material)

    pieza.position.set(x, 0.5, z)
    pieza.userData = { type: "piece" }

    scene.add(pieza)
    pieces.push(pieza)
  }

  // ♟️ TODAS LAS PIEZAS (32)
  const piezasIniciales = [
    // negras
    ["r","b",-3.5,3.5], ["n","b",-2.5,3.5], ["b","b",-1.5,3.5], ["q","b",-0.5,3.5],
    ["k","b",0.5,3.5], ["b","b",1.5,3.5], ["n","b",2.5,3.5], ["r","b",3.5,3.5],

    ...Array.from({length:8}, (_,i)=>["p","b",i-3.5,2.5]),

    // blancas
    ["r","w",-3.5,-3.5], ["n","w",-2.5,-3.5], ["b","w",-1.5,-3.5], ["q","w",-0.5,-3.5],
    ["k","w",0.5,-3.5], ["b","w",1.5,-3.5], ["n","w",2.5,-3.5], ["r","w",3.5,-3.5],

    ...Array.from({length:8}, (_,i)=>["p","w",i-3.5,-2.5]),
  ]

  piezasIniciales.forEach(p => {
    crearPieza(p[0], p[1], p[2], p[3])
  })

  // 🎥 cámara
  camera.position.set(0, 7, 7)
  camera.lookAt(0, 0, 0)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 🖱️ CLICK
  window.addEventListener("click", (event) => {
    const rect = renderer.domElement.getBoundingClientRect()

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children)

    if (intersects.length === 0) return

    const obj = intersects[0].object

    // seleccionar pieza
    if (obj.userData.type === "piece") {
      if (selectedPiece) {
        selectedPiece.material.emissive.set(0x000000)
      }

      selectedPiece = obj
      obj.material.emissive.set(0x00ff00)
      return
    }

    // mover pieza
    if (obj.userData.type === "tile" && selectedPiece) {
      selectedPiece.position.x = obj.position.x
      selectedPiece.position.z = obj.position.z

      selectedPiece.material.emissive.set(0x000000)
      selectedPiece = null
    }
  })

  // 🔁 loop
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