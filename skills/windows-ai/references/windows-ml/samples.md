# Windows ML samples

Samples for using Windows ML across languages/frameworks, plus ready-to-use model samples for common AI scenarios (LLMs, image generation/classification/detection, embeddings, pose/face detection, audio transcription) explorable via the AI Dev Gallery.

## Options / Props

| Language | Framework | Packaging type | Dependency type |
|------|------|------|------|
| C# | Console | Unpackaged | Framework-dependent |
| C# | WPF | Unpackaged | Framework-dependent |
| C# | WinUI | MSIX | Framework-dependent |
| C# | WinForms | Unpackaged | Framework-dependent |
| C++ WinRT | Console | DLL w/ separate EXE | Framework-dependent |
| C++ WinRT | Console | Unpackaged | Self-contained |
| C++ WinRT | Console | MSIX | Framework-dependent |
| C++ CMake | Console | Unpackaged | Self-contained |
| Python | Console | Unpackaged | Framework-dependent |

## Notes

- The AI Dev Gallery is the easiest way to explore samples: interactive demos, full source code per scenario, and one-click export to a Visual Studio project.
- Framework integration samples live in the `WindowsML` folder of the `microsoft/WindowsAppSDK-Samples` GitHub repository.
- Model samples span scenarios: LLM text generation and multi-modal, text embedding, image generation/classification/object detection/segmentation, human pose detection, street segmentation, face detection, and audio transcription — each with CPU/GPU/NPU hardware support and model size noted per model.

## Related

- [Windows ML walkthrough](./tutorial.md)
- [Get started with Windows ML](./get-started.md)
- [API reference](./api-reference.md)
