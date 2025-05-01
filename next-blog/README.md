# Next.js Blog with Sanity CMS

A modern blog built with Next.js, TypeScript, Tailwind CSS, and Sanity.io as the headless CMS.

## Project Structure

```
next-blog/
├── public/            # Static assets
├── src/
│   ├── app/           # App router pages and layouts
│   │   ├── blog/      # Blog-related routes
│   │   ├── contact/   # Contact page
│   │   ├── layout.tsx # Root layout
│   │   └── page.tsx   # Home page
│   ├── components/    # Reusable UI components
│   │   ├── ui/        # Basic UI components (buttons, inputs, etc.)
│   │   ├── layout/    # Layout components (Header, Footer, etc.)
│   │   └── blog/      # Blog-specific components
│   ├── lib/           # Library code, utilities, and type definitions
│   │   ├── sanity/    # Sanity.io configuration and helpers
│   │   └── utils/     # Utility functions
│   ├── types/         # TypeScript type definitions
│   └── styles/        # Global styles and Tailwind directives
├── tailwind.config.js # Tailwind CSS configuration
└── next.config.mjs    # Next.js configuration
```

## Recommended Organization Practices

1. **Component Organization**:

    - Place shared UI components in `src/components/ui/`
    - Move layout components to `src/components/layout/`
    - Group blog-specific components in `src/components/blog/`

2. **Data Fetching**:

    - Keep Sanity-related code in `src/lib/sanity/`
    - Implement server components for data fetching
    - Use React Query for client-side data fetching if needed

3. **Type Safety**:

    - Define Sanity schema types in `src/types/`
    - Use TypeScript interfaces for all components
    - Avoid using `any` types

4. **Styling**:

    - Use Tailwind CSS for styling
    - Create custom Tailwind components for repeated patterns
    - Keep global styles in `src/styles/globals.css`

5. **Testing**:
    - Add tests in `__tests__` directories next to the files they test
    - Use Jest and React Testing Library

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Static Site Generation for blog posts
- SEO optimized with Next.js metadata
- Responsive design with Tailwind CSS
- Integration with Sanity CMS
- Blog listing and detailed article pages
- Contact page

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd next-blog
npm install
# or
yarn install
```

3. Create a `.env.local` file and add your Sanity credentials if needed:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=zeqqep1d
NEXT_PUBLIC_SANITY_DATASET=production
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

Build the static site:

```bash
npm run build
# or
yarn build
```

The static site will be generated in the `out` directory.

## Deployment

This site can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## License

This project is licensed under the MIT License.
