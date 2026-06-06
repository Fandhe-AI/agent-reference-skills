# Exit Codes

Structured exit codes returned by `gws` for use in scripts and automation.

## Exit Code Table

| Code | Name | Condition |
|------|------|-----------|
| `0` | Success | Command completed normally. |
| `1` | API error | Google returned a 4xx or 5xx HTTP response. |
| `2` | Auth error | Credentials are missing, expired, or invalid. |
| `3` | Validation error | Bad arguments, unknown service, or invalid flag. |
| `4` | Discovery error | Could not fetch the API schema document. |
| `5` | Internal error | Unexpected failure in CLI logic. |

## Notes

- Exit codes are stable and intended for script branching — no need to parse error message text.
- Code `2` covers all credential problems: no credentials found, OAuth token expired, or token revoked/invalid.
- Code `3` is returned for client-side input problems before any API call is made.
- Code `4` means the Discovery document for the requested service could not be retrieved (network issue or unsupported service).

## Usage

```bash
gws drive files list
if [ $? -eq 1 ]; then
  echo "API error — check the Google API response"
elif [ $? -eq 2 ]; then
  echo "Auth error — run: gws auth login"
fi
```

## Related

- [global-flags.md](./global-flags.md)
