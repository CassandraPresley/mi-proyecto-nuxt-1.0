<template>
  <div ref="container" style="width:100%; height:300px;"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const container = ref(null)

onMounted(async () => {
  const THREE = await import('three')

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xfff0f5)

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
  camera.position.z = 3.5

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(300, 300)
  container.value.appendChild(renderer.domElement)

  const light = new THREE.DirectionalLight(0xffffff, 2)
  light.position.set(3, 5, 5)
  scene.add(light)
  scene.add(new THREE.AmbientLight(0xffffff, 1))

  const pink = new THREE.MeshStandardMaterial({ color: 0xffa6c1 })
  const black = new THREE.MeshStandardMaterial({ color: 0x000000 })
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const nosePink = new THREE.MeshStandardMaterial({ color: 0xff6f91 })

  // CUERPO Y CABEZA
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), pink)
  body.position.y = -0.2
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 32), pink)
  head.position.y = 0.45

  // OREJAS
  const earGeom = new THREE.ConeGeometry(0.18, 0.4, 32)
  const ear1 = new THREE.Mesh(earGeom, pink)
  ear1.position.set(-0.25, 0.8, 0)
  ear1.rotation.z = 0.25
  const ear2 = new THREE.Mesh(earGeom, pink)
  ear2.position.set(0.25, 0.8, 0)
  ear2.rotation.z = -0.25

  // OJOS
  const eyeGeom = new THREE.SphereGeometry(0.08, 16, 16)
  const eye1 = new THREE.Mesh(eyeGeom, black)
  eye1.position.set(-0.15, 0.5, 0.35)
  const eye2 = new THREE.Mesh(eyeGeom, black)
  eye2.position.set(0.15, 0.5, 0.35)
  const shineGeom = new THREE.SphereGeometry(0.03, 8, 8)
  const shine1 = new THREE.Mesh(shineGeom, white)
  shine1.position.set(-0.12, 0.52, 0.38)
  const shine2 = new THREE.Mesh(shineGeom, white)
  shine2.position.set(0.18, 0.52, 0.38)

  // NARIZ
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), nosePink)
  nose.position.set(0, 0.45, 0.42)

  // BIGOTES
  const whiskerMat = new THREE.LineBasicMaterial({ color: 0x000000 })
  const whiskers = []
  const whiskerLength = 0.25
  for (let i = -1; i <= 1; i += 2) {
    for (let y = 0.44; y <= 0.46; y += 0.02) {
      const points = [new THREE.Vector3(i * 0.04, y, 0.42), new THREE.Vector3(i * (0.04 + whiskerLength), y, 0.43)]
      whiskers.push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), whiskerMat))
    }
  }

  // PATITAS
  const pawGeom = new THREE.SphereGeometry(0.18, 16, 16)
  const paw1 = new THREE.Mesh(pawGeom, pink)
  paw1.position.set(-0.35, -0.2, 0.3)
  const paw2 = new THREE.Mesh(pawGeom, pink)
  paw2.position.set(0.35, -0.2, 0.3)
  const paw3 = new THREE.Mesh(pawGeom, pink)
  paw3.position.set(-0.3, -0.45, -0.25)
  const paw4 = new THREE.Mesh(pawGeom, pink)
  paw4.position.set(0.3, -0.45, -0.25)

  // COLA KAWAII — más curva y animada
  const tailGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.7, 16)
  const tail = new THREE.Mesh(tailGeom, pink)
  tail.position.set(0, -0.2, -0.45)
  tail.rotation.x = Math.PI / 4
  tail.rotation.z = 0

  // GRUPO
  const cat = new THREE.Group()
  cat.add(body, head, ear1, ear2, eye1, eye2, shine1, shine2, nose, paw1, paw2, paw3, paw4, tail, ...whiskers)

  // Escala y centrado
  cat.scale.set(1.5, 1.5, 1.5)
  cat.position.set(0, -0.1, 0)

  scene.add(cat)

  const clock = new THREE.Clock()
  const animate = () => {
    requestAnimationFrame(animate)
    const t = clock.getElapsedTime()
    cat.rotation.y = Math.sin(t * 0.5) * 0.15
    cat.position.y = Math.sin(t * 2) * 0.02

    // 🔹 Animación de la colita
    tail.rotation.z = Math.sin(t * 4) * 0.5 + 0.2 // se mueve suavemente y curvada

    renderer.render(scene, camera)
  }

  animate()
})
</script>