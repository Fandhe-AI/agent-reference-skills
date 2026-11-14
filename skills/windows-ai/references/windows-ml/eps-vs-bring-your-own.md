# Windows ML EPs vs. bring your own

Comparison of the two ways to obtain execution providers (EPs) in Windows ML — the Windows ML EPs (via `ExecutionProviderCatalog`, recommended) versus bring-your-own EPs (NuGet packages or standalone EP binaries) — to help choose the right strategy per app.

## Signature / Usage

Adapted (not in the official docs): the page contains no code; the following sketches the hybrid approach in pseudocode.

```text
try catalog path (ExecutionProviderCatalog) for the target EP (e.g. QNN)
if it fails (device offline, etc.):
    register the bundled EP binary via ORT RegisterExecutionProviderLibrary
run inference with the same inference code
```

## Options / Props

| | Windows ML EPs (recommended) | Bring your own (alternative) |
|------|------|------|
| How | `ExecutionProviderCatalog` APIs | NuGet packages or standalone EP binaries |
| Setup complexity | Low — one API call | Medium — manual NuGet reference per EP |
| Certification | Yes — Windows-certified, rigorous regression testing process | Depends on the EP |
| Version compatibility validation | Microsoft validates the Windows ML, ONNX Runtime (ORT), and EP combination | You validate the Windows ML, ONNX Runtime (ORT), and EP combination |
| App size impact | Low — EPs downloaded to system, not bundled | High — EPs bundled with your app (~80 MB each) |
| EP updates | Automatic (handled by Windows ML) | Manual — you update when you choose |
| OS requirement | Win 11 24H2 (for EPs acquired by ExecutionProviderCatalog APIs)¹ | Depends on EP |
| Network required on first run | Yes (if EP not already installed) | Depends on your implementation |
| Managed device support | Supported in Windows ML 2.5.96 and greater | Depends on your implementation |

¹ DirectML and the ORT CPU EP are always included in Windows ML and require no download on any supported OS version.

## Notes

- Use the Windows ML EPs when app download size matters (avoiding bundling 80-120 MB EP packages per vendor), you want automatic EP performance improvements without shipping a new release, and you want EPs certified by the Windows team for compatibility and stability.
- Bring your own EPs when you have strict control requirements over the exact EP version, you are deploying to offline environments or devices without internet access, or you can test and maintain compatibility between your EP and the ORT version included with each Windows ML version you adopt.
- Mixing the two: use the Windows ML EPs as the preferred path and fall back to a bundled EP for the same hardware target. For example, attempt to get QNN via the Windows ML EP catalog and, if that fails (device offline, etc.), fall back to a QNN NuGet package you bundled yourself — ensuring NPU acceleration on managed or offline devices without changing your inference code.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/windows-ml-eps-vs-bring-your-own (retrieved 2026-11-14)

## Related

- [Windows ML execution providers](./supported-execution-providers.md)
- [Bring your own execution providers](./bring-your-own-eps.md)
- [Select execution providers](./select-execution-providers.md)
- [Accelerate AI models with Windows ML](./execution-providers-overview.md)
