# Platform card - Text Recognition (OCR)

Responsible-AI transparency card for the Text Recognition (OCR) platform service, which extracts machine-readable text (printed and handwritten) from images and documents locally on-device via `TextRecognizer`.

## Signature / Usage

No API surface — this is a Responsible AI transparency document; see `TextRecognizer` for the actual developer API.

## Options / Props

| Capability | Description |
|------|-------------|
| On-device text recognition | Extracts text from images entirely locally; no network connection needed. |
| Printed and handwritten recognition | Supports both, accuracy depends on image quality and language support. |
| Structured output | Returns recognized text as lines/regions with bounding boxes. |
| Language awareness | Auto-detects and recognizes text across supported languages without explicit selection. |

## Notes

- This is a **Platform Card** (an AI platform service), distinct from **Application Cards** for features that consume OCR (e.g. Click to Do, Recall).
- Non-generative: OCR only extracts text present in the image; it does not interpret meaning or make decisions.
- Accuracy is sensitive to image resolution, lighting, text orientation, font, and handwriting style; complex/overlapping layouts reduce accuracy.
- Runs exclusively on NPU (Copilot+ PC), matching the `TextRecognizer` API's hardware requirement.

## Related

- [TextRecognizer](./text-recognizer.md)
- [RecognizedText / RecognizedLine / RecognizedWord](./recognized-text.md)
- [Responsible AI guidelines](./responsible-ai.md)
