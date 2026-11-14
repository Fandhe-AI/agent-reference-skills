# Windows ML CLI command reference (winml)

Windows ML CLI exposes a CLI named `winml` with 12 subcommands covering the full journey from model discovery to a deployment-ready artifact. Every subcommand shares a consistent invocation style, and the same global flags are available on the root `winml` group.

## Signature / Usage

Adapted (not in the official docs): invocation forms assembled from the inline code in the official text.

```powershell
winml <command> [flags]
winml --version
winml --help
winml <command> --help
```

The commands group by user intent. **Discover** (`sys`, `inspect`, `catalog`, `analyze`) helps you understand your hardware and model before writing any artifacts. **Configure** (`config`, `optimize`) produces a reusable build configuration and tunes the ONNX graph. **Build** (`export`, `quantize`, `compile`, `build`) runs the pipeline stages that produce deployment artifacts. **Measure** (`perf`, `eval`) benchmarks and validates the result.

The typical workflow follows that order: run `winml sys` to confirm hardware and EPs, then `winml inspect` or `winml catalog` to verify model support. Use `winml config` to generate a build configuration, then `winml build` to execute the full pipeline — or chain `export` → `analyze` → `optimize` → `quantize` → `compile` individually for finer control. Close with `winml perf` and `winml eval` to measure speed and accuracy.

## Options / Props

### Command map

| Command | Group | Purpose |
| --- | --- | --- |
| `sys` | Discover | Inspect your machine — devices, EPs, and runtime versions at a glance. |
| `inspect` | Discover | Inspect a model's tasks, classes, and hierarchy before committing to an export. |
| `catalog` | Discover | Browse the curated Windows ML CLI catalog of validated models and benchmarks. |
| `config` | Configure | Generate a reusable build configuration for a Hugging Face model or ONNX file. |
| `export` | Build | Convert a PyTorch / Hugging Face model to ONNX, preserving module hierarchy. |
| `analyze` | Build | Inspect known operator and pattern support for a target execution provider. |
| `optimize` | Build | Apply graph optimizations and fusions to an ONNX model to reduce node count and improve inference speed. |
| `quantize` | Build | Apply FP16, INT4 weight-only, dynamic, or calibrated static QDQ conversion. |
| `compile` | Build | Compile an ONNX model to an EP-specific format for fast runtime loading. |
| `build` | Build | Run the entire Windows ML CLI pipeline (export → optimize → quantize → compile) in one command. |
| `perf` | Measure | Benchmark an ONNX model's latency and throughput on a target device. |
| `eval` | Measure | Evaluate task quality or compare outputs with a reference, using supported ONNX and PyTorch workflows. |

### Choosing a command

- **I want to see what hardware and EPs I have** → `winml sys`
- **I want to know if my model is supported** → `winml inspect`
- **I want to browse validated models with known benchmarks** → `winml catalog`
- **I want to verify EP operator compatibility before compiling** → `winml analyze`
- **I want to convert a Hugging Face model to ONNX** → `winml export`
- **I want to run the whole pipeline in one go** → `winml build`
- **I want to benchmark latency and throughput** → `winml perf`
- **I want to measure model accuracy** → `winml eval`

## Notes

### Global flags

Use `winml --version` to check the installed version and `winml --help` to list commands. Use `winml <command> --help` to inspect a command's flags. Verbosity options are also exposed by individual commands; check their help rather than assuming every option has the same placement.

### Shared flags

Most file-producing commands reject existing outputs unless you pass `--overwrite`. `build` uses `--rebuild` instead. The `-o` value can mean a file or directory depending on the command; use the individual reference rather than copying a path unchanged between stages.

Several flags share semantics across the commands that accept them: `-m` / `--model`, `-d` / `--device`, `--ep`, `-o` / `--output`, `-t` / `--task`, and `--precision`. Defaults and accepted values can differ per command; check the **Flags** section of each command page rather than assuming they transfer.

`--no-color` is accepted by every command and disables colored output for that invocation. Color is also auto-disabled when `NO_COLOR=1` or `CI=true` is set in the environment.

- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/commands/overview (retrieved 2026-11-14)

## Related

- [Windows ML CLI](./winml-cli.md)
- [winml sys](./winml-cli-cmd-sys.md)
- [winml inspect](./winml-cli-cmd-inspect.md)
- [winml catalog](./winml-cli-cmd-catalog.md)
- [winml config](./winml-cli-cmd-config.md)
- [winml export](./winml-cli-cmd-export.md)
- [winml analyze](./winml-cli-cmd-analyze.md)
- [winml optimize](./winml-cli-cmd-optimize.md)
- [winml quantize](./winml-cli-cmd-quantize.md)
- [winml compile](./winml-cli-cmd-compile.md)
- [winml build](./winml-cli-cmd-build.md)
- [winml perf](./winml-cli-cmd-perf.md)
- [winml eval](./winml-cli-cmd-eval.md)
