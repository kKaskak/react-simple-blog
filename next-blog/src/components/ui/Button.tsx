'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'sm' | 'md' | 'lg';
	href?: any;
	icon?: boolean;
}

export function Button({ children, variant = 'primary', size = 'md', href, icon = false, className = '', ...props }: ButtonProps) {
	// Base styles
	const baseStyles = 'flex justify-center items-center rounded-[1.5rem] font-medium transition-colors';

	// Variant styles
	const variantStyles = {
		primary: 'bg-black text-white hover:bg-gray-800',
		secondary: 'bg-gray-200 text-black hover:bg-gray-300',
		outline: 'bg-transparent border-2 border-current text-white hover:bg-white/10',
	};

	// Size styles
	const sizeStyles = {
		sm: 'py-2 px-3 text-xs',
		md: 'py-[0.7rem] px-4 text-sm',
		lg: 'py-3 px-6 text-base',
	};

	// Combine all styles
	const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

	// If href is provided, render as Link
	if (href) {
		return (
			<Link href={href} className='no-underline'>
				<button className={buttonStyles} {...props}>
					{children}
					{icon && <FiArrowUpRight style={{ marginLeft: 5 }} />}
				</button>
			</Link>
		);
	}

	// Otherwise render as button
	return (
		<button className={buttonStyles} {...props}>
			{children}
			{icon && <FiArrowUpRight style={{ marginLeft: 5 }} />}
		</button>
	);
}
