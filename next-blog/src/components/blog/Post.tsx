'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';
import { Article } from '@/types/sanity';

interface PostProps {
	post: Article;
}

export function Post({ post }: PostProps) {
	if (!post) return null;

	// Handle either mainImage or previewImage
	const imageSource = post.mainImage || post.previewImage;

	return (
		<div className='blog-article-component'>
			<Link href={`/blog/${post.slug.current}`}>
				{imageSource && (
					<Image src={urlFor(imageSource).width(600).url()} alt={post.title} width={600} height={400} className='blog-article-image' />
				)}
				<div className='blog-article-component-date'>
					{post.categories && post.categories.length > 0 && <span className='blog-category-tag'>{post.categories[0].title}</span>}
					{post.publishedAt && (
						<p>
							{new Date(post.publishedAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
					)}
				</div>
				<div className='blog-article-component-title'>
					<h3>{post.title}</h3>
					{post.excerpt && <p>{post.excerpt}</p>}
				</div>
			</Link>
		</div>
	);
}
