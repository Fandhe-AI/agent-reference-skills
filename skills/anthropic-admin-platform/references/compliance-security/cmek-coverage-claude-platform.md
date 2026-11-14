<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-coverage-claude-platform / last verified: 2026-11-14 -->

# What CMEK covers on Claude Platform

Lookup of which Claude Platform data a customer-managed encryption key encrypts, which features turn off or change, and what stays under Anthropic's key. Beta and research preview features not listed might not be covered. The lists are not exhaustive; review with your team before setup.

## Signature / Usage

Snippet taken from https://platform.claude.com/docs/en/manage-claude/cmek-troubleshooting (message returned, as a 400, while the key is disabled or revoked):

```text
Customer-managed encryption key is disabled or revoked. Re-enable the key to restore access.
```

## Options / Props

Encrypted with your key:

| Data |
| --- |
| Message content |
| Files and attachments (inline or via the Files API) |
| MCP and tool configuration |
| Claude Managed Agents (beta) data: agent configurations, environments, webhooks, sessions and their events, memory stores (beta) with memories and memory versions, dreams (research preview) |
| Batch API and Skills API data stored at rest |
| Tool data stored at rest by web search, web fetch, code execution, bash, text editor, MCP connector (beta), structured outputs, advisor tool (beta), computer use, browser use, context management (beta) |
| Backups and snapshots (inherit the key) |

Turned off or changed:

| Feature | What changes |
| --- | --- |
| Playground in the Claude Console | Turned off |
| Structured outputs, including `strict: true` on tools, with Claude Fable or Claude Mythos models | Turned off in CMEK organizations; with other models, data stored at rest is encrypted with your key |
| Organization webhooks (beta) | Turned off for an organization whose default workspace uses a key; requests return a 400 error |
| Zero data retention (ZDR) | A workspace with your key retains data |

Encrypted with Anthropic's key (features stay available; you can turn off some in Settings):

| Data | Details |
| --- | --- |
| Existing data before key setup | Written before the key takes effect |
| Data not at rest, and data with a TTL under 24 hours | For example cache |
| Activity Feed, audit logs, telemetry network traffic such as OpenTelemetry (beta) | Kept under Anthropic's key so compliance holds even if your key can't be used |
| Claude Managed Agents (beta) vault credential values (OAuth tokens, client secrets) | Write-only, never returned in API responses |
| User profiles | Profile fields such as `name` and `metadata`; don't store sensitive personal data in `metadata` |
| Claude Console feedback | Ratings and comments sent via Feedback; no setting turns it off |
| OpenTelemetry destination (beta) request headers, such as the observability API key header | Write-only, never returned |
| Account data for users | Names, email addresses, profile pictures |
| Preserved records | Anthropic can preserve specific records in three narrow cases |
| Claude Code telemetry | Through an LLM gateway or proxy (custom `ANTHROPIC_BASE_URL`) CMEK does not apply to operational telemetry; set the `DISABLE_TELEMETRY` environment variable to `1` to turn it off |

## Notes

- For Claude Enterprise see the Claude Enterprise coverage page. This page covers Claude Platform only.
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-coverage-claude-platform (retrieved 2026-11-14)

## Related

- [cmek.md](./cmek.md)
- [cmek-coverage-claude-enterprise.md](./cmek-coverage-claude-enterprise.md)
- [cmek-data-retention.md](./cmek-data-retention.md)
- [cmek-how-it-works.md](./cmek-how-it-works.md)
- [cmek-troubleshooting.md](./cmek-troubleshooting.md)
