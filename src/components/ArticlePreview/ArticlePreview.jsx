import React from 'react'
import { motion } from'framer-motion'
import './ArticlePreview.css'
import { hoverPreview } from '../../containers/Header/animations-header'
import { urlFor } from '../../client'
import { Link } from 'react-router-dom'

const ArticlePreview = ({ article })  => {

if (!article) {
  return null
}
const { title, categories, previewImage, titleColorFeatured, slug } = article || {};

  return (
    <>
         <motion.div whileHover={hoverPreview} className='ct__secondary-article__article'>
          <Link className='ct__secondary-article__article-link' to={`/blog/${slug.current}`}>
            <img src={urlFor(previewImage).url()} alt={previewImage.alt} />
            <div className='ct__secondary-article__article-components'>
              <p>{categories.map(category => category.title).join(', ')}</p>
              <h3 style={{color: titleColorFeatured }}>{title}</h3>
            </div>
          </Link>
       </motion.div>
    </>
  )
}
export default ArticlePreview