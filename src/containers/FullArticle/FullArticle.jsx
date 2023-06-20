import React, { useState, useEffect } from 'react'
import { client, urlFor } from '../../client'
import { Link, useParams } from "react-router-dom"
import BlockContent from "@sanity/block-content-to-react"
import { motion, AnimatePresence } from 'framer-motion'
import { BsArrowLeft, BsFacebook, BsPinterest, BsReddit } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { FiArrowUpRight } from 'react-icons/fi'
import { Helmet } from 'react-helmet'
import { linkedin, aTwisted, logo_small_no_bg  } from '../../constants/images'
import { Loading } from '../../components/export'
import { IoMdClose } from 'react-icons/io'
import './FullArticle.css'
import './BlockContent.css'


 
const FullArticle = () => {
  const [singlePost, setSinglePost] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false);
  const { slug } = useParams()
  useEffect(() => {
    const query  = `*[slug.current == "${slug}"]{
      ..., 
      categories[]->{title}, 
      "author": author->{
        name,
        image,
        bio
      }
    }`;    
    client.fetch(query)
    .then((data) => {
      setSinglePost(data[0]);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }, [slug])
  if(!singlePost || !singlePost.headerImage || !singlePost.author || !singlePost.body) {
    return null;
  }
  const { keywords, desc, headerImage, categories, publishedAt, arrowColor, title, headerDataColor, headerImageAlt, headerImageLink, author, titleColor, body, ffTitle, ffParagraph, ffImage, ffLink, ffImageAlt, fsTitle, fsParagraph, fsImage, fsLink, fsImageAlt } = singlePost;
  const ScrollTop = () => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100);
  }
  return (
    <>
      <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content={desc}
      />
      <meta
        name="keywords"
        content={keywords}
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={desc}
      />
      <meta property="og:url" content={"https://curiositytakeover.com/blog/" + slug} />
      <meta property="og:site_name" content="Curiosity Takeover" />
      <meta property="og:image" content={headerImageLink} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="800" />
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@curiosity__blog" />
      <meta name="twitter:site" content="@curiosity__blog" />
      <meta name="twitter:image" content={headerImageLink} />
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <>
        <div className='ct__full-article'>
         <div className='ct__full-article__header'>
           { headerImage && headerImage.asset && (
             <img src={urlFor(headerImage.asset).url()} alt={headerImageAlt} />
           )}
           <Link className='ct__full-article__header-nav__link' to={'/blog'}>
              <BsArrowLeft className='ct__full-article__header-nav__link-arrow' size={30} style={{color: `${arrowColor}`, zIndex: 1}} />
            </Link>
          <div className='ct__full-article__header-nav'>
          <AnimatePresence>
            {!showDetails && (
              <motion.div className='ct__full-article__header-nav__author' layoutId="author" onClick={() => setShowDetails(true)}>
                { author.image && author.image.asset && (
                  <>
                    <motion.img src={urlFor(author.image.asset).url()} alt={author.name}/>
                    <motion.p>by {author.name}</motion.p>
                  </>
                )}
              </motion.div>
            )}

            {showDetails && (
              <motion.div className='ct__full-article__header-nav__author open' layoutId="author-details" 
                positionTransition
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <motion.img src={urlFor(author.image.asset).url()} alt={author.name} />
                <motion.div className='expanded-article-details-data'>
                  <motion.h3>{author.name}</motion.h3>
                  {author.bio && <BlockContent blocks={author.bio} />}
                </motion.div>
                <motion.button onClick={() => setShowDetails(false)}><IoMdClose /></motion.button>
               </motion.div>
            )}
          </AnimatePresence>
          </div>
           <div className='ct__full-article__header-h1'>
             <h1 style={{color: `${titleColor}`}}>{title}</h1>
             <div className='ct__full-article__header-data' style={{color: `${headerDataColor}`}}>
                 <p>{publishedAt}</p>
                 <span>•</span>
                 {categories && (
                    <p>{categories.map(category => category.title).join(', ')}</p>
                 )}
             </div>
           </div>
         </div>
         <div className="ct__full-article-block__content">
               <BlockContent
                 blocks={body}
                 projectId="zeqqep1d"
                 dataset="production"
               />
         </div>
            <div className='ct__full-article__share'>
                <hr className='hr-full-article'></hr>
               <div className='ct__full-article__share-header'>
                <h3>Share this article</h3>
                <img className='ct__full-article__share-header__arrow-twisted' src={aTwisted} alt="arrow-twisted" />
               </div>
               <div className='ct__full-article__share-icons'>
                  <a target='_blank' rel="noreferrer" href={`https://www.twitter.com/intent/tweet?url=https://www.curiositytakeover.com/blog/${slug}&text=${desc}`}>
                    <AiFillTwitterCircle size={85} style={{minWidth: '58px'}} />
                  </a>
                  <a target='_blank' rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=https://www.curiositytakeover.com/blog/${slug}`}>
                    <BsFacebook size={75}/>
                  </a>
                  <a target='_blank' rel="noreferrer" href={`https://www.reddit.com/submit?url=https://www.curiositytakeover.com/blog/${slug}&title=${title}`}>
                    <BsReddit size={75}/>
                  </a>
                  <a target='_blank' rel="noreferrer" href={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.curiositytakeover.com/blog/${slug}&title=${title}&summary=${desc}&source=${'https://www.curiositytakeover.com'}`}>
                    <img src={linkedin} alt="linkedin"/>
                  </a>
                  <a target='_blank' rel="noreferrer" href={`http://www.pinterest.com/pin/create/button/?url=https://www.curiositytakeover.com/blog/${slug}&description=${desc}`}>
                    <BsPinterest size={75}/>
                  </a>
                </div>
                <hr className='hr-full-article-last'></hr>
            </div>
            <div className='ct__full-article__featured'>
                  <h3>Featured for you</h3>
                  <hr></hr>
                  <div className='ct__full-article__featured-card'>
                    <img src={urlFor(ffImage).url()} alt={ffImageAlt}/>
                    <div className='ct__full-article__featured-card-components'>
                      <h4>{ffTitle}</h4>
                      <p>{ffParagraph}</p>
                      <Link onClick={ScrollTop} className='ct__full-article__featured-card-components-link' to={`/blog/${ffLink}`}><button>Read <FiArrowUpRight className='ct__full-article__featured-card-arrow' /></button></Link>
                    </div>
                  </div>
                  <hr></hr>
                  <div className='ct__full-article__featured-card'>
                    <div className='ct__full-article__featured-card-components' style={{ textAlign: 'right' }}>
                      <h4>{fsTitle}</h4>
                      <p>{fsParagraph}</p>
                      <Link onClick={ScrollTop} className='ct__full-article__featured-card-components-link' to={`/blog/${fsLink}`}><button style={{ float: 'right'}}>Read <FiArrowUpRight className='ct__full-article__featured-card-arrow' /></button></Link>
                    </div>
                    <img src={urlFor(fsImage).url()} alt={fsImageAlt} />
                  </div>
            </div>
            <div className='ct__full-article__footer'>
              <hr className='hr__full-article__featured-last'></hr>
              <div className='ct__navbar-logo_container'>
                <Link to={'/'}><img src={logo_small_no_bg} alt="Logo Curiosity Takeover blog" /></Link>
                <Link to={'/'}><strong>Curiosity Takeover</strong></Link>
              </div>
              <div className='ct__full-article__share-icons' style={{justifyContent: 'center', gap: "1rem", alignItems: 'center' }}>
                  <a target='_blank'rel="noreferrer"  href={`https://twitter.com/curiosity__blog`}>
                    <AiFillTwitterCircle size={55} style={{minWidth: 55}} />
                  </a>
                  <a target='_blank'rel="noreferrer" href='https://www.facebook.com/curiosity.takeover/'>
                    <BsFacebook size={47} style={{minWidth: 47}}/>
                  </a>
              </div>
              <div className='ct__full-article__footer'>
                <h6 className='ct__full-article__footer-rights'>© 2023 Curiosity Takeover Official Blog • All rights reserved.</h6>
              </div>
            </div>
       </div>
        </>
      )}
    </>

  )
}

export default FullArticle