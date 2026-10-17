# Pipe Script Output

Send text from any shell script, CI hook, or cron job to a messaging platform with `hermes send`.

```bash
# Plain text to a platform's home channel
hermes send --to telegram "deploy finished"

# Pipe stdout from anything
echo "RAM 92%" | hermes send --to telegram:-1001234567890

# Send a file with a subject line
hermes send --to slack:#eng --subject "[CI] build.log" --file build.log

# Thread / topic target
hermes send --to telegram:-1001234567890:17585 "threaded reply"

# List available targets
hermes send --list telegram

# Script usage: exit code only, fail hard on delivery error
hermes send --to telegram --quiet "keepalive" || {
  echo "Telegram delivery failed" >&2
  exit 1
}
```

## Notes

- Body resolution order: positional argument, then `--file PATH`, then piped stdin. A TTY with no body is a usage error (it does not wait for input).
- Exit codes: `0` success, `1` platform-level delivery failure, `2` usage / argument / config error. `--json` emits the raw result (e.g. `jq -r .message_id`).
- Target formats: `platform`, `platform:chat_id`, `platform:chat_id:thread_id`, `platform:#channel`, `platform:+E164`.
- No running gateway is needed for bot-token platforms; credentials come from `~/.hermes/.env` and `config.yaml` of the resolved Hermes home. Plugin platforms with a persistent adapter connection need `hermes gateway start`.
- For OOM / disk-full watchdogs, keep a minimal `curl` instead; the Python interpreter may not load on a thrashing host.
- Source: https://hermes-agent.nousresearch.com/docs/guides/pipe-script-output (pinned to v0.22.2)
