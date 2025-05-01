'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { BsArrowLeft } from 'react-icons/bs';
import { useBinaryState } from '@/utils/hooks';
import { urlFor } from '@/lib/sanity';
import { SanityBlockContent } from './blog/SanityBlockContent';
import Link from 'next/link';
import Image from 'next/image';
import { MouseEventHandler } from 'react';

type Category = {
	title: string;
};

type FullArticleHeaderProps = {
	headerImage: any;
	headerDataColor: string;
	headerImageAlt: string;
	author: any;
	arrowColor: string;
	titleColor: string;
	titleFilter: string;
	title: string;
	publishedAt: string;
	categories: Category[];
};

export const FullArticleHeader = ({
	headerImage,
	headerDataColor,
	headerImageAlt,
	author,
	arrowColor,
	titleColor,
	titleFilter,
	title,
	publishedAt,
	categories,
}: FullArticleHeaderProps) => {
	const [detailsOpen, closeDetails, openDetails] = useBinaryState();

	const handleOpenDetails: MouseEventHandler<HTMLDivElement> = () => {
		openDetails();
	};

	const handleCloseDetails: MouseEventHandler<HTMLButtonElement> = () => {
		closeDetails();
	};

	return (
		<div className='full-article__header'>
			{headerImage && headerImage.asset && (
				<Image src={urlFor(headerImage.asset).url()} alt={headerImageAlt} fill className='object-cover' priority />
			)}
			<Link className='full-article__header-nav__link' href='/blog'>
				<BsArrowLeft className='full-article__header-nav__link-arrow' size={30} style={{ color: `${arrowColor}`, zIndex: 1 }} />
			</Link>
			<div className='full-article__header-nav'>
				<AnimatePresence>
					{!detailsOpen && (
						<motion.div className='full-article__header-nav__author' layoutId='author' onClick={handleOpenDetails}>
							{author.image && author.image.asset && (
								<>
									<motion.img src={urlFor(author.image.asset).url()} alt={author.name} />
									<motion.p>by {author.name}</motion.p>
								</>
							)}
						</motion.div>
					)}

					{detailsOpen && (
						<motion.div
							className='full-article__header-nav__author open'
							layoutId='author-details'
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
						>
							<motion.img src={urlFor(author.image.asset).url()} alt={author.name} />
							<motion.div className='expanded-article-details-data'>
								<motion.h3>{author.name}</motion.h3>
								{author.bio && <SanityBlockContent blocks={author.bio} />}
							</motion.div>
							<motion.button onClick={handleCloseDetails}>
								<IoMdClose />
							</motion.button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<div className='full-article__header-h1'>
				<h1 style={{ color: `${titleColor}`, filter: `${titleFilter}` }}>{title}</h1>
				<div className='full-article__header-data' style={{ color: `${headerDataColor}` }}>
					<p>{publishedAt}</p>
					<span>•</span>
					{categories && <p>{categories.map((category: Category) => category.title).join(', ')}</p>}
				</div>
			</div>
		</div>
	);
};
