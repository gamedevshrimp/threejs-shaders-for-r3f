import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BaseLayout from './components/BaseLayout';
import Home from './pages/Home';
import SimpleShaderPage from './pages/SimpleShaderPage';
import FlagShaderPage from './pages/FlagShaderPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'simple-shader', element: <SimpleShaderPage /> },
			{ path: 'flag-shader', element: <FlagShaderPage /> },
		],
	},
]);
export default function App() {
	return (
		<div className='w-full h-full'>
			<RouterProvider router={router} />
		</div>
	);
}
