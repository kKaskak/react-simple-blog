import { useState, useEffect } from 'react';
import { client, urlFor } from '../../client';
import { FullArticleHeader } from './index';
import { Link, useParams } from 'react-router-dom';
import BlockContent from '@sanity/block-content-to-react';
import { PageLayout } from '../../components';
import { logo_small_no_bg } from '../../assets/logo';
import { linkedin, aTwisted, xcorp } from '../../assets/imgs';
import { BsFacebook, BsPinterest, BsReddit } from 'react-icons/bs';
import { FiArrowUpRight } from 'react-icons/fi';
import FullArticleHelmet from './FullArticleHelmet';
import GoogleAdSense from './ads/GoogleAdSense';
import './FullArticle.css';

const FullArticle = () => {
	const [singlePost, setSinglePost] = useState({});
	const [adIndexes, setAdIndexes] = useState([]);
	const { slug } = useParams();

	useEffect(() => {
		const query = `*[slug.current == "${slug}"]{
      ..., 
      categories[]->{title}, 
      "author": author->{
        name,
        image,
        bio
      }
    }`;
		client.fetch(query).then((data) => {
			setSinglePost(data[0]);

			// Calculate ad positions only after content is loaded
			if (data[0] && data[0].body) {
				// Find paragraph blocks
				const paragraphBlocks = data[0].body.filter((block) => block._type === 'block' && block.style === 'normal');

				// Create array of indexes to place ads (after every 5th paragraph)
				const adIndexPositions = [];
				for (let i = 5; i < paragraphBlocks.length; i += 5) {
					const blockIndex = data[0].body.findIndex((block) => block._key === paragraphBlocks[i]._key);
					if (blockIndex !== -1) {
						adIndexPositions.push(blockIndex);
					}
				}

				setAdIndexes(adIndexPositions);
			}
		});
	}, [slug]);

	if (!singlePost || !singlePost.headerImage || !singlePost.author || !singlePost.body) {
		return null;
	}
	const {
		keywords,
		desc,
		headerImage,
		categories,
		publishedAt,
		arrowColor,
		title,
		headerDataColor,
		headerImageAlt,
		headerImageLink,
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
	} = singlePost;

	// Improved serializers for better ad placement
	const serializers = {
		types: {
			block: (props) => {
				// Get the current block index
				// eslint-disable-next-line react/prop-types
				const blockIndex = body.findIndex((block) => block._key === props.node._key);

				// Check if this block should have an ad after it
				const shouldHaveAd = adIndexes.includes(blockIndex);

				if (shouldHaveAd) {
					return (
						<>
							{BlockContent.defaultSerializers.types.block(props)}
							<div className='full-article__ad-container'>
								<GoogleAdSense
									slot='3456509173'
									format='fluid'
									layout='in-article'
									style={{ display: 'block', textAlign: 'center', margin: '2rem 0' }}
								/>
							</div>
						</>
					);
				}

				// Regular paragraph rendering
				return BlockContent.defaultSerializers.types.block(props);
			},
		},
	};

	return (
		<>
			<FullArticleHelmet slug={slug} title={title} desc={desc} keywords={keywords} headerImageLink={headerImageLink} />
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
						<BlockContent blocks={body} projectId='zeqqep1d' dataset='production' serializers={serializers} />
					</div>
					{/* Only render ads in browser, not during pre-rendering */}
					<div className='full-article__ad-container'>
						<GoogleAdSense
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
							<img className='full-article__share-header__arrow-twisted' src={aTwisted} alt='arrow-twisted' />
						</div>
						<div className='full-article__share-icons'>
							<a
								target='_blank'
								rel='noreferrer'
								href={`https://www.twitter.com/intent/tweet?url=https://www.curiositytakeover.com/blog/${slug}&text=${desc}`}
							>
								<img alt='xcorp' src={xcorp} className='xcorp' style={{ borderRadius: '1rem' }} />
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
								<img className='linkedin' src={linkedin} alt='linkedin' />
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
						<GoogleAdSense
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
							<img src={urlFor(ffImage).url()} alt={ffImageAlt} />
							<div className='full-article__featured-card-components'>
								<h4>{ffTitle}</h4>
								<p>{ffParagraph}</p>
								<Link className='full-article__featured-card-components-link' to={`/blog/${ffLink}`}>
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
								<Link className='full-article__featured-card-components-link' to={`/blog/${fsLink}`}>
									<button style={{ float: 'right' }}>
										Read <FiArrowUpRight className='full-article__featured-card-arrow' />
									</button>
								</Link>
							</div>
							<img src={urlFor(fsImage).url()} alt={fsImageAlt} />
						</div>
					</div>
					<div className='full-article__footer'>
						<hr className='hr__full-article__featured-last'></hr>
						<div className='navbar-logo_container'>
							<Link to={'/'}>
								<img src={logo_small_no_bg} alt='Logo Curiosity Takeover blog' />
							</Link>
							<Link to={'/'}>
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
								<img
									src={xcorp}
									alt='xcorp'
									style={{
										maxWidth: 58,
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
		</>
	);
};

export default FullArticle;
