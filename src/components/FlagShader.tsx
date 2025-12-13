import { useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

import posOffsetVertexShader from '../shaders/flagShader/flagVertexShader.glsl';
import posOffsetFragmentShader from '../shaders/flagShader/flagFragmentShader.glsl';

export default function FlagShader() {
	const geometryRef = useRef<THREE.Mesh | null>(null);
	const materialRef = useRef<THREE.ShaderMaterial | null>(null);
	const uvTexture = useTexture('/CustomUVChecker_byValle_1K.webp');

	const uniforms = useRef({
		uFrequency: { value: 4 },
		uTime: { value: 0 },
		uTimeMultiplier: { value: -1 },
		uColor: { value: new THREE.Color('#d9236e') },
		uTexture: { value: uvTexture },
		uTextureEnabled: { value: true },
	});

	const controls = useControls({
		frequency: {
			value: 4,
			min: 2,
			max: 5,
			step: 0.01,
		},
		windPower: {
			value: -5,
			min: -5,
			max: 5,
			step: 0.01,
		},
		color: '#d9236e',
		texture: false,
	});

	useFrame(({ clock }) => {
		// Get the total elapsed time in seconds
		const timeInSeconds = clock.getElapsedTime();
		if (uniforms.current) {
			uniforms.current.uFrequency.value = controls.frequency;
			uniforms.current.uTime.value = timeInSeconds;
			uniforms.current.uTimeMultiplier.value = controls.windPower;
			uniforms.current.uColor.value.set(controls.color); // convert string to color value
			uniforms.current.uTextureEnabled.value = controls.texture;
		}
	});

	// Handle mesh after loading
	const handleMesh = (mesh: THREE.Mesh | null) => {
		if (!mesh) return;
		geometryRef.current = mesh;
	};

	return (
		<>
			<OrbitControls />
			<mesh ref={handleMesh}>
				<planeGeometry args={[5, 4, 100, 100]} />
				<shaderMaterial
					ref={materialRef}
					vertexShader={posOffsetVertexShader}
					fragmentShader={posOffsetFragmentShader}
					uniforms={uniforms.current}
				/>
			</mesh>
		</>
	);
}
