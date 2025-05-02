import BlockContent from '@sanity/block-content-to-react';
import PropTypes from 'prop-types';

// Custom serializers for handling your custom types
const serializers = {
	// Custom serializer for mark types (including anchorLink)
	marks: {
		// Existing link serializer (if you have one)
		link: ({ mark, children }) => {
			return <a href={mark.href}>{children}</a>;
		},

		// New serializer for anchorLink mark type
		anchorLink: ({ mark, children }) => {
			return <a href={`#${mark.id}`}>{children}</a>;
		},
	},

	// Custom serializer for block types (including anchorHeading)
	types: {
		// Custom serializer for anchorHeading block type
		anchorHeading: ({ node }) => {
			const { text, level, anchorId } = node;
			const HeadingTag = `h${level || 2}`; // Default to h2 if level isn't specified

			return <HeadingTag id={anchorId || ''}>{text}</HeadingTag>;
		},
		customImage: ({ node }) => {
			const { image, alt } = node;
			if (!image || !image.asset) {
				return null;
			}

			// Adjust this URL generation based on your Sanity configuration
			const imageUrl =
				image.asset._ref &&
				`https://cdn.sanity.io/images/zeqqep1d/production/${image.asset._ref
					.replace('image-', '')
					.replace('-jpg', '.jpg')
					.replace('-png', '.png')
					.replace('-webp', '.webp')}`;

			return imageUrl ? <img src={imageUrl} alt={alt || ''} /> : null;
		},
	},
};

// Component to render Sanity Portable Text
const SanityBlockContent = ({ blocks, projectId, dataset }) => {
	return <BlockContent blocks={blocks} serializers={serializers} projectId={projectId} dataset={dataset} />;
};

export default SanityBlockContent;

SanityBlockContent.propTypes = {
	blocks: PropTypes.array.isRequired,
	projectId: PropTypes.string.isRequired,
	dataset: PropTypes.string.isRequired,
};
