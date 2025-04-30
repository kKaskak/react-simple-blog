module.exports = {
    // Core settings
    skipThirdPartyRequests: true,
    inlineCss: false,

    // Be more aggressive with blocking external resources
    puppeteerBlockedDomains: [
        'googleads.g.doubleclick.net',
        'pagead2.googlesyndication.com',
        'tpc.googlesyndication.com',
        'www.googletagservices.com',
        'adservice.google.com',
        'www.google-analytics.com',
        'stats.g.doubleclick.net',
        'partner.googleadservices.com',
    ],

    // Maximum timeout for a page to be considered done loading
    puppeteerWaitFor: 500,

    // Set a custom User-Agent that's easy to detect
    userAgent: 'ReactSnapBot',

    // Additional Puppeteer launch options
    puppeteerLaunchOptions: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--window-size=1920,1080',
            '--block-ads',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-default-apps',
            '--disable-extensions',
            '--disable-features=site-per-process',
            '--disable-hang-monitor',
            '--disable-ipc-flooding-protection',
            '--disable-popup-blocking',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-sync',
            '--disable-translate',
            '--metrics-recording-only',
            '--no-first-run',
            '--safebrowsing-disable-auto-update',
            '--enable-automation',
            '--password-store=basic',
            '--use-mock-keychain',
        ],
        ignoreHTTPSErrors: true,
    },

    // Handle network requests properly
    puppeteerRequestHandler: ({ req }) => {
        const blockedDomains = [
            'googleads',
            'googlesyndication',
            'doubleclick',
            'analytics',
            'googletag'
        ];

        // Block any URL that contains any of these strings
        if (req.url && blockedDomains.some((domain) => req.url.includes(domain))) {
            req.abort();
        } else {
            req.continue();
        }
    },
};
