---
source: https://developer.apple.com/documentation/foundationmodels/running-a-core-ai-model-in-a-foundation-models-session, https://developer.apple.com/documentation/evaluations/evaluating-a-core-ai-model
---

# core-ai-model-export

Commands for exporting an open source model with the open-source `coreai-models` package so a Foundation Models `LanguageModelSession` can run it through `CoreAILanguageModel`. Requires macOS 27 / iOS 27 and Xcode 27 or later. Source: DocC JSON fetched 2026-10-16 (no version in URL).

## Prerequisites

Per the article: open Terminal, install the `uv` package manager, clone the `coreai-models` repository (`https://github.com/apple/coreai-models`), and change into the `coreai-models` directory. Run the commands below from there.

## List the models the registry supports

```bash
# List the models that the registry supports and their export presets.
uv run coreai.model.registry --list-models
```

The list has an `HF_ID` identifier column used when exporting. The article suggests a model around 0.6B parameters as a good first choice because it downloads quickly and runs comfortably on device.

## Export a model for macOS

```bash
# Export the model for macOS.
uv run coreai.llm.export HF_ID
```

Replace `HF_ID` with an identifier from the registry list. The export produces a resource folder (an `.aimodel` file plus the tokenizer and other resources) that you bundle with your app. The export downloads the model; use a machine with enough free disk space.

## Export a model for iOS

```bash
# Export the same model for iOS.
uv run coreai.llm.export HF_ID --platform iOS
```

Models are specialized to the device they run on, so export once per target platform.

## Prepare the model for the Evaluating a Core AI model sample

```bash
./scripts/prepare-model.sh
```

This is a helper script inside the "Evaluating a Core AI model" sample code project (the downloaded `EvaluatingACoreAIModel` project), not part of `coreai-models`. Run it from the sample project directory to export the model into `Models/coreai-model`. The first run downloads the model and exports it for macOS, which takes several minutes. It needs `uv` and `git` to be installed. The script contents are not shown in the article and are not reproduced here.

## Notes

- Each model in the registry has its own README with the exact export recipe and any model-specific requirements; see the `models` directory in `coreai-models`.
- Adding `coreai-models` as a package dependency in Xcode (File > Add Package Dependencies) and loading the folder in a session are Swift-side steps; see `references/guides/core-ai-model-session.md` and `samples/core-ai-model-session.md`.
- Distance line: the Core AI framework and Core ML model conversion are covered by the apple-ml skill; the MLX route (`MLXLanguageModel`) by apple-silicon. This page only lists the export commands used with Foundation Models.
- Xcode Instruments and `#Playground` are GUI-only and are not collected here.
