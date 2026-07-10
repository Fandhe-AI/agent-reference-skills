# CLI Coding Agent

Build local CLI coding agents (Claude Code, OpenCode, Codex CLI) backed by a local Qwen3.6 model served through Ollama on DGX Spark, without cloud APIs.

## Signature / Usage

```bash
ollama pull qwen3.6:35b-a3b-nvfp4
ollama launch claude-code   # or opencode / codex
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| qwen3.6:latest | model | 35B-a3b MoE, ~24GB |
| qwen3.6:35b-a3b-nvfp4 | model | NVIDIA FP4 tuned for Blackwell, ~22GB |
| qwen3.6:35b-a3b-q8_0 | model | 8-bit quantized, ~39GB |
| qwen3.6:35b-a3b-bf16 | model | full precision, ~71GB |

## Notes

- Requires NVIDIA DGX OS 7.3.1 (Ubuntu 24.04.3 LTS base) and Ollama v0.15+
- All variants have a 256K context window
- Duration: 15-25 minutes, mostly model download time; Risk: Low

## Related

- [Ollama](./ollama.md)
- [Hermes Agent](./hermes-agent.md)
