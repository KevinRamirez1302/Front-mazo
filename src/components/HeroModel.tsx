import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Box3, Vector3, PerspectiveCamera } from 'three'
import type { Group } from 'three'

// Vite procesa este import y genera la URL correcta en dev y producción
import characterGlb from '../assets/character.glb'

function CharacterModel() {
  const group = useRef<Group>(null)
  const { scene } = useGLTF(characterGlb)
  const { camera } = useThree()

  // Auto-centrar y auto-escalar el modelo para que quepa siempre completo
  useEffect(() => {
    if (!group.current) return

    const box = new Box3().setFromObject(group.current)
    const size = new Vector3()
    const center = new Vector3()
    box.getSize(size)
    box.getCenter(center)

    // Centrar el modelo en el origen
    group.current.position.sub(center)

    // Ajustar la cámara al bounding box real del modelo
    if (camera instanceof PerspectiveCamera) {
      const maxDim = Math.max(size.x, size.y, size.z)
      const fovRad = (camera.fov * Math.PI) / 180
      const distance = (maxDim / 2) / Math.tan(fovRad / 2)
      camera.position.set(0, 0, distance * 1.35) // margen del 35%
      camera.near = distance * 0.01
      camera.far = distance * 10
      camera.updateProjectionMatrix()
    }
  }, [scene, camera])

  // Rotación automática suave
  useFrame((_state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.4
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}

// Fallback mientras carga el modelo
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#93BFC7" wireframe />
    </mesh>
  )
}

export default function HeroModel() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Iluminación */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1.4} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#CBF3BB" />
      <pointLight position={[0, 6, 2]} intensity={0.5} color="#ffffff" />

      <Suspense fallback={<LoadingFallback />}>
        {/* Entorno HDR para reflejos realistas */}
        <Environment preset="city" />

        {/* El personaje — se auto-centra y auto-escala según su bounding box */}
        <CharacterModel />

        {/* Sombra suave debajo del personaje */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.25}
          scale={5}
          blur={2.5}
          far={2}
        />
      </Suspense>

      {/* Controles: el usuario puede rotar con el mouse */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.6}
        autoRotate={false}
      />
    </Canvas>
  )
}

// Precargar el modelo
useGLTF.preload(characterGlb)
