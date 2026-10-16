# OCRTool

A Foundation Models tool that recognizes text in an image and returns a string containing all recognized text.

## Signature / Usage

```swift
let ocrTool = OCRTool()
let session = LanguageModelSession(tools: [ocrTool])
```

Override the default name and description to customize how the model identifies and uses the tool:

```swift
let customTool = OCRTool(
    name: "extractText",
    description: "Extract text from documents"
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(name:description:)` | `(String?, String?)` | Creates a tool for recognizing text in images |

## Notes

- iOS 27.0+ / iPadOS 27.0+ / Mac Catalyst 27.0+ / macOS 27.0+ / visionOS 27.0+ (not listed for watchOS or tvOS).
- `struct` in the Vision module (related module: FoundationModels), conforming to the FoundationModels `Tool` protocol, `Sendable`, and `SendableMetatype`.
- Enable it by configuring a `LanguageModelSession` with an instance of the tool.
- Not available in Simulator.

## Related

- [BarcodeReaderTool](./barcodereadertool.md)
- [RecognizeTextRequest](./recognizetextrequest.md)
