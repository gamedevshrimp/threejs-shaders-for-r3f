import { useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

import galaxyFragmentShader from '../shaders/galaxyShader/galaxyFragmentShader.glsl';
import galaxyVertexShader from '../shaders/galaxyShader/galaxyVertexShader.glsl';

export default function GalaxyShader() {
	// Load Texture
	const texture = useTexture('/sparkleflare3.png');

	const uniforms = useRef({
		uSize: { value: 1 },
		uTexture: { value: texture },
		uInsideColor: { value: new THREE.Color('#d9236e') },
		uOutsideColor: { value: new THREE.Color('#d9236e') },
		uTime: { value: 1 },
	});

	const controls = useControls({
		particleCount: {
			value: 3000,
			min: 10,
			max: 10000,
			step: 10,
		},
		particleSize: {
			value: 500,
			min: 10,
			max: 10000,
			step: 10,
		},
		galaxySize: {
			value: 10,
			min: 1,
			max: 20,
			step: 1,
		},
		countBranches: {
			value: 3,
			min: 1,
			max: 20,
			step: 1,
		},
		branchSpin: {
			value: 0.3,
			min: 0,
			max: 2,
			step: 0.1,
		},
		Randomness: {
			value: 0.95,
			min: 0,
			max: 2,
			step: 0.001,
		},
		RandomnessPower: {
			value: 5.0,
			min: 1,
			max: 5,
			step: 0.001,
		},
		insideColor: '#c200ff',
		outsideColor: '#ffdc00',
	});

	useFrame(({ clock }) => {
		const timeInSeconds = clock.getElapsedTime();
		if (uniforms.current) {
			uniforms.current.uTime.value = timeInSeconds;
			uniforms.current.uSize.value = controls.particleSize;
			uniforms.current.uInsideColor.value.set(controls.insideColor);
			uniforms.current.uOutsideColor.value.set(controls.outsideColor);
		}
	});

	// Use Memo for avoid recreate on rerenders
	const { positions, sizes, colors, distance } = useMemo(() => {
		// create array of attributes
		const positions = new Float32Array(controls.particleCount * 3);
		const colors = new Float32Array(controls.particleCount * 3);
		const sizes = new Float32Array(controls.particleCount);
		const distance = new Float32Array(controls.particleCount);

		// fill the arrays
		for (let i = 0; i < controls.particleCount; i++) {
			const i3 = i * 3;

			// Calculate Position
			const radius = Math.random() * controls.galaxySize;

			const spinAngle = radius * controls.branchSpin;
			const branchAngle = ((i % controls.countBranches) / controls.countBranches) * Math.PI * 2;

			const curveFactor = Math.pow(1 - radius / controls.galaxySize, 0.7);

			const randomX =
				Math.pow(Math.random(), controls.RandomnessPower) *
				(Math.random() < 0.5 ? 1 : -1) *
				controls.Randomness *
				curveFactor;
			const randomY =
				Math.pow(Math.random(), controls.RandomnessPower) *
				(Math.random() < 0.5 ? 1 : -1) *
				controls.Randomness *
				curveFactor;
			const randomZ =
				Math.pow(Math.random(), controls.RandomnessPower) *
				(Math.random() < 0.5 ? 1 : -1) *
				controls.Randomness *
				curveFactor;

			positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
			positions[i3 + 1] = randomY;
			positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

			// Calculate Size
			sizes[i] = Math.random();

			// Calculate distance value
			distance[i] = radius / controls.galaxySize;
		}

		return { positions, sizes, colors, distance };
	}, [
		controls.particleCount,
		controls.countBranches,
		controls.galaxySize,
		controls.branchSpin,
		controls.Randomness,
		controls.RandomnessPower,
		controls.insideColor,
		controls.outsideColor,
	]);

	return (
		<>
			<OrbitControls />
			<points>
				<bufferGeometry>
					<bufferAttribute attach='attributes-position' args={[positions, 3]} />
					<bufferAttribute attach='attributes-aSizes' args={[sizes, 1]} />
					<bufferAttribute attach='attributes-color' args={[colors, 3]} />
					<bufferAttribute attach='attributes-aDistance' args={[distance, 1]} />
				</bufferGeometry>
				<shaderMaterial
					fragmentShader={galaxyFragmentShader}
					vertexShader={galaxyVertexShader}
					transparent={true}
					depthWrite={false}
					blending={THREE.AdditiveBlending}
					uniforms={uniforms.current}
				/>
			</points>
		</>
	);
}
