"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"
import type * as THREE from "three"

function Particles({ count = 4000 }) {
  const points = useRef<THREE.Points>(null!)

  useFrame((state) => {
    points.current.rotation.x += 0.0006
    points.current.rotation.y += 0.001
  })

  const particlePositions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    particlePositions[i3] = (Math.random() - 0.5) * 15
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 15
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 15
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[particlePositions, 3]}
          count={count} 
          array={particlePositions} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.001} color="#baf3b8" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    meshRef.current.rotation.x += 0.005
    meshRef.current.rotation.y += 0.005
  })

  return (
    <Sphere ref={meshRef} args={[6, 64, 64]}>
      <meshStandardMaterial color="#000000" wireframe transparent opacity={1} />
    </Sphere>
  )
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 15] }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <AnimatedSphere />
        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

