'use client';

import { PageLayout } from '@/components';
import { GoogleAdScript } from '@/components/ui/GoogleAd';
import { BlogPost } from '@/components/blog/BlogPost';

export default function Blog() {
	return (
		<>
			<GoogleAdScript />
			<PageLayout>
				<div className='blog-heading-container'>
					<h1>Discover</h1>
					<h4>New Articles</h4>
				</div>
				<BlogPost />
			</PageLayout>
		</>
	);
}
