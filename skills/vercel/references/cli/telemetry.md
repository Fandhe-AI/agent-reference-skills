# vercel telemetry

Enable or disable CLI telemetry collection.

## Signature / Usage

```bash
vercel telemetry status
vercel telemetry enable
vercel telemetry disable
```

## Notes

- Telemetry tracks: command invoked, CLI version, general machine info (CPU count, OS, CI flag), and identifiers associated with your account
- No sensitive data is collected (no env vars, file paths, file contents, logs, or serialized errors)
- Debug mode: `VERCEL_TELEMETRY_DEBUG=1` prints telemetry events to stderr without sending them
- `enable` / `disable` save your choice on your computer. `VERCEL_TELEMETRY_DISABLED=1` turns telemetry off only for runs where it is set (e.g. CI) and does not change the saved choice.
- Source: https://vercel.com/docs/cli/telemetry (fetched 2026-11-14)

### About Vercel CLI telemetry

Participation is optional. Vercel CLI Telemetry is collected to improve Vercel's products and services, including the developer experience, platform performance, and AI features (see the Vercel Privacy Notice).

Collected: command invoked (`vercel build`, `vercel deploy`, `vercel login`, etc.), CLI version, general machine information (CPU count, macOS/Windows/Linux, whether run in CI), and identifiers associated with your account. With `VERCEL_TELEMETRY_DEBUG=1`, data is not sent; it is printed to stderr after a `['telemetry']: Flushing Events` line. Example event:

```json
{
  "id": "cf9022fd-e4b3-4f67-bda2-f02dba5b2e40",
  "eventTime": 1728421688109,
  "key": "subcommand:list",
  "value": "list",
  "sessionId": "e29b9b32-3edd-4599-92d2-f6886af005f6",
  "invocationId": "0b6c1f3a-7d42-4e9b-8a15-3c9d2e7f4b60",
  "teamId": "team_9Cdf9AE0j9ef09FaSdEU0f0s",
  "userId": "Uf8Kd02LmQ6pRt3VxZ7b1Nc5",
  "projectId": "prj_4Kd8Fs2Lm6Qp0Rt3Vx7Zb1Nc5Hg9"
}
```

Opt-out: run `vercel telemetry disable` (sets a global configuration value), check with `vercel telemetry status`, re-join with `vercel telemetry enable`, or set `VERCEL_TELEMETRY_DISABLED=1` per run.

- Source: https://vercel.com/docs/cli/about-telemetry (fetched 2026-11-14)

## Related

- [overview.md](./overview.md)
