import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

import posOffsetVertexShader from './shaders/posOffsetShader/posOffsetVertexShader.glsl';
import posOffsetFragmentShader from './shaders/posOffsetShader/posOffsetFragmentShader.glsl';

// Let's create our own attribute
export default function App() {
	const geometryRef = useRef<THREE.Mesh | null>(null);

	// Add new custom attribute
	const addNewAttribute = (mesh: THREE.Mesh) => {
		// count amount of vertices
		const count = mesh.geometry.attributes.position.count;

		// create an array and add random values to each element
		const randoms = new Float32Array(count);
		for (let index = 0; index < count; index++) {
			randoms[index] = Math.random();
		}

		// add random value to each point of geometry as an attribute
		mesh.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
	};

	// Handle mesh after loading
	const handleMesh = (mesh: THREE.Mesh | null) => {
		geometryRef.current = mesh;
		if (mesh) {
			addNewAttribute(mesh);
		}
	};

	return (
		<>
			<Canvas>
				<OrbitControls />
				<mesh ref={handleMesh}>
					<planeGeometry args={[5, 5, 100, 100]} />
					<shaderMaterial
						vertexShader={posOffsetVertexShader}
						fragmentShader={posOffsetFragmentShader}
						transparent={true}
					/>
				</mesh>
			</Canvas>
		</>
	);
}
