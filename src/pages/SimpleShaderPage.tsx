import { Link } from 'react-router-dom';
import SimpleShader from '../components/SimpleShader';
import { Canvas } from '@react-three/fiber';
import { Bounds } from '@react-three/drei';

export default function SimpleShaderPage() {
	return (
		<div className='w-full h-full flex flex-col'>
			<Link className='no-underline hover:underline text-blue-400 text-2xl' to={'/'}>
				Home
			</Link>
			<Canvas>
				<Bounds fit clip observe margin={1.2}>
					<SimpleShader />
				</Bounds>
			</Canvas>
		</div>
	);
}
