# media

| Name | Description | Path |
|------|-------------|------|
| generateImage | Generates images based on a given prompt using an image model. It is ideal for use cases where you need to generate images programmatically, such as creating visual content or generating images for data augmentation. | [generate-image.md](./generate-image.md) |
| generateSpeech | Generates speech audio from text. | [generate-speech.md](./generate-speech.md) |
| experimental_generateVideo | Generates videos based on a given prompt using a video model. It is ideal for use cases where you need to generate videos programmatically, such as creating visual content, animations, or generating videos from images. | [generate-video.md](./generate-video.md) |
| experimental_getRealtimeToolDefinitions | Converts an AI SDK `ToolSet` into provider-neutral realtime tool definitions that can be passed to a realtime session setup request. Use it in the server-side setup endpoint that creates a short-lived realtime provider token. | [get-realtime-tool-definitions.md](./get-realtime-tool-definitions.md) |
| Image Generation | The AI SDK provides the `generateImage` function to generate images based on a given prompt using an image model. | [image-generation.md](./image-generation.md) |
| Realtime | Realtime is an experimental feature. | [realtime.md](./realtime.md) |
| Speech | The AI SDK provides the `generateSpeech` function to generate speech from text using a speech model. | [speech.md](./speech.md) |
| experimental_streamTranscribe | Streams a transcript from live raw audio using a transcription model with streaming support. | [stream-transcribe.md](./stream-transcribe.md) |
| experimental_streamTranslate | Streams a speech-to-speech translation from live raw audio. Models translate live source audio into target-language audio and text. | [stream-translate.md](./stream-translate.md) |
| transcribe | Generates a transcript from an audio file. | [transcribe.md](./transcribe.md) |
| Transcription | The AI SDK provides the `transcribe` function to transcribe audio using a transcription model, and `experimental_streamTranscribe` for live audio. | [transcription.md](./transcription.md) |
| Translation | Speech translation is an experimental feature. The AI SDK provides `experimental_streamTranslate` to translate live speech into another language. Translation is a streaming-only modality: models translate live source audio into target-language audio and text. | [translation.md](./translation.md) |
| Video Generation | Video generation is an experimental feature. The API may change in future versions. | [video-generation.md](./video-generation.md) |
