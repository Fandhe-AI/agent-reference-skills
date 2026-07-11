# Run Hermes Agent with Local Models

Run the self-improving Hermes Agent on DGX Spark against a locally served vLLM model, reachable via terminal or Telegram, keeping conversations off the cloud.

## Signature / Usage

```bash
vllm serve nvidia/Qwen3.6-35B-A3B-NVFP4   # separate terminal
curl -fsSL https://get.hermes.dev | sh    # install wizard
hermes tools
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| nvidia/Qwen3.6-35B-A3B-NVFP4 | model | agent-ready quantized model served via vLLM |
| Hermes Agent v0.18.0 | framework | self-improving agent, local endpoint `localhost:8000/v1` |

## Notes

- Requires Docker with NVIDIA Container Toolkit and a HuggingFace token
- Optional Telegram gateway restricted to allowed users
- `hermes update` / `hermes uninstall` manage lifecycle; `--resume <sessionId>` resumes past sessions

## Related

- [vLLM for Inference](./vllm.md)
- [CLI Coding Agent](./cli-coding-agent.md)
