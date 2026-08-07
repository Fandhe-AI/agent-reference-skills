# DetectBarcodesRequest (modern)

Modern async/await replacement for `VNDetectBarcodesRequest`, introduced in iOS 18. Detects barcodes in an image and returns `BarcodeObservation` results.

## Signature / Usage

```swift
var request = DetectBarcodesRequest()
request.symbologies = [.qr, .ean13]

let handler = ImageRequestHandler(cgImage, orientation: nil)
let observations = try await handler.perform(request)

for barcode in observations {
    print(barcode.payloadStringValue ?? "")
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `symbologies` | `[BarcodeSymbology]` | The barcode symbologies that the request detects |
| `supportedSymbologies` | `[BarcodeSymbology]` | The collection of barcode symbologies the request can recognize |
| `coalescesCompositeSymbologies` | `Bool` | Whether the request coalesces multiple codes into one |
| `revision` | `DetectBarcodesRequest.Revision` | The algorithm or implementation the request uses |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+ (beta)
- `struct` (value type), unlike class-based `VNDetectBarcodesRequest`.
- File name carries the `-modern` suffix to avoid collision with `vndetectbarcodesrequest.md` (legacy VN-prefixed API).

## Related

- [VNDetectBarcodesRequest](./vndetectbarcodesrequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
