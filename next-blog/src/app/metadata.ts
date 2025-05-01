import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Curiosity Takeover',
	description:
		'Curosity Takeover Official Blog. Discover new articles all the time. Dive into our blog for articles that explore the latest trends, fascinating discoveries, and expert insights.',
	keywords: 'Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, Fitness, Blog',
	openGraph: {
		locale: 'en_US',
		type: 'website',
		title: 'Curiosity Takeover',
		description:
			'Curosity Takeover Official Blog. Discover a captivating blend of Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness.',
		url: 'https://curiositytakeover.com',
		siteName: 'Curiosity Takeover',
		images: [
			{
				url: 'https://cdn.sanity.io/images/zeqqep1d/production/be706b03c4fe5169ef2390f7ffe23de0f7f766f5-3012x1746.png',
				width: 1200,
				height: 800,
				type: 'image/png',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		creator: '@curiosity__blog',
		site: '@curiosity__blog',
		images: 'https://cdn.sanity.io/images/zeqqep1d/production/be706b03c4fe5169ef2390f7ffe23de0f7f766f5-3012x1746.png',
	},
};
