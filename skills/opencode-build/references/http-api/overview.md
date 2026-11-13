---
source: https://opencode.ai/docs/api/
---

# HTTP API Overview

OpenCode server HTTP API (OpenAPI 3.1.0) with 32 tags and 170 operations. The document's own `info` block is shown below.

## Signature / Usage

Excerpt from openapi.json (v2.3.0), `info` block (`_info.json`)

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "opencode HttpApi",
    "version": "0.0.1",
    "description": "Experimental HttpApi surface for selected instance routes."
  },
  "servers": null,
  "security": []
}
```

### Tags and operation counts

| Tag | Operations | Page |
|-----|-----------|------|
| agent | 2 | [agent.md](./agent.md) |
| command | 1 | [command.md](./command.md) |
| config | 3 | [config.md](./config.md) |
| credential | 5 | [credential.md](./credential.md) |
| debug | 3 | [debug.md](./debug.md) |
| event | 1 | [event.md](./event.md) |
| experimental | 15 | [experimental.md](./experimental.md) |
| filesystem | 6 | [filesystem.md](./filesystem.md) |
| form | 1 | [generate-form.md](./generate-form.md) |
| generate | 4 | [generate-form.md](./generate-form.md) |
| integration | 12 | [integration.md](./integration.md) |
| location | 2 | [location-project-worktree.md](./location-project-worktree.md) |
| mcp | 8 | [mcp.md](./mcp.md) |
| migration | 1 | [migration.md](./migration.md) |
| model | 2 | [model.md](./model.md) |
| permission | 8 | [permission.md](./permission.md) |
| persistentPty | 11 | [persistent-pty.md](./persistent-pty.md) |
| plugin | 4 | [plugin.md](./plugin.md) |
| project | 2 | [location-project-worktree.md](./location-project-worktree.md) |
| provider | 2 | [provider.md](./provider.md) |
| pty | 7 | [pty.md](./pty.md) |
| reference | 1 | [reference-skill-usage.md](./reference-skill-usage.md) |
| rpc | 1 | [rpc.md](./rpc.md) |
| server | 3 | [server.md](./server.md) |
| session | 44 | [session.md](./session.md), [session-messages.md](./session-messages.md), [session-forms.md](./session-forms.md), [session-inbox-revert.md](./session-inbox-revert.md) |
| shell | 5 | [shell.md](./shell.md) |
| skill | 1 | [reference-skill-usage.md](./reference-skill-usage.md) |
| usage | 1 | [reference-skill-usage.md](./reference-skill-usage.md) |
| vcs | 6 | [vcs.md](./vcs.md) |
| voice | 2 | [voice.md](./voice.md) |
| websearch | 2 | [websearch.md](./websearch.md) |
| worktree | 4 | [location-project-worktree.md](./location-project-worktree.md) |

## Notes

- The `info.version` in the document is `0.0.1`; "v2.3.0" in excerpts refers to the OpenCode release tag the `openapi.json` was taken from.
- All operations declare `"security": []`; authentication is not expressed through OpenAPI security schemes, and operations can still return `401` `UnauthorizedError`.
- The `session.permission.*` operations are tagged `permission` although their paths start with `/api/session/`.
- Most location-scoped operations accept an optional `location` query parameter (deepObject `{ directory: string | null }`).
- Many operations return a 200 body shaped `{ location: Location.PublicRef, data: ... }`; others return `{ data: ... }` or the bare value.

## Related

- [server.md](./server.md)
- [event.md](./event.md)
