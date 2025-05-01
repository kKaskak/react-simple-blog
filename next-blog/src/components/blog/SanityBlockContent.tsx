'use client';

import React from 'react';
import { createElement } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';
import { SanityBlock, SanityImage } from '@/types/sanity';

interface SanityBlockContentProps {
	blocks: Array<SanityBlock | SanityImage | any>;
}

/**
 * Renders Sanity's portable text/block content
 */
export function SanityBlockContent({ blocks }: SanityBlockContentProps) {
	if (!blocks || !Array.isArray(blocks)) {
		return null;
	}

	return (
		<div className='prose prose-lg md:prose-xl max-w-none'>
			{blocks.map((block, index) => {
				// Handle different block types
				switch (block._type) {
					case 'block':
						return renderTextBlock(block, index);
					case 'image':
						return renderImage(block, index);
					default:
						return <div key={index}>Unsupported block type: {block._type}</div>;
				}
			})}
		</div>
	);
}

interface TextChild {
	_key: string;
	_type: string;
	text: string;
	marks: string[];
}

function renderTextBlock(block: SanityBlock, index: number) {
	const { style = 'normal', children, listItem } = block as any;

	// Handle lists
	if (listItem) {
		return <li key={index}>{children?.map((child: TextChild, i: number) => <span key={i}>{child.text}</span>)}</li>;
	}

	// Map Sanity block style to HTML element
	let Tag: any;
	switch (style) {
		case 'h1':
			Tag = 'h1';
			break;
		case 'h2':
			Tag = 'h2';
			break;
		case 'h3':
			Tag = 'h3';
			break;
		case 'h4':
			Tag = 'h4';
			break;
		case 'blockquote':
			Tag = 'blockquote';
			break;
		default:
			Tag = 'p';
	}

	return createElement(
		Tag,
		{ key: index },
		children?.map((child: TextChild, i: number) => {
			const { marks = [], text } = child;

			if (!marks.length) {
				return <span key={i}>{text}</span>;
			}

			// Apply marks (formatting)
			return marks.reduce(
				(acc: React.ReactNode, mark: string) => {
					if (mark === 'strong') {
						return <strong key={i}>{acc}</strong>;
					}
					if (mark === 'em') {
						return <em key={i}>{acc}</em>;
					}
					if (mark === 'underline') {
						return <u key={i}>{acc}</u>;
					}
					if (mark === 'strike-through') {
						return <s key={i}>{acc}</s>;
					}
					if (mark === 'code') {
						return <code key={i}>{acc}</code>;
					}
					// Handle other marks or return as is
					return acc;
				},
				<span key={i}>{text}</span>,
			);
		}),
	);
}

function renderImage(block: SanityImage, index: number) {
	if (!block.asset) {
		return null;
	}

	return (
		<div key={index} className='relative w-full h-[400px] my-8'>
			<Image src={urlFor(block).url()} alt={block.alt || 'Article image'} fill className='object-contain' />
			{block.caption && <div className='text-center text-gray-600 mt-2 italic'>{block.caption}</div>}
		</div>
	);
}
