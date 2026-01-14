import { useGLTF, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
export const ModifiedMaterialsShader = () => {
	const { nodes } = useGLTF('/public/models/LeePerrySmith/LeePerrySmith.glb');
	const textureColor = useTexture('/public/models/LeePerrySmith/color.jpg');
	const textureNormal = useTexture('/public/models/LeePerrySmith/normal.jpg');
	return (
		<>
			<OrbitControls />
			<group dispose={null}>
				<mesh geometry={(nodes.LeePerrySmith as THREE.Mesh).geometry}>
					<meshStandardMaterial map={textureColor} normalMap={textureNormal} />
				</mesh>
			</group>
		</>
	);
};

useGLTF.preload('/public/models/LeePerrySmith/LeePerrySmith.glb');
