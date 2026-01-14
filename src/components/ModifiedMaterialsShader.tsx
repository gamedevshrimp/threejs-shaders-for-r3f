import { useGLTF, OrbitControls, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ModifiedMaterialsShader = () => {
	const { nodes } = useGLTF('./public/models/LeePerrySmith/LeePerrySmith.glb');
	const textureColor = useTexture('./public/models/LeePerrySmith/color.jpg');
	const textureNormal = useTexture('./public/models/LeePerrySmith/normal.jpg');

	const materialRef = useRef<THREE.MeshStandardMaterial>(null);

	const uniforms = useRef({
		uTwistPower: { value: 0 },
	});

	const controls = useControls({
		twistPower: {
			value: 0,
			min: -1,
			max: 1,
			step: 0.01,
		},
	});

	useFrame(() => {
		if (uniforms.current) {
			uniforms.current.uTwistPower.value = controls.twistPower;
		}
	});

	// hook material
	useEffect(() => {
		if (materialRef.current) {
			const material = materialRef.current;

			material.onBeforeCompile = (shader) => {
				console.log('Shader object:', shader);
				shader.uniforms.uTwistPower = uniforms.current.uTwistPower;
				shader.vertexShader = shader.vertexShader.replace(
					'#include <common>',
					`
					#include <common>
					uniform float uTwistPower;

					mat2 get2dRotateMatrix(float _angle) 
					{
						return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
					}
					`,
				);

				shader.vertexShader = shader.vertexShader.replace(
					'#include <begin_vertex>',
					`
					#include <begin_vertex>

					float angle = transformed.y * uTwistPower;
					mat2 rotateMatrix = get2dRotateMatrix(angle);

					transformed.xz = rotateMatrix * transformed.xz;
					`,
				);
			};
		}
	}, [materialRef]);
	return (
		<>
			<OrbitControls />
			<group dispose={null}>
				<mesh geometry={(nodes.LeePerrySmith as THREE.Mesh).geometry}>
					<meshStandardMaterial ref={materialRef} map={textureColor} normalMap={textureNormal} />
				</mesh>
			</group>
		</>
	);
};

useGLTF.preload('./public/models/LeePerrySmith/LeePerrySmith.glb');
