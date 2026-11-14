# Use any ONNX LLM in the AI Dev Gallery

Tutorial for running any ONNX Runtime GenAI-format large language model through the AI Dev Gallery, by downloading a pre-converted model or converting one with the Foundry Toolkit for Visual Studio Code.

## Signature / Usage

Adapted (not in the official docs): the block below restates the converted-model path format from the official note as a text block.

```text
c:/{workspace}/{model_project}/history/{workflow}/model/model.onnx
```

Steps:

1. Open AI Dev Gallery, go to the **Samples** tab, choose a **Text** sample (for example "Generate Text" or "Chat"), click the **Model Selector** button, and select the **Custom models** tab.
2. Get a model in **ONNX Runtime GenAI** format: browse Hugging Face ONNX Models, use **Add model → Search Hugging Face** in the app, or click **Open Foundry Toolkit's Conversion Tool** in the model selector (launches the Foundry Toolkit extension in VS Code; install it from the Extensions Marketplace if missing).
3. Back in the model selector, click **Add model → From Disk** and provide the path to your ONNX model. Select the model and use it with the interactive samples; optionally click **Show source code**.

## Options / Props

Models supported for Foundry Toolkit conversion:

| Model |
|------|
| DeepSeek R1 Distill Qwen 1.5B |
| Phi 3.5 Mini Instruct |
| Qwen 2.5-1.5B Instruct |
| Llama 3.2 1B Instruct |

Samples that work with ONNX LLMs:

| Category | Samples |
|------|-------------|
| Text | Generate Text, Summarize Text, Chat, Semantic Kernel Chat, Grammar Check, Paraphrase Text, Analyze Text Sentiment, Content Moderation, Custom Parameters, Retrieval Augmented Generation |
| Smart Controls | Smart TextBox |
| Code | Generate Code, Explain Code |

## Notes

- Adapted (not in the official docs): the Signature block restates the converted-model path format from the official note as a text block.
- Works for any LLM in the ONNX Runtime GenAI format, including models downloaded from Hugging Face and models converted from other frameworks with the Foundry Toolkit conversion tool.
- Foundry Toolkit conversion is in Preview and currently supports only the models listed above.
- AI Dev Gallery is an open-source Windows app available from the Microsoft Store.
- Source: https://learn.microsoft.com/en-us/windows/ai/ai-dev-gallery/tutorial-onnx (retrieved 2026-11-14)

## Related

- [AI Dev Gallery](./ai-dev-gallery.md)
- [Foundry Toolkit for Visual Studio Code](./foundry-toolkit-vscode.md)
