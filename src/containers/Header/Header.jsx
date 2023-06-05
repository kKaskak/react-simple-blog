import React, { useState, useEffect } from 'react'
import { ArticlePreview, FeaturedArticle } from '../../components/export'
import { FeaturedContainer, PreviewContainer, hoverFeatured } from './animations-header'
import { motion } from 'framer-motion'
import { client } from '../../client'
import { Helmet } from 'react-helmet'
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
  return (
    <>
      {!isLoading && (
        <div className='ct__header'>
           <Helmet>
        <title>Curiosity Takeover</title>
        <meta
          name="description"
          content="Curosity Takeover Official Blog. Discover Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, Animals and Fitness articles. Dive into our blog for articles that explore the latest trends, fascinating discoveries, and expert insights across a diverse range of topics. Stay informed, inspired, and entertained as we unravel the wonders of our world."
        />
        <meta
          name="keywords"
          content="Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, Fitness, Blog"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="blog" />
        <meta property="og:title" content="Curiosity Takeover" />
        <meta
          property="og:description"
          content="Curosity Takeover Official Blog. Discover a captivating blend of Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness."
        />
        <meta property="og:url" content="https://curiositytakeover.com" />
        <meta property="og:site_name" content="Curiosity Takeover" />
        <meta
          property="og:image"
          content="https://cdn.sanity.io/images/zeqqep1d/production/be706b03c4fe5169ef2390f7ffe23de0f7f766f5-3012x1746.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@curiosity__blog" />
        <meta name="twitter:site" content="@curiosity__blog" />
        <meta
          name="twitter:image"
          content="https://cdn.sanity.io/images/zeqqep1d/production/be706b03c4fe5169ef2390f7ffe23de0f7f766f5-3012x1746.png"
        />
      </Helmet>
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