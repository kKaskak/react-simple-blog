'use client';

import { useState, useEffect } from 'react';
import { PageLayout, FeaturedArticle, ArticlePreview, Loading } from '@/components';
import { client } from '@/lib/sanity/client';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMobileDevice } from '@/utils/hooks';

// Animation variants exactly matching the original
let x = -500;
let xValue = 300;
if (typeof window !== 'undefined') {
	x = window.innerWidth >= 1000 ? -500 : -200;
	xValue = window.innerWidth >= 1000 ? 300 : 100;
}

const FeaturedContainer = {
	hidden: {
		opacity: 0,
		x: x,
	},
	show: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.8,
			delay: 0.2,
			type: 'tween',
		},
	},
};

const PreviewContainer = {
	hidden: {
		opacity: 0,
		x: xValue,
	},
	show: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			delay: 1,
			type: 'string',
			bounce: 0.2,
		},
	},
};

const hoverFeatured = {
	scale: 1.005,
	transition: {
		duration: 0.2,
		type: 'tween',
	},
};

// Carousel settings
const settings = {
	dots: false,
	arrows: false,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	speed: 1000,
	autoplaySpeed: 3000,
	pauseOnHover: true,
};

export default function HomePage() {
	const [featuredArticles, setFeaturedArticles] = useState<any[]>([]);
	const [previewArticles, setPreviewArticles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const isMobile = useMobileDevice();

	// Fetch from the CMS
	useEffect(() => {
		const fetchArticles = async () => {
			try {
				// Simplified query making sure we get all needed fields
				const query = `*[_type == "post"] {
          _id,
          title,
          slug,
          previewImage,
          mainImage,
          excerpt,
          titleColorFeatured,
          "author": author-> {
            name,
            image
          },
          categories[]-> {
            title
          }
        }`;

				const data = await client.fetch(query);

				const featuredIndexes: number[] = [];
				// Get 5 random featured articles
				while (featuredIndexes.length < 5 && data.length > 0) {
					const featuredIndex = Math.floor(Math.random() * data.length);
					if (!featuredIndexes.includes(featuredIndex)) {
						featuredIndexes.push(featuredIndex);
					}
				}

				const previewIndices: number[] = [];
				// Get 3 different articles for preview
				while (previewIndices.length < 3 && data.length > featuredIndexes.length) {
					const index = Math.floor(Math.random() * data.length);
					if (!featuredIndexes.includes(index) && !previewIndices.includes(index)) {
						previewIndices.push(index);
					}
				}

				setFeaturedArticles(featuredIndexes.map((index) => data[index]));
				setPreviewArticles(previewIndices.map((index) => data[index]));
				setLoading(false);
			} catch (error) {
				console.error('Error fetching articles:', error);
				setLoading(false);
			}
		};

		fetchArticles();
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<PageLayout>
			{!isMobile && (
				<div className='header flex flex-row gap-2 p-2'>
					<motion.div
						whileHover={hoverFeatured}
						initial={'hidden'}
						whileInView={'show'}
						variants={FeaturedContainer}
						className='header-main flex-[3] flex-wrap rounded-2xl min-h-[93vh]'
					>
						{featuredArticles.length > 0 && <FeaturedArticle article={featuredArticles[0]} />}
					</motion.div>
					<motion.div
						initial={'hidden'}
						whileInView={'show'}
						variants={PreviewContainer}
						className='header-secondary flex-1 flex flex-col rounded-2xl gap-2 min-h-[90vh] max-[800px]:hidden'
					>
						{previewArticles.map((article, index) => (
							<ArticlePreview key={index} article={article} />
						))}
					</motion.div>
				</div>
			)}

			{isMobile && (
				<div className='header-mobile min-h-[93vh] max-h-[93vh] rounded-2xl block'>
					<Slider {...settings}>
						{featuredArticles.map((article, index) => (
							<div key={index}>
								<FeaturedArticle article={article} />
							</div>
						))}
					</Slider>
				</div>
			)}
		</PageLayout>
	);
}
