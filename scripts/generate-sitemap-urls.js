const fs = require('fs');
const path = require('path');
const { parseStringPromise } = require('xml2js');

// Path to files
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const packageJsonPath = path.join(__dirname, '../package.json');

async function extractUrlsFromSitemap() {
	try {
		// Read sitemap.xml
		const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');

		// Parse XML
		const result = await parseStringPromise(sitemapXml);

		// Extract URLs
		const urls = result.urlset.url.map((urlObj) => {
			try {
				const fullUrl = urlObj.loc[0];
				// Convert full URL to path (remove domain)
				const url = new URL(fullUrl);
				return url.pathname;
			} catch (error) {
				console.error(`Error processing URL: ${urlObj.loc[0]}`);
				console.error(error);
				return null;
			}
		}).filter(url => url !== null && url.startsWith('/'));

		console.log(`Extracted ${urls.length} valid URLs from sitemap.xml`);

		// Read package.json
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

		// Make sure reactSnap config exists
		if (!packageJson.reactSnap) {
			packageJson.reactSnap = {};
		}

		// Update reactSnap configuration
		packageJson.reactSnap.include = urls;

		// Write updated package.json
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

		console.log(`Updated package.json with ${urls.length} URLs from sitemap.xml`);
	} catch (error) {
		console.error('Error processing sitemap:', error);
	}
}

extractUrlsFromSitemap();
