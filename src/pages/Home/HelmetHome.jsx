import { Helmet } from 'react-helmet';

const HelmetHome = () => {
	return (
		<Helmet>
			<title>Curiosity Takeover</title>
			<meta
				name='description'
				content='Curosity Takeover Official Blog. Discover new articles all the time. Dive into our blog for articles that explore the latest trends, fascinating discoveries, and expert insights.'
			/>
			<meta name='keywords' content='Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, Fitness, Blog' />
			<meta property='og:locale' content='en_US' />
			<meta property='og:type' content='blog' />
			<meta property='og:title' content='Curiosity Takeover' />
			<meta
				property='og:description'
				content='Curosity Takeover Official Blog. Discover a captivating blend of Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness.'
			/>
			<meta property='og:url' content='https://curiositytakeover.com' />
			<meta property='og:site_name' content='Curiosity Takeover' />
			<meta
				property='og:image'
				content='https://cdn.sanity.io/images/zeqqep1d/production/be706b03c4fe5169ef2390f7ffe23de0f7f766f5-3012x1746.png'
			/>
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='800' />
			<meta property='og:image:type' content='image/png' />
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:creator' content='@curiosity__blog' />
			<meta name='twitter:site' content='@curiosity__blog' />
			<meta
				name='twitter:image'
				content='https://cdn.sanity.io/images/zeqqep1d/production/be706b03c4fe5169ef2390f7ffe23de0f7f766f5-3012x1746.png'
			/>
		</Helmet>
	);
};

export default HelmetHome;
