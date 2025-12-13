import { Link } from 'react-router-dom';
import PageTitle from '../components/site/PageTitle';

export default function Home() {
	return (
		<>
			<PageTitle>Shaders from Three.js Journey, adapted for React Three Fiber</PageTitle>
			<div className='flex flex-col gap-2'>
				<Link className='no-underline hover:underline text-blue-400 text-2xl' to={'/simple-shader'}>
					Simple shader
				</Link>
				<Link className='no-underline hover:underline text-blue-400 text-2xl' to={'/flag-shader'}>
					Flag shader
				</Link>
			</div>
		</>
	);
}
