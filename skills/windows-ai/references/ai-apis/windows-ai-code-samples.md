# AI on Windows code samples and tutorials

Index of official samples that add AI to Windows apps using local APIs and ML models, DirectML hardware acceleration, and cloud APIs.

## Signature / Usage

Adapted (not in the official docs): the block below lists the sample repository and demo URLs given in the official page.

```text
https://github.com/microsoft/ai-dev-gallery/
https://github.com/microsoft/Windows-DevRel/tree/main/Samples/AudioEditor
https://github.com/microsoft/ai-powered-notes-winui3-sample
https://github.com/microsoft/RAG-PDF-Analyzer-WPF-Sample/
https://github.com/microsoft/Phi3-Chat-WinUI3-Sample
https://microsoft.github.io/webnn-developer-preview/demos/sd-turbo/
https://microsoft.github.io/webnn-developer-preview/demos/segment-anything/
https://microsoft.github.io/webnn-developer-preview/demos/whisper-base/
https://github.com/microsoft/Olive/tree/main/examples/directml/llm
https://aka.ms/torchdml-llm
https://github.com/Microsoft/Windows-Machine-Learning
```

## Options / Props

Local APIs and ML models:

| Sample | Description | Features | App type |
|------|-------------|------|------|
| AI Dev Gallery | Open-source app with over 25 interactive samples powered by local models, including all Windows AI APIs; explore, download, and run models from Hugging Face and GitHub on NPU, CPU, or GPU; view C# source and export each sample to a Visual Studio project. | Interactive samples, local model inference, Windows AI APIs showcase | C#, WinUI 3 |
| AI-powered Audio Editor | Matches snips of audio to a query using local transcription and semantic search. | ONNX Runtime, Whisper model, embeddings model | C#, WinUI 3 |
| AI-powered Notes App | Note-taking app using OCR Text Recognition, local audio transcription, semantic search, Phi3 summarization/autocomplete/reasoning, and RAG. | Semantic search, audio transcription, local RAG with Phi3, OCR API | C#, WinUI 3 |
| RAG with PDFs and Phi3 | Answers questions about a PDF with a local language model grounded by a knowledge base. | RAG, ONNX Runtime Generative AI, DirectML | C#, WPF |
| Phi3 Generative AI Chat | Chat experience with the Phi3 SLM via the ONNX Runtime Generative AI library. | Phi3, ONNX Runtime Generative AI, DirectML | C#, WinUI 3 |

Local hardware acceleration through DirectML:

| Sample | Description | App type |
|------|-------------|------|
| Stable Diffusion on the web (WebNN SD-Turbo) | Runs Stable Diffusion locally on the GPU using WebNN with ONNX Runtime web and DirectML. | JavaScript, web apps |
| Segment Anything on the web | Runs Segment Anything locally on the GPU with DirectML. | JavaScript, web apps |
| Whisper on the web | Runs Whisper Base speech-to-text locally on the GPU or NPU with DirectML. | JavaScript, web apps |
| ONNX Runtime language models with DirectML (Olive) | Pre-optimized ONNX Runtime LLMs (Phi3, Llama3, etc.) on the GPU in a Gradio app, via the ORT Generate API. | Python, Gradio |
| PyTorch models with DirectML | PyTorch language models (Llama, Phi3-mini, Phi2, Mistral-7B) on the GPU in a Gradio app. | Python, Gradio |

Cloud APIs:

| Sample | Description |
|------|-------------|
| Add OpenAI chat completions to your WinUI 3 / Windows App SDK app | Tutorial for OpenAI chat completion in a WinUI 3 desktop app (C#). |
| Add DALL-E to your WinUI 3 / Windows App SDK desktop app | Tutorial for OpenAI DALL-E image generation in a WinUI 3 desktop app (C#). |
| Legacy WinML samples | WinML is still supported, but these samples haven't been updated to reflect modern AI use. |

## Notes

- Adapted (not in the official docs): the Signature block lists the sample repository and demo URLs given in the official page.
- When adding new AI features, first check for model availability, and review Responsible Generative AI Development on Windows. The official page states: "Text Content Moderation is enabled across all Windows AI APIs to minimize potentially harmful content." Scope caveat: [App Content Search](./app-content-search.md) states that semantic indexing and search apply no content moderation, so do not assume moderation covers every API or search results.
- More cloud-based API samples are in the Azure AI services documentation.
- The Whisper on the web row is reproduced from the official page ("GPU or NPU with DirectML"). Other pages in this skill describe DirectML as a DirectX 12 GPU path rather than an NPU path (see [Choose your Windows AI solution](./choose-your-windows-ai-solution.md)); the sample uses WebNN with ONNX Runtime web, so treat the NPU claim as WebNN-specific and verify on the demo page before relying on it.
- Source: https://learn.microsoft.com/en-us/windows/ai/samples/ (retrieved 2026-11-14)

## Related

- [AI Dev Gallery](./ai-dev-gallery.md)
- [Use any ONNX LLM in the AI Dev Gallery](./ai-dev-gallery-onnx-llm.md)
- [Content moderation](./content-moderation.md)
- [Get started building an app with Windows AI APIs](./get-started.md)
