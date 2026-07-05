# robots.txt

Adds or generates a `robots.txt` file matching the Robots Exclusion Standard, at the root of `app`, to tell crawlers which URLs they can access.

## Signature / Usage

```ts filename="app/robots.ts"
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://acme.com/sitemap.xml',
  }
}
```

## Options / Props

| Field | Type | Description |
|------|------|-------------|
| `rules` | `{ userAgent?, allow?, disallow?, crawlDelay? }` or an array of such objects | One rule set, or per-user-agent rule sets. `userAgent`/`allow`/`disallow` accept `string \| string[]`. |
| `sitemap` | `string \| string[]` | Sitemap URL(s) to include. |
| `host` | `string` | Preferred host. |

## Notes

- Can be a static `app/robots.txt` file, or generated dynamically via `robots.js`/`.ts` default-exporting a `MetadataRoute.Robots` object.
- `robots.js` is a specialized Route Handler, cached by default unless it uses a Request-time API or dynamic config.
- Introduced in `v13.3.0`.

## Related

- [sitemap.xml](./sitemap.md)
