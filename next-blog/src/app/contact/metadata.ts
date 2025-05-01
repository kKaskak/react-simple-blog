import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Curiosity Contact Page',
	description:
		'Connect with us through our Contact Page. Reach out to us for any inquiries, collaborations, or feedback. We value your input and look forward to hearing from you. Stay connected with Curiosity Takeover.',
	keywords: 'contact, inquiries, collaborations, feedback, Curiosity Takeover',
	openGraph: {
		locale: 'en_US',
		type: 'website',
		title: 'Curiosity Contact Page',
		description:
			'Connect with us through our Contact Page. Reach out to us for any inquiries, collaborations, or feedback. We value your input and look forward to hearing from you. Stay connected with Curiosity Takeover.',
		url: 'https://curiositytakeover.com/contact',
		siteName: 'Curiosity Takeover',
		images: [
			{
				url: 'https://cdn.sanity.io/images/zeqqep1d/production/dc0af8ffed5f743ce3528579a2a79b17d1d0e77e-2086x1740.png',
				width: 1200,
				height: 800,
				type: 'image/jpeg',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		creator: '@curiosity__blog',
		site: '@curiosity__blog',
		images: 'https://cdn.sanity.io/images/zeqqep1d/production/dc0af8ffed5f743ce3528579a2a79b17d1d0e77e-2086x1740.png',
	},
};
