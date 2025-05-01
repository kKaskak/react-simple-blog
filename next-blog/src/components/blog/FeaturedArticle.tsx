'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity/client';
import { Article } from '@/types/sanity';

interface FeaturedArticleProps {
	article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
	if (!article) return null;

	// Handle either mainImage or previewImage
	const imageSource = article.mainImage || article.previewImage;

	return (
		<motion.div className='min-h-[93vh] w-full h-full flex flex-col rounded-2xl relative'>
			{imageSource && (
				<Image
					src={urlFor(imageSource).url()}
					alt={article.title || 'Featured article'}
					fill
					className='w-full h-full rounded-2xl object-cover absolute select-none'
					priority
				/>
			)}

			<div className='absolute bottom-0 left-0 flex flex-col justify-end p-8 h-full md:p-8 max-[600px]:p-4'>
				<p className='font-bold text-xs leading-[35px] text-white drop-shadow-md pl-[0.3rem]'>
					{article.categories?.map((category) => category.title).join(', ')}
				</p>

				<h1
					className='
            font-black text-[85px] leading-[82px] tracking-[-2px]
            max-[1240px]:text-[66px] max-[1240px]:leading-[62px]
            max-[1140px]:text-[64px] max-[1140px]:leading-[62px]
            max-[970px]:text-[54px] max-[970px]:leading-[52px] max-[970px]:font-extrabold
            max-[600px]:text-[30px] max-[600px]:leading-[35px] max-[600px]:font-extrabold max-[600px]:tracking-normal max-[600px]:max-w-[80%]
            text-white mt-2 max-w-[70%] drop-shadow-md pb-8'
					style={{ color: article.titleColorFeatured || 'white' }}
				>
					{article.title}
				</h1>

				<div className='flex flex-row justify-start items-center'>
					<Link href={`/blog/${article.slug.current}`} className='no-underline'>
						<button className='flex justify-center items-center flex-row cursor-pointer bg-transparent border-2 border-white text-white py-[0.7rem] px-4 rounded-[1.5rem] drop-shadow-lg text-sm'>
							Read article <FiArrowUpRight style={{ marginLeft: 5 }} />
						</button>
					</Link>

					<div className='flex flex-row justify-start items-center rounded-[1.5rem] border-none bg-[rgba(213,208,208,0.55)] ml-2'>
						{article.author?.image && (
							<Image
								src={urlFor(article.author.image).url()}
								alt={article.author.name || 'Author'}
								width={40}
								height={40}
								className='max-w-[2.5rem] max-h-[2.5rem] p-[0.2rem_0_0.2rem_0.2rem] object-cover relative rounded-full'
							/>
						)}
						<p className='text-white py-[0.1rem] px-4 drop-shadow-md'>by {article.author?.name}</p>
					</div>
				</div>
			</div>

			<div
				className='
        absolute bottom-0 right-0 max-w-[30%] p-[2rem_4rem_2rem_2rem]
        max-[1240px]:max-w-[35%]
        max-[970px]:max-w-[30%] max-[970px]:p-[2rem_1rem]
        max-[600px]:hidden
      '
			>
				<div className='w-[30px] h-[1px] absolute bg-white'></div>
				<p className='font-medium text-[13px] leading-normal text-white pt-8 drop-shadow-lg'>{article.excerpt}</p>
			</div>
		</motion.div>
	);
}
