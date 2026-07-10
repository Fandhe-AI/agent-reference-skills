# SGLang for Inference

Deploy SGLang, a fast serving framework for LLMs and vision-language models, on DGX Spark for text generation, chat completion, and VLM tasks.

## Signature / Usage

```bash
docker pull lmsysorg/sglang:latest-cu130
docker run --gpus all -p 30000:30000 lmsysorg/sglang:latest-cu130 \
  python3 -m sglang.launch_server --model-path <model>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Nemotron-3-Nano-Omni-30B (BF16) | model | supported model |
| Llama-3.1/3.3 (FP8, NVFP4) | model | supported model family |
| Qwen3 series (FP8, NVFP4) | model | supported model family |
| GPT-OSS variants | model | supported model family |

## Notes

- Requires Blackwell GPU, Docker Engine, NVIDIA Container Toolkit, min 20GB disk
- Includes an offline-inference.py script for non-server usage

## Related

- [vLLM for Inference](./vllm.md)
- [TRT-LLM for Inference](./trt-llm.md)
- [Live VLM WebUI](./live-vlm-webui.md)
