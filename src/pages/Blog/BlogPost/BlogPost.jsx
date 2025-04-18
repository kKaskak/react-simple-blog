import React, { useEffect, useState, Suspense, useCallback, useRef } from 'react';
import { client } from '../../../client';
import { BsArrowDown } from 'react-icons/bs';
import { CATEGORIES, useBinaryState } from '../../../common';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import './BlogPost.css';

const Post = React.lazy(() => import('../Post/Post'));

const POSTS_PER_PAGE = 10;

const BlogPost = () => {
	const [categoriesOpen, , closeCategoriesOpen, toggleCategories] = useBinaryState();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(0);
	const [activeFilter, setActiveFilter] = useState('All');
	const loader = useRef(null);

	const fetchPosts = useCallback(
		async (category = 'All', reset = false) => {
			if (loading || (!hasMore && !reset)) return;

			setLoading(true);
			const newPage = reset ? 0 : page;
			const skip = newPage * POSTS_PER_PAGE;

			let query = '';
			if (category === 'All') {
				query = `*[_type == "post"] | order(publishedAtExact desc) [${skip}...${skip + POSTS_PER_PAGE}] {..., categories[]->{title}}`;
			} else {
				query = `*[_type == "post" && references(*[_type == "category" && title == "${category}"]._id)] | order(publishedAtExact desc) [${skip}...${skip + POSTS_PER_PAGE}] {..., categories[]->{title}}`;
			}

			try {
				const data = await client.fetch(query);
				if (reset) {
					setPosts(data);
					setPage(1);
				} else {
					setPosts((prev) => [...prev, ...data]);
					setPage((prev) => prev + 1);
				}
				setHasMore(data.length === POSTS_PER_PAGE);
			} catch (error) {
				console.error('Error fetching posts:', error);
			} finally {
				setLoading(false);
			}
		},
		[loading, hasMore, page],
	);

	useEffect(() => {
		fetchPosts('All', true);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loading) {
					fetchPosts(activeFilter);
				}
			},
			{ threshold: 1.0 },
		);

		if (loader.current) {
			observer.observe(loader.current);
		}

		return () => {
			if (loader.current) {
				observer.unobserve(loader.current);
			}
		};
	}, [fetchPosts, hasMore, loading, activeFilter]);

	const handleCategoryClick = (category) => {
		if (category === activeFilter) return;
		setActiveFilter(category);
		fetchPosts(category, true);

		if (window.innerWidth <= 969) {
			closeCategoriesOpen();
		}
	};

	return (
		<>
			<motion.div className={classNames('blog-categories', { open: categoriesOpen })}>
				{CATEGORIES.map((item, index) => (
					<div
						key={index}
						onClick={() => handleCategoryClick(item)}
						className={classNames('blog-categories-item', { active: activeFilter === item })}
					>
						{item}
					</div>
				))}
			</motion.div>
			<div onClick={toggleCategories} className={classNames('blog-categories-item-last', { active: categoriesOpen })}>
				{categoriesOpen ? <p>Less</p> : <p>More</p>}
				<BsArrowDown className={classNames('arrow', { active: categoriesOpen })} />
			</div>
			<div className='blog'>
				{posts.map((post) => (
					<Suspense key={post.slug.current}>
						<Post post={post} />
					</Suspense>
				))}
				<div ref={loader} style={{ height: '20px', margin: '10px 0' }} />
			</div>
		</>
	);
};

export default BlogPost;
