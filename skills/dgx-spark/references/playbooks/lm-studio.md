# LM Studio on DGX Spark

Deploy `llmster` (LM Studio's headless server) on DGX Spark for GPU-accelerated local LLM inference, with optional encrypted remote access via LM Link.

## Signature / Usage

Adapted (not in the official docs): the official one-liner pipes the installer to a shell; split into download, inspect, run.

```bash
curl -fsSL https://lmstudio.ai/install.sh -o install.sh
less install.sh
bash install.sh
lms server start --bind 0.0.0.0 --port 1234
lms get nvidia/nemotron-3.5-super-vl
lms load nvidia/nemotron-3.5-super-vl
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| nvidia/nemotron-3.5-super-vl | model | recommended example model of the playbook (Nemotron 3.5 Super VL) |
| openai/gpt-oss-120b | model | example model |
| DGX Spark (DGX OS, 128 GB Unified Memory) | hardware | llmster (`lms`), API on port `1234` |

## Notes

- Requires at least 65 GB memory for model inference (70 GB or above recommended for the example model) and at least 65 GB storage (70 GB or above recommended) for model downloads
- LM Link (Preview, free for up to 2 users with 5 devices each) enables encrypted remote access without requiring the same network; with it, point the laptop at `localhost:1234`
- Playbook last updated 10/21/2026: Nemotron 3.5 Super VL named as the recommended model, Qwen3.6-35B-A3B removed from the example models, and the Agent-ready Models section no longer present
- Adapted from the official docs: the install one-liner (curl | sh) was split into download, inspect, and run steps.
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-lm-studio/README.md (commit 3088315, 2026-10-23)

## Related

- [Ollama](./ollama.md)
- [vLLM for Inference](./vllm.md)
