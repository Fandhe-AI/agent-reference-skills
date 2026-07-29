# Choose your Windows AI solution

A scenario-based decision guide for picking between Windows AI APIs, Foundry Local, Windows ML, and cloud AI (Microsoft Foundry) — the four alternatives this skill covers as separate reference categories (`ai-apis`, `foundry-local`, `windows-ml`) plus cloud fallback.

## Signature / Usage

```csharp
// A resilient pattern combining all three on-device/cloud options in one app
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.Text;

// 1. Try Windows AI APIs (fastest — Copilot+ only)
var readyState = LanguageModel.GetReadyState();
if (readyState == AIFeatureReadyState.NotReady)
{
    var deploymentResult = await LanguageModel.EnsureReadyAsync();
    readyState = deploymentResult.Status == AIFeatureReadyResultState.Success
        ? LanguageModel.GetReadyState()
        : AIFeatureReadyState.NotSupportedOnCurrentSystem;
}

if (readyState == AIFeatureReadyState.Ready)
{
    // Use Phi Silica via Windows AI APIs
    using LanguageModel languageModel = await LanguageModel.CreateAsync();
}
// 2. Fall back to Foundry Local (any hardware)
else if (await foundryClient.IsModelAvailableAsync("phi-4-mini"))
{
    // Use Foundry Local OpenAI-compatible API
}
// 3. Fall back to Azure AI (always available)
else
{
    // Use Azure OpenAI
}
```

## Options / Props

| Solution | Best for | Hardware | Notes |
|------|-------------|------|------|
| Windows AI APIs | Ready-to-use LLM (Phi Silica), imaging models, OCR, semantic search — minimal code, no ML expertise needed | Copilot+ PC required | This `ai-apis` category. |
| Foundry Local | 20+ open-source LLMs and speech models via an OpenAI-compatible API | Any Windows hardware | See [Foundry Local overview](../foundry-local/overview.md). |
| Windows ML | Bring-your-own ONNX model, full control over the inference pipeline, hardware-accelerated on CPU/GPU/NPU | Any Windows hardware | See [Windows ML overview](../windows-ml/overview.md). |
| Microsoft Foundry (cloud) | Cloud-hosted frontier models (GPT-4o, DALL-E, etc.) via REST API | Any device, network required | Combine with Foundry Local for on-device/cloud fallback. |

## Notes

- Terminology has shifted: **Copilot Runtime APIs** (2024) → **Windows AI APIs** (current name, same functionality). **Windows Copilot Runtime** / **Windows AI Foundry** (former umbrella terms) → **Microsoft Foundry on Windows** (current umbrella brand covering Windows AI APIs + Foundry Local + Windows ML). **Microsoft Foundry** (cloud platform) is a different product from **Microsoft Foundry on Windows**, despite the similar name.
- **Phi Silica** is the NPU-optimized Windows-inbox version of Microsoft's Phi model family, accessed via Windows AI APIs; general **Phi** models (Phi-4-mini, etc.) are available on Azure AI and via Foundry Local.
- **DirectML** is in sustained engineering (no longer actively developed); Windows ML IHV-specific execution providers are its replacement, achieving higher performance by working natively with Windows hardware.
- **Copilot+ PC** is a hardware category (NPU with 40+ TOPS, 16GB+ RAM, specific SoCs) required for Windows AI APIs but not for Foundry Local or Windows ML.
- These options are not mutually exclusive — the combine-fallback pattern above tries Windows AI APIs first, then Foundry Local, then cloud, to give Copilot+ users the best experience while keeping the feature working on all hardware.

## Related

- [Device requirements and fallback](./device-requirements.md)
- [Ready-to-use local LLMs on Windows](./local-llms.md)
- [Foundry Local overview](../foundry-local/overview.md)
- [Windows ML overview](../windows-ml/overview.md)
