# Automation Blueprints

Copy-paste blueprints for scheduled tasks, GitHub event triggers, API webhooks, and multi-skill workflows, using the cron scheduler and the webhook platform.

## Signature / Usage

Schedule trigger (nightly triage):

```bash
hermes cron create "0 2 * * *" \
  "You are a project manager triaging the NousResearch/hermes-agent GitHub repo.
1. Run: gh issue list --repo NousResearch/hermes-agent --state open --json number,title,labels,author,createdAt --limit 30
2. Identify issues opened in the last 24 hours
If no new issues, respond with [SILENT]." \
  --name "Nightly backlog triage" \
  --deliver telegram
```

GitHub event trigger (dynamic subscription):

```bash
hermes webhook subscribe github-pr-review \
  --events "pull_request" \
  --prompt "Review PR #{pull_request.number}: {pull_request.title} Diff URL: {pull_request.diff_url}" \
  --skills github-code-review \
  --deliver github_comment
```

Static route in `config.yaml`:

```yaml
platforms:
  webhook:
    enabled: true
    extra:
      port: 8644
      secret: "your-global-secret"
      routes:
        github-pr-review:
          events: ["pull_request"]
          secret: "github-webhook-secret"
          prompt: |
            Review PR #{pull_request.number}: {pull_request.title}
            Repository: {repository.full_name}
            Author: {pull_request.user.login}
            Diff URL: {pull_request.diff_url}
            Review for security, performance, and code quality.
          skills: ["github-code-review"]
          deliver: "github_comment"
          deliver_extra:
            repo: "{repository.full_name}"
            pr_number: "{pull_request.number}"
```

GitHub setting: Settings -> Webhooks -> Add webhook, Payload URL `http://your-server:8644/webhooks/github-pr-review`, content type `application/json`, matching secret, event Pull requests.

API-call trigger (CI/CD POSTs to the route):

```bash
hermes webhook subscribe deploy-verify --events "deployment" --prompt "A deployment just completed: Service: {service} ..." --deliver telegram
curl -X POST http://your-server:8644/webhooks/deploy-verify \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: deployment" \
  -H "X-Hub-Signature-256: sha256=<hmac>" \
  -d '{"service":"api","environment":"prod","version":"2.1.0"}'
```

Blueprints in the guide (each with a full prompt): Nightly Backlog Triage, Automatic PR Code Review, Docs Drift Detection, Dependency Security Audit, Deploy Verification, Alert Triage, Uptime Monitor (script `check-uptime.py` with `--script`), Competitive Repository Scout, AI News Digest, Paper Digest with Notes (`--skill arxiv --skill obsidian`), Issue Auto-Labeling, CI Failure Analysis (`check_run`), Auto-Port Changes Across Repos, Stripe Payment Monitoring, Daily Revenue Summary, Security Audit Pipeline, Content Pipeline.

## Options / Props

Triggers:

| Trigger | How | Tool |
|---------|-----|------|
| Schedule | Cadence (hourly, nightly, weekly) | `cronjob_manage` tool or `/cron` |
| GitHub Event | PR opens, pushes, issues, CI results | Webhook platform (`hermes webhook subscribe`) |
| API Call | External service POSTs JSON | Webhook platform (config.yaml routes or subscribe) |

Delivery targets:

| Target | Flag | Notes |
|--------|------|-------|
| Same chat | `--deliver origin` | Default |
| Local file | `--deliver local` | Saves output, no notification |
| Telegram | `--deliver telegram` | Home channel, or `telegram:CHAT_ID` |
| Discord | `--deliver discord` | Home channel, or `discord:CHANNEL_ID` |
| Slack | `--deliver slack` | Home channel |
| SMS | `--deliver sms:+15551234567` | Direct to phone number |
| Specific thread | `--deliver telegram:-100123:456` | Telegram forum topic |

Webhook template variables:

| Name | Description |
|------|-------------|
| `{pull_request.title}` | PR title |
| `{issue.number}` | Issue number |
| `{repository.full_name}` | `owner/repo` |
| `{action}` | Event action (opened, closed, etc.) |
| `{__raw__}` | Full JSON payload (truncated at 4000 chars) |
| `{sender.login}` | GitHub user who triggered the event |

Cron schedule syntax: `every 30m`, `every 2h`, `0 2 * * *` (daily 2:00), `0 9 * * 1` (Monday 9:00), `0 9 * * 1-5` (weekdays), `0 3 * * 0` (Sunday 3:00), `0 */6 * * *` (every 6 hours).

## Notes

- All three triggers can deliver to Telegram, Discord, Slack, SMS, email, GitHub comments, or local files; blueprints work with any model.
- A response containing `[SILENT]` suppresses delivery.
- Dependency audit blueprint: do not activate or mutate Hermes's dependency environment; use an independently installed scanner and distinguish findings from failed scans.
- The default `hermes-webhook` toolset has no terminal; the static PR-review route relies on fetching `{pull_request.diff_url}` with web tools. To run `gh pr diff` instead, grant `toolsets: ["terminal", "web"]` on the route (see webhook-github-pr-review).
- Adapted: the upstream curl example sends no event type, so a route subscribed with `--events "deployment"` would ignore it; the event type is read from `X-GitHub-Event`, `X-GitLab-Event`, or `event_type` in the payload (user-guide/messaging/webhooks).
- A parameterized form-based catalog exists in the reference docs (Automation Blueprints Catalog).
- Source: https://hermes-agent.nousresearch.com/docs/guides/automation-blueprints (pinned to v0.22.2)

## Related

- [automate-with-cron](./automate-with-cron.md)
- [webhook-github-pr-review](./webhook-github-pr-review.md)
- [github-pr-review-agent](./github-pr-review-agent.md)
