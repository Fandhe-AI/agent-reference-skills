<!-- source: https://platform.claude.com/docs/en/manage-claude/inference-hooks-endpoint / last verified: 2026-08-07 -->

# Develop an Inference hooks integration

Build the AI security server that receives signed Inference hooks requests, verifies them, and returns allow or deny verdicts.

## Signature / Usage

```python
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

class VerdictHandler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def do_POST(self):
        self.rfile.read(int(self.headers.get("Content-Length", 0)))
        verdict = b'{"action": "allow"}'
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(verdict)))
        self.end_headers()
        self.wfile.write(verdict)

ThreadingHTTPServer(("", 8000), VerdictHandler).serve_forever()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | request field | Always `"prompt"` today |
| `request_id` | request field | Opaque per-inference identifier; equals `webhook-id` header |
| `actor` | request field | `{type: "user", id, email_address}`; both `id` and `email_address` can be null |
| `source.application` | request field | Open string; known values `claude-ai`, `claude-code`, `config-test` |
| `messages` | request field | Transcript array of `{role, content[]}`; content block types: `text`, `tool_use`, `tool_result`, `attachment` |
| `action` | verdict field | `"allow"` or `"deny"`, required |
| `deny_reason` | verdict field | String, max 500 chars, shown to end user on deny |
| `reference_id` | verdict field | Max 50 chars `[A-Za-z0-9._:/-]`, your own correlation ID, recorded in Activity Feed |
| `webhook-id` / `webhook-timestamp` / `webhook-signature` | headers | Standard Webhooks signature headers; HMAC-SHA256 over `{id}.{timestamp}.{raw body}` |

## Notes

- Body is capped at 10 MB; raise your server's request body size limit above common small defaults (nginx 1MB, Express 100kB)
- Anthropic retries exactly once, after 100ms, only on connection failure; the retry reuses the same `webhook-id` and signature
- Any non-`allow`/`deny` `action`, non-200 status, or unparseable/oversized body is a webhook failure (not a deny) and falls through to failure handling
- Verify raw request bytes before JSON parsing; decode the signing secret with a standard (not URL-safe) base64 decoder
- Reject unsigned requests once your organization has a signing secret; the pre-first-save connection test is the only exception
- Source IPs originate from `160.79.106.0/24`; allowlisting is not a substitute for signature verification
- Must tolerate unknown top-level fields, unknown `metadata` keys, new `source.application`/`actor.type` values, and unrecognized content block types (forward compatibility)

## Related

- [inference-hooks](./inference-hooks.md)
- [inference-hooks-configuration](./inference-hooks-configuration.md)
