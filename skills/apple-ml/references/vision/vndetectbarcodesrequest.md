# VNDetectBarcodesRequest

Detects barcodes and QR codes in an image. Returns `VNBarcodeObservation` objects containing the decoded payload and symbology.

## Signature / Usage

```swift
let request = VNDetectBarcodesRequest()
request.symbologies = [.qr, .ean13]

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try handler.perform([request])

if let barcodes = request.results {
    for barcode in barcodes {
        print(barcode.symbology, barcode.payloadStringValue ?? "")
    }
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `symbologies` | `[VNBarcodeSymbology]` | Symbologies to detect; empty array means detect all supported |
| `coalesceCompositeSymbologies` | `Bool` | Merge composite codes into a single observation |

## Notes

- iOS 11.0+ / macOS 10.13+ / tvOS 11.0+ / visionOS 1.0+
- Results type: `[VNBarcodeObservation]?`.
- Call `try request.supportedSymbologies()` to retrieve the full list of supported symbologies at runtime.
- Common symbologies: `.qr`, `.aztec`, `.pdf417`, `.ean8`, `.ean13`, `.upce`, `.code128`, `.dataMatrix`.
- Current revision: `VNDetectBarcodesRequestRevision3`.

## Related

- [VNRequest](./vnrequest.md)
- [VNImageRequestHandler](./vnimagerequesthandler.md)
