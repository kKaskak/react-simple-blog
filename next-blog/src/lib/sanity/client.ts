import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

/**
 * Sanity CMS configuration
 */
const config = {
	projectId: 'zeqqep1d',
	dataset: 'production',
	useCdn: process.env.NODE_ENV === 'production',
	apiVersion: '2023-08-01',
};

/**
 * Client for fetching data from Sanity
 */
export const client = createClient(config);

/**
 * Image URL builder for Sanity images
 */
const builder = imageUrlBuilder(client);

/**
 * Helper function to generate image URLs from Sanity image sources
 * @param source - Sanity image source
 * @returns Image URL builder
 */
export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

/**
 * Fetch utility for Sanity queries
 * @param query - GROQ query string
 * @param params - Query parameters
 * @returns Query result
 */
export async function sanityFetch<T>({ query, params = {} }: { query: string; params?: Record<string, any> }): Promise<T> {
	return client.fetch<T>(query, params);
}
