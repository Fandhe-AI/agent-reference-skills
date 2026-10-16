# BarcodeReaderTool

A Foundation Models tool that scans machine-readable codes in an image. When the model encounters an image containing codes it can call this tool, which returns an array of `Barcode` results containing the decoded content and the symbology type.

## Signature / Usage

```swift
let barcodeTool = BarcodeReaderTool()
let session = LanguageModelSession(tools: [barcodeTool])
```

Override the default name and description to customize how the model identifies and uses the tool:

```swift
let customTool = BarcodeReaderTool(
    name: "scanQRCode",
    description: "Scan QR codes"
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(name:description:)` | `(String?, String?)` | Creates a tool for decoding machine-readable codes |

## Notes

- iOS 27.0+ / iPadOS 27.0+ / Mac Catalyst 27.0+ / macOS 27.0+ / visionOS 27.0+ / watchOS 27.0+ (not listed for tvOS).
- `struct` in the Vision module (related module: FoundationModels), conforming to the FoundationModels `Tool` protocol, `Sendable`, and `SendableMetatype`.
- Enable it by configuring a `LanguageModelSession` with an instance of the tool.
- Not available in Simulator.
- Source: https://developer.apple.com/documentation/vision/barcodereadertool

## Related

- [OCRTool](./ocrtool.md)
- [DetectBarcodesRequest (modern)](./detectbarcodesrequest-modern.md)
