import { motion } from 'framer-motion';
import { hoverPreview } from '../../pages/Home/animations-home';
import { urlFor } from '../../client';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ArticlePreview.css';

const ArticlePreview = ({ article }) => {
	if (!article) {
		return null;
	}
	const { title, categories, previewImage, titleColorFeatured, slug } = article || {};

	return (
		<motion.div whileHover={hoverPreview} className='secondary-article__article'>
			<Link className='secondary-article__article-link' to={`/blog/${slug.current}`}>
				<img loading='lazy' src={urlFor(previewImage).url()} alt={previewImage.alt} />
				<div className='secondary-article__article-components'>
					<p>{categories.map((category) => category.title).join(', ')}</p>
					<h3 style={{ color: titleColorFeatured }}>{title}</h3>
				</div>
			</Link>
		</motion.div>
	);
};

export default ArticlePreview;

ArticlePreview.propTypes = {
	article: PropTypes.object,
};
