'use client';

import React from 'react';

export function Loading() {
	return (
		<div className='loading'>
			<div className='scale-up-center'>
				<div className='flex flex-col items-center justify-center'>
					<div className='w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin'></div>
				</div>
			</div>
		</div>
	);
}
