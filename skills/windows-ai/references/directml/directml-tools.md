# DirectML Tools

Companion tools that enhance DirectML and help incorporate it into an AI app: Olive, DxDispatch, DirectMLX, and ONNX Runtime perf tests.

## Options / Props

| Tool | Description |
|------|-------------|
| ONNX Runtime Go Live (Olive) | Hardware-aware model optimization tool composing compression, optimization, and compilation techniques; targets DirectML as the backend and outputs the most efficient model(s). |
| DxDispatch | Command-line executable for launching DirectX 12 compute programs without C++ boilerplate; driven by a JSON model that defines resources, dispatchables (compute shaders, DirectML operators, ONNX models), and commands. |
| DirectMLX | C++ header-only helper library that makes it easier to compose individual DirectML operators into graphs. |
| ONNX Runtime Perf Tests | Measures latency, throughput, memory usage, and CPU/GPU utilization of ONNX models across execution providers (EPs), including the DirectML EP. |

## Signature / Usage

```console
onnxruntime_perf_test -m resnet50 -e directml
```

## Notes

- To use the perf test tool with the DirectML EP, install the `onnxruntime-directml` package and pass `-e directml`.
- Additional options control iteration count, batch size, concurrency, warmup runs, model inputs, and output format.

## Related

- [DirectMLX](./directmlx.md)
- [ONNX Runtime DirectML execution provider](./onnxruntime-directml.md)
