> OpenAI Codex (learn.chatgpt.com) のドキュメント.

# Agent internet access

Control internet access for Codex cloud chats. By default, Codex blocks internet access during the agent phase; setup scripts still run with internet access so dependencies can install. Agent internet access can be enabled per environment when needed.

## Signature / Usage

Configure per environment in Codex cloud environment settings: toggle internet access **Off**/**On**, and when **On**, restrict it with a domain allowlist and allowed HTTP methods.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Internet access | `Off` \| `On` | Off completely blocks internet access; On allows it, optionally restricted |
| Domain allowlist | `None` \| `Common dependencies` \| `All` | None starts empty (build your own); Common dependencies presets major package registries (npm, PyPI, Maven, Docker Hub, GitHub, etc.); All is unrestricted |
| HTTP methods | `GET, HEAD, OPTIONS` (recommended) | Limiting to these blocks potentially dangerous methods like `POST`, `PUT`, `PATCH`, `DELETE` |

## Notes

- Risks of enabling agent internet access: prompt injection from untrusted web content, exfiltration of code/secrets, downloading malware or vulnerable dependencies, and pulling in license-restricted content.
- Prompt injection example: asking Codex to fix a GitHub issue whose description contains hidden instructions (e.g. piping `git show HEAD` to an attacker-controlled endpoint) can leak commit data if the agent follows them.
- Mitigation: allow only the domains and HTTP methods actually needed, and review the agent output and work log.

## Related

- [cloud.md](./cloud.md)
