# Project Organization

## Directory Structure

The project has been reorganized following best practices for Next.js applications:

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
│   │   ├── ui/        # Basic UI components (Button, Loading, etc.)
│   │   ├── layout/    # Layout components (Header, Footer, Navbar, etc.)
│   │   ├── blog/      # Blog-specific components (FeaturedArticle, etc.)
│   │   └── index.ts   # Centralized component exports
│   ├── lib/           # Library code and utilities
│   │   ├── sanity/    # Sanity.io configuration and helpers
│   │   │   ├── client.ts # Sanity client
│   │   │   └── index.ts  # Centralized exports
│   │   └── utils/     # Utility functions
│   │       └── index.ts  # Centralized utility exports
│   ├── types/         # TypeScript type definitions
│   │   └── sanity.ts  # Sanity schema types
│   └── styles/        # Global styles
│       └── globals.css # Global CSS styles
├── tailwind.config.js # Tailwind CSS configuration
└── next.config.mjs    # Next.js configuration
```

## Key Improvements

1. **Component Organization**:

    - Grouped components by purpose (ui, layout, blog)
    - Standardized export patterns (using named exports)
    - Added TypeScript interfaces for props

2. **Type Safety**:

    - Created comprehensive types for Sanity schema
    - Replaced `any` types with proper interfaces
    - Added type definitions for component props

3. **Data Fetching**:

    - Centralized Sanity-related code in `src/lib/sanity/`
    - Added a typed fetch utility for Sanity queries

4. **Imports and Exports**:

    - Created index files for component and utility exports
    - Used absolute imports with `@/` prefix
    - Standardized import paths

5. **Utilities**:
    - Moved utility functions to dedicated directories
    - Centralized utility exports

## Usage Recommendations

1. **Adding New Components**:

    - Place UI components in `src/components/ui/`
    - Place layout components in `src/components/layout/`
    - Place blog-specific components in `src/components/blog/`
    - Export components from `src/components/index.ts`

2. **Data Fetching**:

    - Use the `sanityFetch` utility for type-safe Sanity queries
    - Keep all Sanity-related code in `src/lib/sanity/`

3. **Type Safety**:

    - Define interfaces for all component props
    - Extend Sanity schema types in `src/types/sanity.ts` as needed

4. **Styles**:
    - Use Tailwind CSS for component styling
    - Add global styles to `src/styles/globals.css`
