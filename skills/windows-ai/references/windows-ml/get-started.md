# Get started with Windows ML

The minimal path to running an ONNX model with Windows ML on CPU, before adding hardware acceleration.

## Signature / Usage

```text
Step 1: Find a model (ONNX format)
Step 2: Install Windows ML (NuGet packages, self-contained or framework-dependent)
Step 3: Add namespaces / headers for the ONNX APIs
Step 4: Run the ONNX model on CPU (works with no additional setup)
Step 5: Optionally accelerate on NPU/GPU with execution providers
```

## Options / Props

| Language | Prerequisite |
|------|-------------|
| C# | .NET 8+ to use all Windows ML APIs; .NET 6 can install EPs via `Microsoft.Windows.AI.MachineLearning` but not `Microsoft.ML.OnnxRuntime`. TFM `net8.0-windows10.0.17763.0` or greater |
| C++/WinRT | C++20 or later |
| C/C++ | Visual Studio 2022 with C++ workload; CMake 3.21+ |
| Python | Python 3.10–3.13, x64 or ARM64 |

## Notes

- Windows ML apps can target any Windows version supported by Windows App SDK; hardware-optimized EPs acquired via the EP catalog require Windows 11 version 24H2 (build 26100) or greater.
- See [Install and deploy Windows ML](./deployment-bootstrap.md) for full install instructions, and [ONNX Runtime inference APIs](./onnx-runtime-inference.md) for namespaces/headers.

## Related

- [What is Windows ML](./overview.md)
- [Install and deploy Windows ML](./deployment-bootstrap.md)
- [ONNX Runtime inference APIs](./onnx-runtime-inference.md)
- [Execution providers overview](./execution-providers-overview.md)
