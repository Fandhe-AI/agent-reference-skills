# cuTile Kernels

Run cuTile kernel benchmarks, a Flash Multi-Head Attention (FMHA) build tutorial, and LLM inference on DGX Spark (sm_121) and B300 (sm_103) using NVIDIA's cuTile Python DSL.

## Signature / Usage

```bash
docker pull nvcr.io/nvidia/cuda:13.2.0-devel-ubuntu22.04
git clone --branch v1.3.0 https://github.com/NVIDIA/TileGym
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Qwen2-7B | model | batch size 16, 50 output tokens |
| DeepSeek-V2-Lite-Chat | model | batch size 1, 100 output tokens |
| FMHA / MLA / MatMul / RMSNorm / RoPE / SwiGLU / Softmax | kernels | supported cuTile benchmark kernels |

## Notes

- Requires Docker with GPU support, CUDA Toolkit 13.x, HuggingFace token, min 16GB GPU memory
- Same cuTile code compiles for both DGX Spark and B300 architectures

## Related

- [vLLM for Inference](./vllm.md)
- [Speculative Decoding](./speculative-decoding.md)
