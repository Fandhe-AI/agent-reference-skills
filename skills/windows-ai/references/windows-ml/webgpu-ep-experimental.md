# WebGPU execution provider (experimental)

An experimental GPU execution provider that uses the WebGPU standard (via DirectX 12, Chromium Dawn engine) to run ONNX models across a wide range of DirectX 12–capable GPUs. Registered under the name `WebGpuExecutionProvider`.

## Signature / Usage

```csharp
const string WebGpuEpName = "WebGpuExecutionProvider";

// 1. Enumerate providers and find the WebGPU EP by name.
var catalog = ExecutionProviderCatalog.GetDefault();
var webGpuProvider = catalog.FindAllProviders()
    .FirstOrDefault(p => p.Name == WebGpuEpName);

// 2. Install (downloads if needed) and register the EP with ONNX Runtime.
var result = await webGpuProvider.EnsureReadyAsync();
webGpuProvider.TryRegister();

// 3. Select the WebGPU EP device and create a session bound to it.
var env = OrtEnv.Instance();
var webGpuEpDevice = env.GetEpDevices().FirstOrDefault(d => d.EpName == WebGpuEpName);

using (var sessionOptions = new SessionOptions())
{
    sessionOptions.AppendExecutionProvider(env, new[] { webGpuEpDevice }, new Dictionary<string, string>());
    using var session = new InferenceSession("model.onnx", sessionOptions);
    // Run inference...
}

// 4. Unregister the EP library before the environment is torn down.
env.UnregisterExecutionProviderLibrary(WebGpuEpName);
```

## Notes

- Requires Windows 11, version 24H2 (build 26100) or later, plus the experimental `Microsoft.Windows.AI.MachineLearning` NuGet package (`2.4.66-preview` or later).
- `EnsureAndRegisterCertifiedAsync()` does **not** install WebGPU EP — it must be enumerated, installed via `EnsureReadyAsync()`, and registered via `TryRegister()` explicitly.
- Not yet recommended for performance-critical production scenarios; the recommended production path is a vendor-specific EP with DirectML as fallback. DirectML itself is in maintenance mode (bug/security fixes only, no new operator coverage or hardware optimizations planned).
- Supports FP32/FP16 inferencing and INT4/INT8 quantization for LLMs; quantized non-LLM INT8 models are not supported and may fall back to CPU.
- Recommended hardware: roughly 11th-gen Intel integrated graphics or NVIDIA Turing-class and newer, with up-to-date drivers.
- Governed by the WebGPU EP for Windows App SDK License plus the ONNX Runtime License; provider-specific configuration options are documented in the ONNX Runtime WebGPU Execution Provider docs.

## Related

- [Windows ML execution providers](./supported-execution-providers.md)
- [Select execution providers](./select-execution-providers.md)
- [Windows ML EPs vs. bring your own](./eps-vs-bring-your-own.md)
