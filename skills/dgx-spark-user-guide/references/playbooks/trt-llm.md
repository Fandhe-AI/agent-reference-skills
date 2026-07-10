# TRT-LLM for Inference

Install and serve LLMs with TensorRT-LLM on DGX Spark, single-node or multi-node, exposing an OpenAI-compatible API with optional Open WebUI integration.

## Signature / Usage

```bash
docker pull nvcr.io/nvidia/tensorrt-llm/release:1.3.0rc13
docker run --gpus all -p 8355:8355 \
  nvcr.io/nvidia/tensorrt-llm/release:1.3.0rc13 \
  trtllm-serve <model> --port 8355
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Nemotron-3 (30B, 120B) / Llama 3.1/3.3 (8B-70B) / Qwen3 (8B-235B) / Phi-4 / GPT-OSS (20B, 120B) | models | 21 supported models, BF16/FP8/NVFP4/MXFP4 quantizations |

## Notes

- Requires CUDA 12.x drivers, Docker with GPU support, HuggingFace token, 40GB+ VRAM recommended for 70B models
- Ports 8355 (LLM) and 8356 (VLM) used for OpenAI-compatible serving
- Multi-node (two Sparks) uses OpenMPI hostfile and dual-container MPI distribution

## Related

- [vLLM for Inference](./vllm.md)
- [Speculative Decoding](./speculative-decoding.md)
- [Nemotron Model Family](./nemotron.md)
