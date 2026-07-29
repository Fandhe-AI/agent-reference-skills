# Windows AI API troubleshooting

Diagnostic checklist for Windows AI API hardware/software requirements, Limited Access Feature (LAF) token failures, GPU/CPU driver issues, and the Feedback Hub trace-collection workflow when Phi Silica (or another Windows AI API) doesn't work as expected.

## Signature / Usage

```xml
<!-- Package.appxmanifest -- required or calls fail with UnauthorizedAccessException -->
<!-- Add to the <Package> node's IgnorableNamespaces and xmlns declarations: -->
<!-- xmlns:systemai="http://schemas.microsoft.com/appx/manifest/systemai/windows10" -->
<!-- IgnorableNamespaces="uap rescap systemai" -->
<Capabilities>
  <systemai:Capability Name="systemAIModels"/>
</Capabilities>
```

## Options / Props

| API | Supported hardware |
|------|-------------|
| Phi Silica | Copilot+ PC (NPU), or a Windows 11 device with a supported GPU (NVIDIA RTX 30 series+ with 6+ GB vRAM; AMD Radeon with latest driver) |
| Text Recognition (OCR) | Copilot+ PC (NPU) |
| Speech Recognition | Copilot+ PC (NPU), or a device meeting recommended CPU specs |
| Video Super Resolution | Copilot+ PC (NPU), or a device meeting recommended CPU specs |
| Imaging APIs | Copilot+ PC (NPU) |

## Notes

- Requires Windows 11, version 25H2 (build 10.0.26200.7309) or later; verify with `winver`.
- Confirm Phi Silica works via the **AI Dev Gallery** Microsoft Store app: **AI APIs** > **Phi Silica** > **Text Generation**, then check it responds to the default prompt.
- Minimum Windows App SDK version: stable channel 1.8.0 (1.8.250907003)+; experimental channel (required for Phi Silica on GPU) 2.2.2-experimental9 (June 2026 Experimental)+.
- If required models are missing, check **Settings > System > AI Components**; if not listed, run **Settings > Windows Update > Check for updates** (a restart may be required).
- **GPU troubleshooting (Phi Silica):** requires Developer Mode enabled (**Settings > System > For developers**) and the *latest driver installed directly from the GPU manufacturer* (NVIDIA GeForce 615.21 beta+, AMD Software: Adrenalin Edition 26.10.2+) — default Windows Update/OEM drivers may be insufficient, and OEM/Windows Update drivers can silently overwrite a manufacturer driver after an update. If `EnsureReadyAsync` fails on GPU, verify the driver version.
- **CPU troubleshooting (Video Super Resolution, Speech Recognition):** recommended specs are 4+ physical cores, 3 GHz+ base clock, 32 MB+ L3 cache; the Video Super Resolution model ships with the Windows App SDK (not separately downloadable).
- `UnauthorizedAccessException` (or other access issues) typically means the app isn't packaged with identity, or the `systemAIModels` capability (declared under the `systemai:` namespace, not `rescap:`) is missing from `Package.appxmanifest`.
- LAF (Limited Access Feature) failures surface as `LimitedAccessFeatureStatus.Unavailable` or `.Unknown` — verify a LAF token was requested and received, or switch to the experimental channel, which doesn't require LAF tokens.
- Self-contained apps cannot run from the Downloads folder or anywhere under `C:\Users`.
- To collect diagnostic traces: open **Feedback Hub** (Win+F) > prefix the bug title with "[Windows AI APIs]" > **Problem > Developer Platform > Windows AI Foundry** > **Recreate my problem** (start recording, reproduce in AI Dev Gallery, stop recording) > submit.
- Report API bugs via the [WindowsAppSDK GitHub repo](https://github.com/microsoft/WindowsAppSDK/issues) (include "Phi Silica" in the title for LLM issues).

## Related

- [Device requirements and fallback](./device-requirements.md)
- [LanguageModel](./language-model.md)
- [Phi Silica LoRA fine-tuning](./phi-silica-lora.md)
