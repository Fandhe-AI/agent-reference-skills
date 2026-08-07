<!-- source: https://code.claude.com/docs/en/data-usage.md / last verified: 2026-08-07 -->

# Data usage

Anthropic's data usage, training, and retention policies for Claude Code.

## Options / Props

| Plan | Training on prompts/code | Retention |
|---|---|---|
| Consumer (Free, Pro, Max) — data use allowed | Yes, when the setting is on | 5 years |
| Consumer — data use not allowed | No | 30 days |
| Commercial (Team, Enterprise, API, 3rd-party, Claude Gov) | No, unless opted into e.g. the Development Partner Program | 30 days standard; ZDR for qualified Enterprise accounts |

| Data flow | Trigger | What's sent |
|---|---|---|
| `/feedback`, `/bug`, `/share` | User-invoked | Conversation transcript incl. code, retained 5 years; optionally opens a public GitHub issue |
| Session quality survey (rating) | Post-session prompt | Only the rating — no transcript |
| Session quality survey (transcript follow-up) | Separate opt-in "Can Anthropic look at your session transcript?" | Full transcript + subagent transcripts + raw session log, redacted for known API-key/token patterns; retained up to 6 months. On Bedrock/Agent Platform/Foundry/gateway sessions, writes to a local archive under `~/.claude/feedback-bundles/` instead of uploading |
| Metrics telemetry | Always on for Anthropic API unless disabled | Latency/reliability/usage patterns only — never code, prompts, or file paths |
| Error reports | Pro/Max sign-in + v2.1.198+ + direct Claude API + no ZDR/HIPAA | Error messages/stack traces, redacted for secrets/paths/emails |
| WebFetch domain safety check | Every WebFetch call | Only the hostname, sent to `api.anthropic.com`, cached 5 min |

## Example

```bash
# Disable all non-essential outbound traffic at once
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1

# Or disable individual data flows
export DISABLE_TELEMETRY=1
export DISABLE_ERROR_REPORTING=1
export DISABLE_FEEDBACK_COMMAND=1
export CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY=1
```

## Notes

- Local caching: session transcripts are stored in plaintext under `~/.claude/projects/` for 30 days by default (`cleanupPeriodDays` to adjust) to enable session resumption.
- Opt-outs: `DISABLE_TELEMETRY=1` (metrics), `DISABLE_ERROR_REPORTING=1`, `DISABLE_FEEDBACK_COMMAND=1`, `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY=1`, or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` to disable everything non-essential at once (does not affect the WebFetch safety check or official marketplace auto-install, which have their own opt-outs: `skipWebFetchPreflight` and `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL`).
- By default, telemetry/error reporting/`/feedback` are all **off** on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and Claude Platform on AWS (each requires its own `CLAUDE_CODE_USE_*=1` to turn metrics on). Session quality surveys and the WebFetch check run regardless of provider. On a signed-in Claude apps gateway session, usage analytics/error reporting/survey ratings to Anthropic are disabled by the gateway credential itself with no re-enable setting.
- Encryption at rest depends on the model provider: Anthropic API uses AES-256 infrastructure-level disk encryption (or ZDR for none); Bedrock uses AES-256 with AWS-managed or KMS customer-managed keys; Agent Platform uses Google-managed or CMEK; Microsoft Foundry depends on the Hosted-on-Azure vs Hosted-on-Anthropic deployment option.
- Cloud execution (Claude Code on the web): repository cloned to an isolated VM; GitHub credentials handled via a secure proxy that never enters the sandbox; all outbound traffic goes through a security/audit proxy.

## Related

- [zero-data-retention](./zero-data-retention.md)
- [legal-and-compliance](./legal-and-compliance.md)
- [security](./security.md)
