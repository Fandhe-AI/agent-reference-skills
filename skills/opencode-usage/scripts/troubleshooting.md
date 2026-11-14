---
source: https://opencode.ai/docs/troubleshooting/
---

# Troubleshooting

Diagnose the background service and collect logs, heap snapshots, and CPU profiles.

## Signature / Usage

### Check the background service

```bash
opencode service status
```

```bash
opencode api get /api/info
```

```bash
opencode service restart
```

```bash
opencode service stop
opencode service start
```

### Allow a browser origin (CORS)

```bash
opencode service set cors http://192.168.1.10:3001
opencode service get cors
```

```bash
opencode service set cors "http://192.168.1.10:3001, https://app.example.com"
```

```bash
opencode service unset cors
```

For a foreground server, repeat `--cors` for each additional allowed origin:

```bash
opencode serve --cors http://192.168.1.10:3001 --cors https://app.example.com
```

### Read logs

```bash
tail -f ~/.local/share/opencode/log/opencode.log
```

```bash
grep 'role=server' ~/.local/share/opencode/log/opencode.log
grep 'run=8fc3b1d5' ~/.local/share/opencode/log/opencode.log
```

### Capture a heap snapshot

```bash
opencode debug heap-dump
```

```bash
opencode debug heap-dump --directory ./snapshots
```

### Capture CPU and memory profiles (macOS / Linux)

Get the background server PID (`pid` in the response):

```bash
opencode api get /api/info
```

`SIGPROF` captures a ten-second CPU profile:

```bash
kill -SIGPROF <pid>
```

`SIGUSR1` captures a memory (heap) snapshot:

```bash
kill -SIGUSR1 <pid>
```

### Report an issue

```bash
opencode --version
opencode service status
```

## Notes

- Send the signals only to the PID reported by OpenCode, and confirm it first with `ps -p <pid>`; a process without a handler for `SIGPROF` or `SIGUSR1` terminates.
- `opencode api` may start the background service when no compatible healthy service is available.
- A heap snapshot pauses the server while it is written, and can contain prompts, file contents, and credentials. Do not share it publicly.
- `debug heap-dump` only uses a server that is already running; use `--server <url>` to capture a server started with `opencode serve` (set `OPENCODE_PASSWORD` if it has one).
- Signal-triggered profiles are not available on Windows; use `opencode debug heap-dump` instead.
- Do not delete or edit `~/.local/state/opencode/service.json`, `~/.config/opencode/service.json`, or the database `~/.local/share/opencode/opencode.db` while troubleshooting; make a backup before inspecting persistent data with external tools.
- Remove API keys, authorization headers, prompts, and file contents from logs before sharing.

## Related

- server.md
- network.md
- cli.md
- https://opencode.ai/docs/troubleshooting/
