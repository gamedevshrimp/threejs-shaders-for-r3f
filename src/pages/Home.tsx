import { Link } from 'react-router-dom';
import PageTitle from '../components/site/PageTitle';

export default function Home() {
	return (
		<>
			<PageTitle>Shaders from Three.js Journey, adapted for React Three Fiber</PageTitle>
			<Link className='no-underline hover:underline text-blue-400 text-2xl' to={'/simple-shader'}>
				Simple shader
			</Link>
		</>
	);
}
