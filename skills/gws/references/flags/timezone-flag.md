# --timezone / --tz Flag

Override the timezone used by time-aware helper commands such as `calendar +agenda`.

## Signature / Usage

```bash
gws <service> <helper> --timezone <IANA_TIMEZONE>
# or
gws <service> <helper> --tz <IANA_TIMEZONE>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--timezone <IANA_TIMEZONE>` | string | IANA timezone name (e.g., `America/New_York`) to use for the command. |
| `--tz <IANA_TIMEZONE>` | string | Alias for `--timezone`. |

## Notes

- When `--timezone` / `--tz` is not provided, the CLI fetches the account's configured timezone from the Google Calendar Settings API and caches the result for 24 hours.
- Only affects time-aware helper commands (e.g., `calendar +agenda`). Has no effect on raw Discovery method calls.
- Use IANA timezone names (e.g., `Europe/London`, `Asia/Tokyo`).

## Related

- [global-flags.md](./global-flags.md)
