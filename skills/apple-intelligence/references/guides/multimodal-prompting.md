---
source: https://developer.apple.com/documentation/foundationmodels/analyzing-images-with-multimodal-prompting
---

# Analyzing images with multimodal prompting

Analyze and extract information from images by combining them with descriptive text prompts.

## Signature / Usage

```swift
func compareImages(imageOne: CGImage, imageTwo: CGImage) async throws -> String {
    let session = LanguageModelSession()
    let response = try await session.respond {
        "Compare these two images by using three bullet points:"
        
        Attachment(imageOne)
        
        // When the image doesn't have a rotation applied, like when you get a
        // image from the `AVFoundation` framework, use orientation to perform 
        // a transform before sending it to the model.
        Attachment(imageTwo, orientation: .right)
    }
    return response.content
}
```

Classifying with a Generable enumeration:

```swift
@Generable
enum ImageLabel {
    case cat
    case dog
    case frog
    case bird
}

func classifyImage(_ image: CGImage) async throws -> ImageLabel {
    let session = LanguageModelSession()
    let response = try await session.respond(
        generating: ImageLabel.self,
        options: GenerationOptions(samplingMode: .greedy)
    ) {
        "Choose the label that best represents the following image:"
        
        Attachment(image)
    }
    return response.content
}
```

Built-in Vision tool with an attachment label:

```swift
func analyzeBarcodeImage(_ image: CGImage) async {
    do {
        let session = LanguageModelSession(tools: [BarcodeReaderTool()])
        let response = try await session.respond {
            """
            Scan this image for any barcodes. For each barcode found, describe \
            its symbology type and explain what the encoded content means or \
            represents.
            """
            
            Attachment(image)
                .label("barcode-image")
        }.content
        
        print("The model response: \(response)")
    } catch {
        // Handle the error.
    }
}
```

Custom tool receiving an `ImageReference`:

```swift
@Generable
struct Arguments {
    @Guide(description: "The identifier of the image to analyze.")
    var image: ImageReference
}
```

```swift
func call(arguments: Arguments) async throws -> String {
    // Get the image attachment from the session history.
    guard let attachment = arguments.image.resolved(in: Transcript(entries: sessionHistory)) else {
        return "The image isn't in the session history."
    }
    
    // Perform a classification request on the image to get the top five 
    // observations.
    let observations = try await ClassifyImageRequest().perform(on: attachment.ciImage)
    let top = observations.prefix(5)
    return top.map { $0.identifier }.joined(separator: ", ")
}
```

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+). The `Attachment` / `ImageReference` APIs used here are documented on the attachments pages.
- Example tasks: image classification, summarizing a photo of a document, accessibility descriptions, identifying items in a photo of a fridge.
- Describe clearly what to extract ("List all food items in this photo" rather than "What's in this image?"), consider preprocessing such as isolating a region of interest, and use `Generable` to constrain response formats.
- Supported image inputs: `CGImage`, `CIImage`, `CVPixelBuffer`, and image URLs. Use a URL for file-based images (the framework infers image-ness from the `UTType`); use `CVPixelBuffer` for captured images or video streams. The framework performs scaling and color conversions, so you do not need to.
- Specify the display orientation on `Attachment` when the image has no rotation applied (for example from AVFoundation); the framework transforms before sending.
- Perform image analysis with the on-device model first; if more reasoning or context is necessary, initialize `LanguageModelSession` using `PrivateCloudComputeLanguageModel`.
- Use the `.greedy` sampling option to always pick the most likely option; otherwise the model may select an option that is close.
- The Vision framework provides `BarcodeReaderTool` and `OCRTool` that you can add to a session; provide `label(_:)` on the attachment so the model can identify it.

## Related

- [Attachment](../attachments/attachment.md)
- [ImageReference](../attachments/image-reference.md)
- [OCRTool](../tools/ocr-tool.md)
- [BarcodeReaderTool](../tools/barcode-reader-tool.md)
- [Expanding generation with tool calling](./tool-calling.md)
