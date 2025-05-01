import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsFacebook, BsPinterest, BsReddit } from 'react-icons/bs';
import { FiArrowUpRight } from 'react-icons/fi';
import { client, urlFor } from '@/lib/sanity';
import { GoogleAd, PageLayout, SanityBlockContent } from '@/components';
import { aTwisted, linkedin, xcorp } from '@/assets/imgs';
import { logo_small_no_bg } from '@/assets/logo';
import { FullArticleHeader } from '@/components/FullArticleHeader';
import { notFound } from 'next/navigation';

// Types for the blog post
interface Block {
	_key: string;
	_type: string;
	style?: string;
}

interface Author {
	name: string;
	image: any;
	bio: string;
}

interface Category {
	title: string;
}

interface BlogPostType {
	keywords: string;
	desc: string;
	headerImage: any;
	categories: Category[];
	publishedAt: string;
	arrowColor: string;
	title: string;
	headerDataColor: string;
	headerImageAlt: string;
	headerImageLink: string;
	author: Author;
	titleColor: string;
	body: Block[];
	ffTitle: string;
	ffParagraph: string;
	ffImage: any;
	ffLink: string;
	ffImageAlt: string;
	fsTitle: string;
	fsParagraph: string;
	fsImage: any;
	fsLink: string;
	fsImageAlt: string;
	titleFilter: string;
	slug: {
		current: string;
	};
}

// Required for static site generation with dynamic routes
export async function generateStaticParams() {
	try {
		const query = `*[_type == "post"] {
			slug {
				current
			}
		}`;

		const posts = await client.fetch(query);

		return posts.map((post: { slug: { current: string } }) => ({
			slug: post.slug.current,
		}));
	} catch (error) {
		console.error('Error generating static params:', error);
		return [];
	}
}

// Fetch data for a specific post
async function getPost(slug: string) {
	const query = `*[_type == "post" && slug.current == "${slug}"][0]{
		..., 
		categories[]->{title}, 
		"author": author->{
			name,
			image,
			bio
		}
	}`;

	return client.fetch(query);
}

// Calculate ad index positions
function getAdIndexes(body: Block[]) {
	if (!body || !Array.isArray(body)) return [];

	// Find paragraph blocks
	const paragraphBlocks = body.filter((block: Block) => 
		block && block._type === 'block' && block.style === 'normal'
	);

	// Create array of indexes to place ads (after every 5th paragraph)
	const adIndexPositions: number[] = [];
	for (let i = 5; i < paragraphBlocks.length; i += 5) {
		const blockIndex = body.findIndex((block: Block) => 
			block && block._key === paragraphBlocks[i]._key
		);
		if (blockIndex !== -1) {
			adIndexPositions.push(blockIndex);
		}
	}

	return adIndexPositions;
}

// Page component
export default async function BlogPostPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	try {
		// Get the slug from params
		const { slug } = await params;

		// Fetch the post data
		const post: BlogPostType = await getPost(slug);

		// Check if post exists and has required data
		if (!post || !post.headerImage || !post.author || !post.body) {
			return notFound();
		}

		const adIndexes = getAdIndexes(post.body);

		const {
			keywords: _keywords,
			desc,
			headerImage,
			categories,
			publishedAt,
			arrowColor,
			title,
			headerDataColor,
			headerImageAlt,
			headerImageLink: _headerImageLink,
			author,
			titleColor,
			body,
			ffTitle,
			ffParagraph,
			ffImage,
			ffLink,
			ffImageAlt,
			fsTitle,
			fsParagraph,
			fsImage,
			fsLink,
			fsImageAlt,
			titleFilter,
		} = post;

		return (
			<PageLayout>
				<div className='full-article'>
					<FullArticleHeader
						headerDataColor={headerDataColor}
						headerImage={headerImage}
						headerImageAlt={headerImageAlt}
						title={title}
						titleColor={titleColor}
						titleFilter={titleFilter}
						author={author}
						arrowColor={arrowColor}
						publishedAt={publishedAt}
						categories={categories}
					/>
					<div className='full-article-block__content'>
						<Suspense fallback={<p>Loading content...</p>}>
							<SanityBlockContent blocks={body} />
						</Suspense>
					</div>

					{/* Insert ad blocks at calculated positions */}
					{adIndexes.map((index, i) => (
						<div key={`ad-${i}`} className='full-article__ad-container'>
							<GoogleAd
								slot='3456509173'
								format='fluid'
								layout='in-article'
								style={{ display: 'block', textAlign: 'center', margin: '2rem 0' }}
							/>
						</div>
					))}

					{/* Ad container */}
					<div className='full-article__ad-container'>
						<GoogleAd
							slot='3456509173'
							format='fluid'
							layout='in-article'
							style={{ display: 'block', textAlign: 'center', margin: '2rem 0' }}
						/>
					</div>

					<div className='full-article__share'>
						<hr className='hr-full-article'></hr>
						<div className='full-article__share-header'>
							<h3>Share this article</h3>
							<Image className='full-article__share-header__arrow-twisted' src={aTwisted} alt='arrow-twisted' />
						</div>
						<div className='full-article__share-icons'>
							<a
								target='_blank'
								rel='noreferrer'
								href={`https://www.twitter.com/intent/tweet?url=https://www.curiositytakeover.com/blog/${slug}&text=${desc}`}
							>
								<Image alt='xcorp' src={xcorp} className='xcorp' style={{ borderRadius: '1rem' }} />
							</a>
							<a
								target='_blank'
								rel='noreferrer'
								href={`https://www.facebook.com/sharer/sharer.php?u=https://www.curiositytakeover.com/blog/${slug}`}
							>
								<BsFacebook size={75} />
							</a>
							<a
								target='_blank'
								rel='noreferrer'
								href={`https://www.reddit.com/submit?url=https://www.curiositytakeover.com/blog/${slug}&title=${title}`}
							>
								<BsReddit size={75} />
							</a>
							<a
								target='_blank'
								rel='noreferrer'
								href={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.curiositytakeover.com/blog/${slug}&title=${title}&summary=${desc}&source=${'https://www.curiositytakeover.com'}`}
							>
								<Image className='linkedin' src={linkedin} alt='linkedin' />
							</a>
							<a
								target='_blank'
								rel='noreferrer'
								href={`http://www.pinterest.com/pin/create/button/?url=https://www.curiositytakeover.com/blog/${slug}&description=${desc}`}
							>
								<BsPinterest size={75} />
							</a>
						</div>
						<hr className='hr-full-article-last'></hr>
					</div>
					<div className='full-article__ad-container'>
						<GoogleAd
							slot='3456509173'
							format='fluid'
							layout='in-article'
							style={{ display: 'block', textAlign: 'center', margin: '1.5rem 0' }}
						/>
					</div>
					<div className='full-article__featured'>
						<h3>Featured for you</h3>
						<hr></hr>
						<div className='full-article__featured-card'>
							<Image src={urlFor(ffImage).url()} alt={ffImageAlt} width={400} height={300} />
							<div className='full-article__featured-card-components'>
								<h4>{ffTitle}</h4>
								<p>{ffParagraph}</p>
								<Link className='full-article__featured-card-components-link' href={`/blog/${ffLink}`}>
									<button>
										Read <FiArrowUpRight className='full-article__featured-card-arrow' />
									</button>
								</Link>
							</div>
						</div>
						<hr></hr>
						<div className='full-article__featured-card'>
							<div className='full-article__featured-card-components' style={{ textAlign: 'right' }}>
								<h4>{fsTitle}</h4>
								<p>{fsParagraph}</p>
								<Link className='full-article__featured-card-components-link' href={`/blog/${fsLink}`}>
									<button style={{ float: 'right' }}>
										Read <FiArrowUpRight className='full-article__featured-card-arrow' />
									</button>
								</Link>
							</div>
							<Image src={urlFor(fsImage).url()} alt={fsImageAlt} width={400} height={300} />
						</div>
					</div>
					<div className='full-article__footer'>
						<hr className='hr__full-article__featured-last'></hr>
						<div className='navbar-logo_container'>
							<Link href={'/'}>
								<Image src={logo_small_no_bg} alt='Logo Curiosity Takeover blog' style={{ width: '3rem', height: '100%' }} />
							</Link>
							<Link href={'/'}>
								<strong>Curiosity Takeover</strong>
							</Link>
						</div>
						<div
							className='full-article__share-icons'
							style={{
								justifyContent: 'center',
								gap: '1rem',
								alignItems: 'center',
							}}
						>
							<a target='_blank' rel='noreferrer' href='https://twitter.com/curiosity__blog'>
								<Image
									src={xcorp}
									alt='xcorp'
									width={58}
									height={58}
									style={{
										borderRadius: '1rem',
									}}
								/>
							</a>
							<a target='_blank' rel='noreferrer' href='https://www.facebook.com/curiosity.takeover/'>
								<BsFacebook size={47} style={{ minWidth: 47 }} />
							</a>
						</div>
						<div className='full-article__footer'>
							<h6 className='full-article__footer-rights'>© 2025 Curiosity Takeover Official Blog • All rights reserved.</h6>
						</div>
					</div>
				</div>
			</PageLayout>
		);
	} catch (error) {
		console.error('Error rendering blog post:', error);
		return notFound();
	}
}
