# sitemap.xml

`sitemap.(xml|js|ts)` is a special file matching the Sitemaps XML format to help crawlers index a site more efficiently.

## Signature / Usage

```ts filename="app/sitemap.ts"
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://acme.com', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: 'https://acme.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
```

## Options / Props

Return type (`MetadataRoute.Sitemap`) — array of:

| Field | Type | Description |
|------|------|-------------|
| `url` | `string` | Page URL. |
| `lastModified` (optional) | `string \| Date` | Last modified timestamp. |
| `changeFrequency` (optional) | `'always' \| 'hourly' \| 'daily' \| 'weekly' \| 'monthly' \| 'yearly' \| 'never'` | Expected update frequency. |
| `priority` (optional) | `number` | Relative priority. |
| `alternates.languages` (optional) | `Languages<string>` | Localized URL variants. |
| `images` / `videos` (optional) | `string[]` / video object array | Image/video sitemap entries. |

## Notes

- Can be a static `app/sitemap.xml`, or generated dynamically via `sitemap.js`/`.ts` default-exporting an array (or the `MetadataRoute.Sitemap` type in TS); `sitemap.js` is a specialized cached Route Handler.
- For large apps, split sitemaps by nesting `sitemap.(xml|js|ts)` in multiple route segments, or use `generateSitemaps` to emit numbered sitemaps (available at `/.../sitemap/[id].xml`); Google's limit is 50,000 URLs per sitemap.
- Version history: `v16.0.0` made the `id` prop passed to `sitemap()` a promise; `v14.2.0` added localization support; `v13.4.14` added `changeFrequency`/`priority`; `v13.3.0` introduced `sitemap`.

## Related

- [generateSitemaps](../../functions/generate-sitemaps.md)
- [robots.txt](./robots.md)
