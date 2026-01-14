import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
export const ModifiedMaterialsShader = () => {
	const { nodes, materials } = useGLTF('/public/models/LeePerrySmith/LeePerrySmith.glb');
	return (
		<>
			<OrbitControls />
			<group dispose={null}>
				<mesh
					geometry={(nodes.LeePerrySmith as THREE.Mesh).geometry}
					material={materials['Material.002']}
				/>
			</group>
		</>
	);
};

useGLTF.preload('/public/models/LeePerrySmith/LeePerrySmith.glb');
