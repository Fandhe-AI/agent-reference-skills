# Automated GitHub PR Comments with Webhooks

Connect Hermes to GitHub so a webhook-triggered agent fetches the PR diff with `gh`, reviews it, and posts a comment. Requires a publicly reachable URL.

## Signature / Usage

`~/.hermes/config.yaml`:

```yaml
platforms:
  webhook:
    enabled: true
    extra:
      port: 8644
      rate_limit: 30
      routes:
        github-pr-review:
          secret: "your-webhook-secret-here"
          toolsets: ["terminal", "web"]   # required for gh pr diff (default hermes-webhook toolset has no terminal)
          events:
            - pull_request
          prompt: |
            A pull request event was received (action: {action}).
            PR #{number}: {pull_request.title}
            If the action is "closed" or "labeled", stop here and do not post a comment.
            Otherwise:
            1. Run: gh pr diff {number} --repo {repository.full_name}
            2. Review the code changes for correctness, security issues, and clarity.
            3. Write a concise, actionable review comment and post it.
          deliver: github_comment
          deliver_extra:
            repo: "{repository.full_name}"
            pr_number: "{number}"
```

```bash
hermes gateway
curl http://localhost:8644/health     # {"status": "ok", "platform": "webhook"}
```

GitHub: repo Settings -> Webhooks -> Add webhook; Payload URL `https://your-public-url.example.com/webhooks/github-pr-review`, content type `application/json`, same secret, event Pull requests.

Smoke test with a signed payload:

```bash
SECRET="your-webhook-secret-here"
BODY='{"action":"opened","number":99,"pull_request":{"title":"Test PR","body":"Adds a feature.","user":{"login":"testuser"},"head":{"ref":"feat/x"},"base":{"ref":"main"},"html_url":"https://github.com/org/repo/pull/99"},"repository":{"full_name":"org/repo"}}'
SIG=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$SECRET" -hex | awk '{print "sha256="$2}')
curl -s -X POST http://localhost:8644/webhooks/github-pr-review \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: pull_request" \
  -H "X-Hub-Signature-256: $SIG" \
  -d "$BODY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `port` | int (8644) | Listen port |
| `secret` (extra) | string | Optional global fallback secret |
| `rate_limit` | int (30) | Requests per minute per route |
| `max_body_bytes` | int (1048576) | Payload size limit |
| `routes.<name>.secret` | string | HMAC secret for this route |
| `routes.<name>.events` | list | `X-GitHub-Event` values to accept; empty = all |
| `routes.<name>.prompt` | string | Template; `{field}` / `{nested.field}` resolve from payload |
| `routes.<name>.skills` | list | Only the first found skill is loaded |
| `routes.<name>.filters` | list | Payload-field filters, e.g. `field: "action"`, `in: [...]` |
| `routes.<name>.deliver` | string | `log`, `github_comment`, `telegram`, `discord`, `slack`, `signal`, `sms` |
| `routes.<name>.deliver_extra` | map | `repo` + `pr_number` for `github_comment`; `chat_id` for others |

```yaml
filters:
  - field: "action"
    in: ["opened", "synchronize", "reopened"]
```

## Notes

- The payload has PR metadata but not the diff; the prompt must run `gh pr diff`. The default `hermes-webhook` toolset has no terminal, so the example route grants `toolsets: ["terminal", "web"]` (per-route toolsets) for `gh`.
- Payloads contain attacker-controlled text (PR titles, descriptions); run the gateway sandboxed (Docker, SSH backend) when exposed to the internet.
- `{field}` / `{nested.field}` are the only substitutions; no Jinja2 or conditionals.
- Prefer `filters` over prompt-level "stop" instructions: the agent still runs and consumes tokens for every `pull_request` event.
- Use `deliver: log` when testing; `hermes webhook test <name>` works only for dynamic subscriptions, not `config.yaml` routes.
- GitLab: uses `X-Gitlab-Token` (plain match); filter with `X-GitLab-Event` values like `Merge Request Hook`; payload fields differ (`{object_attributes.title}`, `{object_attributes.iid}`).
- Never use `INSECURE_NO_AUTH` in production. Duplicate deliveries are deduplicated by a 1-hour idempotency cache keyed on `X-GitHub-Delivery`, then `X-Request-ID`.
- Troubleshooting: `401 Invalid signature` (secret mismatch), `404 Unknown route` (route key vs URL), `429` (rate limit), no comment (`gh` missing or unauthenticated). GitHub's Recent Deliveries tab shows exact requests and responses. Ignored events (e.g. `ping`) log only at DEBUG.
- Source: https://hermes-agent.nousresearch.com/docs/guides/webhook-github-pr-review (pinned to v0.22.2)

## Related

- [github-pr-review-agent](./github-pr-review-agent.md)
- [automation-blueprints](./automation-blueprints.md)
