import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '404 - Page Not Found | Curiosity Blog',
	description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
	return (
		<div className='min-h-[70vh] flex flex-col items-center justify-center text-center px-4'>
			<h1 className='text-6xl font-bold mb-4'>404</h1>
			<h2 className='text-2xl md:text-3xl mb-6'>Page Not Found</h2>
			<p className='text-gray-600 mb-8 max-w-md'>Sorry, the page you are looking for doesn&apos;t exist or has been moved.</p>
			<Link href='/' className='bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'>
				Return to Homepage
			</Link>
		</div>
	);
}
