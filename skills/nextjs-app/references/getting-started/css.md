# CSS

Different ways to add CSS to a Next.js application: Tailwind CSS, CSS Modules, Global CSS, and external stylesheets.

## Signature / Usage

```css
/* app/globals.css */
@import 'tailwindcss';
```

```tsx
// app/layout.tsx
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```css
/* app/blog/blog.module.css */
.blog {
  padding: 24px;
}
```

```tsx
// app/blog/page.tsx — CSS Modules import
import styles from './blog.module.css'

export default function Page() {
  return <main className={styles.blog}></main>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Tailwind CSS | utility-first framework | Installed via `tailwindcss` + `@tailwindcss/postcss`; imported with `@import 'tailwindcss'` in global CSS |
| CSS Modules | `*.module.css` | Locally scoped class names, avoids naming collisions |
| Global CSS | `*.css` imported in root layout | Applies to every route; recommended only for truly global styles |
| External stylesheets | npm package CSS | Importable anywhere in `app`, e.g. `bootstrap/dist/css/bootstrap.css` |
| `cssChunking` | `next.config.js` option | Controls how CSS is chunked in production |

## Notes

- CSS order follows import order in code; keep imports in a single entry file for predictable ordering
- Global styles don't get removed on route navigation (React/Suspense stylesheet integration), which can cause conflicts — prefer Tailwind/CSS Modules for scoped styling
- In development, CSS updates apply instantly via Fast Refresh; in production, CSS is concatenated into minified, code-split files
- Sass and CSS-in-JS are supported via separate guides

## Related

- [layouts-and-pages](./layouts-and-pages.md)
- [fonts](./fonts.md)
