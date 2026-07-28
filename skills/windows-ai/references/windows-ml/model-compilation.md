# Compile and cache ONNX models

Compilation converts an ONNX model into the hardware-specific binary an execution provider (EP) actually runs. Windows ML strongly recommends pre-compiling models targeting a hardware EP and caching the result to avoid repeated multi-second/minute cold starts.

## Signature / Usage

```csharp
// Prepare compilation options
OrtModelCompilationOptions compileOptions = new(sessionOptions);
compileOptions.SetInputModelPath(modelPath);
compileOptions.SetOutputModelPath(compiledModelPath);

// Compile the model (one-time cost; cache the output)
compileOptions.CompileModel();
```

```python
model_compiler = ort.ModelCompiler(
    options,
    input_model_path,
    embed_compiled_data_into_model=True,
    external_initializers_file_path=None,
)
model_compiler.compile_to_file(output_model_path)
```

## Options / Props

| Concept | Description |
|------|-------------|
| Graph optimization | Fusion/constant-folding/layout work ONNX Runtime performs at session creation; cheap, EP-agnostic, runs every time |
| EP compilation | Conversion of the graph into an EP's own format + hardware-specific binary; expensive, done by hardware EPs (QNN, OpenVINO, VitisAI, NvTensorRtRtx, MIGraphX) via the `EPContext` mechanism, serialized to a `*_ctx.onnx` model or sidecar `.bin` |
| Ahead-of-time (AOT) compile | Compile at build/install time; best for enterprise/fixed-device-profile deployments |
| Compile-on-first-run | Check for a compiled artifact, compile if missing, cache and reuse; best for store apps / diverse consumer hardware |

Requires ONNX Runtime 1.22+ (`OrtCompileApi` / `OrtModelCompilationOptions`).

## Notes

- Compiled models are **device- and EP-specific** — bound to the exact EP they were compiled for.
- Compiled models may need recompiling after EP updates, driver updates, or hardware changes. Catch `INVALID_GRAPH` errors from the session and recompile to refresh the cache.
- Store compiled artifacts in a local per-device cache location (e.g. app local data folder); compilation can take minutes, so run it as a background operation to keep the UI responsive.

## Related

- [ONNX Runtime inference APIs](./onnx-runtime-inference.md)
- [Execution providers overview](./execution-providers-overview.md)
- [Model conversion and quantization](./model-conversion.md)
