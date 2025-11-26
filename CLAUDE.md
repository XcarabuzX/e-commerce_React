# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React e-commerce application (ColdFlame Store) built as part of a CoderHouse React course. It demonstrates fundamental React patterns including component composition, routing, and async data fetching with mock APIs.

## Development Commands

```bash
# Start development server (Vite)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Architecture Patterns

### Container vs Presentational Components

The codebase follows a strict separation:

- **Container components** (e.g., `ItemListContainer`, `ItemDetailContainer`):
  - Handle data fetching with `useEffect`
  - Manage loading states with `useState`
  - Extract URL params with `useParams()`
  - Pass data down to presentational components

- **Presentational components** (e.g., `ItemList`, `ItemDetail`, `ItemCard`, `ItemCount`):
  - Receive data via props
  - Focus purely on UI rendering
  - No direct data fetching or state management

### Mock API Layer

All data fetching goes through `/src/utils/api.js`:
- Functions return Promises with 1000ms delays to simulate network latency
- Data source is `/src/data/products.js` (9 products across 3 categories)
- Never bypass the API layer to access products directly from components

**Available API functions:**
- `getProducts()` - Returns all products
- `getProductsByCategory(categoryId)` - Filters by category
- `getProductById(id)` - Returns single product

### Routing Structure

The app uses React Router v7 with these routes:
- `/` - All products (uses `ItemListContainer`)
- `/category/:categoryId` - Filtered products (reuses `ItemListContainer` with different params)
- `/item/:id` - Product detail page (uses `ItemDetailContainer`)
- `*` - 404 page

**Important:** `ItemListContainer` handles both the home route and category filtering. The component checks `useParams()` for `categoryId` and calls the appropriate API function.

### State Management

This project uses **local component state only** (no Context API, Redux, or Zustand). Each container component manages its own:
- `products` or `product` state
- `loading` state

**Note:** Shopping cart functionality is not yet implemented. `CartWidget` currently displays a hardcoded quantity of 0.

## Styling

- **TailwindCSS v4** via `@tailwindcss/vite` plugin
- Global styles imported in `index.css` using `@import "tailwindcss"`
- Primary brand color: Sky-600 (blue)
- Responsive breakpoints: `md:`, `lg:`

## Build Configuration

- **Vite** as build tool
- **React Compiler** enabled via `babel-plugin-react-compiler`
- **Base path:** `/e-commerce_React/` (configured for GitHub Pages deployment)
- Entry point: `src/main.jsx`

## Key Files to Understand

- `src/App.jsx` - Route definitions and layout structure
- `src/utils/api.js` - All data fetching logic
- `src/data/products.js` - Product catalog and categories
- `src/components/NavBar.jsx` - Responsive navigation with mobile menu toggle

## Future Implementation Notes

When implementing the shopping cart:
- Consider using React Context API for global cart state
- Cart state should persist across route changes
- Update `CartWidget` to display actual cart quantity
- Implement `/carrito` route (link exists in NavBar but route not defined)
