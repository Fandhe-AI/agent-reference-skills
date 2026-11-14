# Run Hermes Agent with Local Models

Run the self-improving Hermes Agent on DGX Spark against a locally served vLLM model, reachable via terminal or Telegram, keeping conversations off the cloud.

## Signature / Usage

Adapted (not in the official docs): the official one-liner pipes the installer to a shell; split into download, inspect, run.

```bash
vllm serve nvidia/Qwen3.6-35B-A3B-NVFP4   # separate terminal
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh -o install.sh
less install.sh
bash install.sh
hermes tools
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| nvidia/Qwen3.6-35B-A3B-NVFP4 | model | quantized model served via vLLM (the playbook tested OpenCode with Qwen3.6 35B A3B NVFP4) |
| Hermes Agent v0.18.0 | framework | self-improving agent, local endpoint `localhost:8000/v1` |
| DGX Spark (DGX OS, 64 GB or 128 GB Unified Memory) | hardware | single device; backend set up with the vLLM playbook |

## Notes

- Requires Docker with NVIDIA Container Toolkit and a HuggingFace token
- The Agent-ready Models tab was removed; set up the inference backend from the vLLM playbook (single device) or the vLLM cluster playbook (cluster), and choose a model that supports tool calling
- Install steps were verified against Hermes Agent v0.18.0; the setup wizard is run with Blank Slate and a Custom endpoint pointing at `http://localhost:8000/v1`
- QA on 2026-10-21 (DGX Station GB300, `vllm/vllm-openai:v0.31.0`, DeepSeek V4 Flash 0731) validated CLI chat, a terminal-tool round trip and a multi-turn TUI session with `medium` reasoning
- Optional Telegram gateway restricted to allowed users; moved to an optional section at the end of the instructions (core path is terminal-only)
- `hermes update` / `hermes uninstall` manage lifecycle; `--resume <sessionId>` resumes past sessions
- Adapted from the official docs: the install one-liner (curl | sh) was split into download, inspect, and run steps.
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-hermes-agent/README.md (commit 3088315, 2026-10-23)

## Related

- [vLLM for Inference](./vllm.md)
- [CLI Coding Agent](./cli-coding-agent.md)
