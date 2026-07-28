# AI APIs

| Name | Description | Path |
|------|-------------|------|
| Device requirements and fallback | `AIFeatureReadyState`, `GetReadyState`/`EnsureReadyAsync` readiness pattern, Copilot+ PC / NPU hardware support and fallback | [device-requirements.md](./device-requirements.md) |
| LanguageModel | Phi Silica local language model — `CreateAsync`, `GenerateResponseAsync`, structured JSON, embeddings | [language-model.md](./language-model.md) |
| LanguageModelOptions / ContentFilterOptions | Sampling options (`Temperature`, `TopK`, `TopP`) and per-category content filter severities | [language-model-options.md](./language-model-options.md) |
| LanguageModelContext | Conversation/context window for multi-turn `LanguageModel` prompts | [language-model-context.md](./language-model-context.md) |
| Phi Silica LoRA fine-tuning | Train and apply a LoRA adapter (`LanguageModelLowRankAdapter`) to customize Phi Silica | [phi-silica-lora.md](./phi-silica-lora.md) |
| TextRecognizer | NPU-accelerated OCR — `RecognizeTextFromImage(Async)` | [text-recognizer.md](./text-recognizer.md) |
| RecognizedText / RecognizedLine / RecognizedWord | OCR result model — lines, words, bounding boxes, confidence | [recognized-text.md](./recognized-text.md) |
| ImageScaler | Image Super Resolution — scale and sharpen images up to 8x | [image-scaler.md](./image-scaler.md) |
| ImageObjectExtractor | Extract a hinted object from an image as a mask (point/rectangle hints) | [image-object-extractor.md](./image-object-extractor.md) |
| ImageForegroundExtractor | Segment foreground/background for background removal and sticker generation | [image-foreground-extractor.md](./image-foreground-extractor.md) |
| ImageObjectRemover | Object Erase — remove a masked object and fill with reconstructed background | [image-object-remover.md](./image-object-remover.md) |
| ImageDescriptionGenerator | Generate natural-language image descriptions (brief/detailed/diagram/accessible) | [image-description-generator.md](./image-description-generator.md) |
| Semantic Search and embeddings | `GenerateEmbeddingVectors`, `GenerateResponseFromEmbeddingsAsync` for on-device semantic search / RAG | [semantic-search.md](./semantic-search.md) |
| Content moderation | Harm categories and severity levels via `ContentFilterOptions` | [content-moderation.md](./content-moderation.md) |
| Responsible AI guidelines | Govern/map/measure/manage practices for generative AI features on Windows | [responsible-ai.md](./responsible-ai.md) |
