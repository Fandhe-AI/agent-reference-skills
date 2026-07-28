# Phi Silica LoRA fine-tuning

Low Rank Adaptation (LoRA) fine-tunes the Phi Silica model for a specific use case by training a small adapter (rather than the full model) and applying it during inference to improve accuracy on that use case.

## Signature / Usage

```csharp
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.Text;

string adapterFilePath = @"C:\path\to\adapter\file.safetensors";
string prompt = "How do I add a new project to my Visual Studio solution?";

if (LanguageModel.GetReadyState() == AIFeatureReadyState.NotReady)
{
    await LanguageModel.EnsureReadyAsync();
}

using LanguageModel languageModel = await LanguageModel.CreateAsync();

// Load the LoRA adapter from a .safetensors file
LanguageModelLowRankAdapterResult adapterResult = LanguageModelLowRankAdapter.CreateFromPath(adapterFilePath);
LanguageModelLowRankAdapter lowRankAdapter = adapterResult.LowRankAdapter;
if (lowRankAdapter == null)
{
    throw new Exception($"Could not create LanguageModelLowRankAdapter: {adapterResult.ExtendedError}");
}

LanguageModelOptions options = new LanguageModelOptions { LowRankAdapter = lowRankAdapter };
var response = await languageModel.GenerateResponseAsync(prompt, options);

if (response.Status == LanguageModelResponseStatus.IncompatibleLowRankAdapter)
{
    throw new Exception("The LoRA adapter is incompatible with the current model.");
}
```

## Options / Props

| Member | Description |
|------|-------------|
| `LanguageModelLowRankAdapter.CreateFromPath(String)` | Loads a trained LoRA adapter from a `.safetensors` file, returning a `LanguageModelLowRankAdapterResult`. |
| `LanguageModelLowRankAdapterResult.LowRankAdapter` | The loaded `LanguageModelLowRankAdapter`, or `null` on failure. |
| `LanguageModelLowRankAdapterResult.ExtendedError` | Error detail when loading fails. |
| `LanguageModelOptions.LowRankAdapter` | Set this to apply the adapter during `GenerateResponseAsync`. |
| `LanguageModelResponseStatus.IncompatibleLowRankAdapter` | Returned status when the adapter is incompatible with the current base model. |

## Notes

- Namespace: `Microsoft.Windows.AI.Text` (`LanguageModelLowRankAdapter`, `LanguageModelLowRankAdapterResult`).
- Training workflow: generate `train.json`/`test.json` (one JSON object per line, each a list of `{content, role}` messages), then train the adapter using the **Foundry Toolkit** extension for VS Code (Tools > Fine-tuning), which requires an Azure subscription with Container Apps GPU quota (A100 recommended).
- On GPU devices, LoRA adapters must be trained in the cloud via the Foundry Toolkit (FTK); local inference with the trained adapter uses the same workflow as NPU via **AI Dev Gallery**.
- Test trained adapters locally in **AI Dev Gallery** (AI APIs tab > Phi Silica LoRA) before shipping, and export a standalone sample project from there.
- Fine-tuning risks: poor-quality/biased training data can degrade or bias outputs; overly narrow datasets reduce general robustness; poorly fine-tuned models may regurgitate training data (remove PII before training); fine-tuned model behavior can be less transparent — monitor and audit outputs.
- Phi Silica is not available in China.

## Related

- [LanguageModel](./language-model.md)
- [LanguageModelOptions and ContentFilterOptions](./language-model-options.md)
- [Responsible AI guidelines](./responsible-ai.md)
