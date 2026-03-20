# QrCode

A component that generates and renders a QR code from a string value.

## Import

```tsx
import { QrCode } from "@chakra-ui/react"
```

## Usage

```tsx
<QrCode.Root value="https://www.example.com">
  <QrCode.Frame>
    <QrCode.Pattern />
  </QrCode.Frame>
</QrCode.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value to encode |
| `defaultValue` | `string` | — | Initial value (uncontrolled) |
| `size` | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full"` | `"md"` | Size of the QR code |
| `pixelSize` | `number` | — | Explicit pixel size |
| `encoding` | `QrCodeGenerateOptions` | — | Encoding options (e.g. `{ ecc: "H" }`) |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when value changes |

### DownloadTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `string` | — | **Required.** File name for the download |
| `mimeType` | `DataUrlType` | — | **Required.** MIME type (e.g. `"image/png"`) |
| `quality` | `number` | — | Image quality (0–1) |

## Variants / Sizes

- **size**: `"2xs"`, `"xs"`, `"sm"`, `"md"` (default), `"lg"`, `"xl"`, `"2xl"`, `"full"`

## Notes

- `QrCode.Frame` is an SVG container; `QrCode.Pattern` renders the QR dots
- `QrCode.Overlay` positions a logo or image in the center of the QR code
- `QrCode.DownloadTrigger` with `asChild` enables saving the QR code as an image
- Error correction level is set via `encoding={{ ecc: "L" | "M" | "Q" | "H" }}`
- Use `useQrCode()` hook with `QrCode.RootProvider` for external state control

## Related

- [Clipboard](./clipboard.md)
