import React, {useState, useEffect} from 'react'
import { client, urlFor } from '../../client'
import { Link, useParams } from "react-router-dom"
import BlockContent from "@sanity/block-content-to-react"
import './FullArticle.css'
import './BlockContent.css'
import { BsArrowLeft } from 'react-icons/bs'
import { Helmet } from 'react-helmet'

 
const FullArticle = () => {
  const [singlePost, setSinglePost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { slug } = useParams()
  useEffect(() => {
    const query  = `*[slug.current == "${slug}"]{..., categories[]->{title}}`;
    client.fetch(query)
    .then((data) => setSinglePost(data[0]))
  }, [slug])
  return (
    <div className='ct__full-article'>
      <Helmet>
      <title>{singlePost.title}</title>
      <meta
        name="description"
        content={singlePost.desc}
      />
      <meta
        name="keywords"
        content={singlePost.keywords}
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={singlePost.title} />
      <meta
        property="og:description"
        content={singlePost.desc}
      />
      <meta property="og:url" content={"https://curiositytakeover.com/blog/" + slug} />
      <meta property="og:site_name" content="Curiosity Takeover" />
      <meta property="og:image" content={singlePost.headerImageLink} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="800" />
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@curiosity__takeover" />
      <meta name="twitter:site" content="@curiosity__takeover" />
      </Helmet>
      <div className='ct__full-article__header'>
        {singlePost.headerImage && singlePost.headerImage.asset && (
          <img src={urlFor(singlePost.headerImage).url()} alt={singlePost.headerImageAlt} />
        )}
        <div className='ct__full-article__header-nav'>
          <Link className='ct__full-article__header-nav__link' to={'/blog'}><BsArrowLeft className='ct__full-article__header-nav__link-arrow' size={25} style={{color: `${singlePost.arrowColor}`, zIndex: 1}} /></Link>
          <div className='ct__featured-article__article-components-article'>
            {/* <img src={urlFor(singlePost.author.image)}/>
            <p>{singlePost.author.name}</p> */}
          </div>
        </div>
        <div className='ct__full-article__header-h1'>
          <h1 style={{color: `${singlePost.titleColor}`}}>{singlePost.title}</h1>
          <div className='ct__full-article__header-data' style={{color: `${singlePost.headerDataColor}`}}>
              <p>{singlePost.publishedAt}</p>
              <span>•</span>
              {singlePost.categories && (
                 <p>{singlePost.categories.map(category => category.title).join(', ')}</p>
              )}
          </div>
        </div>
      </div>
      <div className="ct__full-article-block__content">
            <BlockContent
              blocks={singlePost.body}
              projectId="zeqqep1d"
              dataset="production"
            />
      </div>
    </div>
  )
}

export default FullArticle