<!-- source: https://code.claude.com/docs/en/routines / last verified: 2026-11-14 -->

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

- Naming: the official page now titles this feature "scheduled tasks" (cloud scheduled task, formerly a routine). The earlier name remains in some app labels (**Routines**, **New routine**), `claude.ai/code/routines`, the `/routines` alias of `/schedule`, the `/fire` endpoint, its beta header, the `<routine-fire-payload>` tag and the org-settings toggle **Scheduled tasks (Was Routines)** / **Routines**. Available on Pro, Max, Ultra, Team and Enterprise.
- Routines run autonomously as full cloud sessions with no permission-mode picker. Each run's new session starts in auto mode unless auto mode is unavailable (then it keeps the mode it launched in); a run still stops and waits for an answer on actions that prompt even in auto mode (e.g. an ask rule) or after repeated blocks hit auto mode's thresholds, and the prompt is answered from the run's session on the detail page. A run that continues a project thread keeps the thread's permission mode.
- The routine's saved prompt is delivered as an authorized assigned task, not untrusted input; `text` sent via API `/fire` or **Run now** arrives wrapped in a `<routine-fire-payload>` block labeled untrusted, and the prompt must explicitly reference it to act on it.
- Belong to the individual claude.ai account (not shared with teammates); actions via GitHub/connectors appear as that user.
- Compare with `/loop` (session-scoped, local) and Desktop scheduled tasks (local, file access) — see scheduled-tasks.md.
- Hourly limits (separate from subscription usage; none has overage):

  | Action | Limit | Counted for | Over the limit |
  | --- | --- | --- | --- |
  | Scheduled runs, including one-off runs | 100 per hour | Your account | The run waits until the limit resets |
  | Run now, API fires, and setting a one-off routine to run again | 30 per hour | Each routine, one count shared by all three | The action fails until the limit resets |
  | Run now and setting a one-off routine to run again | 100 per hour | Your account | Same |
  | API fires | 100 per hour | Your account, counted separately from Run now | Same |
  | GitHub events | Per-routine and per-account hourly caps | | Events beyond the limit are dropped until the window resets |

  When a routine hits the subscription usage limit, organizations with usage credits turned on can keep running on metered overage. While the subscription is paused, routines are held and don't run (turn them back on after it is active again).
- Execution: on Anthropic-managed cloud infrastructure, or on your organization's self-hosted environment when routed there.
- GitHub triggers can be attached from the CLI (v2.1.225+, after installing the Claude GitHub App from the GitHub App page), e.g. `/schedule add a GitHub trigger to my nightly review for pull requests opened in acme/webapp`. A PR-event trigger starts from the pull request's head commit when the PR's repository is the routine's first repository. API triggers are added on the web only.
- `/schedule` can answer run-history questions (e.g. `/schedule why did my nightly review do nothing this morning?`; v2.1.227+).
- If the GitHub connection is missing or expired, the routine skips runs for up to 72 hours and resumes once reconnected; after 72 hours it turns off and must be turned back on.
- Artifacts: a schedule or Run now run can publish a new artifact without asking (visible only to you until shared); it asks first if the publish declares runtime capabilities (connector calls, file downloads). Republishing an existing artifact without asking requires the conditions listed on the source page.
- The `anthropic-beta: experimental-cc-routine-2026-04-01` header is no longer required by the `/fire` endpoint (see routines-fire.md).
- Team/Enterprise Owners can disable routines org-wide from admin settings (**Organization settings > Capabilities > Remote sessions**); Enterprise orgs with custom roles also need a role with the scheduled tasks permission under **Remote sessions**.
- GitHub trigger supported events: Pull request, Release and Issue (pick an action such as `pull_request.opened` or all actions). The `matches regex` filter operator tests the whole field value (use `.*hotfix.*` for a substring; `contains` for plain substring). Claude doesn't reuse sessions across events. `/web-setup` grants clone access but doesn't install the Claude GitHub App or enable webhook delivery.
- Schedule trigger: a run scheduled exactly on the hour can start several minutes late (pick e.g. 9:07); presets use your local time zone; a raw five-field cron expression is in UTC unless it starts with `CRON_TZ=`; custom cron intervals more often than hourly are rejected; a one-off run turns itself off and shows **Completed** (re-arm with **One-time** / **Once** in the edit dialog).
- History outcomes are **Succeeded**, **Failed**, **Cancelled** (archiving the session of a succeeded run changes it to Cancelled); they describe how the session ended, not whether the prompt's work was completed. "The last run ..." warnings under History (environment not found, org session limit, blocked, repository or branch unavailable, usage limit) clear when a later run starts.
- All of your connected claude.ai connectors are included by default; local `claude mcp add` servers are not connectors (add them at claude.ai/customize/connectors or, for single-repository tasks outside projects, declare them in a committed `.mcp.json`). The Default environment uses Limited network access with Allow package managers.
- `/schedule` is hidden (`Unknown command`) with a Console API key, profile or federation credential, a cloud provider login, inside a cloud session, with cloud sessions disabled by policy, or when an Owner turned scheduled tasks off; with a claude.ai subscription login it requires none of these. Manage tasks at claude.ai/code/routines instead.
- 2.1.325: Claude Code on the web, cloud scheduled tasks and Cowork cloud sessions start despite `sandbox.failIfUnavailable` (the hosted container has no command sandbox).
- 2.1.323: in cloud scheduled tasks a `PostToolUse` hook from your own settings can no longer replace the plan in `ExitPlanMode`'s result.
- 2.1.317: `/schedule` warns when a new cloud scheduled task gets connectors you did not ask for, with how to remove them.
- Source: https://code.claude.com/docs/en/routines.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.317, 2.1.323, 2.1.325, retrieved 2026-11-14)

## Related

- [routines-fire.md](./routines-fire.md)
- [scheduled-tasks.md](./scheduled-tasks.md)
