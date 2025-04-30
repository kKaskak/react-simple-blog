import React, { useEffect, useState, Suspense, useCallback, useRef } from 'react';
import { client } from '../../../client';
import { BsArrowDown } from 'react-icons/bs';
import { CATEGORIES, useBinaryState } from '../../../common';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import AdCard from './AdCard/AdCard';
import FeaturedBlogAd from './FeaturedBlogAd/FeaturedBlogAd';
import './BlogPost.css';

const Post = React.lazy(() => import('../Post/Post'));

const POSTS_PER_PAGE = 10;
const AD_FREQUENCY = 5; // Show an ad after every 5 posts

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

	// Function to render posts with interspersed ads
	const renderPostsWithAds = () => {
		const postsWithAds = [];

		posts.forEach((post, index) => {
			// Add the regular post
			postsWithAds.push(
				<Suspense key={post.slug.current} fallback={<div className='post-loading-placeholder'></div>}>
					<Post post={post} />
				</Suspense>,
			);

			// After every 5th post, add an ad (but not if it's the very last post)
			if ((index + 1) % AD_FREQUENCY === 0 && index < posts.length - 1) {
				postsWithAds.push(<AdCard key={`ad-${index}`} />);
			}
		});

		return postsWithAds;
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
			<FeaturedBlogAd />
			<div className='blog'>
				{renderPostsWithAds()}
				<div ref={loader} style={{ height: '20px', margin: '10px 0' }} />
			</div>
		</>
	);
};

export default BlogPost;
