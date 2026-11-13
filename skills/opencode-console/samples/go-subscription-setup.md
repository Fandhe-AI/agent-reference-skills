---
source: https://opencode.ai/docs/console/go/
---

# Go Subscription Setup

Connect OpenCode to an OpenCode Go subscription, select a Go model, and list available models.

```text
/connect
```

```text
/models
```

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode-go/kimi-k3",
}
```

```bash
curl https://opencode.ai/inference/go/v1/models
```

Session header required by Go for other clients:

```text
x-opencode-session: ses_...
```

## Notes

- Subscribe in the Console, copy the API key, run `/connect`, select **OpenCode Go**, and paste the key.
- Go and Go Plus are for single-member workspaces; Go Teams covers every member of a multi-member workspace.
- Clients should identify with their own user agent (for example `my-coding-agent/1.0`) and send a stable `x-opencode-session` per conversation.
- Go base URL for other harnesses is `https://opencode.ai/inference/go`. Prices and limits are listed in the Go reference page and may change.
