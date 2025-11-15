/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color } from 'three';

// Convert hex to normalized RGB
const hexToNormalizedRGB = (hex) => {
  hex = hex.replace('#', '');
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255
  ];
};

// Simple plane component with shader
const SilkPlane = ({ uniforms }) => {
  const meshRef = useRef();

  // Animate time uniform
  useFrame((_, delta) => {
    if (meshRef.current) uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColor;

          void main() {
            float wave = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
            gl_FragColor = vec4(uColor * wave, 1.0);
          }
        `}
      />
    </mesh>
  );
};

const Silk = ({
  color = '#7B7481',
}) => {
  // Uniforms
  const uniforms = useMemo(() => ({
    uColor: { value: new Color(...hexToNormalizedRGB(color)) },
    uTime: { value: 0 },
  }), [color]);

  return (
    <div style={{ width: '100%', height: '400px', position: 'absolute', inset: 0, zIndex: -10 }}>
      <Canvas dpr={[1, 2]} frameloop="always">
        <SilkPlane uniforms={uniforms} />
      </Canvas>
    </div>
  );
};

export default Silk;
