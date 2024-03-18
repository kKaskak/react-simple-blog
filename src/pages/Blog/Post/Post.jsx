import { motion } from 'framer-motion';
import { urlFor } from '../../../client';
import { blogCard, hover } from '../animations-blog';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './Post.css';

const Post = ({ post }) => {
	return (
		<motion.div
			initial={'hidden'}
			whileInView={'show'}
			viewport={{ once: true, amount: 0.3 }}
			variants={blogCard}
			whileHover={hover}
			key={post.slug.current}
			className='blog-article-component'
		>
			<Link
				style={{ textDecoration: 'none' }}
				to={`/blog/${post.slug.current}`}
			>
				<img src={urlFor(post.previewImage)} alt={post.title} />
				<div className='blog-article-component-date'>
					<p style={{ color: post.categoriesPreviewColor }}>
						{post.categories
							.map((category) => category.title)
							.join(', ')}
					</p>
					<p style={{ color: post.publishedAtPreviewColor }}>
						{post.publishedAt}
					</p>
				</div>
				<div className='blog-article-component-title'>
					<h3
						style={{
							color: `${post.titleColorCard}`,
							filter: `${post.titleFilter}`,
						}}
					>
						{post.title}
					</h3>
					<p>{post.desc}</p>
				</div>
			</Link>
		</motion.div>
	);
};

export default Post;

Post.propTypes = {
	post: propTypes.shape({
		title: propTypes.string,
		desc: propTypes.string,
		slug: propTypes.shape({
			current: propTypes.string,
		}),
		previewImage: propTypes.object,
		categories: propTypes.arrayOf(
			propTypes.shape({
				title: propTypes.string,
			})
		),
		publishedAt: propTypes.string,
		categoriesPreviewColor: propTypes.string,
		publishedAtPreviewColor: propTypes.string,
		titleColorCard: propTypes.string,
		titleFilter: propTypes.string,
	}),
};
