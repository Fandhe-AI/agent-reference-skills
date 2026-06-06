# Helpers Overview

Hand-crafted commands that complement the auto-generated Discovery surface. Prefixed with `+` to remain visually distinct and never collide with Discovery-generated method names.

## Design Philosophy

Helpers exist only when they provide functionality that Discovery commands cannot independently deliver:

- **Multi-step workflows** — orchestrating calls across 3+ APIs (e.g., `+subscribe` creates Pub/Sub topics, subscriptions, and Workspace event bindings)
- **Format conversion** — translating user-friendly input to API-specific structures (e.g., `+write` converts Markdown to Docs `batchUpdate` JSON)
- **Concurrent composition** — fetching from multiple endpoints in parallel (e.g., `+triage`)
- **Complex construction** — building RFC 2822 MIME from simple `--to/--subject/--body` flags
- **Resumable uploads** — managing protocol-level progress tracking
- **Recipe chains** — connecting disparate services into coherent workflows

**Single API call wrappers are prohibited.** If a task can be done with `gws <service> <resource> <method> --params '{...}'`, a helper is not needed.

## Flag Design Standards

Helper flags control **orchestration decisions** and **input transformation**, not API parameters or output filtering.

| Allowed | Rejected |
|---------|----------|
| `--to`, `--subject`, `--body` — MIME construction inputs | `--thread-id` — already in API response |
| `--dry-run` — controls whether mutations execute | `--include-labels` — output filtering belongs in `--format` |
| `--subscription` — switches orchestration path | `--page-size`, `--fields` — use `--params` passthrough |

## Listing Available Helpers

```bash
gws <service> --help
```

Both Discovery methods and helper commands (`+` prefix) appear together in the help output for any service.

## Time-Aware Helpers

`+agenda`, `+standup-report`, `+weekly-digest`, and `+meeting-prep` automatically retrieve the Google account timezone from the Calendar Settings API (cached 24 hours). Override with `--timezone` / `--tz`.

## All Helpers by Service

| Service | Helper | Description |
|---------|--------|-------------|
| `gmail` | `+send` | Send an email |
| `gmail` | `+reply` | Reply to a message (handles threading automatically) |
| `gmail` | `+reply-all` | Reply-all to a message (handles threading automatically) |
| `gmail` | `+forward` | Forward a message to new recipients |
| `gmail` | `+triage` | Show unread inbox summary (sender, subject, date) |
| `gmail` | `+watch` | Watch for new emails and stream them as NDJSON |
| `sheets` | `+append` | Append a row to a spreadsheet |
| `sheets` | `+read` | Read values from a spreadsheet |
| `docs` | `+write` | Append text to a document |
| `chat` | `+send` | Send a message to a space |
| `drive` | `+upload` | Upload a file with automatic metadata |
| `calendar` | `+insert` | Create a new event |
| `calendar` | `+agenda` | Show upcoming events (timezone-aware) |
| `script` | `+push` | Replace all files in an Apps Script project with local files |
| `workflow` | `+standup-report` | Today's meetings + open tasks as a standup summary |
| `workflow` | `+meeting-prep` | Prepare for next meeting: agenda, attendees, and linked docs |
| `workflow` | `+email-to-task` | Convert a Gmail message into a Google Tasks entry |
| `workflow` | `+weekly-digest` | Weekly summary: this week's meetings + unread email count |
| `workflow` | `+file-announce` | Announce a Drive file in a Chat space |
| `events` | `+subscribe` | Subscribe to Workspace events and stream them as NDJSON |
| `events` | `+renew` | Renew/reactivate Workspace Events subscriptions |
| `modelarmor` | `+sanitize-prompt` | Sanitize a user prompt through a Model Armor template |
| `modelarmor` | `+sanitize-response` | Sanitize a model response through a Model Armor template |
| `modelarmor` | `+create-template` | Create a new Model Armor template |

## Related

- [gmail-helpers.md](./gmail-helpers.md)
- [calendar-helpers.md](./calendar-helpers.md)
- [sheets-helpers.md](./sheets-helpers.md)
- [drive-helpers.md](./drive-helpers.md)
- [docs-chat-helpers.md](./docs-chat-helpers.md)
- [workflow-helpers.md](./workflow-helpers.md)
- [events-helpers.md](./events-helpers.md)
- [modelarmor-helpers.md](./modelarmor-helpers.md)
- [script-helpers.md](./script-helpers.md)
