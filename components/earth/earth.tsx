'use client';

import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { TextureLoader } from 'three';
import { motion } from 'framer-motion-3d';

function RotatingEarth() {
  const earthRef = useRef<any>(null);
  const [color, normal, aoMap] = useLoader(TextureLoader, [
    '/assets/color.jpg',
    '/assets/normal.png',
    '/assets/occlusion.jpg'
  ]);

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <motion.mesh ref={earthRef} scale={2.5} rotation-y={0}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={color}
        normalMap={normal}
        aoMap={aoMap}
      />
    </motion.mesh>
  );
}

export default function Earth() {
  const scene = useRef(null);

  return (
    <Canvas ref={scene}>
      <ambientLight intensity={0.5} />
      <directionalLight
        intensity={5.5}
        position={[1, 0, -0.25]}
      />
      <RotatingEarth />
    </Canvas>
  );
}
