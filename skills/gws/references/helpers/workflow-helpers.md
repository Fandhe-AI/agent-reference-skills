# Workflow Helpers

Multi-service workflow helpers that compose data from multiple Google Workspace APIs into coherent summaries and task sequences.

## +standup-report

Generate a standup summary combining today's meetings (Calendar) and open tasks (Google Tasks).

### Usage

```bash
gws workflow +standup-report
gws workflow +standup-report --format table
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--format` | No | Output format: `json` (default), `table`, `yaml`, `csv` |

## Notes

- Read-only; combines Calendar agenda for the current day with Tasks list.
- Time-aware: uses account timezone from Calendar Settings API (cached 24 hours).

---

## +meeting-prep

Prepare for your next meeting: agenda, attendees, and linked Docs.

### Usage

```bash
gws workflow +meeting-prep
gws workflow +meeting-prep --calendar team-calendar@group.calendar.google.com
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--calendar` | No | Calendar ID to query (default: `primary`) |
| `--format` | No | Output format: `json` (default), `table`, `yaml`, `csv` |

## Notes

- Read-only; displays the next upcoming event with attendees and description.
- Time-aware: uses account timezone from Calendar Settings API (cached 24 hours).

---

## +email-to-task

Convert a Gmail message into a Google Tasks entry. Reads email subject as task title and message snippet as notes.

### Usage

```bash
gws workflow +email-to-task --message-id MESSAGE_ID
gws workflow +email-to-task --message-id MESSAGE_ID --tasklist TASKLIST_ID
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--message-id` | Yes | Gmail message ID to convert |
| `--tasklist` | No | Task list ID (default: `@default`) |

---

## +weekly-digest

Weekly summary combining this week's meetings (Calendar) and unread email count (Gmail).

### Usage

```bash
gws workflow +weekly-digest
gws workflow +weekly-digest --format table
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--format` | No | Output format: `json` (default), `table`, `yaml`, `csv` |

## Notes

- Read-only; combines Calendar agenda for the week with Gmail triage summary.
- Time-aware: uses account timezone from Calendar Settings API (cached 24 hours).

---

## +file-announce

Announce a Drive file in a Google Chat space. Fetches the file name from Drive automatically.

### Usage

```bash
gws workflow +file-announce --file-id FILE_ID --space spaces/AAAAxxxx
gws workflow +file-announce --file-id FILE_ID --space spaces/AAAAxxxx --message "New report available"
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--file-id` | Yes | Drive file ID to announce |
| `--space` | Yes | Chat space name (e.g. `spaces/SPACE_ID`) |
| `--message` | No | Custom announcement message |
| `--format` | No | Output format: `json` (default), `table`, `yaml`, `csv` |

## Notes

- Write command; sends a Chat message with the Drive file reference.
- File name is fetched automatically from Drive using the provided `--file-id`.

## Related

- [helpers-overview.md](./helpers-overview.md)
- [gmail-helpers.md](./gmail-helpers.md)
- [calendar-helpers.md](./calendar-helpers.md)
- [drive-helpers.md](./drive-helpers.md)
- [docs-chat-helpers.md](./docs-chat-helpers.md)
