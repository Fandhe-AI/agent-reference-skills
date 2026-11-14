# Supported Models with Windows ML CLI

How to discover Windows ML CLI model recipes, which tasks are recognized, a condensed validated-model catalog, and execution provider compatibility.

## Signature / Usage

```powershell
# Browse the current curated catalog
uv run winml catalog

# Filter by task
uv run winml catalog -t image-classification

# Check if a specific model is supported
uv run winml inspect -m microsoft/resnet-50

# List all known tasks
uv run winml inspect --list-tasks
```

If your architecture is not in the catalog, auto-detection may still support it:

```powershell
# Try inspecting first
uv run winml inspect -m your-org/your-model

# If "Status: Supported", proceed normally
uv run winml build -m your-org/your-model -d auto -o output/
```

## Options / Props

### Supported tasks

| Domain | Task | Example Models |
| --- | --- | --- |
| Vision | `image-classification` | ResNet, ConvNeXt, ViT, Swin |
| Vision | `image-segmentation` | Segformer, Mask2Former |
| Vision | `semantic-segmentation` | Segformer |
| Vision | `object-detection` | DETR, YOLOS, Table-Transformer |
| Vision | `depth-estimation` | Depth Anything, ZoeDepth |
| Vision | `image-feature-extraction` | DINOv2, ViT |
| Vision | `zero-shot-image-classification` | CLIP, SigLIP |
| NLP | `text-classification` | BERT, RoBERTa, XLM-RoBERTa |
| NLP | `token-classification` | BERT, RoBERTa (NER) |
| NLP | `question-answering` | BERT, RoBERTa |
| NLP | `fill-mask` | BERT, RoBERTa |
| NLP | `feature-extraction` | BGE, BERT, all-MiniLM |
| NLP | `text-generation` | Qwen3 (composite) |
| NLP | `text2text-generation` | T5, BART, Marian |
| Audio | `automatic-speech-recognition` | Whisper |
| Audio | `audio-classification` | Wav2Vec2 |
| Multimodal | `zero-shot-image-classification` | CLIP (text + vision) |
| Multimodal | `image-to-text` | VisionEncoderDecoder |
| Multimodal | `visual-question-answering` | BLIP |

### Validated model catalog (representative subset)

The official page lists models validated end-to-end with EP compatibility testing, grouped by task. Representative entries (copied from the official tables, not exhaustive):

| Task group | Model | Architecture |
| --- | --- | --- |
| Image Classification | `facebook/convnext-tiny-224` | ConvNeXt |
| Image Classification | `google/vit-base-patch16-224` | ViT |
| Image Classification | `microsoft/resnet-50` | ResNet |
| Image Classification | `microsoft/swin-large-patch4-window7-224` | Swin |
| Image Feature Extraction | `facebook/dinov2-small` | DINOv2 |
| Feature Extraction (Text) | `BAAI/bge-base-en-v1.5` | BERT |
| Feature Extraction (Text) | `BAAI/bge-m3` | XLM-RoBERTa |
| Feature Extraction (Text) | `openai/clip-vit-base-patch32` | CLIP |
| Feature Extraction (Text) | `sentence-transformers/all-MiniLM-L6-v2` | BERT |
| Fill-Mask | `google-bert/bert-base-uncased` | BERT |
| Fill-Mask | `FacebookAI/roberta-base` | RoBERTa |
| Text Classification | `ProsusAI/finbert` | BERT |
| Token Classification | `dslim/bert-base-NER` | BERT |
| Question Answering | `deepset/roberta-base-squad2` | RoBERTa |
| Zero-Shot Classification | `joeddav/xlm-roberta-large-xnli` | XLM-RoBERTa |
| Zero-Shot Image Classification | `openai/clip-vit-base-patch16` | CLIP |
| Image Segmentation | `nvidia/segformer-b2-finetuned-ade-512-512` | Segformer |
| Image-to-Text | `microsoft/trocr-base-handwritten` | VisionEncoderDecoder |

The catalog groups on the official page are: Image Classification, Image Feature Extraction, Feature Extraction (Text), Sentence Similarity, Fill-Mask, Text Classification, Token Classification, Question Answering, Zero-Shot Classification, Zero-Shot Image Classification, Image Segmentation, Image-to-Text.

### Execution provider compatibility

Each validated model is tested against available EPs:

| EP | Alias | Devices | Notes |
| --- | --- | --- | --- |
| NvTensorRTRTXExecutionProvider | `nvtensorrtrtx`, `nv_tensorrt_rtx` | GPU | NVIDIA TensorRT-RTX; NVIDIA GPU with TensorRT runtime |
| CUDAExecutionProvider | `cuda` | GPU | NVIDIA CUDA; any CUDA-capable GPU |
| MIGraphXExecutionProvider | `migraphx` | GPU | AMD ROCm MIGraphX |
| QNNExecutionProvider | `qnn` | NPU, GPU | Qualcomm Snapdragon; bundled in ORT |
| OpenVINOExecutionProvider | `openvino` | NPU, GPU, CPU | Intel hardware |
| DmlExecutionProvider | `dml` | GPU | DirectML; any DirectX 12 GPU |
| CPUExecutionProvider | `cpu` | CPU | Always available |
| VitisAIExecutionProvider | `vitisai` | NPU | AMD/Xilinx |

## Notes

- Support depends on the model, task, precision, execution provider (EP), and device. A result in the Model Accuracy Report (https://microsoft.github.io/winml-cli/latest/reports/model_accuracy_report.html) applies to its recorded model revision, precision, provider, and environment, not every combination on the current machine.
- Task recognition alone does not establish that every model has a validated export, inference, and evaluation path; some tasks have dedicated inference classes while others use a generic task fallback.
- The model table above is a condensed subset of the official validated catalog. For the full list use `winml catalog`, or see the official page at the Source URL.
- For truly custom architectures, `--trust-remote-code` allows execution of model code from the Hugging Face Hub; enable it only for repositories you trust.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/reference/supported-models (retrieved 2026-11-14)

## Related

- [Windows ML CLI](./winml-cli.md)
- [Windows ML CLI build configuration](./winml-cli-config-schema.md)
- [Windows ML CLI tutorials](./winml-cli-tutorials.md)
- [Windows ML CLI samples](./winml-cli-samples.md)
