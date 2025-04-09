# React Masonry Grid

A Single Page Application that displays a virtualized grid of images from the Pexels API, including photo search and detail view functionality.

## Tech Stack

- **React + TypeScript** — Strongly typed component-based UI
- **Vite** — Lightning-fast development server and optimized production builds
- **React Router** — Declarative routing and navigation
- **Styled Components** — CSS-in-JS with theming and dynamic styles
- **TanStack React Query** — Data fetching, caching, and pagination
- **@tanstack/react-virtual** — Efficient rendering of large lists (virtualization)
- **ESLint + Prettier** — Code quality and formatting
- **Jest + Testing Library** — (Configured, tests can be added)

## Development

1. Create a .env file with your Pexels API key:

```
VITE_API_KEY=your_api_key_here
VITE_BASE_URL=https://api.pexels.com/v1
```

2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

## Commands

1. Build for production

```sh
npm run build
```

2. Linting

```sh
npm run lint
```

3. Tests

```sh
npm run test
```

## Features

- Responsive layout

- Virtualized rendering of photo grid using @tanstack/react-virtual

- Lazy loading (infinite scroll)

- Dynamic search with debounce and AbortController

- Photo detail page with navigation

- Theming with styled-components

- Clean and minimalistic UI inspired by picsart.com

## Design Decisions & Performance Optimizations

### 1. Virtualization

I used @tanstack/react-virtual to only render visible rows of the grid, drastically reducing DOM nodes and improving scroll performance, especially with large data sets.

### 2. Lazy Loading

Pagination is implemented via infinite scroll. New photos are fetched as the user scrolls down. I trigger fetch using IntersectionObserver inside useVirtualizer.

### 3. Search Optimization

- Debounced search input (500ms delay)

- Uses AbortController to cancel stale requests

- Searches update the photo grid dynamically

### 4. Code Splitting & Bundling

Vite provides built-in bundling and pre-optimization

- Only minimal, production-safe dependencies are used to reduce bundle size

- Static assets and unused chunks are minimized in production
