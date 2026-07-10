# Speculative Decoding

Accelerate LLM inference on DGX Spark with TensorRT-LLM speculative decoding, using EAGLE-3 (built-in drafting head) or Draft-Target (separate draft model) methods.

## Signature / Usage

```bash
docker run --gpus all -e HF_TOKEN=$HF_TOKEN \
  nvcr.io/nvidia/tensorrt-llm/release:1.3.0rc12 \
  trtllm-serve --eagle3 gpt-oss-120b
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| GPT-OSS-120B (EAGLE-3) | model | integrated drafting head |
| Qwen3-235B-A22B (EAGLE-3) | model | dual-Spark deployment |
| Llama-3.3-70B + Llama-3.1-8B draft (Draft-Target) | model | separate target/draft models |

## Notes

- Dual-Spark setup requires completing the Connect Two Sparks playbook first and uses `mpirun` with TP=2
- Requires HuggingFace token and Docker with GPU support

## Related

- [vLLM for Inference](./vllm.md)
- [TRT-LLM for Inference](./trt-llm.md)
- [Connect Two Sparks](./connect-two-sparks.md)
