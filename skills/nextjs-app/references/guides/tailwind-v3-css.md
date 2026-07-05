# Tailwind CSS v3

How to install and configure Tailwind CSS v3 (for broader browser support) in a Next.js application. For Tailwind v4, see the getting-started CSS guide instead.

## Signature / Usage

```bash
npm install -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

```js filename="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
```

```css filename="app/globals.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Notes

- Import the global CSS file (with the `@tailwind` directives) in the root layout (`app/layout.tsx`).
- `content` paths must cover every directory containing className usage (`app/`, `pages/`, `components/`).
- Tailwind CSS and PostCSS have been supported with Turbopack since Next.js 13.1.

## Related

- [Sass](./sass.md)
- [CSS-in-JS](https://nextjs.org/docs/app/guides/css-in-js)
