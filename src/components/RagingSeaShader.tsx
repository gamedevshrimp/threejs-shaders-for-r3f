import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

import vertexShader from '../shaders/RagingSeaShader/RagingSeaVertexShader.glsl';
import fragmentShader from '../shaders/RagingSeaShader/RagingSeaFragmentShader.glsl';

export default function RagingSeaShader() {
	const geometryRef = useRef<THREE.Mesh | null>(null);
	const materialRef = useRef<THREE.ShaderMaterial | null>(null);

	const uniforms = useRef({
		uFrequencyX: { value: 1 },
		uFrequencyY: { value: 1 },
		uSmallFrequencyX: { value: 1 },
		uSmallFrequencyY: { value: 1 },
		uWaveHeight: { value: 0.5 },
		uSmallWaveHeight: { value: 0.5 },
		uTime: { value: 0 },
		uTimeMultiplier: { value: -1 },
		uTimeMultiplier2: { value: -1 },
		uColorOffset: { value: 0.8 },
		uColorDepth: { value: new THREE.Color('#d9236e') },
		uColorSurface: { value: new THREE.Color('#84a2eb') },
	});

	const controls = useControls({
		bigWaveFrequencyX: {
			value: 1,
			min: 0,
			max: 3,
			step: 0.01,
		},
		bigWaveFrequencyY: {
			value: 1,
			min: 0,
			max: 3,
			step: 0.01,
		},
		smallWaveFrequencyX: {
			value: 1,
			min: 0,
			max: 10,
			step: 0.01,
		},
		smallWaveFrequencyY: {
			value: 1,
			min: 0,
			max: 10,
			step: 0.01,
		},
		waveHeight: {
			value: 0.5,
			min: 0,
			max: 1,
			step: 0.01,
		},
		smallWaveHeight: {
			value: 0.5,
			min: 0,
			max: 1,
			step: 0.01,
		},
		bigWaveSpeed: {
			value: 0.2,
			min: -1,
			max: 1,
			step: 0.01,
		},
		smallWaveSpeed: {
			value: 0.2,
			min: -1,
			max: 1,
			step: 0.01,
		},
		colorOffset: {
			value: 0.8,
			min: -2,
			max: 2,
			step: 0.01,
		},
		depthColor: '#d9236e',
		surfaceColor: '#84a2eb',
	});

	useFrame(({ clock }) => {
		const timeInSeconds = clock.getElapsedTime();
		if (uniforms.current) {
			uniforms.current.uFrequencyX.value = controls.bigWaveFrequencyX;
			uniforms.current.uFrequencyY.value = controls.bigWaveFrequencyY;
			uniforms.current.uSmallFrequencyX.value = controls.smallWaveFrequencyX;
			uniforms.current.uSmallFrequencyY.value = controls.smallWaveFrequencyY;
			uniforms.current.uWaveHeight.value = controls.waveHeight;
			uniforms.current.uSmallWaveHeight.value = controls.smallWaveHeight;
			uniforms.current.uTime.value = timeInSeconds;
			uniforms.current.uTimeMultiplier.value = controls.bigWaveSpeed;
			uniforms.current.uTimeMultiplier2.value = controls.smallWaveSpeed;
			uniforms.current.uColorDepth.value.set(controls.depthColor);
			uniforms.current.uColorSurface.value.set(controls.surfaceColor);
			uniforms.current.uColorOffset.value = controls.colorOffset;
		}
	});

	// Handle mesh after loading
	const handleMesh = (mesh: THREE.Mesh | null) => {
		if (!mesh) return;
		geometryRef.current = mesh;
	};

	return (
		<>
			<OrbitControls enableZoom={false} />

			<mesh ref={handleMesh} rotation={[(Math.PI / 3) * -1, 0, 0]}>
				<planeGeometry args={[5, 4, 100, 100]} />
				<shaderMaterial
					ref={materialRef}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={uniforms.current}
				/>
			</mesh>
		</>
	);
}
