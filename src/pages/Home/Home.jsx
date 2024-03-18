import { useState, useEffect } from 'react';
import { ArticlePreview, FeaturedArticle } from '../../components';
import HelmetHome from './HelmetHome';
import {
	FeaturedContainer,
	PreviewContainer,
	hoverFeatured,
} from './animations-home';
import { motion } from 'framer-motion';
import { client } from '../../client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import { useMobileDevice } from '../../common';

// --> Carousel settings
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

const Header = () => {
	const [featuredArticle, setFeaturedArticle] = useState([]);
	const [previewArticles, setPreviewArticles] = useState([]);
	const isMobile = useMobileDevice();

	// Fetch from the CMS
	useEffect(() => {
		const query =
			'*[_type == "post"]{..., "imageUrl": previewImage.asset->url,  "author": author->{name, image}, categories[]->{title}}';

		client.fetch(query).then((data) => {
			const featuredIndexes = [];

			// assuming you want only one featured article
			while (featuredIndexes.length < 5) {
				const featuredIndex = Math.floor(Math.random() * data.length);
				if (!featuredIndexes.includes(featuredIndex)) {
					featuredIndexes.push(featuredIndex);
				}
			}

			const previewIndices = [];
			// assuming you want 3 different preview articles
			while (previewIndices.length < 3) {
				const index = Math.floor(Math.random() * data.length);
				!featuredIndexes.includes(index) && !previewIndices.includes(index) ? previewIndices.push(index) : null;
			}
			setPreviewArticles(previewIndices.map((index) => data[index]));
			setFeaturedArticle(featuredIndexes.map((index) => data[index]));
		});
	}, []);

	return (
		<>
			{!isMobile && (
				<div className='header'>
					<HelmetHome />
					<motion.div
						whileHover={hoverFeatured}
						initial={'hidden'}
						whileInView={'show'}
						variants={FeaturedContainer}
						className='header-main'
					>
						<FeaturedArticle article={featuredArticle[0]} />
					</motion.div>
					<motion.div
						initial={'hidden'}
						whileInView={'show'}
						variants={PreviewContainer}
						className='header-secondary'
					>
						{previewArticles.map((article, index) => (
							<ArticlePreview key={index} article={article} />
						))}
					</motion.div>
				</div>
			)}
			{isMobile && (
				<div className='header-mobile'>
					<Slider {...settings}>
						{featuredArticle.map((article, index) => {
							return (
								<div key={index}>
									<FeaturedArticle article={article} />
								</div>
							);
						})}
					</Slider>
				</div>
			)}
		</>
	);
};

export default Header;
