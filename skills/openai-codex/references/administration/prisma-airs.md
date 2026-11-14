# Prisma AIRS

Connect Palo Alto Networks Prisma AIRS so your security profile (data loss prevention, prompt injection, malicious URL detection) is applied to Codex prompts before they reach the model.

## Signature / Usage

Admin Console > **Policy & security** > **External guardrails** > **Prisma AIRS**: enter **API key**, **Security profile** (name or ID), **Endpoint URL**; choose **Enforcement mode** and **On AIRS failure**; **Save connection**; **Test connection**; turn on **Enable Prisma AIRS**.

Default (United States) endpoint:

```text
https://service.api.aisecurity.paloaltonetworks.com
```

## Options / Props

| Region | Endpoint |
| --- | --- |
| United States (default) | `https://service.api.aisecurity.paloaltonetworks.com` |
| Germany | `https://service-de.api.aisecurity.paloaltonetworks.com` |
| India | `https://service-in.api.aisecurity.paloaltonetworks.com` |
| Singapore | `https://service-sg.api.aisecurity.paloaltonetworks.com` |

| Setting | Values |
| --- | --- |
| Enforcement mode | **Block** (default): stop flagged prompt; **Alert only**: record and allow |
| On AIRS failure | **Allow prompts** (default): continue unscanned; **Block prompts**: stop until scanned |

| Manage action | Effect |
| --- | --- |
| **Test connection** | Verifies saved key, profile, endpoint |
| **Rotate API key** | Replaces the key without changing other settings |
| Turn off **Enable Prisma AIRS** | Stops scanning, keeps configuration |
| **Disconnect** | Stops scanning and deletes the connection and API key |

## Notes

- Requires a ChatGPT workspace with Prisma AIRS access enabled (ask your OpenAI account team), workspace administrator permissions, and a Prisma AIRS API key, security profile, and service endpoint.
- Saving doesn't enable scanning; **Enable Prisma AIRS** must also be on. Codex validates the connection and encrypts the API key, never showing it again.
- Scanned: newly submitted prompt text in covered Codex workflows (app, CLI, IDE extension, cloud) when users authenticate to the configured ChatGPT workspace. Not covered: Platform API key sessions; assistant responses, tool calls and results, files, images. Use **Block prompts** if every covered prompt needs a scan decision.
- Data-residency requirements can restrict which endpoint is usable. Palo Alto Networks' data-handling, retention, and residency policies apply to prompts sent to it.
- Recovery view when **External guardrails** is missing from the sidebar: `https://admin.openai.com/workspace/<workspace-id>/external-guardrails` allows viewing, turning off, or disconnecting only (no setup, edits, tests, rotation, or re-enable).
- Source: https://learn.chatgpt.com/docs/enterprise/prisma-airs (retrieved 2026-11-14).

## Related

- [Admin rollout guide](./admin-rollout-guide.md)
- [Managed configuration](./managed-configuration.md)
- [Authentication](./authentication.md)
