# Calendar Agenda and Event Insertion

Retrieve upcoming calendar events and create new events using `gws calendar` helpers.

```bash
# Prerequisites: authenticate with calendar scope
gws auth login -s calendar

# Show upcoming events using the account's default timezone
gws calendar +agenda

# Show today's events only, with explicit timezone override
gws calendar +agenda --today --timezone America/New_York

# Use the short alias --tz instead of --timezone
gws calendar +agenda --tz Europe/London

# Create a new event on the primary calendar
gws calendar +insert \
  --summary "Team Sync" \
  --start "2024-06-10T10:00:00" \
  --end "2024-06-10T11:00:00" \
  --attendees "alice@example.com"

# Preview event creation without saving (dry-run)
gws calendar +insert \
  --summary "Team Sync" \
  --start "2024-06-10T10:00:00" \
  --end "2024-06-10T11:00:00" \
  --dry-run

# List raw events via Discovery method (first page)
gws calendar events list --params '{"calendarId": "primary", "maxResults": 10}'
```

## Notes

- When `--timezone` / `--tz` is omitted, the CLI fetches the timezone from Google Calendar Settings and caches it for 24 hours.
- `--timezone` accepts IANA timezone names (e.g., `America/New_York`, `Asia/Tokyo`, `Europe/London`).
- `--today` scopes the agenda to the current day only; without it, the command returns upcoming events over a default lookahead window.
- Date-time values in `+insert` must be ISO 8601 strings (e.g., `2024-06-10T10:00:00`); the CLI uses the resolved timezone.
