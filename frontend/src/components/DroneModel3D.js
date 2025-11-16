import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import { useApp } from '../context/AppContext';

function Model() {
  const { scene } = useGLTF('/assets/models/drone_model.glb');
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.5} />;
}

const DroneModel3D = () => {
  const { theme } = useApp();

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: theme === 'dark' ? '#1f2937' : '#f3f4f6' }}
    >
      <Stage environment="city" intensity={0.6}>
        <Model />
      </Stage>
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default DroneModel3D;