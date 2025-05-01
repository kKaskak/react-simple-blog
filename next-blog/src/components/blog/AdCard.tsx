'use client';

import { BlogAdSense } from './BlogAdSense';

export function AdCard() {
	return (
		<div className='blog-article-component ad-card'>
			<BlogAdSense
				slot='8896538111'
				format='fluid'
				style={{ display: 'block', width: '100%', height: '100%', minHeight: '250px' }}
				className='ad-container'
			/>
		</div>
	);
}
