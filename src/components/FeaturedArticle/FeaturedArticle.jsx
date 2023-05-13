import React, { useState, useEffect } from 'react'
import './FeaturedArticle.css'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { client, urlFor } from '../../client'
import { Link } from 'react-router-dom'
const FeaturedArticle = ()  => {
  const [cards, setCards] = useState([]);
  const [randomIndex, setRandomIndex] = useState(null)
  useEffect(() => {
    const query = '*[_type == "post"]{..., "imageUrl": previewImage.asset->url, "author": *[_type=="author"], categories[]->{title}}';
    client.fetch(query).then((data) => {
      setCards(data);
      const index = Math.floor(Math.random() * data.length);
      setRandomIndex(index);
    });
  }, []);
  if (randomIndex === null || !cards[randomIndex]) {
    return null; // or render a loading state if desired
  }
  const { title, categories, desc, previewImage, author, slug, titleColorFeatured } = cards[randomIndex];
  let url = previewImage.asset._ref;
  url = url.replace('image-', '');
  url = url.replace('-webp', '.webp')
  url = url.replace('-jpg', '.jpg')
  url = url.replace('-png', '.png')
  url = url.replace('-jpeg', '.jpeg')
  url = "https://cdn.sanity.io/images/zeqqep1d/production/" + url
  let urlAuthor = author[randomIndex].image.asset._ref
  urlAuthor = urlAuthor.replace('image-', '');
  urlAuthor = urlAuthor.replace('-png', '.png')
  urlAuthor = "https://cdn.sanity.io/images/zeqqep1d/production/" + urlAuthor

  return (
    <motion.div className='ct__featured-article__article'>
        <img src={url} alt={title} />
         <div className='ct__featured-article__article-components'>
           <p>{categories.map(category => category.title).join(', ')}</p>
           <h1 style={{ color: `${titleColorFeatured}`}} >{title}</h1>
           <div className='ct__featured-article__article-components-ba'>
             <Link style={{textDecoration: 'none'}} to={`/blog/${slug.current}`}><button>Read article <FiArrowUpRight style={{marginLeft: 5}} /></button></Link>
             <div className='ct__featured-article__article-components-article'>
               <img src={urlAuthor} alt={author[randomIndex].name} />
               <p>by {author[randomIndex].name}</p>
             </div>
           </div>
         </div>
         <div className='ct__featured-article__article-desc'>
           <div className='ct__featured-article__article-line'></div>
           <p>{desc}</p>
         </div>
    </motion.div>
  )
}

export default FeaturedArticle
