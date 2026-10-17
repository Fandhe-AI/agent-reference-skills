---
source: https://developer.apple.com/documentation/vision/ocrtool
---

# OCRTool (Vision)

A tool that recognizes text in an image.

## Signature / Usage

```swift
struct OCRTool
```

```swift
let ocrTool = OCRTool()
let session = LanguageModelSession(tools: [ocrTool])
```

```swift
let customTool = OCRTool(
    name: "extractText",
    description: "Extract text from documents"
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| init(name:description:) | initializer | Creates a tool for recognizing text in images. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+.
- The tool returns a string containing all recognized text from the image. Override the default name and description to customize how the model identifies and uses the tool.
- `OCRTool` isn't available in Simulator.
- This is a Foundation Models `Tool` provided by the Vision framework. Distinct from the Core ML / Vision `VN*` request APIs (for example text-recognition requests): see apple-ml.

## Related

- [Tool](./tool.md)
- [BarcodeReaderTool](./barcode-reader-tool.md)
