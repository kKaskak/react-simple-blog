import React, { useState, useEffect } from 'react'
import { ArticlePreview, FeaturedArticle } from '../../components/export'
import { FeaturedContainer, PreviewContainer, hoverFeatured } from './animations-header'
import { motion } from 'framer-motion'
import { client } from '../../client'
import './Header.css'
const Header = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [previewArticles, setPreviewArticles] = useState([]);

  useEffect(() => {
    const query = '*[_type == "post"]{..., "imageUrl": previewImage.asset->url,  "author": author->{name, image}, categories[]->{title}}';
    client.fetch(query).then((data) => {
      setArticles(data);
      const featuredIndex = Math.floor(Math.random() * data.length);
      setFeaturedArticle(data[featuredIndex]);

      let previewIndices = [];
      while(previewIndices.length < 2) { // assuming you want 2 different preview articles
        let index = Math.floor(Math.random() * data.length);
        if(index !== featuredIndex && !previewIndices.includes(index)) {
          previewIndices.push(index);
        }
      }
      setPreviewArticles(previewIndices.map(index => data[index]));
      setIsLoading(false)
    });
  }, []);
  console.log(articles)
  return (
    <>
      {!isLoading && (
        <div className='ct__header'>
        <motion.div whileHover={hoverFeatured} initial={'hidden'} animate={'show'} variants={FeaturedContainer} className='ct__header-main'>
          <FeaturedArticle article={featuredArticle}/>
        </motion.div>
        <motion.div initial={'hidden'} animate={'show'} variants={PreviewContainer} className='ct__header-secondary'>
            {previewArticles.map((article, index) => (
              <ArticlePreview key={index} article={article} />
            ))}
        </motion.div>
      </div>
      )}
    </>
  )
}

export default Header