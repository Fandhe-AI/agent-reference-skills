# Calendar Helpers

Hand-crafted helper commands for creating events and viewing the calendar agenda. Timezone-aware via the Calendar Settings API.

## +insert

Create a new calendar event.

### Usage

```bash
gws calendar +insert --summary "Standup" --start "2026-06-17T09:00:00-07:00" \
  --end "2026-06-17T09:30:00-07:00"

gws calendar +insert --summary "Team sync" --start "2026-06-17T10:00:00-07:00" \
  --end "2026-06-17T11:00:00-07:00" --attendee alice@example.com --attendee bob@example.com --meet
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--summary` | Yes | Event title |
| `--start` | Yes | Start time in ISO 8601 format |
| `--end` | Yes | End time in ISO 8601 format |
| `--calendar` | No | Calendar ID (default: `primary`) |
| `--location` | No | Event location |
| `--description` | No | Event details/notes |
| `--attendee` | No | Attendee email address (repeatable) |
| `--meet` | No | Add a Google Meet video conference link |

## Notes

- When `--meet` is specified, a deterministic UUID v5 is generated from event details as seed data, ensuring idempotent Meet link creation across identical parameters regardless of attendee ordering.

---

## +agenda

Show upcoming calendar events. Uses the Google account timezone (fetched from Calendar Settings API, cached 24 hours).

### Usage

```bash
gws calendar +agenda
gws calendar +agenda --today
gws calendar +agenda --week --format table
gws calendar +agenda --today --timezone America/New_York
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--today` | No | Show current day's events |
| `--tomorrow` | No | Show next day's events |
| `--week` | No | Show seven-day outlook |
| `--days` | No | Custom number of days to display |
| `--calendar` | No | Filter by calendar name or ID |
| `--timezone` / `--tz` | No | IANA timezone override (e.g. `America/New_York`); defaults to account timezone |

## Notes

- `+agenda` is a time-aware helper: date boundaries are computed in the account's configured timezone, not UTC.
- Up to five calendars are queried concurrently with rate-limiting retry logic.
- Override account timezone with `--timezone` or its alias `--tz`.

## Related

- [helpers-overview.md](./helpers-overview.md)
- [workflow-helpers.md](./workflow-helpers.md)
