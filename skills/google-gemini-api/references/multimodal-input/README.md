# multimodal-input

| Name | Description | Path |
|------|-------------|------|
| Audio understanding | Gemini analyzes audio input and generates text: summarize, answer questions, translate, diarize speakers, and analyze timestamped segments. | [audio-understanding.md](./audio-understanding.md) |
| Document understanding | Gemini processes PDFs with native vision, analyzing text, images, charts and tables (up to 1000 pages) and extracting structured output. | [document-processing.md](./document-processing.md) |
| Embeddings | Embedding models turn text, images, video, audio and documents into vectors for semantic search, classification and clustering via embedContent. | [embeddings.md](./embeddings.md) |
| File input methods | Ways to include media files (images, audio, video, documents) in requests: inline data, Files API upload, GCS registration, and external URLs. | [file-input-methods.md](./file-input-methods.md) |
| Files API | Upload, inspect, list and delete media files (audio, images, video, documents) for use in Gemini requests with the same basic operations. | [files-api.md](./files-api.md) |
| Image understanding | Gemini handles image captioning, classification, visual QA, and object detection and segmentation without training specialized ML models. | [image-understanding.md](./image-understanding.md) |
| Long context | Many Gemini models have context windows of 1 million or more tokens, and code for text and multimodal inputs works unchanged with long context. | [long-context.md](./long-context.md) |
| Media resolution | The media_resolution parameter caps tokens allocated to image, video, audio and PDF inputs, trading response quality against latency and cost. | [media-resolution.md](./media-resolution.md) |
| Gemini Robotics ER (aggregated) | Gemini Robotics ER (embodied reasoning) vision-language models for robot perception, spatial reasoning, task planning, and orchestration. Preview. | [robotics-er.md](./robotics-er.md) |
| Understand and count tokens | Gemini input and output are processed as tokens (about 4 characters each); count with count_tokens or read usage from the response. | [tokens.md](./tokens.md) |
| Audio transcription | Converts speech in audio files to text with gemini-3.5-transcribe: language identification, diarization, word timestamps, and custom vocabulary. | [transcribe.md](./transcribe.md) |
| Video understanding | Gemini processes video to describe, segment and extract information, answer questions, and refer to specific timestamps. | [video-understanding.md](./video-understanding.md) |
