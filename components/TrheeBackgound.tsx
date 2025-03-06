"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";

function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  
  // Convert HSL to RGB for Three.js
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
  
    return [r, g, b];
  };

  // Primary color in RGB
  const primaryColor = hslToRgb(142, 70, 50);
  
  useEffect(() => {
    if (!mesh.current) return;
    
    const geometry = mesh.current.geometry;
    const positions = geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      
      positions.setXYZ(i, x, y, z);
    }
    
    geometry.attributes.position.needsUpdate = true;
  }, [count]);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime() * 0.1;
    mesh.current.rotation.x = time * 0.1;
    mesh.current.rotation.y = time * 0.15;
    
    const positions = mesh.current.geometry.attributes.position;
    const sizes = mesh.current.geometry.attributes.size;
    
    for (let i = 0; i < positions.count; i++) {
      sizes.array[i] = 0.5 + 0.5 * Math.sin(i + time * 5);
    }
    
    mesh.current.geometry.attributes.size.needsUpdate = true;
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(count * 3), 3]}
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[new Float32Array(count), 1]}
          count={count}
          array={new Float32Array(count)}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation={true}
        color={new THREE.Color(primaryColor[0], primaryColor[1], primaryColor[2])}
        transparent
        opacity={0.8}
      />
    </points>
  );
}

function Grid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame(({ clock }) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (clock.getElapsedTime() * 0.15) % 1;
  });
  
  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, new THREE.Color(0x14b864), new THREE.Color(0x14b864)]}
      position={[0, -5, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
}

function FloatingLights() {
  const group = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    
    group.current.children.forEach((light, i) => {
      const x = Math.sin(t * 0.2 + i * Math.PI * 2 / 5) * 8;
      const y = Math.cos(t * 0.2 + i * Math.PI * 2 / 5) * 8;
      const z = Math.sin(t * 0.1 + i) * 2;
      
      light.position.set(x, y, z);
    });
  });
  
  return (
    <group ref={group}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color={new THREE.Color(0x14b864)} />
          <pointLight color={new THREE.Color(0x14b864)} intensity={1} distance={10} />
        </mesh>
      ))}
    </group>
  );
}

// Custom glow effect without postprocessing
function GlowParticles({ count = 100 }) {
  const particles = useRef<THREE.Points>(null);
  
  useEffect(() => {
    if (!particles.current) return;
    
    const geometry = particles.current.geometry;
    const positions = geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      
      positions.setXYZ(i, x, y, z);
    }
    
    geometry.attributes.position.needsUpdate = true;
  }, [count]);
  
  useFrame(({ clock }) => {
    if (!particles.current) return;
    
    const time = clock.getElapsedTime();
    particles.current.rotation.y = time * 0.05;
    
    const sizes = particles.current.geometry.attributes.size;
    
    for (let i = 0; i < sizes.count; i++) {
      sizes.array[i] = 2 + Math.sin(i * 0.5 + time) * 1;
    }
    
    sizes.needsUpdate = true;
  });
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(count * 3), 3]}
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[new Float32Array(count), 1]}
          count={count}
          array={new Float32Array(count)}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={3}
        sizeAttenuation={true}
        color={new THREE.Color(0x14b864)}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ThreeBackground() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.1} />
        <Particles />
        <Grid />
        <FloatingLights />
        <GlowParticles />
        <fog attach="fog" args={[0x000000, 5, 30]} />
      </Canvas>
    </div>
  );
}