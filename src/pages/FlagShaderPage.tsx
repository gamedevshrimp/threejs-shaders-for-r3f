import { Canvas } from '@react-three/fiber';
import FlagShader from '../components/FlagShader';
import { Bounds } from '@react-three/drei';
import { Link } from 'react-router-dom';
export default function FlagShaderPage() {
	return (
		<div className='w-full h-full flex flex-col'>
			<Link className='no-underline hover:underline text-blue-400 text-2xl' to={'/'}>
				Home
			</Link>
			<Canvas>
				<Bounds fit clip observe margin={1.2}>
					<FlagShader />
				</Bounds>
			</Canvas>
		</div>
	);
}
