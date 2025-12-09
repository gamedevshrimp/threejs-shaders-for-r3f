import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function App() {
	return (
		<>
			<Canvas>
				<OrbitControls />
				<mesh>
					<boxGeometry />
					<meshNormalMaterial />
				</mesh>
			</Canvas>
		</>
	);
}
