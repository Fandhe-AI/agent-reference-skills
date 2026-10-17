---
source: https://developer.apple.com/documentation/vision/barcodereadertool
---

# BarcodeReaderTool (Vision)

A tool that scans machine-readable codes in an image.

## Signature / Usage

```swift
struct BarcodeReaderTool
```

```swift
let barcodeTool = BarcodeReaderTool()
let session = LanguageModelSession(tools: [barcodeTool])
```

```swift
let customTool = BarcodeReaderTool(
    name: "scanQRCode",
    description: "Scan QR codes"
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| init(name:description:) | initializer | Creates a tool for decoding machine-readable codes. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- When the model encounters an image containing machine-readable codes, it can call this tool to decode them. The tool returns an array of `Barcode` results, each containing the decoded content and the symbology type.
- `BarcodeReaderTool` isn't available in Simulator.
- This is a Foundation Models `Tool` provided by the Vision framework. Distinct from the Vision `VN*` barcode request APIs: see apple-ml.

## Related

- [Tool](./tool.md)
- [OCRTool](./ocr-tool.md)
