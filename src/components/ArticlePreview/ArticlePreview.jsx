import React from 'react'
import { motion } from'framer-motion'
import './ArticlePreview.css'
import { hoverPreview } from '../../containers/Header/animations-header'

const ArticlePreview = ({imgMain, category, heading, altMain})  => {
  return (
    <motion.div whileHover={hoverPreview} className='ct__secondary-article__article'>
      <img src={imgMain} alt={altMain} />
      <div className='ct__secondary-article__article-components'>
        <p>{category}</p>
        <h3>{heading}</h3>
      </div>
    </motion.div>
  )
}
export default ArticlePreview