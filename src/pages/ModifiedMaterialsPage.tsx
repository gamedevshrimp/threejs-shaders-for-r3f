import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Bounds, Environment } from '@react-three/drei';
import GalaxyShader from '../components/GalaxyShader';
import { ModifiedMaterialsShader } from '../components/ModifiedMaterialsShader';

export default function ModifiedMaterialsPage() {
	return (
		<div className='w-full h-full flex flex-col'>
			<Link className='no-underline hover:underline text-blue-400 text-2xl' to={'/'}>
				Home
			</Link>
			<Canvas className='bg-blue-950 rounded-2xl'>
				<Environment
					background={true}
					files={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']}
					path='/textures/environmentMaps/0/'
				/>
				<Bounds fit clip observe margin={1.2}>
					{/* <GalaxyShader /> */}
					<ModifiedMaterialsShader />
				</Bounds>
			</Canvas>
		</div>
	);
}
