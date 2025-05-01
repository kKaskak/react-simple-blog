import Link from 'next/link';

export function Footer() {
	return (
		<footer className='bg-gray-800 text-white py-8'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div>
						<h3 className='text-xl font-bold mb-4'>Curiosity Blog</h3>
						<p className='text-gray-300'>
							Explore a diverse range of articles on Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness.
						</p>
					</div>
					<div>
						<h3 className='text-xl font-bold mb-4'>Quick Links</h3>
						<ul className='space-y-2'>
							<li>
								<Link href='/' className='text-gray-300 hover:text-white transition-colors'>
									Home
								</Link>
							</li>
							<li>
								<Link href='/blog' className='text-gray-300 hover:text-white transition-colors'>
									Blog
								</Link>
							</li>
							<li>
								<Link href='/contact' className='text-gray-300 hover:text-white transition-colors'>
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='text-xl font-bold mb-4'>Connect</h3>
						<div className='flex space-x-4'>
							<a href='#' className='text-gray-300 hover:text-white transition-colors'>
								Twitter
							</a>
							<a href='#' className='text-gray-300 hover:text-white transition-colors'>
								Facebook
							</a>
							<a href='#' className='text-gray-300 hover:text-white transition-colors'>
								Instagram
							</a>
						</div>
					</div>
				</div>
				<div className='border-t border-gray-700 mt-8 pt-6 text-center text-gray-400'>
					<p>&copy; {new Date().getFullYear()} Curiosity Blog. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
