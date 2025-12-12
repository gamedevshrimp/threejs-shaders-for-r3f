import { Link } from 'react-router-dom';
import SimpleShader from '../components/SimpleShader';

export default function SimpleShaderPage() {
	return (
		<div className='w-full h-full flex flex-col'>
			<Link className='no-underline hover:underline text-blue-400 text-2xl' to={''}>
				Home
			</Link>
			<SimpleShader />
		</div>
	);
}
