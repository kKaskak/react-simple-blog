import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { BsArrowLeft } from 'react-icons/bs';
import { urlFor } from '../../client';
import BlockContent from '@sanity/block-content-to-react';
import propTypes from 'prop-types';
import './FullArticle.css';

const FullArticleHeader = ({
	headerImage,
	headerDataColor,
	headerImageAlt,
	author,
	arrowColor,
	titleColor,
	titleFilter,
	title,
	publishedAt,
	categories,
}) => {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<div className='ct__full-article__header'>
			{headerImage && headerImage.asset && (
				<img
					src={urlFor(headerImage.asset).url()}
					alt={headerImageAlt}
				/>
			)}
			<Link className='ct__full-article__header-nav__link' to={'/blog'}>
				<BsArrowLeft
					className='ct__full-article__header-nav__link-arrow'
					size={30}
					style={{ color: `${arrowColor}`, zIndex: 1 }}
				/>
			</Link>
			<div className='ct__full-article__header-nav'>
				<AnimatePresence>
					{!showDetails && (
						<motion.div
							className='ct__full-article__header-nav__author'
							layoutId='author'
							onClick={() => setShowDetails(true)}
						>
							{author.image && author.image.asset && (
								<>
									<motion.img
										src={urlFor(author.image.asset).url()}
										alt={author.name}
									/>
									<motion.p>by {author.name}</motion.p>
								</>
							)}
						</motion.div>
					)}

					{showDetails && (
						<motion.div
							className='ct__full-article__header-nav__author open'
							layoutId='author-details'
							positionTransition
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
						>
							<motion.img
								src={urlFor(author.image.asset).url()}
								alt={author.name}
							/>
							<motion.div className='expanded-article-details-data'>
								<motion.h3>{author.name}</motion.h3>
								{author.bio && (
									<BlockContent blocks={author.bio} />
								)}
							</motion.div>
							<motion.button
								onClick={() => setShowDetails(false)}
							>
								<IoMdClose />
							</motion.button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<div className='ct__full-article__header-h1'>
				<h1
					style={{ color: `${titleColor}`, filter: `${titleFilter}` }}
				>
					{title}
				</h1>
				<div
					className='ct__full-article__header-data'
					style={{ color: `${headerDataColor}` }}
				>
					<p>{publishedAt}</p>
					<span>•</span>
					{categories && (
						<p>
							{categories
								.map((category) => category.title)
								.join(', ')}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default FullArticleHeader;

FullArticleHeader.propTypes = {
	headerImage: propTypes.object,
	headerDataColor: propTypes.string,
	headerImageAlt: propTypes.string,
	author: propTypes.object,
	arrowColor: propTypes.string,
	titleColor: propTypes.string,
	titleFilter: propTypes.string,
	title: propTypes.string,
	publishedAt: propTypes.string,
	categories: propTypes.array,
};

