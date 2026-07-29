# Run generative AI models with Windows ML (Preview)

Run LLMs and other generative models (text and speech-to-text) on Windows ML using the ONNX Runtime GenAI Windows ML library, a higher-level wrapper over plain ONNX Runtime.

## Signature / Usage

```csharp
// NuGet: Microsoft.ML.OnnxRuntimeGenAI.WinML

var model = new Model("path/to/model");
var tokenizer = new Tokenizer(model);
var inputSequences = tokenizer.Encode("Your prompt here");

var generatorParams = new GeneratorParams(model);
generatorParams.SetInputSequences(inputSequences);

var generator = new Generator(model, generatorParams);
while (!generator.IsDone())
{
    generator.ComputeLogits();
    generator.GenerateNextToken();
}

string result = tokenizer.Decode(generator.GetSequence(0));
```

## Options / Props

| Class | Key members |
|------|-------------|
| `Model` | `Model(string modelPath)`, `Sequences Generate(GeneratorParams generatorParams)` |
| `Tokenizer` | `Tokenizer(Model model)`, `Sequences Encode(string str)`, `string Decode(ReadOnlySpan<int> sequence)`, `TokenizerStream CreateStream()` |
| `TokenizerStream` | `string Decode(int token)` — incremental (per-token) decoding |
| `GeneratorParams` | `GeneratorParams(Model model)`, `SetSearchOption(string, double)`, `SetInputIDs(...)` |
| `Generator` | `Generator(Model model, GeneratorParams generatorParams)`, `bool IsDone()`, `void ComputeLogits()`, `void GenerateNextToken()`, `ReadOnlySpan<int> GetSequence(ulong index)` |
| `Sequences` | `ulong NumSequences`, indexer `this[ulong sequenceIndex]` |

| Package / Resource | Description |
|------|-------------|
| `Microsoft.ML.OnnxRuntimeGenAI.WinML` (NuGet) | ONNX Runtime GenAI library built for Windows ML; currently 0.x preview and subject to change |
| [onnxruntime-genai GitHub](https://github.com/microsoft/onnxruntime-genai) | Source repo; lists supported LLMs and generative speech-to-text models |
| [ONNX Runtime GenAI docs](https://onnxruntime.ai/docs/genai/) | API reference and usage docs ([C# API](https://onnxruntime.ai/docs/genai/api/csharp.html), [C++ API](https://onnxruntime.ai/docs/genai/api/cpp.html)) |

## Notes

- The GenAI API implements the full generative-AI loop for ONNX models: pre/post-processing, inference via ONNX Runtime, logits processing, search and sampling, KV cache management, and grammar specification for tool calling — none of which is provided by the plain ONNX Runtime APIs in [ONNX Runtime inference in Windows ML](./onnx-runtime-inference.md).
- The `Model` / `Tokenizer` / `Generator` API above is the general onnxruntime-genai C# surface (same shape across platforms); `Microsoft.ML.OnnxRuntimeGenAI.WinML` is the Windows ML-targeted build of that same library.
- ONNX Runtime GenAI libraries are 0.x preview releases; API surface is subject to change.
- Model sourcing for GenAI models follows the same paths as other models — see [Find or train models for Windows ML](./models.md).

## Related

- [ONNX Runtime inference in Windows ML](./onnx-runtime-inference.md)
- [Find or train models for Windows ML](./models.md)
- [What is Windows ML](./overview.md)
