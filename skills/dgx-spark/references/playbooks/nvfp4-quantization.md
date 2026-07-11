# NVFP4 Quantization

Quantize a model (DeepSeek-R1-Distill-Llama-8B) to NVFP4, a 4-bit floating-point format for Blackwell GPUs, using TensorRT Model Optimizer for ~3.5x memory reduction versus FP16.

## Signature / Usage

```bash
docker run --gpus all -it -v $(pwd)/output:/output \
  nvcr.io/nvidia/tensorrt-llm/release:spark-single-gpu-dev
# run Model-Optimizer quantization script against DeepSeek-R1-Distill-Llama-8B
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| DeepSeek-R1-Distill-Llama-8B | model | quantization target from HuggingFace |
| TensorRT Model-Optimizer (0.35.0) | tool | performs NVFP4 conversion |

## Notes

- Requires Blackwell GPU, Docker with NVIDIA Container Toolkit, HuggingFace token
- Output model can be served via OpenAI-compatible API after quantization
- Duration: 45-90 minutes

## Related

- [vLLM for Inference](./vllm.md)
- [TRT-LLM for Inference](./trt-llm.md)
