# Webhooks

The webhook adapter runs an HTTP server that accepts POST requests from external services (GitHub, GitLab, JIRA, Stripe, etc.), validates signatures, turns payloads into agent prompts and routes responses to the source or another platform.

## Signature / Usage

```bash
# ~/.hermes/.env
WEBHOOK_ENABLED=true
WEBHOOK_PORT=8644        # default
WEBHOOK_SECRET=your-global-secret
```

```yaml
platforms:
  webhook:
    enabled: true
    extra:
      port: 8644
      secret: "global-fallback-secret"
      routes:
        github-pr:
          events: ["pull_request"]
          secret: "github-webhook-secret"
          prompt: |
            Review this pull request:
            PR #{number}: {pull_request.title}
          skills: ["github-code-review"]
          deliver: "github_comment"
          deliver_extra:
            repo: "{repository.full_name}"
            pr_number: "{number}"
```

Point the service at `http://your-server:8644/webhooks/<route-name>`; `GET /health` returns `{"status": "ok", "platform": "webhook"}`.

## Options / Props

Route properties (under `platforms.webhook.extra.routes.<name>`):

| Name | Type | Description |
|------|------|-------------|
| `events` | list | Accepted event types (`X-GitHub-Event`, `X-GitLab-Event`, or `event_type`); empty = all |
| `secret` | string (required) | HMAC secret; falls back to the global `secret`; `"INSECURE_NO_AUTH"` skips validation (loopback bind only) |
| `profile` | string | Profile authorized to run the route when `gateway.multiplex_profiles` is enabled (`/p/<profile>/webhooks/<route>`) |
| `prompt` | string | Template with `{dot.notation}` fields; `{__raw__}` dumps the whole payload (4000 chars max); no prompt dumps the JSON payload |
| `filters` | list | Declarative filters: `exists`, `missing`, `equals`, `not_equals`, `contains`, `in`, `in_file`, `regex`, `all` / `any` / `not` groups; non-match returns `{"status":"ignored","reason":"filter"}` |
| `script` | path | Filter/transform script under `~/.hermes/scripts/`; JSON stdout replaces payload, text stdout becomes `script_output`; empty / `[SILENT]` / nonzero exit ignores |
| `skills` | list | Skills to load for the run |
| `toolsets` | list | Replaces the webhook toolset for this route (manual config edit only) |
| `deliver` | string | `github_comment`, `telegram`, `discord`, `slack`, `signal`, `sms`, `whatsapp`, `matrix`, `mattermost`, `homeassistant`, `email`, `dingtalk`, `feishu`, `wecom`, `weixin`, `bluebubbles`, `qqbot`, or `log` (default) |
| `deliver_extra` | mapping | Delivery config (`repo`, `pr_number`, `chat_id`, `message_thread_id`); values support templates |
| `deliver_only` | bool | Skip the agent; rendered `prompt` is delivered literally (needs a real `deliver` target) |
| `cron_job` | string | Fire an existing cron job by ID/name; mutually exclusive with `deliver_only` |
| `coalesce` | mapping | `key` (required), `window_seconds` (30), `max_wait_seconds` (300); debounce events per entity; exclusive with `deliver_only` / `cron_job` |
| `mirror_to_session` | bool (default `false`) | Write delivered text into the chat's session transcript |
| `rate_limit` | int (adapter level, default 30/min per route) | Requests per minute |
| `max_body_bytes` | int (default 1 MB) | Payload size cap |

Environment variables: `WEBHOOK_ENABLED` (`false`), `WEBHOOK_PORT` (`8644`), `WEBHOOK_SECRET`.

CLI:

```bash
hermes webhook subscribe github-issues --events "issues" \
  --prompt "New issue #{issue.number}: {issue.title}" \
  --deliver telegram --deliver-chat-id "-100123456789"
hermes webhook list
hermes webhook remove github-issues
hermes webhook test github-issues --payload '{"issue": {"number": 42, "title": "Test"}}'
```

## Notes

- Signature methods: GitHub `X-Hub-Signature-256` (`sha256=` HMAC-SHA256); GitLab `X-Gitlab-Token` (plain match); Standard Webhooks (`webhook-id` / `webhook-timestamp` / `webhook-signature`); generic V2 `X-Webhook-Signature-V2` + `X-Webhook-Timestamp` (HMAC-SHA256 of `<timestamp>.<body>`, +/-300 s); generic V1 `X-Webhook-Signature` (legacy, no replay protection, deprecation warning).
- Response codes (direct delivery): 200 delivered / duplicate, 401 bad signature, 400 malformed JSON, 404 unknown route, 413 too large, 429 rate limit, 502 target rejected. `cron_job` and coalesced routes return 202.
- Idempotency: delivery IDs (`X-GitHub-Delivery`, `svix-id`, `webhook-id`, `X-Request-ID`) cached for 1 hour.
- Dynamic subscriptions live in `~/.hermes/webhook_subscriptions.json`, hot-reloaded without restart; static `config.yaml` routes take precedence. `hermes webhook subscribe` deliberately has no toolsets flag.
- Webhook runs default to a constrained toolset (`web_search`, `web_extract`, `vision_analyze`, `clarify`). HMAC authenticates the sender, not the content: sandbox the runtime, scope toolsets, keep approvals on, template narrowly.
- Every route needs a secret or the adapter fails at startup; `github_comment` needs an authenticated `gh` CLI on the gateway host.

## Related

- [Messaging Gateway](./messaging.md)
- [Microsoft Graph Webhook Listener](./msgraph-webhook.md)
- [Home Assistant](./homeassistant.md)
