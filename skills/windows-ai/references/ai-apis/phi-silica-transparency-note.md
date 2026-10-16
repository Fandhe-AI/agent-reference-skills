# Transparency Note: Phi Silica on non-Copilot+ PCs (GPU)

Capabilities, limitations, and responsible-use guidance for Phi Silica running on GPU on non-Copilot+ PCs.

## Signature / Usage

The page has no code sample. Content moderation is configured through the `ContentFilterOptions` API, which sets severity thresholds for four categories:

```text
violence, hate, sexual content, self-harm
```

## Options / Props

| Factor | Copilot+ PCs (NPU) | Non-Copilot+ PCs (GPU) |
|------|------|------|
| Inference latency | Low latency via NPU acceleration and speculative decoding | Higher; depends on GPU generation, VRAM, and load |
| Power | Power-efficient | More power; may significantly impact laptop battery |
| Concurrent workloads | NPU operates independently | Competes with other GPU workloads |
| Thermal | Managed for sustained AI workloads | May thermal-throttle |
| Memory | Managed alongside NPU memory | Model loaded into GPU VRAM or shared memory |
| Prompt Compression | Available | Not available on GPU |
| Speculative Decoding | Available | Not available on GPU |
| Model optionality | Managed by the system | Downloaded on demand; user can remove via Settings > System > AI Components |

## Notes

- Output quality is the same across NPU and GPU (same weights and architecture); differences are inference speed, resource use, and responsiveness.
- Non-Copilot+ execution requires the latest IHV GPU driver installed directly from the manufacturer (NVIDIA or AMD); default Windows Update or OEM drivers may cause failures or degraded performance.
- Phi Silica features are not available in China.
- Content moderation is strongly recommended on both hardware types and behaves identically regardless of inference hardware.
- Recommended practices: benchmark on representative low-end hardware, show progress or stream partial results, implement timeouts and (with user consent) cloud fallbacks, monitor GPU/VRAM use, disclose AI-generated content, avoid logging prompts without consent, provide a kill switch or feature flag, and test fairness and red-team before deployment.
- Do not use for high-stakes decisions without human oversight; the model can hallucinate and is susceptible to prompt injection that moderation mitigates but does not eliminate.
- Inference is entirely local; prompts and outputs are not sent to Microsoft or third parties.

## Related

- [Content moderation](./content-moderation.md)
- [Responsible AI](./responsible-ai.md)
- [Device requirements and fallback](./device-requirements.md)
- [Platform card: Phi Silica](./platform-card-phi-silica.md)
