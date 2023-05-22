import React, {useState, useEffect} from 'react'
import { client, urlFor } from '../../client'
import { Link, useParams } from "react-router-dom"
import BlockContent from "@sanity/block-content-to-react"
import './FullArticle.css'
import './BlockContent.css'
import { BsArrowLeft } from 'react-icons/bs'
import { Helmet } from 'react-helmet'
import { loading } from '../../constants/images'

 
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
  const { keywords, desc, headerImage, categories, publishedAt, arrowColor, title, headerDataColor, headerImageAlt, headerImageLink, author, titleColor, body } = singlePost;

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
       </div>
      )}
    </>

  )
}

export default FullArticle