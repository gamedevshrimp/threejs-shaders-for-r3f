import { Link } from 'react-router-dom';
import PageTitle from '../components/site/PageTitle';

export default function Home() {
	return (
		<>
			<PageTitle>Examples of shaders from threejs journey course but adapted for r3f</PageTitle>
			<Link className='no-underline hover:underline text-blue-400 text-2xl' to={'/simple-shader'}>
				Simple shader
			</Link>
		</>
	);
}
