# vLLM for Inference

Deploy vLLM, a high-throughput LLM inference engine (PagedAttention, continuous batching, OpenAI-compatible API), on single-node and multi-node DGX Spark configurations.

## Signature / Usage

```bash
export HF_TOKEN="your_huggingface_token"
docker pull nvcr.io/nvidia/vllm:26.05.post1-py3
docker run -it --gpus all -p 8000:8000 \
  nvcr.io/nvidia/vllm:26.05.post1-py3 vllm serve openai/gpt-oss-20b
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Gemma / Llama / Qwen / Nemotron / Phi series | models | 27+ supported models across BF16/NVFP4 quantizations |
| nvcr.io/nvidia/vllm | container | official NGC vLLM container |

## Notes

- Requires DGX Spark ARM64 + Blackwell GPU, CUDA 13.0, Docker with NVIDIA Container Toolkit, Python 3.12
- Multi-node deployment uses Ray over QSFP (two nodes) or switch (4+ nodes) with `--tensor-parallel-size`
- Unified Memory Architecture note: `sudo sh -c 'sync; echo 3 > /proc/sys/vm/drop_caches'` can free memory
- Duration: ~30 minutes (Docker single-node); Risk: Low

## Related

- [Connect Two Sparks](./connect-two-sparks.md)
- [Multi Sparks Through Switch](./multi-sparks-through-switch.md)
- [SGLang for Inference](./sglang.md)
- [TRT-LLM for Inference](./trt-llm.md)
- [Speculative Decoding](./speculative-decoding.md)
