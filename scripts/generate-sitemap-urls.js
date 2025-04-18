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
    const urls = result.urlset.url.map(urlObj => {
      const fullUrl = urlObj.loc[0];
      // Convert full URL to path (remove domain)
      return new URL(fullUrl).pathname;
    });
    
    // Read package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
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