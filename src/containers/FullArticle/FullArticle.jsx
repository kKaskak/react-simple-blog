import React, { useState, useEffect } from 'react'
import { client, urlFor } from '../../client'
import { Link, useParams } from "react-router-dom"
import BlockContent from "@sanity/block-content-to-react"
import { BsArrowLeft, BsFacebook, BsPinterest, BsReddit } from 'react-icons/bs'
import { Helmet } from 'react-helmet'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { FiArrowUpRight } from 'react-icons/fi'
import { linkedin, aTwisted } from '../../constants/images'
import { loading } from '../../constants/images'
import './FullArticle.css'
import './BlockContent.css'


 
const FullArticle = () => {
  const [singlePost, setSinglePost] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { slug } = useParams()
  useEffect(() => {
    const query  = `*[slug.current == "${slug}"]{
      ..., 
      categories[]->{title}, 
      "author": author->{
        name,
        image
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
      <meta name="twitter:creator" content="@curiosity__takeover" />
      <meta name="twitter:site" content="@curiosity__takeover" />
      <meta name="twitter:image" content={headerImageLink} />
      </Helmet>
      {isLoading ? (
        <div className='loading'>
          <img src={loading} alt="loading animation" />
        </div>
      ) : (
        <div className='ct__full-article'>
         <div className='ct__full-article__header'>
           { headerImage && headerImage.asset && (
             <img src={urlFor(headerImage.asset).url()} alt={headerImageAlt} />
           )}
           <div className='ct__full-article__header-nav'>
            <Link className='ct__full-article__header-nav__link' to={'/blog'}>
              <BsArrowLeft className='ct__full-article__header-nav__link-arrow' size={25} style={{color: `${arrowColor}`, zIndex: 1}} />
            </Link>
             <div className='ct__full-article__header-nav__author'>
              { author.image && author.image.asset && (
                <>
                  <img src={urlFor(author.image.asset).url()} alt={author.name}/>
                  <p>by {author.name}</p>
                </>
              )}
             </div>
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
                  <a target='_blank'rel="noreferrer"  href={`https://twitter.com/share?url=${"https://curiositytakeover.com/blog/" + slug}&text=${desc}`}>
                    <AiFillTwitterCircle size={85} style={{minWidth: 58}} />
                  </a>
                  <a target='_blank'rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${"https://curiositytakeover.com/blog/" + slug}`}>
                    <BsFacebook size={75}/>
                  </a>
                  <a target='_blank'rel="noreferrer" href={`https://reddit.com/submit?url=${"https://curiositytakeover.com/blog/" + slug}&title=${title}`}>
                    <BsReddit size={75}/>
                  </a>
                  <a target='_blank'rel="noreferrer" href={`https://www.linkedin.com/shareArticle?url=${"https://curiositytakeover.com/blog/" + slug}>&title=${title}`}>
                    <img src={linkedin} alt="linkedin"/>
                  </a>
                  <a target='_blank'rel="noreferrer" href={`http://pinterest.com/pin/create/button/?url=${"https://curiositytakeover.com/blog/" + slug}&description=${desc}`}>
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
              <h6 className='ct__full-article__footer-rights'>© 2023 Curiosity Takeover Offcial Blog • All rights reserved.</h6>
            </div>
       </div>
      )}
    </>

  )
}

export default FullArticle