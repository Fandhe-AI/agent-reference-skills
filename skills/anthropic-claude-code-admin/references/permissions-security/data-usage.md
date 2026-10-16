<!-- source: https://code.claude.com/docs/en/data-usage.md / last verified: 2026-10-16 -->

# Data usage

Anthropic's data usage, training, and retention policies for Claude Code.

## Signature / Usage

```bash
# Disable all non-essential outbound traffic at once
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1

# Or disable individual data flows
export DISABLE_TELEMETRY=1
export DISABLE_ERROR_REPORTING=1
export DISABLE_FEEDBACK_COMMAND=1
export CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY=1
```

## Options / Props

| Plan | Training on prompts/code | Retention |
|---|---|---|
| Consumer (Free, Pro, Max) — data use allowed | Yes, when the setting is on | 5 years |
| Consumer — data use not allowed | No | 30 days |
| Commercial (Team, Enterprise, API, 3rd-party, Claude Gov) | No, unless opted into e.g. the Development Partner Program | 30 days standard; ZDR for qualified Enterprise accounts |

| Data flow | Trigger | What's sent |
|---|---|---|
| `/feedback`, `/bug`, `/share` | User-invoked | Conversation transcript incl. code, retained 5 years; optionally opens a public GitHub issue. You choose how much history to include: the current session only (default), or also other sessions from the same project over the last 24 hours or 7 days |
| Session quality survey (rating) | Post-session prompt | Only the rating — no transcript |
| Session quality survey (transcript follow-up) | Separate opt-in "Can Anthropic look at your session transcript?" | Full transcript + subagent transcripts + raw session log, redacted for known API-key/token patterns; retained up to 6 months. On Bedrock/Agent Platform/Foundry/gateway sessions, writes to a local archive under `~/.claude/feedback-bundles/` instead of uploading |
| Metrics telemetry | Always on for Anthropic API unless disabled | Latency/reliability/usage patterns only — never code, prompts, or file paths |
| Error reports | Pro/Max sign-in + v2.1.198+ + direct Claude API + no ZDR **or HIPAA** agreement | Error messages/stack traces, redacted for secrets/paths/emails |
| WebFetch domain safety check | Every WebFetch call | Only the hostname, sent to `api.anthropic.com`, cached 5 min |

## Notes

- Local caching: session transcripts are stored in plaintext under `~/.claude/projects/` for 30 days by default (`cleanupPeriodDays` to adjust) to enable session resumption.
- Opt-outs: `DISABLE_TELEMETRY=1` (metrics), `DISABLE_ERROR_REPORTING=1`, `DISABLE_FEEDBACK_COMMAND=1`, `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY=1`, or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` to disable everything non-essential at once (does not affect the WebFetch safety check or official marketplace auto-install, which have their own opt-outs: `skipWebFetchPreflight` and `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL`).
- By default, telemetry/error reporting/`/feedback` are all **off** on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and Claude Platform on AWS (each requires its own `CLAUDE_CODE_USE_*=1` to turn metrics on). Session quality surveys and the WebFetch check run regardless of provider. Provider-defaults table: Claude Platform on AWS is switched on with `CLAUDE_CODE_USE_ANTHROPIC_AWS=1` (the others: `CLAUDE_CODE_USE_VERTEX`, `CLAUDE_CODE_USE_BEDROCK`, `CLAUDE_CODE_USE_FOUNDRY`). When a host platform sets `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST`, metrics default to on for these providers (and follow `DISABLE_TELEMETRY`), while error reports and `/feedback` reports stay off. The survey is also disabled by `DO_NOT_TRACK` or when org policy disables product feedback; the transcript follow-up never appears under ZDR, org-disabled product feedback, or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`. On a signed-in Claude apps gateway session, usage analytics/error reporting/survey ratings to Anthropic are disabled by the gateway credential itself with no re-enable setting.
- Encryption at rest depends on the model provider: Anthropic API uses AES-256 infrastructure-level disk encryption (or ZDR for none); Bedrock uses AES-256 with AWS-managed or KMS customer-managed keys; Agent Platform uses Google-managed or CMEK; Microsoft Foundry depends on the Hosted-on-Azure vs Hosted-on-Anthropic deployment option.
- Cloud sessions: repository cloned to an isolated VM; Anthropic stores the session transcript; GitHub credentials are stored encrypted on Anthropic's servers, never enter the VM, and GitHub traffic goes through an Anthropic proxy that attaches them server-side; all outbound traffic goes through a security proxy for audit logging and abuse prevention. Sessions routed to a self-hosted environment run on infrastructure you control. Individual cloud sessions can be deleted at any time, which permanently removes the session's event data.

## Related

- [zero-data-retention](./zero-data-retention.md)
- [legal-and-compliance](./legal-and-compliance.md)
- [hipaa-setup](./hipaa-setup.md)
- [security](./security.md)
