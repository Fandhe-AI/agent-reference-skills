# Script-Only Cron Jobs (No LLM)

No-agent mode: a script runs on the cron schedule and its stdout is delivered to a messaging platform, with zero LLM calls.

## Signature / Usage

```bash
cat > ~/.hermes/scripts/memory-watchdog.sh <<'EOF'
#!/usr/bin/env bash
RAM_PCT=$(free | awk '/^Mem:/ {printf "%d", $3 * 100 / $2}')
if [ "$RAM_PCT" -ge 85 ]; then
  echo "⚠ RAM ${RAM_PCT}% on $(hostname)"
fi
# Empty stdout = silent run; no message sent.
EOF
chmod +x ~/.hermes/scripts/memory-watchdog.sh

hermes cron create "every 5m" \
  --no-agent \
  --script memory-watchdog.sh \
  --deliver telegram \
  --name "memory-watchdog"

hermes cron list
hermes cron run <job_id>
```

From chat, the agent calls:

```python
cronjob(
    action="create",
    schedule="every 5m",
    script="memory-watchdog.sh",
    no_agent=True,
    deliver="telegram",
    name="memory-watchdog",
)
```

Own Python environment:

```bash
hermes cron create "0 8 * * *" \
  --no-agent \
  --script daily-report.py \
  --interpreter ~/venvs/hermes-reporting/bin/python \
  --deliver telegram
```

Lifecycle:

```bash
hermes cron pause <job_id>
hermes cron resume <job_id>
hermes cron edit <job_id> --schedule "every 10m"
hermes cron edit <job_id> --agent
hermes cron edit <job_id> --no-agent --script …
hermes cron edit <job_id> --interpreter ""
hermes cron remove <job_id>
```

## Options / Props

Script output to delivery:

| Script behavior | Result |
|-----------------|--------|
| Exit 0, non-empty stdout | stdout delivered verbatim |
| Exit 0, empty stdout | Silent tick |
| Exit 0, last line `{"wakeAgent": false}` | Silent tick |
| Non-zero exit code | Error alert delivered |
| Script timeout | Error alert delivered |

Interpreter by extension:

| Extension | Interpreter |
|-----------|-------------|
| `.sh`, `.bash` | `bash` from `PATH` (fallback `/bin/bash`) |
| anything else | `sys.executable`, or the `--interpreter` path |

Delivery targets: `telegram`, `telegram:-1001234567890`, `telegram:-1001234567890:17585`, `discord:#ops`, `slack:#engineering`, `signal:+15551234567`, `local`.

Comparison:

| Approach | When to use |
|----------|-------------|
| `cronjob --no-agent` | Recurring watchdogs / alerts / metrics that need no reasoning |
| `cronjob_manage` (LLM) | Message content requires reasoning |
| OS cron + `curl` to a webhook subscription | Hermes itself might be unhealthy |

## Notes

- Scripts must resolve inside `~/.hermes/scripts/`; traversal and symlink escapes are rejected. Shebangs are not honored. Cron scripts do not inherit provider credentials from the Hermes process environment.
- `--interpreter` must be absolute or `~`-prefixed, must be a Python executable, applies only to Python scripts (and `monitor_script`), is user-owned (set via `hermes cron create/edit`, not the agent's `cronjob` tool), and is validated at run time. Hermes does not manage the venv.
- Schedule syntax is the same as LLM jobs: `every 5m`, `every 2h`, `0 9 * * *`, `30m` (one-shot).
- No running gateway is required at script-run time for bot-token platforms (Telegram, Discord, Slack, Signal, SMS, WhatsApp).
- Agents choose `no_agent=True` when the script's stdout already is the message.

## Related

- [automate-with-cron](./automate-with-cron.md)
- [pipe-script-output](./pipe-script-output.md)
- [cron-troubleshooting](./cron-troubleshooting.md)
