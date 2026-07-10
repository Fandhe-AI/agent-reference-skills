# Vibe Coding in VS Code

Configure DGX Spark as a local or remote coding assistant for VS Code using Ollama (GPT-OSS 120B/20B) and the Continue.dev extension.

## Signature / Usage

```bash
ollama pull gpt-oss:120b
# enable remote access via systemd + firewall, then in VS Code:
# install Continue extension, edit config.yaml to point at DGX Spark IP
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| GPT-OSS 120B | model | primary LLM (20B option for lightweight usage) |
| Continue.dev | extension | VS Code AI coding assistant integration |

## Notes

- Requires 128GB unified memory recommended, Ollama installed, VS Code with Continue extension
- Duration: ~30 minutes; Risk: Low (no permanent changes)

## Related

- [Ollama](./ollama.md)
- [VS Code](./vscode.md)
- [CLI Coding Agent](./cli-coding-agent.md)
