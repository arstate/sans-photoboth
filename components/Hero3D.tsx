import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Fix for TypeScript errors: "Property '...' does not exist on type 'JSX.IntrinsicElements'"
// This extends the global JSX namespace to include Three.js elements used in R3F.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshBasicMaterial: any;
      ambientLight: any;
      directionalLight: any;
      group: any;
    }
  }
}

const WireframeTorus = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotasi lambat dan elegan
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <Torus ref={meshRef} args={[3.2, 0.8, 32, 100]} rotation={[Math.PI / 4, 0, 0]}>
      {/* Warna wireframe beige/abu muda agar halus di background terang */}
      <meshBasicMaterial color="#E5E7EB" wireframe transparent opacity={0.4} />
    </Torus>
  );
};

const AnimatedSphere = ({ 
  position, 
  color, 
  speed = 1, 
  scale = 1, 
  distort = 0.4 
}: { 
  position: [number, number, number], 
  color: string, 
  speed?: number, 
  scale?: number,
  distort?: number
}) => {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.8}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          metalness={0.1}
          roughness={0.2}
          distort={distort}
          speed={2}
        />
      </Sphere>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      {/* Preset Studio untuk pencahayaan glossy yang bagus */}
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      
      {/* Objek Utama: Wireframe Besar */}
      <group position={[0, 0, -2]}>
        <WireframeTorus />
      </group>

      {/* Elemen Dekoratif: Floating Blobs */}
      {/* Bola Ungu Utama (Brand Color) */}
      <AnimatedSphere position={[-2.8, 0.5, 0]} color="#C4B5FD" scale={1.3} speed={1.5} /> 
      
      {/* Bola Putih/Abu Glossy (Penyeimbang) */}
      <AnimatedSphere position={[3.2, -1.2, 0.5]} color="#F3F4F6" scale={1.5} speed={2} />
      
      {/* Bola Kuning Kecil (Accent) */}
      <AnimatedSphere position={[1.5, 2.5, -1]} color="#FDE047" scale={0.7} speed={1} distort={0.3} />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#FAFAFA]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
      {/* Gradient fade ke konten bawah */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero3D;