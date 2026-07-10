# Multi-modal Inference

Set up multi-modal (text/image/audio) inference with TensorRT on DGX Spark, testing text-to-image and vision-language pipelines across BF16/FP16/FP8/FP4 precisions.

## Signature / Usage

```bash
docker run --gpus all -it -v ~/.cache/huggingface:/root/.cache/huggingface \
  nvcr.io/nvidia/pytorch:25.11-py3
git clone https://github.com/NVIDIA/TensorRT
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| FLUX.1-dev / FLUX.1-dev-onnx / FLUX.1 Schnell | model | text-to-image diffusion models |
| SDXL (xl-1.0) | model | text-to-image diffusion model |

## Notes

- Requires Blackwell GPU, Docker with NVIDIA Container Runtime, HuggingFace token, min 48GB VRAM for FP16 Flux.1 Schnell
- Uses `nvidia-modelopt` for quantization across precision levels

## Related

- [FLUX.1 Dreambooth LoRA Fine-tuning](./flux-finetuning.md)
- [TRT-LLM for Inference](./trt-llm.md)
