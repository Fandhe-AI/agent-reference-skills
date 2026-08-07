<!-- source: https://code.claude.com/docs/en/zero-data-retention.md / last verified: 2026-08-07 -->

# Zero data retention (ZDR)

ZDR for Claude Code is available to qualified accounts on Claude for Enterprise; when enabled, prompts and model responses generated during Claude Code sessions are processed in real time and not stored by Anthropic after the response is returned, except where required by law or to combat misuse.

## Signature / Usage

ZDR is not a settings-file toggle — it requires separate enablement by an Anthropic account team per organization, and is not included in the standard Enterprise plan.

## Options / Props

| Scope | ZDR applies |
|---|---|
| Claude Code inference on Claude for Enterprise, Anthropic's direct platform | Yes |
| Claude deployments on Amazon Bedrock / Google Cloud's Agent Platform / Microsoft Foundry | No — follow those platforms' own retention policies |
| Chat on claude.ai, Cowork sessions | No — standard retention |
| Claude Code Analytics | No prompts/completions stored, but usage metadata (emails, usage stats) is retained; contribution metrics unavailable under ZDR |
| Third-party integrations / MCP servers | Not covered — review each service's own policy |

Features disabled under ZDR: Claude Code on the Web, Desktop cloud sessions, Artifacts, `/feedback`/`/bug`/`/share`, Remote Control — all blocked server-side because they require storing prompts/completions.

## Notes

- ZDR is enabled per-organization; it does not automatically extend to new organizations under the same account.
- Route traffic to the ZDR org with `forceLoginMethod`/`forceLoginOrgUUID` managed settings — sessions signed in with a personal account or a different org's API key aren't covered.
- Claude Fable 5 is unavailable under ZDR (the model class requires data retention); the `best` alias falls back to Opus for ZDR organizations.
- Even under ZDR, Anthropic may retain inputs/outputs up to 2 years for sessions flagged for a Usage Policy violation.
- A Business Associate Agreement (BAA) automatically extends to Claude Code only when the org also has ZDR activated.

## Related

- [data-usage](./data-usage.md)
- [legal-and-compliance](./legal-and-compliance.md)
