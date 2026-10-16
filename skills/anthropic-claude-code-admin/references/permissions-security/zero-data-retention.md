<!-- source: https://code.claude.com/docs/en/zero-data-retention.md / last verified: 2026-10-16 -->

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
| User and seat management | Not covered — administrative data such as account emails and seat assignments is retained under standard policies |
| Third-party integrations / MCP servers | Not covered — review each service's own policy |

Features disabled under ZDR: cloud sessions (including those started from the Desktop app), Claude Tag, Artifacts, `/feedback`/`/bug`/`/share`, Remote Control — all blocked server-side because they require storing prompts/completions.

Admin capabilities available with ZDR on Claude for Enterprise: per-user cost controls, analytics dashboard, server-managed settings, audit logs. Organizations currently using ZDR via pay-as-you-go API keys can migrate to Claude for Enterprise (via their account team) to gain these while keeping ZDR.

## Notes

- ZDR is enabled per-organization; it does not automatically extend to new organizations under the same account.
- Route traffic to the ZDR org with `forceLoginMethod`/`forceLoginOrgUUID` managed settings — sessions signed in with a personal account or a different org's API key aren't covered.
- Claude Fable 5.1 and Fable 5 are Covered Models that require data retention by default; whether a ZDR organization or workspace can use them is governed by the Covered Models policies, not by Claude Code. Where unavailable they are absent from or disabled in the `/model` picker and the server rejects requests. Other models remain available; the `best` alias falls back to Opus for organizations where Fable isn't available.
- Even under ZDR, Anthropic may retain inputs/outputs up to 2 years for sessions flagged for a Usage Policy violation.
- BAA coverage is no longer ZDR-only: Claude for Enterprise organizations with HIPAA enabled can bring the Claude Code CLI and the Desktop Code tab under their BAA without ZDR once the HIPAA configuration is applied to Claude Code (local mode) and Cowork (local mode). Organizations without the HIPAA configuration still need ZDR for BAA coverage of Claude Code.

## Related

- [data-usage](./data-usage.md)
- [legal-and-compliance](./legal-and-compliance.md)
- [hipaa-setup](./hipaa-setup.md)
