import React from 'react'
import { ArticlePreview, FeaturedArticle } from '../../components/export'
import { fashion1, fashion2, author1, lifestyle1 } from '../../constants/images'
import { FeaturedContainer, PreviewContainer, hoverFeatured } from './animations-header'
import { motion } from 'framer-motion'
import './Header.css'
const Header = () => {
  return (
    <div className='ct__header'>
      <motion.div whileHover={hoverFeatured} initial={'hidden'} animate={'show'} variants={FeaturedContainer} className='ct__header-main'>
        <FeaturedArticle />
      </motion.div>
      <motion.div initial={'hidden'} animate={'show'} variants={PreviewContainer} className='ct__header-secondary'>
          <ArticlePreview imgMain={fashion2} alt={'Woman with fashion clothes'}  heading='We have prepared several new collections' category={'Fashion'}/>
          <ArticlePreview imgMain={lifestyle1} alt={'Human face created by squares'}  heading='Activity in daily life is needed for proper functioning' category={'Lifestyle'}/>
      </motion.div>
    </div>
  )
}

export default Header