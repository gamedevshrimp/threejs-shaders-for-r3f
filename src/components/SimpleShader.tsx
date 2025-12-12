import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

import posOffsetVertexShader from '../shaders/posOffsetShader/posOffsetVertexShader.glsl';
import posOffsetFragmentShader from '../shaders/posOffsetShader/posOffsetFragmentShader.glsl';

// Let's create our own attribute
export default function SimpleShader() {
	const geometryRef = useRef<THREE.Mesh | null>(null);
	const materialRef = useRef<THREE.ShaderMaterial | null>(null);
	const randoms = useRef<Float32Array | null>(null);

	const uniforms = useRef({
		uMultiply: { value: 0.5 },
	});

	const controls = useControls({
		segmentsX: {
			value: 32,
			min: 5,
			max: 100,
			step: 1,
		},
		segmentsY: {
			value: 32,
			min: 5,
			max: 100,
			step: 1,
		},
		power: {
			value: 0.5,
			min: 0,
			max: 1,
			step: 0.1,
		},
	});

	useFrame(() => {
		if (uniforms.current) {
			uniforms.current.uMultiply.value = controls.power;
		}
	});

	// Handle mesh after loading
	const handleMesh = (mesh: THREE.Mesh | null) => {
		geometryRef.current = mesh;
		if (!mesh) return;

		const count = mesh.geometry.attributes.position.count;

		// Check the array is already exist or amount of points is different
		if (!randoms.current || randoms.current.length !== count) {
			randoms.current = new Float32Array(count);
			for (let index = 0; index < count; index++) {
				randoms.current[index] = Math.random();
			}
			mesh.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms.current, 1));
		}
	};

	return (
		<>
			<OrbitControls />
			<mesh ref={handleMesh}>
				<planeGeometry args={[5, 5, controls.segmentsX, controls.segmentsY]} />
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
