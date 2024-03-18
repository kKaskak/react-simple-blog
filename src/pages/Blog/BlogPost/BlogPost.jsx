import React, { useEffect, useState, Suspense } from 'react';
import { client } from '../../../client';
import { BsArrowDown } from 'react-icons/bs';
import { CATEGORIES, useBinaryState } from '../../../common';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import './BlogPost.css';

const Post = React.lazy(() => import('../Post/Post'));

const BlogPost = () => {
	const [categoriesOpen,,, toggleCategories] = useBinaryState();
	const [cards, setCards] = useState([]);
	const [filterCards, setFilterCards] = useState([]);
	const [activeFilter, setActiveFilter] = useState('All');

	useEffect(() => {
		const query = '*[_type == "post"] | order(publishedAtExact desc) {..., categories[]->{title}}';
		client.fetch(query).then((data) => {
			setCards(data);
			setFilterCards(data);
		});
	}, []);

	const handleCardsFilter = (item) => {
		setActiveFilter(item);
		item === 'All' ? setFilterCards(cards)
			: setFilterCards(cards.filter((card) => card.categories.some((category) => category.title === item)));
	};

	return (
		<>
			<motion.div className={classNames('blog-categories', { 'open': categoriesOpen })}>
				{CATEGORIES.map((item, index) => (
					<div
						key={index}
						onClick={() => handleCardsFilter(item)}
						className={classNames('blog-categories-item', { 'active': activeFilter === item })}
					>
						{item}
					</div>
				))}
			</motion.div>
			<div
				onClick={toggleCategories}
				className={classNames('blog-categories-item-last', { 'active': categoriesOpen })}
			>
				{categoriesOpen ? <p>Less</p> : <p>More</p>}
				<BsArrowDown
					className={classNames('arrow', { 'active': categoriesOpen })}
				/>
			</div>
			<div className='blog'>
				{filterCards.map((post) => (
					<Suspense key={post.slug.current}>
						<Post post={post} />
					</Suspense>
				))}
			</div>
		</>
	);
};

export default BlogPost;
