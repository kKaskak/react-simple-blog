import { Helmet } from 'react-helmet-async';
import propTypes from 'prop-types';

const FullArticleHelmet = ({ slug, title, desc, keywords, headerImageLink }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={desc} />
			<meta name='keywords' content={keywords} />
			<meta property='og:locale' content='en_US' />
			<meta property='og:type' content='article' />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={desc} />
			<meta property='og:url' content={'https://curiositytakeover.com/blog/' + slug} />
			<meta property='og:site_name' content='Curiosity Takeover' />
			<meta property='og:image' content={headerImageLink} />
			<meta property='og:url' content={`https://www.curiositytakeover.com/blog/${slug}`} />
			<meta property='og:site_name' content='Curiosity Takeover Blog' />
			<meta property='og:type' content='article' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={desc} />
			<meta name='twitter:image' content={headerImageLink} />
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:creator' content='@curiosity__blog' />
			<meta name='twitter:site' content='@curiosity__blog' />
			<meta name='twitter:image' content={headerImageLink} />
		</Helmet>
	);
};

export default FullArticleHelmet;

FullArticleHelmet.propTypes = {
	title: propTypes.string,
	desc: propTypes.string,
	keywords: propTypes.string,
	slug: propTypes.string,
	headerImageLink: propTypes.string,
};
