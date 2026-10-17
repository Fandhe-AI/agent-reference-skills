---
source: https://developer.apple.com/documentation/foundationmodels/analyzing-images-with-multimodal-prompting
---

# Multimodal Image Prompt

Include images in a prompt with `Attachment`, classify an image into a `@Generable` enum, and use the Vision `BarcodeReaderTool`.

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

## Notes

- Supported image inputs include `CGImage`, `CIImage`, `CVPixelBuffer`, and image URLs; the framework scales and converts images before passing them to the model.
- Use `.greedy` sampling when you want the model to always pick the most likely label.
- When using tools, provide `label(_:)` on the attachment so the model can identify it.
- For tasks needing more reasoning, the article suggests initializing `LanguageModelSession` with `PrivateCloudComputeLanguageModel` after trying the on-device model first.
