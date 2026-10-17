---
source: https://v2.tauri.app/reference/javascript/barcode-scanner/
---

# @tauri-apps/plugin-barcode-scanner

Scan QR codes, EAN-13 and other kinds of barcodes with the device's camera on Android and iOS.

## Signature / Usage

```typescript
import { scan, Format } from '@tauri-apps/plugin-barcode-scanner';

const scanned = await scan({ windowed: true, formats: [Format.QRCode] });
```

```typescript
function scan(options?: ScanOptions): Promise<Scanned>      // since 2.0.0
function cancel(): Promise<void>                              // since 2.0.0
function checkPermissions(): Promise<PermissionState>         // since 2.0.0, camera permission
function requestPermissions(): Promise<PermissionState>       // since 2.0.0, camera permission
function openAppSettings(): Promise<void>                     // since 2.0.0
export type { PermissionState } from '@tauri-apps/api/core'

interface Scanned {
  content: string     // decoded content of the barcode
  format: Format      // format of the scanned barcode
  bounds: unknown     // bounding box within the camera frame, when reported by the platform
}
```

## Options / Props

`ScanOptions`:

| Name | Type | Description |
| --- | --- | --- |
| cameraDirection | `'back' \| 'front'` | Which camera to use for scanning. Defaults to `back`. |
| formats | `Format[]` | The barcode formats to scan for. Defaults to all supported formats. |
| windowed | `boolean` | Whether to show the camera in a small window instead of taking over the whole screen. Defaults to `false`. |

`Format` enum:

| Member | Value | Description |
| --- | --- | --- |
| QRCode | `QR_CODE` | QR code, a two-dimensional matrix barcode. |
| UPC_A | `UPC_A` | UPC-A, 12-digit numeric barcode (North American retail). Not supported on iOS. |
| UPC_E | `UPC_E` | UPC-E, compressed 6-digit variant of UPC-A. |
| EAN8 | `EAN_8` | EAN-8, 8-digit numeric barcode. |
| EAN13 | `EAN_13` | EAN-13, 13-digit numeric barcode used worldwide on retail products. |
| Code39 | `CODE_39` | Code 39, alphanumeric barcode used in logistics and inventory tracking. |
| Code93 | `CODE_93` | Code 93, compact alphanumeric barcode similar to Code 39. |
| Code128 | `CODE_128` | Code 128, high-density alphanumeric barcode. |
| Codabar | `CODABAR` | Codabar, numeric barcode used by libraries and blood banks. Not supported on iOS. |
| ITF | `ITF` | ITF (Interleaved 2 of 5), numeric barcode encoding an even number of digits. |
| Aztec | `AZTEC` | Aztec code, two-dimensional matrix barcode. |
| DataMatrix | `DATA_MATRIX` | Data Matrix, two-dimensional matrix barcode. |
| PDF417 | `PDF_417` | PDF417, stacked linear barcode. |
| GS1DataBar | `GS1_DATA_BAR` | GS1 DataBar. Not supported on Android. Requires iOS 15.4+. |
| GS1DataBarLimited | `GS1_DATA_BAR_LIMITED` | Limited variant of GS1DataBar. Not supported on Android. Requires iOS 15.4+. |
| GS1DataBarExpanded | `GS1_DATA_BAR_EXPANDED` | Expanded variant of GS1DataBar. Not supported on Android. Requires iOS 15.4+. |

## Notes

- `scan` resolves once a barcode matching the options has been scanned, or rejects if the scan is cancelled.
- `openAppSettings` is useful if permission was denied and the user must manually enable it.
- Mobile only (Android and iOS).
- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@barcode-scanner-v2.5.3` `plugins/barcode-scanner/guest-js/index.ts`.

## Related

- [barcode-scanner plugin](../plugins-app/barcode-scanner.md)
