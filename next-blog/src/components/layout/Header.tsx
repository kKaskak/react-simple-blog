import Link from 'next/link';

export function Header() {
	return (
		<header className='bg-white shadow-md'>
			<div className='container mx-auto px-4 py-4 flex justify-between items-center'>
				<Link href='/' className='text-2xl font-bold'>
					Curiosity Blog
				</Link>
				<nav>
					<ul className='flex space-x-6'>
						<li>
							<Link href='/' className='hover:text-blue-600 transition-colors'>
								Home
							</Link>
						</li>
						<li>
							<Link href='/blog' className='hover:text-blue-600 transition-colors'>
								Blog
							</Link>
						</li>
						<li>
							<Link href='/contact' className='hover:text-blue-600 transition-colors'>
								Contact
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
