import { useState } from 'react';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { container, containerInner, item, hover } from './animations-navbar';
import { logo_small_no_bg } from '../../assets/logo';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);
	const handleToggleMenu = () => {
		setToggleMenu((prev) => !prev);
	};
	return (
		<div className='navbar'>
			<div className='navbar-logo_container'>
				<Link to={'/'}>
					<img src={logo_small_no_bg} alt='Logo of the Curiosity Takeover blog' />
				</Link>
				<Link to={'/'}>
					<strong>Curiosity Takeover</strong>
				</Link>
			</div>
			<div className='navbar-mobile-menu'>
				<div className='navbar-items_container'>
					{/* <div className='navbar-items_search'><FiSearch /></div> */}
					<div className='navbar-items_email'>
						<a href='mailto:curiositytakeover@gmail.com'>curiositytakeover@gmail.com</a>
						<FiArrowUpRight />
					</div>
				</div>
				{toggleMenu ? (
					<RiCloseLine style={{ cursor: 'pointer', zIndex: 3 }} color='white' size={27} onClick={handleToggleMenu} />
				) : (
					<RiMenu3Line style={{ cursor: 'pointer', zIndex: 3 }} color='black' size={27} onClick={handleToggleMenu} />
				)}
				{toggleMenu && (
					<motion.div initial={'hidden'} whileInView={'show'} variants={container} className='navbar-mobile-menu-container'>
						<motion.div initial={'hidden'} whileInView={'show'} variants={containerInner} className='navbar-mobile-menu-container-links'>
							<motion.p variants={item} whileHover={hover} onClick={handleToggleMenu}>
								<Link to='/'>Home</Link>
							</motion.p>
							<motion.p variants={item} whileHover={hover} onClick={handleToggleMenu}>
								<Link to='/blog'>Blog</Link>
							</motion.p>
							<motion.p variants={item} whileHover={hover} onClick={handleToggleMenu}>
								<Link to='/contact'>Contact</Link>
							</motion.p>
						</motion.div>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
