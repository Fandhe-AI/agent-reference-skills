# Font Optimization

Automatically optimize and self-host fonts with `next/font`, removing external network requests.

## Signature / Usage

```tsx
// app/layout.tsx — Google Font applied to the whole app
import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

```tsx
// app/layout.tsx — local font
import localFont from 'next/font/local'

const myFont = localFont({ src: './my-font.woff2' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `next/font/google` | import | Self-hosts any Google Font as a static asset; import the font name as a function |
| `next/font/local` | import | Loads a local font file via `src` (single file or array of `{ path, weight, style }`) |
| `subsets` | `string[]` | Google Font subsets to load, e.g. `['latin']` |
| `weight` | `string` | Required for non-variable fonts |
| `.className` | property | Apply to an element (commonly `<html>` in the root layout) to scope the font |

## Notes

- Fonts are scoped to the component they're used in; apply to the Root Layout to affect the whole app
- Self-hosted Google Fonts mean no requests are sent to Google by the browser at runtime
- Variable fonts are recommended for best performance/flexibility; non-variable fonts require specifying `weight`
- Local font paths resolve relative to the file calling `localFont`; fonts can live in `public/` or be colocated in `app/`

## Related

- [css](./css.md)
- [images](./images.md)
