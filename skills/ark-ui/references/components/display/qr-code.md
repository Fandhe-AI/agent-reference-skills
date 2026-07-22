# QR Code

Generates scannable QR codes from provided data, with support for logo overlays, configurable error correction levels, and image download.

## Signature / Usage

```tsx
import { QrCode } from '@ark-ui/react/qr-code'

export const Basic = () => (
  <QrCode.Root defaultValue="https://ark-ui.com">
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
  </QrCode.Root>
)
```

## Anatomy

- `QrCode.Root` — main container (`<div>`)
- `QrCode.Frame` — SVG element holding the QR pattern
- `QrCode.Pattern` — SVG path rendering the actual QR code
- `QrCode.Overlay` — container for logos or branding elements
- `QrCode.DownloadTrigger` — button enabling QR code image downloads

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `value` | `string` | Controlled data to encode |
| `defaultValue` | `string` | Initial data (uncontrolled mode) |
| `pixelSize` | `number` | Size of each QR pixel |
| `encoding` | `QrCodeGenerateOptions` | Encoding configuration, incl. error correction level (`L` 7%, `M` 15%, `Q` 25%, `H` 30% recovery) |
| `onValueChange` | `(details: { value: string }) => void` | Callback fired when the value updates |
| `fileName` (DownloadTrigger) | `string` | Downloaded file name |
| `mimeType` (DownloadTrigger) | `string` | Downloaded image MIME type |
| `quality` (DownloadTrigger) | `number` | Downloaded image quality |

## Notes

- Use `QrCode.Overlay` to add a logo or branded element on top of the code.
- Use `RootProvider` with the `useQrCode` hook to manage state externally; exposes `value`, `setValue()`, `getDataUrl()`.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Clipboard](./clipboard.md)
