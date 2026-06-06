# vercel telemetry

Enable or disable CLI telemetry collection.

## Signature / Usage

```bash
vercel telemetry status
vercel telemetry enable
vercel telemetry disable
```

## Notes

- Telemetry tracks: command invoked, CLI version, general machine info (CPU count, OS, CI flag)
- No sensitive data is collected (no env vars, file paths, file contents, logs, or serialized errors)
- Debug mode: `VERCEL_TELEMETRY_DEBUG=1` prints telemetry events to stderr without sending them

## Related

- [overview.md](./overview.md)
