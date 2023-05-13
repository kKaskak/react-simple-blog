import React, { useEffect, useState } from 'react'
import './Blog.css'
import { client, urlFor } from '../../client'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet';

const Blog = () => {
  const [Cards, setCards] = useState([]);
  useEffect(() => {
    const query  = '*[_type == "post"]{..., categories[]->{title}}';
    client.fetch(query)
    .then((data) => setCards(data))
  }, [])
  return (
    <>
    <Helmet>
    <title>Curiosity Blog Page</title>
        <meta
          name="description"
          content="Explore a diverse range of engaging articles on Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness. Discover valuable insights, latest trends, and expert perspectives in one convenient blog. Stay informed and entertained as you delve into captivating topics that cater to your interests. Expand your knowledge and enjoy an enriching reading experience with our comprehensive blog."
        />
        <meta
          name="keywords"
          content="Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, Fitness"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="blog" />
        <meta property="og:title" content="Curiosity Blog Page" />
        <meta property="og:description" content="Curosity blog page. Discover a captivating blend of Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness." />
        <meta property="og:url" content="https://curiositytakeover.com/blog" />
        <meta property="og:site_name" content="Curiosity Takeover Blog page" />
        <meta property="og:image" content="https://cdn.sanity.io/images/zeqqep1d/production/8fd4f7bbe00d780519edb6e20498da223fdb47da-2250x1272.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_learge_image" />
        <meta name="twitter:creator" content="@curiosity__blog" />
        <meta name="twitter:site" content="@curiosity__blog" />
    </Helmet>
    <div className='ct__blog-heading-container'>
      <h1>Discover</h1>
      <h4>New Articles</h4>
    </div>
    <div className='ct__blog'>
      {Cards.map((post) => (
        <motion.div whileHover={{scale: 1.01, transition: { duration: 1}}} key={post.slug.current} className='ct__blog-article-component'>
           <Link style={{textDecoration: 'none'}} to={`/blog/${post.slug.current}`}>
              <img src={urlFor(post.previewImage)} alt={post.title} />
              <div className='ct__blog-article-component-date'>
                <p>{post.categories.map(category => category.title).join(', ')}</p>
                <p>{post.publishedAt}</p>
              </div> 
              <div className='ct__blog-article-component-title'>
                <h3 style={{ color: `${post.titleColorCard}`}}>{post.title}</h3>
                <p>{post.desc}</p>
              </div>
            </Link>
        </motion.div>
      ))}
    </div>
    </>
  )
}

export default Blog