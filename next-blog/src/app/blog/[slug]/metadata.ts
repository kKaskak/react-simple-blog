import { Metadata } from 'next';
import { client, urlFor } from '@/lib/sanity/client';

// Helper type for the slug params
type Params = {
	slug: string;
};

// For static exports, we need to fetch all possible slugs
export async function generateStaticParams(): Promise<Params[]> {
	// eslint-disable-next-line
	const posts = await client.fetch(`*[_type == 'post']{slug}`);
	return posts.map((post: { slug: { current: string } }) => ({
		slug: post.slug.current,
	}));
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }): Promise<Metadata> {
	// Handling both direct params and Promise<params> for better compatibility with static export
	const resolvedParams = 'then' in params ? await params : params;
	const { slug } = resolvedParams;

	try {
		// Fetch the post data
		// eslint-disable-next-line
		const post = await client.fetch(
			`
      *[_type == "post" && slug.current == $slug][0] {
        title,
        excerpt,
        mainImage,
        "keywords": categories[]->title
      }
    `,
			{ slug },
		);

		if (!post) {
			console.warn(`Post not found for slug: ${slug}`);
			return {
				title: 'Post Not Found | Curiosity Blog',
				description: 'The requested post could not be found.',
			};
		}

		// Convert keywords array to comma-separated string if it exists
		const keywordsString =
			post.keywords && post.keywords.length
				? post.keywords.join(', ')
				: 'Fashion, Tech, Animals, Culture, Space, Earth, Health, Lifestyle, Fitness';

		// Get image URL if available
		const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : '';

		// Return metadata object with all required properties for static export
		return {
			title: {
				absolute: `${post.title} | Curiosity Takeover`,
			},
			description: post.excerpt,
			keywords: keywordsString,
			openGraph: {
				locale: 'en_US',
				type: 'article',
				title: post.title,
				description: post.excerpt,
				url: `https://curiositytakeover.com/blog/${slug}`,
				siteName: 'Curiosity Takeover',
				images: imageUrl
					? [
							{
								url: imageUrl,
								width: 1200,
								height: 630,
								alt: post.title,
							},
						]
					: [],
			},
			twitter: {
				card: 'summary_large_image',
				creator: '@curiosity__blog',
				site: '@curiosity__blog',
				title: post.title,
				description: post.excerpt,
				images: imageUrl ? [imageUrl] : [],
			},
		};
	} catch (error) {
		console.error(`Error generating metadata for slug ${slug}:`, error);
		return {
			title: 'Blog Post | Curiosity Blog',
			description: 'Read our latest blog post.',
		};
	}
}
