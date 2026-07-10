# Ollama

Configure secure remote access to Ollama on DGX Spark via an SSH tunnel through NVIDIA Sync, exposing the local LLM API without opening network ports.

## Signature / Usage

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen2.5:32b
curl http://localhost:11434/api/tags
```

## Notes

- Requires DGX Spark connected to network, NVIDIA Sync configured, SSH/cURL familiarity
- Qwen2.5 32B recommended as optimized for Blackwell GPUs
- Duration: 10-15 minutes setup, 2-3 minutes per model download; Risk: Low

## Related

- [Open WebUI with Ollama](./open-webui.md)
- [CLI Coding Agent](./cli-coding-agent.md)
