# Pipe Script Output to Messaging Platforms

`hermes send` pushes text from any shell script, cron job, CI hook, or daemon to Telegram, Discord, Slack, Signal, and other configured platforms, without an LLM or a running gateway (for bot-token platforms).

## Signature / Usage

```bash
hermes send --to telegram "deploy finished"
echo "RAM 92%" | hermes send --to telegram:-1001234567890
hermes send --to discord:#ops --file ~/.hermes/cache/scratch/report.md
hermes send --to slack:#eng --subject "[CI] build.log" --file build.log
hermes send --to telegram:-1001234567890:17585 "threaded reply"
hermes send --list
hermes send --list telegram
hermes send --list --json

hermes send --to telegram --quiet "keepalive" || { echo "Telegram delivery failed" >&2; exit 1; }
msg_id=$(hermes send --to discord:#ops --json "build started" | jq -r .message_id)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `-t, --to TARGET` | string | Destination |
| `message` | positional | Message text; omit to read `--file` or stdin |
| `-f, --file PATH` | path | Read body from a file; `--file -` forces stdin |
| `-s, --subject LINE` | string | Prepend a header line |
| `-l, --list` | flag | List targets; optional platform filter |
| `-q, --quiet` | flag | No stdout on success |
| `--json` | flag | Emit raw JSON result |

Target formats:

| Format | Example |
|--------|---------|
| `platform` | `telegram` (home channel) |
| `platform:chat_id` | `telegram:-1001234567890` |
| `platform:chat_id:thread_id` | `telegram:-1001234567890:17585` |
| `platform:#channel` | `discord:#ops` |
| `platform:+E164` | `signal:+15551234567` |

Exit codes: `0` success, `1` platform-level delivery failure, `2` usage / argument / config error.

## Notes

- Body resolution order: positional argument, `--file`, piped stdin. With a TTY stdin it does not wait; it returns a usage error.
- Platforms with adapters work as targets: `telegram`, `discord`, `slack`, `signal`, `sms`, `whatsapp`, `matrix`, `mattermost`, `feishu`, `dingtalk`, `wecom`, `weixin`, `email`, and others.
- Reuses `~/.hermes/.env` and `~/.hermes/config.yaml` (or the resolved Hermes home / profile). A gateway is usually not required; plugin platforms with persistent adapter connections need `hermes gateway start`. If a platform reports `not configured`, add the token to the same home's `.env`.
- `--list` reads `~/.hermes/channel_directory.json`, refreshed by a running gateway; start the gateway once if "no channels discovered yet". Human-friendly names resolve against it.
- For OOM / disk-full watchdogs that may fire when the host is struggling, keep a minimal `curl` instead of `hermes send`.
- If an agent must decide what to say, schedule a cron job with `deliver=`; `hermes send` is for raw strings.

## Related

- [automate-with-cron](./automate-with-cron.md)
- [cron-script-only](./cron-script-only.md)
