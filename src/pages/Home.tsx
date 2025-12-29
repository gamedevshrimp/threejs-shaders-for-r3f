import { Link } from 'react-router-dom';
import PageTitle from '../components/site/PageTitle';

const linkStyles = 'no-underline hover:underline text-blue-400 text-2xl';
export default function Home() {
	return (
		<>
			<PageTitle>Shaders from Three.js Journey, adapted for React Three Fiber</PageTitle>
			<div className='flex flex-col gap-2'>
				<Link className={linkStyles} to={'/simple-shader'}>
					Simple shader
				</Link>
				<Link className={linkStyles} to={'/flag-shader'}>
					Flag shader
				</Link>
				<Link className={linkStyles} to={'/raging-sea-shader'}>
					Raging Sea shader
				</Link>
				<Link className={linkStyles} to={'/galaxy'}>
					Galaxy
				</Link>
			</div>
		</>
	);
}
