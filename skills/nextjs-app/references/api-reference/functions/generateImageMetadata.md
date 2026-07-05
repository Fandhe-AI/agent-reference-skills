# generateImageMetadata

`generateImageMetadata` generates multiple versions of one image (or multiple images) for a single Metadata API special file (e.g. `icon`, `opengraph-image`), avoiding hard-coded metadata values.

## Signature / Usage

```tsx
import { ImageResponse } from 'next/og'

export function generateImageMetadata() {
  return [
    { contentType: 'image/png', size: { width: 48, height: 48 }, id: 'small' },
    { contentType: 'image/png', size: { width: 72, height: 72 }, id: 'medium' },
  ]
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const iconId = await id
  return new ImageResponse(<div>Icon {iconId}</div>)
}
```

## Options / Props

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| `params` (optional) | object | Dynamic route parameters from the root segment down to the segment calling `generateImageMetadata`. |

### Returns (array items)

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` (required) | Passed as a promise to the image generation function's props. |
| `alt` | `string` | Alt text. |
| `size` | `{ width: number; height: number }` | Image dimensions. |
| `contentType` | `string` | MIME type. |

### Image generation function props

| Name | Type | Description |
| --- | --- | --- |
| `id` | `Promise<string \| number>` | Resolves to the `id` from the matching `generateImageMetadata` item. |
| `params` (optional) | `Promise<object>` | Dynamic route parameters. |

## Notes

- Introduced in `v13.3.0`.
- Since `v16.0.0`, both `id` and `params` passed to the image generation function are promises.

## Related

- [Metadata Files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [ImageResponse](./ImageResponse.md)
- [generateMetadata](./generateMetadata.md)
