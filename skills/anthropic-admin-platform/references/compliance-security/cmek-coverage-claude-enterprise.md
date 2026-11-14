<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-coverage-claude-enterprise / last verified: 2026-11-14 -->

# What CMEK covers on Claude Enterprise

Lookup of which Claude Enterprise data a customer-managed encryption key encrypts, what turns off or changes for users, and what stays under Anthropic's key. Beta and research preview features might not be covered and can break in CMEK organizations; the list is not exhaustive.

## Signature / Usage

Snippet taken from https://platform.claude.com/docs/en/manage-claude/cmek-troubleshooting (message shown on claude.ai when adding a key fails):

```text
The encryption key couldn’t be added.
```

## Options / Props

Encrypted with your key:

| Data |
| --- |
| Chat content, including skills and plugins |
| Chat attachments and project attachments |
| Artifacts, including Claude Design, Claude Slides, Claude Docs in conversations and the Artifacts tab |
| Claude Code on the CLI, including message content |
| Cowork in Claude Desktop |
| Chats in the unified Claude experience, web only (Computer access is off) |
| Office agents, including Claude for Outlook (beta) |
| Claude in Chrome |
| Claude Science (beta) |
| Plugins API (beta) plugin versions: description, release notes, components, files |
| Compliance API local session transcripts from sessions on users' machines; if the key can't be used the messages endpoint returns 503 Service Unavailable instead of transcript content, session metadata is still listed |
| Backups and snapshots (inherit the key) |

Turned off or changed:

| Feature | What people see |
| --- | --- |
| Claude Code on the web | Off; new sessions can't start even if an admin turns the product on |
| Claude Code Desktop | Off until an admin turns it on under claude.ai > Organization settings > Claude Code; then available for local sessions |
| Code Review | Off; doesn't run on pull requests |
| Artifacts | Changed; for organizations that use Claude Code ZDR, Artifacts cannot be turned on |
| Artifact publishing and sharing | Changed; shareable within the organization, not publicly |
| Analytics: skills and connectors | Changed; admin analytics (dashboard and Claude Enterprise Analytics API) don't include usage in chat and hide names of custom skills, plugins and connectors |
| Response ratings (thumbs up/down) | Off |
| Skill and plugin security scanning | Off; can't be turned on, skills and plugins install without a scan |
| Claude in Slack (beta) | Off; Claude declines requests even if an admin turns it on |
| Analytics: smart reports and contribution metrics | Off regardless of admin settings (Claude smart reports; Claude Code contribution metrics from GitHub, beta) |
| Claude Security (beta) | Off regardless of admin settings |
| Cloud scheduled tasks (research preview) | Off; an admin can turn them on for the unified Claude experience |
| Standalone Claude Design app (being deprecated) | Not supported |

Encrypted with Anthropic's key (features stay available; you can turn off some in Settings): existing data before key setup; standalone Claude Design app at claude.ai/design (closing; Claude Design in conversations and the Artifacts tab is under your key); personal preferences ("Instructions for Claude") and Cowork Global instructions (account level, shared across a user's organizations); account data (names, email addresses, profile pictures); preserved records (three narrow cases); Claude Code telemetry when connecting through an LLM gateway or proxy (custom `ANTHROPIC_BASE_URL`; set `DISABLE_TELEMETRY` to `1` to turn it off).

## Notes

- For Claude Platform see the Claude Platform coverage page.
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-coverage-claude-enterprise (retrieved 2026-11-14)

## Related

- [cmek.md](./cmek.md)
- [cmek-coverage-claude-platform.md](./cmek-coverage-claude-platform.md)
- [cmek-data-retention.md](./cmek-data-retention.md)
- [cmek-how-it-works.md](./cmek-how-it-works.md)
- [cmek-troubleshooting.md](./cmek-troubleshooting.md)
