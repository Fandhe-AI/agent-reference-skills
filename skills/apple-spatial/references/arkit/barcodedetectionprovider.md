# BarcodeDetectionProvider

An object that provides the real-time position of barcodes the framework detects in a person's environment. It returns the results as an asynchronous sequence of `BarcodeAnchor` structures.

## Signature / Usage

```swift
final class BarcodeDetectionProvider

init(symbologies: [BarcodeAnchor.Symbology])
var anchorUpdates: AnchorUpdateSequence<BarcodeAnchor>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(symbologies:)` | `[BarcodeAnchor.Symbology]` | Creates a barcode detection provider that looks for the specified symbologies. |
| `anchorUpdates` | `AnchorUpdateSequence<BarcodeAnchor>` | An asynchronous sequence of anchor updates that describe the anchors in a person's surroundings. |
| `state` | `DataProviderState` | The state of a barcode detection provider. |
| `isSupported` | `Bool` (static) | A Boolean value that determines whether a device supports the barcode detection provider. |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | The authorization types you need to use the barcode detection provider. |

## Notes

- visionOS 2.0+. Conforms to `DataProvider`.
- Your app needs to include the Spatial barcode and QR code scanning entitlement to use this capability; otherwise, it has no effect. (Entitlement key: `com.apple.developer.arkit.barcode-detection.allow`.)
- `BarcodeAnchor` (struct): a barcode's position in a person's surroundings.

## Related

- [DataProvider](./dataprovider.md)
- [ARKitSession](./arkitsession.md)
