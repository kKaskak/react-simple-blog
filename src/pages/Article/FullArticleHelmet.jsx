import { Helmet } from 'react-helmet';
import propTypes from 'prop-types';

const FullArticleHelmet = ({ title, desc, keywords, slug, headerImageLink }) => {
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
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='800' />
			<meta property='og:image:type' content='image/png' />
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
