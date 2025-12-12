import { Outlet } from 'react-router-dom';

export default function BaseLayout() {
	return (
		<div className='w-full h-full flex flex-col p-4'>
			<div className='flex-1'>
				<Outlet />
			</div>
		</div>
	);
}
