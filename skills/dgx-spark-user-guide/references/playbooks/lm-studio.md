# LM Studio on DGX Spark

Deploy `llmster` (LM Studio's headless server) on DGX Spark for GPU-accelerated local LLM inference, with optional encrypted remote access via LM Link.

## Signature / Usage

```bash
curl -fsSL https://lmstudio.ai/install.sh | sh
lms server start --host 0.0.0.0
lms get nvidia/nemotron-3-nano-omni
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| nvidia/nemotron-3-nano-omni | model | supported model |
| qwen/qwen3.6-35b-a3b | model | supported model |
| openai/gpt-oss-120b | model | supported model, min 65GB GPU memory (70GB recommended) |

## Notes

- Requires ARM64 Blackwell GPU, at least 65GB storage, local network access configured
- LM Link enables encrypted remote access without requiring the same network

## Related

- [Ollama](./ollama.md)
- [vLLM for Inference](./vllm.md)
