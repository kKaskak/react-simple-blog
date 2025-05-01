'use client';

import { BlogAdSense } from './BlogAdSense';

export function FeaturedBlogAd() {
	return (
		<div className='featured-ad-container'>
			<BlogAdSense slot='2931588158' format='fluid' style={{ display: 'block', width: '100%', minHeight: '280px' }} className='featured-ad' />
		</div>
	);
}
