# AI Dev Gallery app

An open-source Windows app (Microsoft Store or GitHub) offering 25+ interactive samples powered by local AI models, including samples for every Windows AI API, plus a curated model browser for downloading and running Hugging Face/GitHub models on NPU, CPU, or GPU.

## Signature / Usage

No API surface — this is a downloadable developer tool, not a library. Visit the [AI Dev Gallery repo on GitHub](https://github.com/microsoft/ai-dev-gallery/) for install instructions without the Microsoft Store.

## Options / Props

| Capability | Description |
|------|-------------|
| Interactive samples | 25+ samples powered by local AI models, covering all Windows AI APIs plus NLP/image-recognition scenarios. |
| Model browser | Explore, download, and run models from Hugging Face and GitHub; view a model summary before use. |
| Source code export | View each sample's C# source and export it to a standalone Visual Studio project. |

## Notes

- Prerequisites: Windows 10 version 10.0.17763.0+, Visual Studio 2022+ with the Windows Application Development workload; some models require a minimum dedicated GPU memory.
- Works offline once models are downloaded locally; downloading new models from Hugging Face/GitHub requires internet access.
- No Microsoft account is required to use the app.
- Microsoft cannot guarantee that third-party Hugging Face models comply with Microsoft's Responsible AI standards — read a model's model card before integrating it.
- The app is fully open-source; contributions of new samples are accepted via GitHub.

## Related

- [Ready-to-use local LLMs on Windows](./local-llms.md)
- [Responsible AI guidelines](./responsible-ai.md)
- [Foundry Toolkit for Visual Studio Code](./foundry-toolkit-vscode.md)
