# Two-Phase Parsing

`gws` uses a deliberate two-phase parsing strategy to dynamically build its command surface from the Google Discovery Service before processing the full argument list.

## How It Works

**Phase 1 — Service identification:**

1. Read `argv[1]` to identify the service name (e.g., `drive`, `gmail`, `sheets`).
2. Fetch the service's Discovery Document (cached for 24 hours locally).
3. Build a complete `clap::Command` tree from the Discovery Document.

**Phase 2 — Argument parsing:**

4. Re-parse the remaining arguments (`argv[2..]`) against the dynamically constructed command tree.
5. Authenticate, construct the HTTP request, and execute.

## Signature / Usage

```bash
# Phase 1 identifies "drive"; phase 2 parses "files list --params ..."
gws drive files list --params '{"pageSize": 5}'

# Phase 1 identifies "gmail"; phase 2 parses "users messages get ..."
gws gmail users messages get --params '{"id": "MSG_ID", "userId": "me"}'
```

## Notes

- The two-phase design allows `gws` to support the full Google API surface without hardcoding any service commands — the CLI never knows about an API endpoint until it reads the Discovery Document.
- Because argument parsing happens after the Discovery Document is fetched, adding `--help` to any command will show the actual parameters defined by Google's API specification.
- The 24-hour Discovery Document cache means the first invocation of a service may be slower; subsequent invocations within 24 hours use the local cache.
- Exit code `4` is returned when the Discovery Document cannot be fetched (network error, invalid service name, etc.).
- This project is not an officially supported Google product. Breaking changes are expected before v1.0.

## Related

- [discovery-cache.md](./discovery-cache.md)
- [command-structure.md](./command-structure.md)
