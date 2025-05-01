'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { logo_small_no_bg } from '@/assets/logo';

// Animation variants - matching original animations-navbar.js
const container = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: { type: 'tween', duration: 0.4 },
	},
};

const containerInner = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: {
			type: 'tween',
			duration: 0.4,
			delay: 0.1,
			staggerChildren: 0.3,
			delayChildren: 0.2,
		},
	},
};

const item = {
	hidden: {
		y: -20,
		opacity: 0,
	},
	show: {
		y: 0,
		opacity: 1,
		transition: { type: 'tween', duration: 0.2 },
	},
};

const hover = {
	scale: 1.05,
	transition: {
		duration: 0.2,
		type: 'tween',
	},
};

export function Navbar() {
	const [toggleMenu, setToggleMenu] = useState(false);

	const handleToggleMenu = () => {
		setToggleMenu((prev) => !prev);
	};

	return (
		<div className='h-[6vh] flex flex-row py-4 px-8 items-center justify-between mx-auto'>
			<div className='flex flex-row justify-center items-center'>
				<Link href='/' className='flex items-center'>
					<div className='relative w-12 h-12 flex items-center justify-center'>
						<Image src={logo_small_no_bg} alt='Logo of the Curiosity Takeover blog' fill className='object-contain cursor-pointer' />
					</div>
					<span className='pl-2 text-center text-[22px] font-extrabold text-black no-underline select-none'>Curiosity Takeover</span>
				</Link>
			</div>

			<div className='flex justify-center items-center relative'>
				<div className='hidden md:flex justify-center items-center'>
					<div className='flex justify-center items-center flex-wrap flex-row py-2 px-[0.9rem] border-2 border-black rounded-3xl mx-2 text-xs text-black'>
						<Link
							href='mailto:curiositytakeover@gmail.com'
							className='text-xs font-semibold pr-[0.3rem] text-black no-underline select-none'
						>
							curiositytakeover@gmail.com
						</Link>
						<FiArrowUpRight />
					</div>
				</div>

				{toggleMenu ? (
					<RiCloseLine style={{ cursor: 'pointer', zIndex: 21 }} color='white' size={27} onClick={handleToggleMenu} />
				) : (
					<RiMenu3Line style={{ cursor: 'pointer', zIndex: 21 }} color='black' size={27} onClick={handleToggleMenu} />
				)}

				{toggleMenu && (
					<motion.div
						initial='hidden'
						whileInView='show'
						variants={container}
						className='flex justify-center items-center flex-col text-center p-8 fixed z-20 top-0 right-0 left-0 w-screen h-screen bg-black/50 drop-shadow-lg'
					>
						<motion.div initial='hidden' whileInView='show' variants={containerInner} className='block'>
							<motion.p variants={item} whileHover={hover} onClick={handleToggleMenu}>
								<Link href='/' className='text-[45px] text-white font-extrabold no-underline relative'>
									Home
								</Link>
							</motion.p>
							<motion.p variants={item} whileHover={hover} onClick={handleToggleMenu}>
								<Link href='/blog' className='text-[45px] text-white font-extrabold no-underline relative'>
									Blog
								</Link>
							</motion.p>
							<motion.p variants={item} whileHover={hover} onClick={handleToggleMenu}>
								<Link href='/contact' className='text-[45px] text-white font-extrabold no-underline relative'>
									Contact
								</Link>
							</motion.p>
						</motion.div>
					</motion.div>
				)}
			</div>
		</div>
	);
}
