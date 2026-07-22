# Download Trigger

The `DownloadTrigger` component provides a convenient way to programmatically trigger file downloads, handling URLs, Blobs, and other data types.

## Signature / Usage

```tsx
import { DownloadTrigger } from '@ark-ui/react/download-trigger'

export const App = () => (
  <DownloadTrigger data={fileData} fileName="document.pdf" mimeType="application/pdf">
    Download
  </DownloadTrigger>
)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `DownloadableData \| (() => MaybePromise<DownloadableData>)` | — | The content to download, supports direct values or async/promise-based resolution |
| `fileName` | `string` | — | The downloaded file's name |
| `mimeType` | `FileMimeType` | — | The file's MIME type |
| `asChild` | `boolean` | — | Use the provided child element as the rendered element |

## Notes

- Supports promise-based async data resolution as well as direct values
- Handles SVG files and multiple data formats

## Related

- [Format Byte](./format-byte.md)
