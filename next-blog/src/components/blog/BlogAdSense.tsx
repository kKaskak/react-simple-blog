'use client';

import React from 'react';
import { GoogleAd } from '@/components/ui/GoogleAd';

interface BlogAdSenseProps {
	slot?: string;
	format?: string;
	layoutKey?: string;
	style?: React.CSSProperties;
	className?: string;
}

export function BlogAdSense({
	slot = '8896538111',
	format = 'fluid',
	layoutKey = '-6t+ed+2i-1n-4w',
	style = { display: 'block' },
	className = '',
}: BlogAdSenseProps) {
	return <GoogleAd slot={slot} format={format} layout={layoutKey} style={style} className={className} />;
}
