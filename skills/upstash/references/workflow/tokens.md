# QStash Token and Read-only Token

Upstash Workflow runs on QStash, so the app authenticates with a QStash token; a read-only token can be shared with a team or AI agents.

## Signature / Usage

Adapted (not in the official docs): the official pages name the token `QSTASH_TOKEN` and describe the console steps without a code sample; this env file shows where the value goes.

```bash
QSTASH_TOKEN="<QSTASH_TOKEN>"
```

## Options / Props

| Token | How to get it | Capabilities |
|-------|---------------|--------------|
| `QSTASH_TOKEN` | Upstash Console, Workflow tab, pick the region, copy it from the **Quickstart** section | Full access |
| Read-only token | Console, "Read-only token" in the Quickstart section | Reads logs, messages, schedules and other resources; cannot publish messages, create resources such as schedules or URL Groups, or modify existing resources |

## Notes

- A read-only token can still access sensitive data in logs and messages; use "Redact Fields" (see redact-fields) to hide sensitive data from logs and resources
- Source: https://upstash.com/docs/workflow/howto/get-token (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/howto/readonly-token (fetched 2026-11-14; no version pin on the site)

## Related

- [redact-fields](./redact-fields.md)
- [multi-region](./multi-region.md)
- [security](./security.md)
