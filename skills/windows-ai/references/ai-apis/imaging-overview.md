# Imaging overview for Windows AI APIs

Overview of the on-device imaging capabilities: super resolution, description, object extraction, foreground extraction, and object erase.

## Signature / Usage

The page has no code; its capability table:

```text
Image Super Resolution      Scale and sharpen images up to 8x their original size while maintaining quality.
Image Description           Generate text descriptions for images, including brief, detailed, diagram, and accessible formats.
Image Object Extractor      Identify specific objects in an image using point and rectangle hints, returning a mask of the identified object.
Image Foreground Extractor  Segment the foreground of an image for background removal or sticker generation.
Image Object Erase          Remove objects from images and replace the erased area with the image background.
```

## Notes

- The imaging APIs (Image Super Resolution, Image Description, Image Segmentation, Image Foreground Extraction, Object Erase) currently require a Copilot+ PC with an NPU. Video Super Resolution supports additional hardware and is a separate API.
- API details are in the API reference namespace `Microsoft.Windows.AI.Imaging`; content moderation details are in "Content safety with generative AI APIs".
- AI Dev Gallery includes interactive samples whose C# source can be exported as a Visual Studio project.
- Responsible AI: for generated or modified images, provide Content Credentials as specified by the C2PA standards.
- Source: https://learn.microsoft.com/en-us/windows/ai/apis/imaging (retrieved 2026-10-16)

## Related

- [ImageScaler](./image-scaler.md)
- [Image description generator](./image-description-generator.md)
- [ImageObjectExtractor](./image-object-extractor.md)
- [Image foreground extractor](./image-foreground-extractor.md)
- [Image object remover](./image-object-remover.md)
- [Content moderation](./content-moderation.md)
- [Responsible AI](./responsible-ai.md)
