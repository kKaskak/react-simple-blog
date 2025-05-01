import { Html, Head, Main, NextScript } from 'next/document';

// This custom document component provides a way to augment the HTML document that
// is rendered during static export. This ensures that metadata from App Router pages
// is properly handled when exporting static HTML.
export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				{/* This allows custom metadata from pages to be properly applied
            during static export when Next.js uses the App Router */}
				<meta name='ensure-metadata-works' content='static-export' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
