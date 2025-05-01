'use client';

import React, { useEffect, useState, Suspense, useCallback, useRef } from 'react';
import { client } from '@/lib/sanity/client';
import { BsArrowDown } from 'react-icons/bs';
import { CATEGORIES } from '@/lib/utils/constants';
import { useBinaryState } from '@/utils/hooks';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { AdCard } from './AdCard';
import { FeaturedBlogAd } from './FeaturedBlogAd';
import { Post } from './Post';
import { Article } from '@/types/sanity';

const POSTS_PER_PAGE = 10;
const AD_FREQUENCY = 5; // Show an ad after every 5 posts

export const BlogPost = () => {
	const [categoriesOpen, toggleState, closeState, _openState] = useBinaryState() as [boolean, () => void, () => void, () => void];
	const [posts, setPosts] = useState<Article[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(0);
	const [activeFilter, setActiveFilter] = useState('All');
	const loader = useRef(null);

	const fetchPosts = useCallback(
		async (category = 'All', reset = false) => {
			if (loading) return;
			if (!reset && !hasMore) return;

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
					setPosts((prev: Article[]) => [...prev, ...data]);
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
	}, [fetchPosts]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loading) {
					fetchPosts(activeFilter);
				}
			},
			{ threshold: 0.5 },
		);

		if (loader.current) {
			observer.observe(loader.current);
		}

		return () => {
			// eslint-disable-next-line
			const currentLoader = loader.current; // Store ref value
			if (currentLoader) {
				observer.unobserve(currentLoader);
			}
		};
	}, [fetchPosts, hasMore, loading, activeFilter]);

	const handleCategoryClick = (category: string) => {
		if (category === activeFilter) return;

		setActiveFilter(category);

		setPosts([]);
		setPage(0);
		setHasMore(true);
		fetchPosts(category, true);

		if (window.innerWidth <= 969) {
			closeState();
		}
	};

	const renderPostsWithAds = () => {
		const postsWithAds: React.ReactNode[] = [];

		if (posts.length === 0) {
			return null;
		}

		const addedPostIds = new Set();

		posts.forEach((post, index) => {
			if (addedPostIds.has(post._id)) {
				return;
			}

			addedPostIds.add(post._id);

			postsWithAds.push(
				<Suspense key={`${post._id}-${index}`} fallback={<div className='post-loading-placeholder'></div>}>
					<Post post={post} />
				</Suspense>,
			);

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
			<div onClick={toggleState} className={classNames('blog-categories-item-last', { active: categoriesOpen })}>
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
