# GitHub PR Review via Webhook

Have Hermes review a pull request and post a comment when GitHub sends a `pull_request` webhook.

```yaml
# ~/.hermes/config.yaml
platforms:
  webhook:
    enabled: true
    extra:
      port: 8644
      rate_limit: 30
      routes:
        github-pr-review:
          secret: "your-webhook-secret-here"   # must match the GitHub webhook secret
          events:
            - pull_request
          filters:
            - field: "action"
              in: ["opened", "synchronize", "reopened"]
          toolsets: ["terminal", "web"]        # default hermes-webhook toolset has no terminal
          prompt: |
            A pull request event was received (action: {action}).
            PR #{number}: {pull_request.title}
            URL: {pull_request.html_url}

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
curl http://localhost:8644/health
# {"status": "ok", "platform": "webhook"}
# GitHub: Settings > Webhooks > Payload URL https://<public-host>/webhooks/github-pr-review
#         Content type application/json, same secret, event "Pull requests"
```

## Notes

- The webhook payload has PR metadata but not the diff; the prompt must tell the agent to run `gh pr diff` (requires `gh auth login` on the gateway host).
- PR titles and descriptions are attacker-controlled (prompt injection); run the gateway in a sandbox (Docker / SSH backend) when exposed publicly. Never use `INSECURE_NO_AUTH` in production.
- Use `deliver: log` while testing locally; valid `deliver` values: `log`, `github_comment`, `telegram`, `discord`, `slack`, `signal`, `sms`.
- `{field}` / `{nested.field}` are the only template substitutions; `hermes webhook test <name>` works only for dynamic subscriptions, not routes in `config.yaml`.
- Only the first found entry in `skills` is loaded.
- Source: https://hermes-agent.nousresearch.com/docs/guides/webhook-github-pr-review (pinned to v0.22.2)
