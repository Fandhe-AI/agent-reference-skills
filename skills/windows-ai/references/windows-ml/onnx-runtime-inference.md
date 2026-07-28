# ONNX Runtime inference in Windows ML

Windows ML ships a shared copy of the ONNX Runtime, so apps use the same OrtEnv / SessionOptions / InferenceSession / Run / OrtValue APIs as standalone ONNX Runtime — no code changes required beyond namespace/header setup.

## Signature / Usage

```csharp
using Microsoft.ML.OnnxRuntime;

// Create inference session using a compiled model
using InferenceSession session = new(compiledModelPath, sessionOptions);

var inputs = new List<NamedOnnxValue> { NamedOnnxValue.CreateFromTensor(inputName, inputTensor) };
var results = session.Run(inputs);
```

```cppwinrt
#include <winml/onnxruntime_cxx_api.h>

Ort::Env env(ORT_LOGGING_LEVEL_ERROR, "MyApp");
Ort::Session session(env, compiledModelPath.c_str(), sessionOptions);

auto outputTensors = session.Run(Ort::RunOptions{nullptr}, inputNames.data(), &inputTensor, 1, outputNames.data(), 1);
```

```python
import onnxruntime as ort

session = ort.InferenceSession(output_model_path, sess_options=options)
results = session.run(None, {input_name: img_array})[0]
```

## Options / Props

| Namespace / header | Language |
|------|-------------|
| `Microsoft.ML.OnnxRuntime` | C# (same as standalone ONNX Runtime) |
| `<winml/onnxruntime_cxx_api.h>` | C++/WinRT (headers namespaced under `winml/` to avoid conflicts; set `WinMLEnableDefaultOrtHeaderIncludePath=true` in the project to expose unprefixed `<onnxruntime_cxx_api.h>`) |
| `<onnxruntime_cxx_api.h>` / `<onnxruntime_c_api.h>` | C/C++ |
| `import onnxruntime as ort` | Python (same module name as standalone ONNX Runtime) |

| Session config entry | Description |
|------|-------------|
| `session.intra_op.allow_spinning` / `session.inter_op.allow_spinning` | Thread spinning is **disabled by default** in Windows ML's ONNX Runtime for better battery life. Set to `"1"` via `AddSessionConfigEntry` / `AddConfigEntry` / `add_session_config_entry` to enable |

## Notes

- Model inference code (input preprocessing, output postprocessing) is model-specific; the session/run APIs themselves are identical to upstream ONNX Runtime — consult the ONNX Runtime docs for API details beyond this Windows ML integration layer.
- Compiled models must be produced first for best performance — see [Model compilation and caching](./model-compilation.md) for the `OrtModelCompilationOptions` / `OrtCompileApi` workflow (`SetInputModelPath`, `SetOutputModelPath`, `CompileModel`).
- `OrtValue` / `Ort::Value` and `IoBinding` follow the standard ONNX Runtime C/C++/C# API surface; Windows ML does not add wrapper types for these.

## Related

- [ExecutionProviderCatalog](./execution-provider-catalog.md)
- [Select execution providers](./select-execution-providers.md)
- [Model compilation and caching](./model-compilation.md)
