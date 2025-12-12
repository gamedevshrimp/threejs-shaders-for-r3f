import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BaseLayout from './components/BaseLayout';
import Home from './pages/Home';
import SimpleShaderPage from './pages/SimpleShaderPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'simple-shader', element: <SimpleShaderPage /> },
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
