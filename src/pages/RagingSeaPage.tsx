import { Canvas } from '@react-three/fiber';
import { Bounds } from '@react-three/drei';
import { Link } from 'react-router-dom';
import RagingSeaShader from '../components/RagingSeaShader';
export default function RagingSeaPage() {
	return (
		<div className='w-full h-full flex flex-col'>
			<Link className='no-underline hover:underline text-blue-400 text-2xl' to={'/'}>
				Home
			</Link>
			<Canvas>
				<Bounds fit clip observe margin={1.2}>
					<RagingSeaShader />
				</Bounds>
			</Canvas>
		</div>
	);
}
