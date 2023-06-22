import React, { useEffect, useState, Suspense } from 'react'
import { client } from '../../client';
import { BsArrowDown } from 'react-icons/bs'
import { AnimatePresence } from 'framer-motion';
import './Blog.css'

const Post = React.lazy(() => import('./Post'))

const BlogPost = () => {
  const [isMoreActive, setIsMoreActive] = useState(false)
  const [Cards, setCards] = useState([]);
  const [FilterCards, setFilterCards] = useState([]);
  const [ActiveFilter, setActiveFilter] = useState('All');
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const query  = '*[_type == "post"] | order(publishedAtExact desc) {..., categories[]->{title}}';
    client.fetch(query)
    .then((data) => {
      setCards(data);
      setFilterCards(data);
    })
  }, [])
 
  const toggleActive = () => {
    const el = document.querySelector('.ct__blog-categories');
    if (!isMoreActive) {
      setIsMoreActive(true)
      el.style.height = 'auto';
    } else {
      setIsMoreActive(false)
      el.style.height = '4.5rem';
    }
  }
  const handleCardsFilter = (item) => {
    setActiveFilter(item);
    setTimeout(() => {
      if (item === "All") {
        setFilterCards(Cards);
      } else {
        setFilterCards(Cards.filter((card) => {
          return card.categories[0].title.includes(item);
        }));
      }
    }, 500);
  }
  return (
    <>
      <div className='ct__blog-categories'> 
      {["All", "Animals", "Fashion", "Fitness", "Finance", "Food", "Health", "Lifestyle", "Tech", "Travel"].map((item, index) => (
        <div
         key={index}
         onClick={() => handleCardsFilter(item)}
         className={`ct__blog-categories-item ${ActiveFilter === item ? 'item-active' : ''}`}
        >
          {item}
        </div>
      ))}
      </div>
      <div onClick={toggleActive} className={`ct__blog-categories-item-last ${isMoreActive ? 'active' : ''}`}>{isMoreActive ? <p>Less</p> : <p>More</p> }<BsArrowDown className={`arrow ${isMoreActive ? 'active' : ''}`} /></div>
      <div className='ct__blog'>
            {FilterCards.map((post) => (
                <Suspense key={post.slug.current}>
                    <Post post={post} />
                </Suspense>
            ))}
      </div>
    </>
    
  )
}

export default BlogPost