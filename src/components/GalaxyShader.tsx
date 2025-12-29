import { useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial, useTexture } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

export default function GalaxyShader() {
	// Load Texture
	const texture = useTexture('/triangle.png');

	const controls = useControls({
		particleCount: {
			value: 1000,
			min: 10,
			max: 10000,
			step: 10,
		},
		particleSize: {
			value: 0.3,
			min: 0.01,
			max: 1,
			step: 0.01,
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
			value: 0.8,
			min: -2,
			max: 2,
			step: 0.1,
		},
		Randomness: {
			value: 0.02,
			min: 0,
			max: 1,
			step: 0.001,
		},
		RandomnessPower: {
			value: 2,
			min: 1,
			max: 5,
			step: 0.001,
		},
	});

	// Use Memo for avoid recreate on rerenders
	const positions = useMemo(() => {
		// create array
		const arr = new Float32Array(controls.particleCount * 3);

		// add random values
		for (let i = 0; i < controls.particleCount; i++) {
			const i3 = i * 3;
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
			arr[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
			arr[i3 + 1] = randomY;
			arr[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
		}

		// return to 'positions'
		return arr;
	}, [
		controls.particleCount,
		controls.countBranches,
		controls.galaxySize,
		controls.branchSpin,
		controls.Randomness,
		controls.RandomnessPower,
	]);

	return (
		<>
			<OrbitControls />
			<points>
				<bufferGeometry>
					<bufferAttribute attach='attributes-position' args={[positions, 3]} />
				</bufferGeometry>
				<pointsMaterial
					size={controls.particleSize}
					map={texture}
					depthTest={true}
					depthWrite={false}
					sizeAttenuation={true}
					transparent={true}
				/>
			</points>
		</>
	);
}
