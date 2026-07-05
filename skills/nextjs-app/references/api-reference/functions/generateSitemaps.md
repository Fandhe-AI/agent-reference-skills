# generateSitemaps

`generateSitemaps` generates multiple sitemaps for an application, splitting large URL sets across separate sitemap files.

## Signature / Usage

```ts
import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/app/lib/constants'

export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap(props: {
  id: Promise<string>
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id
  const start = id * 50000
  const end = start + 50000
  const products = await getProducts(
    `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`
  )
  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: product.date,
  }))
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| returns | `{ id: string \| number }[]` | Array of sitemap identifiers used to generate each individual sitemap. |

## Notes

- Generated sitemaps are served at `/.../sitemap/[id].xml` (e.g. `/product/sitemap/1.xml`).
- Google's limit is 50,000 URLs per sitemap file.
- Since `v16.0.0`, the `id` passed to the `sitemap` function is a promise resolving to a `string`.
- Introduced in `v13.3.2` (originally served at `/.../sitemap.xml/[id]`; URL format stabilized in `v15.0.0`).

## Related

- [sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
