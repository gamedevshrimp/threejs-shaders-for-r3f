import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Bounds } from '@react-three/drei';
import GalaxyShader from '../components/GalaxyShader';

export default function GalaxyPage() {
	return (
		<div className='w-full h-full flex flex-col'>
			<Link className='no-underline hover:underline text-blue-400 text-2xl' to={'/'}>
				Home
			</Link>
			<Canvas className='bg-blue-950 rounded-2xl'>
				<Bounds fit clip observe margin={1.2}>
					<GalaxyShader />
				</Bounds>
			</Canvas>
		</div>
	);
}
