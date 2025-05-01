import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Create a Sanity client
export const client = createClient({
	projectId: 'zeqqep1d', // Use the same projectId as original
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-08-01',
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

/**
 * Helper function to generate image URLs
 */
export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}
