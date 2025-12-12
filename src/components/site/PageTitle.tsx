export default function PageTitle({ children }: { children: string }) {
	return (
		<div className='mb-8'>
			<title>{children}</title>
			<h1 className='text-4xl font-sans font-smoothing font-bold'>{children}</h1>
		</div>
	);
}
