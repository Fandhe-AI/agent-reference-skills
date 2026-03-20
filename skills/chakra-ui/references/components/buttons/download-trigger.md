# DownloadTrigger

A trigger element that initiates a file download when clicked. Supports static data, async data, and various MIME types.

## Import

```tsx
import { DownloadTrigger } from "@chakra-ui/react"
```

## Usage

```tsx
<DownloadTrigger
  data="The quick brown fox jumps over the lazy dog"
  fileName="sample.txt"
  mimeType="text/plain"
  asChild
>
  <Button variant="outline">Download txt</Button>
</DownloadTrigger>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `DownloadableData \| (() => MaybePromise<DownloadableData>)` | **required** | The data to download (string, Blob, or async function returning either) |
| `fileName` | `string` | **required** | The filename for the downloaded file |
| `mimeType` | `FileMimeType` | **required** | The MIME type (e.g., `"text/plain"`, `"image/svg+xml"`, `"image/jpeg"`) |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Notes

- Use `asChild` to wrap any element as a download trigger (Button, link, etc.)
- Async `data` function is called at click time — useful for fetching binary data on demand
- Use `FormatByte` component to display file size alongside the trigger
- Supports any MIME type: text files, SVG, images, JSON, CSV, etc.

## Related

- [Button](./button.md)
