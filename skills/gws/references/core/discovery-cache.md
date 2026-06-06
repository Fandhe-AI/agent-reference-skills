# Discovery Cache

`gws` fetches each service's Discovery Document from Google's Discovery Service at runtime and caches it locally for 24 hours to reduce latency on subsequent invocations.

## How It Works

When you run a `gws` command, the CLI:

1. Reads `argv[1]` to identify the service name.
2. Checks the local cache for a Discovery Document for that service.
3. If no valid cached document exists (or cache is older than 24 hours), fetches the document from Google's Discovery Service.
4. Stores the fetched document in the local cache directory.
5. Builds the full `clap::Command` tree from the document.

## Schema Introspection

The `gws schema` command lets you inspect the request/response structure of any API method without making an API call:

```bash
gws schema drive.files.list
gws schema gmail.users.messages.get
gws schema sheets.spreadsheets.values.append
```

Output is structured JSON describing the method's parameters and response schema.

## Notes

- The 24-hour cache applies per service. Different services have independent cache entries.
- Time-aware helper commands (e.g., `+agenda`, `+standup-report`, `+weekly-digest`, `+meeting-prep`) also cache your Google account timezone from Calendar Settings for 24 hours. Override with `--timezone <tz>`.
- Exit code `4` is returned when the Discovery Document cannot be fetched.
- Cache storage location follows `GOOGLE_WORKSPACE_CLI_CONFIG_DIR` if set; otherwise uses the OS default config directory.
- This project is not an officially supported Google product. Breaking changes are expected before v1.0.

## Related

- [two-phase-parsing.md](./two-phase-parsing.md)
- [command-structure.md](./command-structure.md)
