'use client';

import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface PageLayoutProps {
	children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
	return (
		<div className='min-h-screen bg-white'>
			<Navbar />
			<div className='container mx-auto px-4 py-6'>{children}</div>
		</div>
	);
}
