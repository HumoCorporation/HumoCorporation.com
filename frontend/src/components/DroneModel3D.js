import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Environment } from '@react-three/drei';
import { useApp } from '../context/AppContext';

function Model() {
  const { scene } = useGLTF('/assets/models/drone_model.glb');
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={0.8} position={[0, -0.5, 0]} />;
}

const DroneModel3D = () => {
  const { theme } = useApp();

  return (
    <Canvas
      camera={{ position: [0, 1, 4], fov: 60 }}
      style={{ background: theme === 'dark' ? '#1f2937' : '#f3f4f6' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Stage 
          environment="city" 
          intensity={0.5}
          shadows={false}
          adjustCamera={false}
        >
          <Model />
        </Stage>
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
      </Suspense>
    </Canvas>
  );
};

export default DroneModel3D;