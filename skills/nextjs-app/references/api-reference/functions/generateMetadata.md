# generateMetadata

Defines page/layout `<head>` metadata for SEO and shareability, either via a static `metadata` object export or a dynamic `generateMetadata` function export.

## Signature / Usage

```tsx
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params
  const product = await fetch(`https://.../${id}`).then((res) => res.json())
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    openGraph: { images: ['/some-specific-page-image.jpg', ...previousImages] },
  }
}
```

## Options / Props

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| `params` | object | Dynamic route parameters from root segment down to this segment. |
| `searchParams` | object | Current URL's search params (only in `page.js` segments). |
| `parent` | `Promise<Metadata>` | Resolved metadata from parent route segments. |

### Common Metadata fields

| Field | Description |
| --- | --- |
| `title` | String, or `{ default, template, absolute }` object for child-segment title composition. |
| `description` | Meta description. |
| `metadataBase` | Base `URL` used to resolve relative URLs in URL-based fields. |
| `openGraph` | OG title/description/images/videos/audio/locale/type. |
| `robots` | `index`/`follow`/`googleBot` crawler directives. |
| `icons` | `icon`/`shortcut`/`apple`/`other` icon links. |
| `manifest` | Web app manifest URL. |
| `twitter` | Twitter/X card metadata. |
| `alternates` | `canonical`, `languages`, `media`, `types` links. |
| `verification` | Site verification meta tags (`google`, `yandex`, `yahoo`, `other`). |
| `pagination` | `{ previous?, next? }` URLs of the previous/next pages in a paginated sequence; renders `<link rel="prev">` / `<link rel="next">`. |
| `appleWebApp`, `appLinks`, `archives`, `assets`, `bookmarks`, `category`, `facebook`, `pinterest`, `other` | Additional less-common fields; see full reference for details. |

## Notes

- Only supported in Server Components; cannot export both `metadata` and `generateMetadata` from the same segment.
- `fetch` calls inside `generateMetadata` are memoized across `generateMetadata`, `generateStaticParams`, layouts, pages, and Server Components; use React `cache()` when `fetch` isn't available.
- File-based metadata (icons, OG images, etc.) overrides the `metadata` object / `generateMetadata` function.
- `redirect()` and `notFound()` can be called inside `generateMetadata`.
- Metadata from multiple segments is shallowly merged (root to leaf); duplicate keys are replaced, nested objects like `openGraph` are overwritten wholesale by the last segment defining them.
- Since `v15.2.0`, unresolved metadata streams after initial HTML for JS-executing bots; HTML-limited bots (configurable via `htmlLimitedBots`) still block on metadata.
- With Cache Components enabled, metadata using runtime data (`cookies()`, `headers()`, `params`, `searchParams`) or uncached fetches defers to request time; wrap in `use cache` if the data isn't request-specific, or add a dynamic marker component if it genuinely needs runtime data.
- When `generateMetadata` uses `'use cache'`, its return value must be serializable: `URL` instances are not supported by Cache Functions, so return values such as `metadataBase` as strings (for example `url.toString()`).
- Version history: `v14.0.0` deprecated the `viewport`, `themeColor`, and `colorScheme` fields in `metadata` in favor of `generateViewport`; `v13.2.0` introduced `metadata` and `generateMetadata`.

## Related

- [generateViewport](./generateViewport.md)
- [Metadata Files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [generateImageMetadata](./generateImageMetadata.md)
