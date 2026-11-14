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
| TensorRT Model-Optimizer (0.41.0 on DGX Spark; 0.47.0 on DGX Station) | tool | performs NVFP4 conversion |

## Notes

- Requires Blackwell GPU, Docker with NVIDIA Container Toolkit, HuggingFace token
- Output model can be served via OpenAI-compatible API after quantization
- Duration: 45-90 minutes
- Model Optimizer 0.41.0 has the quantization script under `examples/llm_ptq/`; the `examples/hf_ptq/` path used for DGX Station exists only from 0.47.0
- 0.41.0 keeps the container's PyTorch and Transformers versions; newer releases such as 0.47.0 replace them during `pip install`, after which the container's TensorRT-LLM fails to load after export
- The DGX Spark command adds `--tasks quant --calib_dataset cnn_dailymail` (drops `--export_fmt hf`) to avoid needing the gated `nvidia/Nemotron-Post-Training-Dataset-v2`; remove the flag if your `HF_TOKEN` has access
- On a 64 GB DGX Spark, Model Optimizer may offload part of the model to CPU when little GPU memory is free at launch; quantization and export still complete with 0.41.0
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-nvfp4-quantization/README.md (commit 3088315, 2026-10-23)

## Related

- [vLLM for Inference](./vllm.md)
- [TRT-LLM for Inference](./trt-llm.md)
