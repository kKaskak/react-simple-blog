'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity/client';
import { Article } from '@/types/sanity';

// Animation from original code
const hoverPreview = {
	scale: 1.01,
	transition: {
		duration: 0.2,
		type: 'tween',
	},
};

interface ArticlePreviewProps {
	article: Article;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
	if (!article) return null;

	// Handle either mainImage or previewImage
	const imageSource = article.mainImage || article.previewImage;

	return (
		<motion.div whileHover={hoverPreview} className='w-full h-1/2 flex flex-col rounded-2xl relative cursor-pointer'>
			<Link href={`/blog/${article.slug.current}`} className='w-full h-full flex flex-col rounded-2xl relative cursor-pointer'>
				{imageSource && (
					<Image
						src={urlFor(imageSource).url()}
						alt={article.title || 'Article preview'}
						fill
						className='max-w-full h-full rounded-2xl object-cover cursor-pointer select-none'
					/>
				)}

				<div className='absolute flex flex-col justify-end p-6 h-full rounded-bl-2xl rounded-br-2xl'>
					<p className='font-bold text-[11.649px] leading-[35px] text-white drop-shadow-md'>
						{article.categories?.map((category) => category.title).join(', ')}
					</p>

					<h3
						className='font-extrabold text-2xl leading-[30px] text-white font-[var(--font-family)] mt-2 cursor-pointer drop-shadow-md'
						style={{ color: article.titleColorFeatured || 'white' }}
					>
						{article.title}
					</h3>
				</div>
			</Link>
		</motion.div>
	);
}
