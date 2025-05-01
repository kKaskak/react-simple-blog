import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import React from 'react';

const manrope = Manrope({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-manrope',
});

// Default metadata as a template - This is used when page-specific metadata is not provided
export const metadata: Metadata = {
	metadataBase: new URL('https://curiositytakeover.com'),
	title: {
		default: 'Curiosity Takeover',
		template: '%s | Curiosity Takeover',
	},
	description: 'Explore a diverse range of articles on Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness.',
	keywords: 'Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, Fitness, Blog',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		siteName: 'Curiosity Takeover',
		title: {
			default: 'Curiosity Takeover',
			template: '%s | Curiosity Takeover',
		},
		description: 'Explore a diverse range of articles on Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness.',
	},
	twitter: {
		card: 'summary_large_image',
		creator: '@curiosity__blog',
		site: '@curiosity__blog',
		title: {
			default: 'Curiosity Takeover',
			template: '%s | Curiosity Takeover',
		},
		description: 'Explore a diverse range of articles on Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, and Fitness.',
	},
	// Handle robots and canonical URLs in a static-friendly way
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={manrope.className}>{children}</body>
		</html>
	);
}
