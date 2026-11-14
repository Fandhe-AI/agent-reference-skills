# winml-cli Quickstart: Build and Benchmark a Model

Prepare ResNet-50 (a pretrained image classifier) with Windows ML CLI, export it to ONNX at FP32, and measure a CPU baseline before trying lower precision or other hardware.

## Signature / Usage

Verify the install (lists devices and EPs; doesn't validate model loading or inference):

```powershell
uv run winml sys --list-device --list-ep
```

Inspect the model (catches unsupported architectures early):

```powershell
uv run winml inspect -m microsoft/resnet-50
```

Build the model:

```powershell
uv run winml build -m microsoft/resnet-50 -o .\resnet_out --device cpu --ep cpu --precision fp32 --no-quant --no-compile
```

Benchmark the model:

```powershell
uv run winml perf -m .\resnet_out\model.onnx --device cpu --ep cpu --iterations 50 --monitor -o .\resnet_out\perf_cpu.json
```

## Options / Props

Outputs in `resnet_out/` after a successful build:

| Output | Description |
|--------|-------------|
| ONNX file per completed stage | Load, inspect, or pass any of these to a downstream tool independently |
| `analyze_result.json` | Compatibility findings: supported, partially supported, unsupported, and unknown operators and detected optimization patterns |
| `winml_build_config.json` | The resolved recipe for the enabled preparation stages |
| `model.onnx` | Final model; preserve external weight files it references |

## Notes

- The benchmark uses generated inputs; it doesn't classify an image you supply or measure accuracy or end-to-end application performance. Warm-up iterations are excluded from measured latency.
- `winml build` generates a configuration and runs the enabled export, analysis, and optimization stages; here `--no-quant` and `--no-compile` skip quantization and compilation. Use `winml config` to customize a workflow first.
- To repeat the build into the same directory intentionally, add `--rebuild`.
- To compare hardware, choose a compatible EP explicitly and keep input shapes, precision, and measurement settings consistent. `--device auto` prioritizes NPU, then GPU, then CPU; this is a selection policy, not a guarantee the device is fastest.
- NPU workflows require Windows 11, version 24H2 or later and a compatible device, driver, and EP.
- Next steps named by the source: how Windows ML CLI works, the BERT config + build + perf sample, `winml eval` for accuracy, and the Hugging Face model to NPU tutorial.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/getting-started/quickstart (retrieved 2026-11-14)

## Related

- [Install Windows ML CLI (winml-cli)](./winml-cli-installation.md)
- [winml-cli concepts: how it works](./winml-cli-concepts-fundamentals.md)
- [winml-cli concepts: pipeline stages and configuration](./winml-cli-concepts-pipeline.md)
- [Windows ML CLI (winml-cli) Overview](./winml-cli.md)
