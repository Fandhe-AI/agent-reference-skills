# Platform card - Image AI APIs

Responsible-AI transparency card covering the on-device Image AI APIs as a group: Image Foreground Extraction, Object Erase, Object Extraction, Super-Resolution, and Image Description, all available through the Windows App SDK.

## Signature / Usage

No API surface — this is a Responsible AI transparency document; see the individual API reference pages (`ImageForegroundExtractor`, `ImageObjectRemover`, `ImageObjectExtractor`, `ImageScaler`, `ImageDescriptionGenerator`) for actual signatures.

## Options / Props

| API | Description |
|------|-------------|
| Foreground extraction | Isolates the main subject from the background, returning a mask/cutout. |
| Object erase | Removes specified objects (via mask/bounding box) and fills the background plausibly. |
| Object extraction | Detects and localizes objects/regions of interest with bounding geometry. |
| Super-resolution | Enhances image detail/resolution via AI upscaling. |
| Image description | Generates a natural-language summary of image content. |

## Notes

- This is a **Platform Card** (covers a platform service group), distinct from **Application Cards** like Paint or Click to Do that consume these APIs.
- All processing runs locally on-device; no image data is transmitted to the cloud, except image description's generated text is still reviewed for content-safety filtering.
- Except for image description (natural-language generation), these APIs are deterministic, non-generative transformations of input pixels.
- Performance and accuracy depend on image quality (blur, lighting, occlusion, resolution) and device hardware.

## Related

- [ImageForegroundExtractor](./image-foreground-extractor.md)
- [ImageObjectRemover](./image-object-remover.md)
- [ImageObjectExtractor](./image-object-extractor.md)
- [ImageScaler](./image-scaler.md)
- [ImageDescriptionGenerator](./image-description-generator.md)
- [Responsible AI guidelines](./responsible-ai.md)
