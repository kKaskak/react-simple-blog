import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Curiosity Blog Page',
	description:
		'Explore a diverse range of articles on Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness. Discover valuable insights, latest trends, and expert perspectives in one convenient blog.',
	keywords: 'Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, Fitness, Article, Blog, Animals',
	openGraph: {
		locale: 'en_US',
		type: 'website',
		title: 'Curiosity Blog Page',
		description:
			'Curosity blog page. Discover a captivating blend of Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness.',
		url: 'https://curiositytakeover.com/blog',
		siteName: 'Curiosity Takeover Blog page',
		images: [
			{
				url: 'https://cdn.sanity.io/images/zeqqep1d/production/8fd4f7bbe00d780519edb6e20498da223fdb47da-2250x1272.png',
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
		images: 'https://cdn.sanity.io/images/zeqqep1d/production/8fd4f7bbe00d780519edb6e20498da223fdb47da-2250x1272.png',
	},
};
