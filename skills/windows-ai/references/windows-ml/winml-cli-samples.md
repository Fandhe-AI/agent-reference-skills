# Windows ML CLI samples

Four reference-style `winml` workflows: a BERT CPU baseline (config + build), a CLIP composite model, a Qwen3 GenAI bundle, and an experimental GGUF (llama.cpp) benchmark.

## Signature / Usage

### BERT: configuration, build, and benchmark

Uses BERT's pretrained masked-language-model task (`google-bert/bert-base-uncased`) to show a reusable configuration workflow. It establishes an unquantized CPU baseline rather than adding an untrained classification head. Prerequisites: [installation](https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/getting-started/installation) in a Python 3.11 x64 environment, network access to download the model; for later NPU experiments, Windows 11 24H2 or later with compatible hardware, drivers, and an EP. Run from the environment directory.

```powershell
uv run winml inspect -m google-bert/bert-base-uncased --task fill-mask
uv run winml config -m google-bert/bert-base-uncased --task fill-mask --device cpu --ep cpu --precision fp32 --no-quant --no-compile -o .\bert_cpu.json
```

```powershell
uv run winml build -c .\bert_cpu.json -m google-bert/bert-base-uncased -o .\bert_cpu --no-quant --no-compile
```

```powershell
uv run winml perf -m .\bert_cpu\model.onnx --device cpu --ep cpu --warmup 10 --iterations 50 -o .\bert_cpu\perf.json
```

Compare the optimized graph with its exported baseline:

```powershell
uv run winml eval -m .\bert_cpu\model.onnx --mode compare --reference .\bert_cpu\export.onnx --device cpu --ep cpu --samples 10 -o .\bert_cpu\comparison.json
```

### CLIP: composite models

CLIP (`openai/clip-vit-base-patch32`) is a dual-encoder vision-language model treated as a **composite model**: multiple ONNX sub-models that run together at inference time.

| Sub-model | Role | Input shape | Output (projected) |
| --- | --- | --- | --- |
| `image-encoder` | Encodes images into embeddings | `pixel_values` `[1, 3, 224, 224]` | `image_embeds` `[1, 512]` |
| `text-encoder` | Encodes text labels into embeddings | `input_ids` `[1, 77]` | `text_embeds` `[1, 512]` |

```text
CLIP model -> Text encoder + Vision encoder -> Separate ONNX graphs -> Build each component -> Compare embeddings
```

Step 1: generate build configs. Because `(clip, zero-shot-image-classification)` is registered as a composite model, this produces two config files, `clip_image-encoder.json` (task `image-feature-extraction`) and `clip_text-encoder.json` (task `feature-extraction`), each with CLIP-specific optimizations (GELU fusion, LayerNorm fusion, MatMul+Add fusion, clamp constant values).

```powershell
winml config -m openai/clip-vit-base-patch32 --task zero-shot-image-classification --device cpu --ep cpu --precision fp32 --no-quant --no-compile -o clip.json
```

Step 2: build each sub-model.

```powershell
# Build the image encoder
winml build -c clip_image-encoder.json -m openai/clip-vit-base-patch32 -o output/image-encoder

# Build the text encoder
winml build -c clip_text-encoder.json -m openai/clip-vit-base-patch32 -o output/text-encoder
```

Step 3: benchmark each sub-model.

```powershell
winml perf -m output/image-encoder/model.onnx --device cpu --ep cpu
winml perf -m output/text-encoder/model.onnx --device cpu --ep cpu
```

Step 4: run inference with the Python API. Option 1 loads the ONNX files built in Step 2.

```python
from transformers import AutoConfig

from winml.modelkit.models import WinMLAutoModel

model = WinMLAutoModel.from_onnx(
    {
        "image-encoder": "output/image-encoder/model.onnx",
        "text-encoder": "output/text-encoder/model.onnx",
    },
    task="zero-shot-image-classification",
    hf_config=AutoConfig.from_pretrained("openai/clip-vit-base-patch32"),
    skip_build=True,
)
```

Option 2 builds both encoders from the Hugging Face model in one call:

```python
from winml.modelkit.models import WinMLAutoModel

model = WinMLAutoModel.from_pretrained(
    "openai/clip-vit-base-patch32",
    task="zero-shot-image-classification",
)
```

Either way, run inference the same way:

```python
from PIL import Image
from transformers import CLIPProcessor

processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
image = Image.open("cat.jpg")
labels = ["a photo of a cat", "a photo of a dog", "a photo of a car"]
inputs = processor(text=labels, images=image, return_tensors="pt", padding=True)

# Run both encoders and combine into per-label similarity scores
outputs = model(**inputs)
probs = outputs.logits_per_image.softmax(dim=-1)
for label, p in zip(labels, probs[0].tolist()):
    print(f"{label}: {p:.4f}")
```

Per-sub-model shape config is passed through `sub_model_kwargs` (image encoder: `height`, `width`; text encoder: `sequence_length`):

```python
model = WinMLAutoModel.from_pretrained(
    "openai/clip-vit-base-patch32",
    task="zero-shot-image-classification",
    sub_model_kwargs={
        "image-encoder": {"shape_config": {"height": 224, "width": 224}},
        "text-encoder":  {"shape_config": {"sequence_length": 77}},
    },
)
```

Other composite models using the same pattern: SigLIP (`google/siglip-base-patch16-224`), T5 (`google-t5/t5-small`), BART (`facebook/bart-large-cnn`), Marian (`Helsinki-NLP/opus-mt-en-de`), Qwen3 (`Qwen/Qwen3-0.6B`, prefill + generation decoders), BLIP (`Salesforce/blip-image-captioning-base`), and vision-encoder-decoder (`microsoft/trocr-base-handwritten`).

### Qwen3: GenAI bundle

Qwen3 (`Qwen/Qwen3-0.6B`) is exported as a **bundle** (a directory of cooperating ONNX graphs plus runtime metadata and tokenizer) for [onnxruntime-genai](https://github.com/microsoft/onnxruntime-genai).

| File | Role | Device | Precision |
| --- | --- | --- | --- |
| `ctx.onnx` | Transformer **prefill** graph (processes the prompt) | NPU (QNN, VitisAI, or OpenVINO) | `w8a16` |
| `iter.onnx` | Transformer **decode** graph (one token per step) | NPU (QNN, VitisAI, or OpenVINO) | `w8a16` |
| `embeddings.onnx` | Token embedding lookup | CPU | `fp32` |
| `lm_head.onnx` | Final vocab projection | CPU | `w4a32` |
| `genai_config.json` + tokenizer | onnxruntime-genai runtime metadata | — | — |

```text
Hugging Face model -> Target-specific bundle recipe -> Transformer graphs + CPU companion graphs -> Runtime configuration and tokenizer -> ONNX Runtime GenAI
```

Step 1: build the bundle. `--export-type optimized` switches `winml build` from the stock per-model ONNX output to the full genai bundle; `--output-dir` is required and `--use-cache` is not supported for bundles.

```powershell
winml build -m Qwen/Qwen3-0.6B -o out/qwen3-bundle --export-type optimized
```

Pin the provider to select a target explicitly:

```powershell
# Qualcomm Snapdragon NPU
winml build -m Qwen/Qwen3-0.6B -o out/qwen3-bundle `
  --export-type optimized --ep qnn --device npu

# AMD Ryzen AI NPU
winml build -m Qwen/Qwen3-0.6B -o out/qwen3-bundle `
  --export-type optimized --ep vitisai --device npu

# Intel NPU (OpenVINO)
winml build -m Qwen/Qwen3-0.6B -o out/qwen3-bundle `
  --export-type optimized --ep openvino --device npu
```

Backward-compatible shortcut (when `--export-type` is omitted, an explicit `--ep qnn` targeting the NPU still routes a registered family to its bundle):

```powershell
winml build -m Qwen/Qwen3-0.6B -o out/qwen3-bundle --device npu --ep qnn
# or, letting device auto-detection pick the NPU (--device may be omitted):
winml build -m Qwen/Qwen3-0.6B -o out/qwen3-bundle --ep qnn
```

Step 2: benchmark prompt processing and token generation with `winml perf`.

```powershell
# Qualcomm Snapdragon NPU
winml perf -m out/qwen3-bundle --runtime ort-genai --device npu --compile `
  --compile-timeout 600 --max-new-tokens 20 --prompt "Explain how rainbows form."

# AMD Ryzen AI NPU
winml perf -m out/qwen3-bundle --runtime ort-genai --device npu --ep vitisai --compile `
  --compile-timeout 600 --max-new-tokens 20 --prompt "Explain how rainbows form."

# Intel NPU (OpenVINO)
winml perf -m out/qwen3-bundle --runtime ort-genai --device npu --ep openvino --compile `
  --compile-timeout 600 --max-new-tokens 20 --prompt "Explain how rainbows form."
```

One command from a model id (auto-build into `~/.cache/winml/`, reused on later runs):

```powershell
winml perf -m Qwen/Qwen3-0.6B --runtime ort-genai --compile `
  --compile-timeout 600 --max-new-tokens 20 --prompt "Explain how rainbows form."
```

```powershell
winml perf -m Qwen/Qwen3-0.6B --runtime ort-genai --ep openvino --device npu `
  --compile --compile-timeout 600 --max-new-tokens 20 `
  --prompt "Explain how rainbows form."
```

Optional OpenVINO NPU tuning through the repeatable `--ep-options KEY=VALUE` option:

```powershell
winml perf -m Qwen/Qwen3-0.6B --runtime ort-genai --ep openvino --device npu `
  --ep-options 'load_config={"NPU":{"NPU_TURBO":"YES"}}' `
  --compile --compile-timeout 600 `
  --max-new-tokens 20 --prompt "Explain how rainbows form."
```

A CPU run does not require QNN:

```powershell
winml perf -m Qwen/Qwen3-0.6B --runtime ort-genai --device cpu `
  --warmup 2 --iterations 10 --max-new-tokens 20 `
  --prompt "Explain how rainbows form."
```

### GGUF: llama.cpp on Windows ML Runtime (Experimental)

**Experimental.** `winml perf` can benchmark a local GGUF language model through the Windows ML Task API (`windowsml.tasks`) on the Runtime's llama.cpp backend. llama.cpp support ships only in the preview **Windows ML 2.7 experimental** packages, which Windows ML CLI does not install or pin; install them yourself in a separate virtual environment. The preview Runtime API can change between releases.

| Package | Version | Provides |
| --- | --- | --- |
| `windowsml[with-ort]` | `2.7.2021a0` | The Runtime and Task APIs (`windowsml.runtime`, `windowsml.tasks`) and the matching `onnxruntime-windowsml` build |
| `windowsml-llama-core` | `2.7.2021a0` | The Runtime llama.cpp adapter, the llama.cpp and ggml modules, and the CPU backend |

Get a local GGUF file (review the model license first):

```powershell
python -c "from huggingface_hub import hf_hub_download; print(hf_hub_download('Qwen/Qwen2.5-0.5B-Instruct-GGUF', 'qwen2.5-0.5b-instruct-q4_k_m.gguf', local_dir='models'))"
```

Create an experimental environment (uv, source checkout):

```powershell
uv venv .venv-gguf --python 3.11
.venv-gguf\Scripts\activate
uv pip install -e .
uv pip install --prerelease=allow "windowsml[with-ort]==2.7.2021a0" "windowsml-llama-core==2.7.2021a0"
```

Create an experimental environment (pip):

```powershell
py -3.11 -m venv .venv-gguf
.venv-gguf\Scripts\activate
python -m pip install winml-cli
python -m pip install --pre "windowsml[with-ort]==2.7.2021a0" "windowsml-llama-core==2.7.2021a0"
```

Check the installation:

```powershell
python -c "import windowsml.runtime, windowsml.tasks; print('Windows ML Runtime and Task APIs are available')"
uv pip show windowsml-llama-core   # or: python -m pip show windowsml-llama-core
```

Benchmark the model:

```powershell
winml perf -m models\qwen2.5-0.5b-instruct-q4_k_m.gguf --device cpu `
  --max-new-tokens 64 --prompt "Name three primary colors."
```

GPU: build a matching backend with the `Build-LlamaBackend.ps1` tool (NVIDIA CUDA example), from the matching Windows ML checkout root in a Developer PowerShell (PowerShell 7) with the experimental Python environment active:

```powershell
$corePackage = '<path to Microsoft.Windows.AI.MachineLearning.LibLlama.Core.0.5.0.2022-experimental.nupkg>'
$expectedSha256 = '<verified 64-character SHA-256 of that package>'
$cudaToolkit = '<installed CUDA Toolkit directory>'
$library = python -c "import pathlib, windowsml; print(pathlib.Path(windowsml.__file__).parent / 'lib')"

.\Tools\llama\Build-LlamaBackend.ps1 `
  -Backend cuda `
  -Architecture x64 `
  -CMakeOption "-DCUDAToolkit_ROOT=$cudaToolkit" `
  -CorePackage $corePackage `
  -ExpectedPackageSha256 $expectedSha256 `
  -OutputRoot $library `
  -WorkRoot (Join-Path $PWD 'temp\llama-cuda')
```

```powershell
winml perf -m models\qwen2.5-0.5b-instruct-q4_k_m.gguf --device gpu
```

## Options / Props

### BERT sample flags

| Flag | Meaning |
| --- | --- |
| `--no-quant` / `--no-compile` | Skip the quantization / compile stages (CPU fp32 baseline) |
| `--rebuild` | Repeat a build into the same directory intentionally |
| `--mode compare --reference <onnx>` | `eval` output-similarity comparison against the exported baseline |

### Qwen3 bundle flags

| Flag | Meaning |
| --- | --- |
| `--export-type optimized` | Build the full genai bundle. `--export-type generic` always forces the stock build, even on the NPU |
| `--runtime ort-genai` | Benchmark the bundle through onnxruntime-genai |
| `--device config` | With `--runtime ort-genai`, preserve the device routing stored in a compatible prebuilt bundle |
| `--prompt-file` | Use a UTF-8 text file for a long prompt instead of `--prompt` |
| `--compile-timeout` | Compile timeout (the official examples pass `600`; unit not stated on the page) |
| `--ep-options KEY=VALUE` | Repeatable runtime provider-option override on the selected hardware stages (not embedded in an auto-built bundle) |

### GGUF `winml perf` options

| Option | Behavior with a `.gguf` model |
| --- | --- |
| `--model` / `-m` | Path to a local `.gguf` file (the first shard of a sharded model). |
| `--runtime` | `auto` or `winml-runtime`. Other runtimes are rejected. |
| `--device` | `auto` (CPU), `cpu`, or `gpu`. `npu` is not supported. |
| `--prompt`, `--prompt-file` | The prompt for every generation. |
| `--apply-template/--no-apply-template` | Render the prompt with the chat template stored in the GGUF file. Without a template, the raw prompt is used and the report sets `chat_template_applied` to `false`. |
| `--max-new-tokens` | Upper bound on generated tokens per generation. |
| `--iterations`, `--warmup` | Timed and warmup generations (defaults `10` and `2`). |
| `--memory/--no-memory` | Process RAM at the load and inference checkpoints. |
| `--output`, `--overwrite`, `--format json` | Same as for the other runtimes. |

Rejected options: `--ep`, `--ep-options`, `--backend`, `--device-luid`, `--input-data`, `--module`, `--submodel`. Ignored with a warning: build-only and ONNX-only options such as `--precision`, `--task`, `--compile`, `--op-tracing`, `--duration`, `--batch-size`, `--monitor`.

### GGUF report (`schema_version: 3`)

| Field | GGUF value |
| --- | --- |
| `benchmark_info.runtime` / `backend` / `model_format` | `winml-runtime` / `llama.cpp` / `gguf` |
| `benchmark_info.api` / `timing_source` | `windowsml.tasks` / `task-stream` |
| `benchmark_info.experimental` | `true` |
| `benchmark_info.ep` | `null`. llama.cpp does not use an ONNX Runtime execution provider. |
| `requests[].task_ttft_duration_ms` | From immediately before `generate_tokens` through the first token update; includes stream creation. |
| `requests[].request_ttft_duration_ms` | Tokenization plus session reset plus Task TTFT. |
| `requests[].decode_token_durations_ms` | Arrival intervals between consecutive token updates, including Task sampling and detokenization. |
| `requests[].steady_state_decode_tokens_per_second` | Tokens after the first divided by the sum of token-update intervals. |
| `memory` | RAM fields only. VRAM fields are omitted. |

Prefill, first-token, model-TTFT, model-compute, response-eval, sequence-fetch, and detokenization timing fields are `null` rather than estimated, because the Task API does not expose them. The JSON report is written to `~/.cache/winml/perf/<model-file-stem>/<timestamp>.json` unless `--output` is passed.

## Notes

- BERT: review the generated export inputs, shapes, optimization settings, and null quantization/compile sections; use the generated configuration rather than copying an abbreviated schema excerpt. Preserve external weight files referenced by the final ONNX model. Default generated inputs exercise exported tensor shapes, not realistic token distributions; output similarity does not replace task-level evaluation. Do not reuse CPU baseline timings as expected NPU performance. Pass `--compile` during configuration only when the EP supports offline compilation.
- CLIP: `perf` numbers are component measurements, not the latency of the complete zero-shot pipeline. For a component-only export, `--submodel image-encoder` selects that component. To target an NPU, generate separate configurations for the intended EP and precision; overriding an EP at build time does not create a missing compilation recipe. The text encoder's fixed sequence length (77) is handled by padding or truncating processor tokens.
- Qwen3 bundle: the transformer quantization is fixed by its recipe (`w8a16`); a `--precision` that differs is rejected. The recipe supports CPU, QNN/NPU, VitisAI/NPU, and OpenVINO/NPU; other resolved targets fail fast. Keep the complete bundle together (tokenizer assets, external weights, context files); a single transformer graph is not a standalone text-generation model. Without a device or EP override, the model-ID shortcut targets QNN/NPU. Exact weight-upload telemetry is `null` because onnxruntime-genai does not expose it. Intel NPU availability depends on driver, OpenVINO plugin, hardware, and model compatibility.
- GGUF / llama.cpp is **experimental**: it ships only in the preview Windows ML 2.7 experimental packages (`2.7.2021a0`), is separate from the standard ONNX preparation pipeline, and a successful GGUF run is not evidence that an ONNX or NPU workflow is supported. Run `winml` directly in the activated `.venv-gguf`: `uv run` / `uv sync` re-sync the project environment and remove the preview Runtime. `pip` conflict reports about `windowsml` / `onnxruntime-windowsml` versions are expected in this environment.
- GGUF limitations: local `.gguf` files only (Hugging Face Hub references are not resolved); greedy decoding with batch size 1; no NPU target, `--monitor`, or operator tracing. The `windowsml-llama-core` wheel ships only the CPU backend and no `windowsml-llama-cuda` wheel is published for this release; `--device gpu` with only the CPU backend stops before model load, or fails with HRESULT `0x80070032`. The CUDA build needs PowerShell 7, Git, CMake, Visual Studio 2022 or 2026 with the v143 C++ toolset, long paths enabled, an installed CUDA Toolkit, and the signed `Microsoft.Windows.AI.MachineLearning.LibLlama.Core` NuGet package version `0.5.0.2022-experimental` with a verified SHA-256. A missing `WinMLLlamaCudaDependencies.json` warning alone does not establish a native CUDA load failure.
- GGUF troubleshooting: `GGUF models need the preview 'windowsml' package with the Runtime API` means install `windowsml[with-ort]` at the preview version; `GGUF models need the llama.cpp backend for the Windows ML Runtime` means install `windowsml-llama-core` at the same version; `the prompt (...) does not fit the model sequence capacity` means shorten the prompt or lower `--max-new-tokens`. To leave the experimental setup, delete `.venv-gguf`.
- The GGUF section is condensed from the official page; the Source pages contain further detail (context capacity handling, full report-field table, CUDA DLL copy steps).
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/samples/bert-config-build (retrieved 2026-11-14)
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/samples/clip-composite (retrieved 2026-11-14)
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/samples/generative-model-bundle (retrieved 2026-11-14)
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/samples/language-model-benchmark (retrieved 2026-11-14)

## Related

- [Windows ML CLI](./winml-cli.md)
- [Windows ML CLI tutorials](./winml-cli-tutorials.md)
- [Windows ML CLI build configuration](./winml-cli-config-schema.md)
- [Windows ML CLI build outputs and deployment files](./winml-cli-output-layout.md)
- [Windows ML CLI from Python workflows](./winml-cli-python-api.md)
