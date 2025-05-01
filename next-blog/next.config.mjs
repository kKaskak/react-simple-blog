/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
		],
	},
	// Enable static exports for blog posts
	output: 'export',
	trailingSlash: true,
	// Ensure staticPageGenerationTimeout is high enough for all pages to build
	staticPageGenerationTimeout: 180,

	// Configure static generation options
	experimental: {
		// Enable features that improve static generation
		// Note: Server Components are enabled by default in Next.js 13+ and the flag has been removed
		typedRoutes: true, // Enable typed routes for better static path generation
		// Add workarounds for metadata in static export
		workerThreads: true, // Use worker threads for better parallel static generation
		optimizePackageImports: ['react-icons'], // Optimize large imports
		// These might help with serialization issues
		serverActions: {
			bodySizeLimit: '4mb',
		}
	},

	// Enable more detailed logging during build
	onDemandEntries: {
		// Enable additional debug logs during build
		maxInactiveAge: 25 * 1000,
		pagesBufferLength: 2,
	},

	// Improve serialization for static generation
	staticGeneration: {
		// Timeout for dynamic generation at build time (in seconds)
		timeout: 180
	},

	// Disable React strict mode temporarily if needed to debug issues
	// reactStrictMode: false,

	// Properly handle Sanity image URLs
	images: {
		domains: ['cdn.sanity.io'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				pathname: '**',
			},
		],
	},
};

export default nextConfig;
