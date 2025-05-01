/**
 * Base Sanity document type
 */
export interface SanityDocument {
	_id: string;
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	_type: string;
}

/**
 * Sanity reference type
 */
export interface SanityReference {
	_ref: string;
	_type: 'reference';
}

/**
 * Sanity image type
 */
export interface SanityImage {
	_type: 'image';
	asset: SanityReference;
	alt?: string;
	caption?: string;
}

/**
 * Sanity slug type
 */
export interface SanitySlug {
	_type: 'slug';
	current: string;
}

/**
 * Sanity block content type
 */
export interface SanityBlock {
	_key: string;
	_type: 'block';
	children: Array<{
		_key: string;
		_type: string;
		text: string;
		marks: string[];
	}>;
	markDefs: Array<{
		_key: string;
		_type: string;
		href?: string;
	}>;
	style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
}

/**
 * Author type
 */
export interface Author extends SanityDocument {
	_type: 'author';
	name: string;
	image?: SanityImage;
	bio?: SanityBlock[];
}

/**
 * Category type
 */
export interface Category extends SanityDocument {
	_type: 'category';
	title: string;
	description?: string;
}

/**
 * Article/post type
 */
export interface Article extends SanityDocument {
	_type: 'post';
	title: string;
	slug: SanitySlug;
	excerpt?: string;
	mainImage?: SanityImage;
	previewImage?: SanityImage;
	body?: SanityBlock[];
	categories?: Category[];
	author?: Author;
	publishedAt?: string;
	titleColorFeatured?: string;
}
