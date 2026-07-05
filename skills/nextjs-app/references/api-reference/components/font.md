# Font Module (`next/font`)

`next/font` automatically optimizes your fonts (including custom fonts) with built-in self-hosting, removing external network requests for improved privacy and performance (no layout shift).

## Signature / Usage

```tsx
// Google Fonts
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

```tsx
// Local fonts
import localFont from 'next/font/local'

const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
})
```

## Options / Props

| Name | Type | `font/google` | `font/local` | Description |
|------|------|:---:|:---:|-------------|
| `src` | String or Array of `{path, weight?, style?}` | - | Required | Path of the font file relative to the directory where the loader is called |
| `weight` | String or Array | Required unless variable | Required unless variable | Font weight(s), e.g. `'400'`, `'100 900'` for variable fonts, or `['400','700']` |
| `style` | String or Array | Optional | Optional | Font style, default `'normal'` |
| `subsets` | Array of Strings | Optional | - | Subsets to preload (e.g. `['latin']`); injects preload `<link>` when `preload` is true |
| `axes` | Array of Strings | Optional | - | Extra variable font axes beyond weight (e.g. `['slnt']`) |
| `display` | String | Optional | Optional | `'auto'`, `'block'`, `'swap'` (default), `'fallback'`, `'optional'` |
| `preload` | Boolean | Optional | Optional | Whether to preload the font. Default `true` |
| `fallback` | Array of Strings | Optional | Optional | Fallback fonts, e.g. `['system-ui', 'arial']` |
| `adjustFontFallback` | Boolean or String | Optional (bool, default `true`) | Optional (string or `false`, default `'Arial'`) | Automatic fallback font to reduce Cumulative Layout Shift |
| `variable` | String | Optional | Optional | CSS variable name for the CSS variable application method |
| `declarations` | Array of Objects | - | Optional | `@font-face` descriptor key-value pairs, e.g. `[{ prop: 'ascent-override', value: '90%' }]` |

## Applying Styles

- `className`: read-only CSS className passed to an element, e.g. `<p className={inter.className}>`
- `style`: read-only CSS style object including `style.fontFamily`, e.g. `<p style={inter.style}>`
- CSS Variables: set `variable` option, apply the variable className to a parent, then reference `var(--font-name)` in an external stylesheet

## Notes

- Google font names with multiple words use an underscore on import, e.g. `Roboto Mono` → `Roboto_Mono`.
- Use variable fonts where possible; non-variable fonts require an explicit `weight`.
- Preloading scope depends on where the font function is called: unique page, layout (all routes under it), or root layout (all routes).
- Use a font definitions file (e.g. `styles/fonts.ts`) to share a single font instance across multiple usages instead of calling the loader repeatedly.
- Integrates with Tailwind CSS via CSS variables and `@theme inline` (v4) or `tailwind.config.js` `fontFamily` (v3).
- `@next/font` was renamed to `next/font` in `v13.2.0`; no separate installation required. Introduced in `v13.0.0`.

## Related

- [Image Component](./image.md)
- [Script Component](./script.md)
