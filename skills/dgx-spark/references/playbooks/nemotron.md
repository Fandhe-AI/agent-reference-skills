# Nemotron Model Family on DGX Spark

Deploy the Nemotron 3 model family (Nano Omni or Super) on a single DGX Spark as an OpenAI-compatible inference endpoint, via vLLM or TensorRT-LLM.

## Signature / Usage

```bash
docker pull vllm/vllm-openai:v0.20.0
docker run --gpus all -p 8000:8000 vllm/vllm-openai:v0.20.0 \
  --model nvidia/nemotron-3-nano-omni
curl http://localhost:8000/v1/models
```

## Options / Props

| Model | Serving Engine | Container | Port |
| --- | --- | --- | --- |
| Nemotron-3-Nano Omni | vLLM | vllm/vllm-openai:v0.20.0 | 8000 |
| Nemotron-3-Super (NVFP4) | vLLM | vllm/vllm-openai:cu130-nightly | 8000 |
| Nemotron-3-Super (NVFP4) | TensorRT-LLM | nvcr.io/nvidia/tensorrt-llm/release:1.3.0rc9 | 8123 |

## Notes

- Nemotron-3-Super uses LatentMoE, MTP, and Mamba-2 hybrid architecture; requires reasoning parser mount
- Requires HF_TOKEN for gated models; adjust `--gpu-memory-utilization`/context length if OOM
- Requires NVIDIA Container Toolkit and Docker with GPU access

## Related

- [vLLM for Inference](./vllm.md)
- [TRT-LLM for Inference](./trt-llm.md)
- [NIM on Spark](./nim-llm.md)
