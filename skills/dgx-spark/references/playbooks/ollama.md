# Ollama

Configure secure remote access to Ollama on DGX Spark via an SSH tunnel through NVIDIA Sync, exposing the local LLM API without opening network ports.

## Signature / Usage

Adapted (not in the official docs): the official one-liner pipes the installer to a shell; split into download, inspect, run.

```bash
curl -fsSL https://ollama.com/install.sh -o install.sh
less install.sh
sh install.sh
ollama pull qwen2.5:32b
curl http://localhost:11434/api/tags
```

## Notes

- Requires DGX Spark connected to network, NVIDIA Sync configured, SSH/cURL familiarity
- Qwen2.5 32B recommended as optimized for Blackwell GPUs
- Duration: 10-15 minutes setup, 2-3 minutes per model download; Risk: Low
- Adapted from the official docs: the install one-liner (curl | sh) was split into download, inspect, and run steps.
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/ollama/README.md (commit 3088315, 2026-10-23; legacy un-prefixed path, no `playbook-ollama` directory exists)

## Related

- [Open WebUI with Ollama](./open-webui.md)
- [CLI Coding Agent](./cli-coding-agent.md)
