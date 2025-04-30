const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const puppeteer = require('puppeteer');
const { parseStringPromise } = require('xml2js');

// Extract URLs from sitemap.xml
async function extractUrlsFromSitemap() {
	try {
		const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
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
		return urls;
	} catch (error) {
		console.error('Error processing sitemap:', error);
		return ['/'];
	}
}

// Build directory
const BUILD_DIR = path.join(__dirname, '../build');

// Function to serve static files
const serveStaticFile = (req, res) => {
	let filePath = path.join(BUILD_DIR, req.url);
	
	// Handle root URL
	if (req.url === '/') {
		filePath = path.join(BUILD_DIR, 'index.html');
	}
	
	// If path doesn't have an extension, serve index.html for SPA routing
	if (!path.extname(filePath)) {
		filePath = path.join(BUILD_DIR, 'index.html');
	}
	
	// Get file extension and set content type
	const extname = path.extname(filePath);
	let contentType = 'text/html';
	
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
		case '.ico':
			contentType = 'image/x-icon';
			break;
	}
	
	// Read the file
	fs.readFile(filePath, (error, content) => {
		if (error) {
			if (error.code === 'ENOENT') {
				// File not found, serve index.html for client-side routing
				fs.readFile(path.join(BUILD_DIR, 'index.html'), (err, indexContent) => {
					if (err) {
						res.writeHead(500);
						res.end('Error loading index.html');
						return;
					}
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.end(indexContent, 'utf-8');
				});
			} else {
				// Server error
				res.writeHead(500);
				res.end(`Server Error: ${error.code}`);
			}
		} else {
			// Successful response
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(content, 'utf-8');
		}
	});
};

// Create a simple HTTP server
const server = http.createServer(serveStaticFile);

// Start the server on a random port
server.listen(0, async () => {
	const port = server.address().port;
	console.log(`Server started at http://localhost:${port}`);

	// Launch the Puppeteer browser
	const browser = await puppeteer.launch({
		headless: 'new',
		args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas'],
	});

	// Create a new page
	const page = await browser.newPage();

	// Configure the page
	await page.setUserAgent('StaticRenderer');
	await page.setViewport({ width: 1200, height: 800 });

	// Block AdSense and other unnecessary resources during prerendering
	await page.setRequestInterception(true);
	page.on('request', (req) => {
		const url = req.url();
		// Block common ad scripts and unnecessary resources
		if (
			url.includes('googleads') ||
			url.includes('doubleclick') ||
			url.includes('google-analytics') ||
			url.includes('googlesyndication') ||
			url.includes('googletagservices')
		) {
			req.abort();
		} else {
			req.continue();
		}
	});

	let count = 0;
	let failedRoutes = [];
	
	// Get routes from sitemap
	const ROUTES_TO_PRERENDER = await extractUrlsFromSitemap();

	// Crawl each route
	for (const route of ROUTES_TO_PRERENDER) {
		// Skip invalid routes
		if (!route.startsWith('/')) {
			console.warn(`Skipping invalid route: ${route}`);
			failedRoutes.push(route);
			continue;
		}
		
		const pageUrl = `http://localhost:${port}${route}`;
		count++;
		console.log(`Prerendering ${count}/${ROUTES_TO_PRERENDER.length}: ${route}`);

		try {
			// Navigate to the page and wait for network to be idle
			await page.goto(pageUrl, { waitUntil: 'networkidle0', timeout: 60000 });

			// Wait for a reasonable time for React to hydrate and render
			await new Promise(resolve => setTimeout(resolve, 5000));

			// Extract the HTML content
			const html = await page.content();

			// Create the destination path
			let destPath = path.join(BUILD_DIR, route);

			// Ensure the directory exists
			if (route !== '/') {
				destPath = destPath.endsWith('/') ? destPath.slice(0, -1) : destPath;
				await fs.promises.mkdir(destPath, { recursive: true });
			}

			// Save the prerendered HTML
			const filePath = route === '/' ? path.join(BUILD_DIR, 'index.html') : path.join(destPath, 'index.html');

			await fs.promises.writeFile(filePath, html);

			console.log(`Saved: ${filePath}`);
		} catch (error) {
			console.error(`Error prerendering ${route}:`, error);
			failedRoutes.push(route);
		}
	}

	console.log(`Prerendering completed. ${count} routes processed, ${failedRoutes.length} failed.`);
	
	if (failedRoutes.length > 0) {
		console.warn('Failed to prerender the following routes:');
		failedRoutes.forEach(route => console.warn(`- ${route}`));
	}

	// Create 404 page
	try {
		// Use the root page as template
		const rootHtml = await fs.promises.readFile(path.join(BUILD_DIR, 'index.html'), 'utf8');

		// Create simple 404 page by modifying the root HTML
		const notFoundHtml = rootHtml
			.replace(/<title>.*?<\/title>/, '<title>Page Not Found | Curiosity Takeover</title>')
			.replace('</head>', '<meta name="robots" content="noindex">\n</head>')
			// Replace content placeholders
			.replace(
				'<div id="root">',
				`<div id="root">
          <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: Arial, sans-serif;">
            <h1 style="font-size: 3rem; margin-bottom: 1rem;">404 - Page Not Found</h1>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">Sorry, the page you are looking for does not exist.</p>
            <a href="/" style="background-color: #0077cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
              Return to Homepage
            </a>
          </div>`,
			);

		await fs.promises.writeFile(path.join(BUILD_DIR, '404.html'), notFoundHtml);
		console.log('Created: 404.html');
	} catch (error) {
		console.error('Error creating 404 page:', error);
	}

	// Close the browser and server
	await browser.close();
	server.close(() => {
		console.log('Static rendering complete!');
		process.exit(0);
	});
});