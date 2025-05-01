'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

// Add adsbygoogle to Window interface for type safety
declare global {
	// eslint-disable-next-line
	interface Window {
		adsbygoogle: any[];
	}
}

interface GoogleAdProps {
	slot: string;
	format?: string;
	responsive?: boolean;
	layout?: string;
	style?: React.CSSProperties;
	className?: string;
}

export function GoogleAd({
	slot,
	format = 'auto',
	responsive = true,
	layout = '-6t+ed+2i-1n-4w',
	style = { display: 'block' },
	className = '',
}: GoogleAdProps) {
	useEffect(() => {
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (err) {
			console.error('AdSense error:', err);
		}
	}, []);

	return (
		<>
			<ins
				className={`adsbygoogle ${className}`}
				style={style}
				data-ad-client='ca-pub-9338161783698268'
				data-ad-slot={slot}
				data-ad-format={format}
				data-ad-layout={responsive ? layout : undefined}
				data-full-width-responsive={responsive ? 'true' : 'false'}
			/>
		</>
	);
}

export function GoogleAdScript() {
	return (
		<Script
			id='google-adsense'
			strategy='afterInteractive'
			async
			src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9338161783698268'
			crossOrigin='anonymous'
		/>
	);
}
