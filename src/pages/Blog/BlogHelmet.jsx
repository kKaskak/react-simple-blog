import { Helmet } from 'react-helmet';

const BlogHelmet = () => {
	return (
		<Helmet>
			<title>Curiosity Blog Page</title>
			<meta
				name='description'
				content='Explore a diverse range of articles on Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness. Discover valuable insights, latest trends, and expert perspectives in one convenient blog.'
			/>
			<meta
				name='keywords'
				content='Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, Fitness, Article, Blog, Animals'
			/>
			<meta property='og:locale' content='en_US' />
			<meta property='og:type' content='blog' />
			<meta property='og:title' content='Curiosity Blog Page' />
			<meta
				property='og:description'
				content='Curosity blog page. Discover a captivating blend of Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness.'
			/>
			<meta
				property='og:url'
				content='https://curiositytakeover.com/blog'
			/>
			<meta
				property='og:site_name'
				content='Curiosity Takeover Blog page'
			/>
			<meta
				property='og:image'
				content='https://cdn.sanity.io/images/zeqqep1d/production/8fd4f7bbe00d780519edb6e20498da223fdb47da-2250x1272.png'
			/>
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='800' />
			<meta property='og:image:type' content='image/png' />
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:creator' content='@curiosity__blog' />
			<meta name='twitter:site' content='@curiosity__blog' />
			<meta
				name='twitter:image'
				content='https://cdn.sanity.io/images/zeqqep1d/production/8fd4f7bbe00d780519edb6e20498da223fdb47da-2250x1272.png'
			/>
		</Helmet>
	);
};

export default BlogHelmet;
