# Command Structure

`gws` dynamically builds its entire command surface from Google's Discovery Service at runtime. Commands follow the pattern `gws <service> <resource> <method> [flags]`.

## Signature / Usage

```bash
gws <service> <resource> <method> [flags]

# Examples
gws drive files list --params '{"pageSize": 5}'
gws sheets spreadsheets create --json '{"properties": {"title": "Q1"}}'
gws gmail users messages get --params '{"id": "...", "userId": "me"}'
gws calendar events list --params '{"calendarId": "primary"}'
```

## Supported Services

19 services are available, each corresponding to a Google Workspace API:

| Service | Description |
|---------|-------------|
| `drive` | Google Drive file management |
| `sheets` | Google Sheets spreadsheets |
| `gmail` | Gmail messages, labels, threads |
| `calendar` | Google Calendar events |
| `admin-reports` | Admin SDK Reports |
| `docs` | Google Docs documents |
| `slides` | Google Slides presentations |
| `tasks` | Google Tasks |
| `people` | People API (contacts) |
| `chat` | Google Chat spaces and messages |
| `classroom` | Google Classroom courses |
| `forms` | Google Forms |
| `keep` | Google Keep notes |
| `meet` | Google Meet spaces |
| `events` | Events / Pub-Sub subscriptions |
| `modelarmor` | Model Armor content safety |
| `workflow` | Workflow automation helpers |
| `script` | Apps Script projects |
| `shared` | Shared patterns (auth, global flags, output formatting) |

## Helper Commands

Some services ship hand-crafted helper commands prefixed with `+` for common workflows:

```bash
gws gmail +send --to user@example.com --subject "Hello"
gws sheets +append --spreadsheet-id <id> --range "Sheet1!A1"
gws calendar +agenda
gws drive +upload ./report.pdf --name "Q1 Report"
gws docs +write
gws chat +send
```

Helper commands are distinct from Discovery-generated commands and are prefixed with `+` to indicate their hand-crafted nature.

## Schema Introspection

Inspect the request/response schema for any method using `gws schema`:

```bash
gws schema drive.files.list
```

## Global Flags

| Flag | Description |
|------|-------------|
| `--params '<json>'` | Pass query parameters as a JSON string |
| `--json '<json>'` | Pass request body as a JSON string |
| `--dry-run` | Preview the HTTP request without executing it |
| `--page-all` | Auto-paginate and output all results as NDJSON |
| `--page-limit <N>` | Maximum pages to fetch (default: 10) |
| `--page-delay <MS>` | Delay between page requests (default: 100 ms) |
| `--sanitize` | Apply Model Armor sanitization to the response |
| `--timezone <tz>` | Override the timezone for time-aware helpers |

## Notes

- Commands are generated dynamically from the Discovery Document — new Google API endpoints are automatically available without CLI updates.
- This project is not an officially supported Google product. Breaking changes are expected before v1.0.

## Related

- [two-phase-parsing.md](./two-phase-parsing.md)
- [discovery-cache.md](./discovery-cache.md)
- [output-format.md](./output-format.md)
