<!-- source: https://code.claude.com/docs/en/routines / last verified: 2026-08-07 -->

# Routines

A saved Claude Code configuration (prompt, one or more repositories, connectors) that runs automatically on Anthropic-managed cloud infrastructure, triggered on a schedule, via API call, or on GitHub events. Research preview.

## Signature / Usage

```bash
# Create/manage from the CLI
/schedule daily PR review at 9am
/schedule list
/schedule update
/schedule run
```

```bash
# Trigger via API (see routines-fire.md for full reference)
curl -X POST https://api.anthropic.com/v1/claude_code/routines/$ROUTINE_ID/fire \
  -H "Authorization: Bearer $ROUTINE_TOKEN" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: experimental-cc-routine-2026-04-01" \
  -H "Content-Type: application/json" \
  -d '{"text": "Sentry alert SEN-4521 fired in prod. Stack trace attached."}'
```

## Options / Props

| Trigger type | Configured from | Behavior |
|---|---|---|
| Scheduled | Web, Desktop, `/schedule` | Recurring cadence (hourly/daily/weekly, min interval 1h) or one-off at a specific timestamp |
| API | Web only | Dedicated `/fire` HTTP endpoint with per-routine bearer token |
| GitHub | Web only | Fires on repo events (pull_request, release) after installing the Claude GitHub App, with optional filters |

| Setting | Description |
|---|---|
| Repositories | Cloned fresh from default branch each run; Claude pushes to `claude/`-prefixed branches |
| Environment | [Cloud environment](https://code.claude.com/docs/en/cloud-environments): network access level, env vars, setup script |
| Connectors | claude.ai MCP connectors; all included by default, remove unneeded ones — Claude can use every tool without asking |

| GitHub PR filter field | Matches |
|---|---|
| Author, Title, Body, Base branch, Head branch, Labels, Is draft, Is merged | equals / contains / starts with / is one of / is not one of / matches regex |

## Notes

- Routines run autonomously as full cloud sessions: no permission-mode picker, no approval prompts during a run.
- The routine's saved prompt is delivered as an authorized assigned task, not untrusted input; `text` sent via API `/fire` or **Run now** arrives wrapped in a `<routine-fire-payload>` block labeled untrusted, and the prompt must explicitly reference it to act on it.
- Belong to the individual claude.ai account (not shared with teammates); actions via GitHub/connectors appear as that user.
- Compare with `/loop` (session-scoped, local) and Desktop scheduled tasks (local, file access) — see scheduled-tasks.md.
- Daily cap on routine runs per account (separate from subscription usage limits); one-off runs are exempt from the daily cap.
- Team/Enterprise Owners can disable routines org-wide from admin settings.

## Related

- [routines-fire.md](./routines-fire.md)
- [scheduled-tasks.md](./scheduled-tasks.md)
