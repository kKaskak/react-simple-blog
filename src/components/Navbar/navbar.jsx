import React, { useState } from 'react'
import { RiCloseLine, RiMenu3Line, } from 'react-icons/ri'
import { FiArrowUpRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { container, containerInner, item, hover } from './animations-navbar'
import { logo_small_no_bg } from '../../constants/images'
import './navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const setScaleUp = () => {
    setToggleMenu(true)
  }
  const setScaleDown = () => {
      setToggleMenu(false)
  }
  return (
    <div className='ct__navbar'>
      <div className='ct__navbar-logo_container'>
       <Link to={'/'}><img src={logo_small_no_bg} alt="Logo of the Curiosity Takeover blog" /></Link>
       <Link to={'/'}><strong>Curiosity Takeover</strong></Link>
      </div>
      <div className='ct__navbar-mobile-menu'>
          <div className='ct__navbar-items_container'>
            {/* <div className='ct__navbar-items_search'> 
              <FiSearch />
            </div> */}
            <div className='ct__navbar-items_email'>
              <a href="mailto:curiositytakeover@gmail.com">curiositytakeover@gmail..com</a>
              <FiArrowUpRight />
            </div>
          </div>
          {toggleMenu 
            ? <RiCloseLine style={{cursor: 'pointer', zIndex: 3}} color='white' size={27} onClick={() => setScaleDown()} />
            : <RiMenu3Line style={{cursor: 'pointer', zIndex: 3}} color='black' size={27} onClick={() => setScaleUp()} />
          }
          {toggleMenu && (
            <motion.div  initial={'hidden'} whileInView={'show'} variants={container} className='ct__navbar-mobile-menu-container'>
              <motion.div initial={'hidden'} whileInView={'show'} variants={containerInner} className='ct__navbar-mobile-menu-container-links'>
                <motion.p variants={item} whileHover={hover} onClick={() => setScaleDown()}><Link to="/">Home</Link></motion.p>
                <motion.p variants={item} whileHover={hover} onClick={() => setScaleDown()}><Link to="/blog">Blog</Link></motion.p>
                <motion.p variants={item} whileHover={hover} onClick={() => setScaleDown()}><Link to="/contact">Contact</Link></motion.p>
              </motion.div>
            </motion.div>
          )}
        </div>
    </div>
  )
}

export default Navbar         