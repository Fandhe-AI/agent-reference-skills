# Script-Only Cron Jobs

Run a script on a schedule with no LLM call and deliver its stdout to a messaging platform.

```bash
# 1. Write the script (must live inside ~/.hermes/scripts/)
cat > ~/.hermes/scripts/memory-watchdog.sh <<'EOF'
#!/usr/bin/env bash
# Alert when RAM usage is over 85%. Silent otherwise.
RAM_PCT=$(free | awk '/^Mem:/ {printf "%d", $3 * 100 / $2}')
if [ "$RAM_PCT" -ge 85 ]; then
  echo "RAM ${RAM_PCT}% on $(hostname)"
fi
# Empty stdout = silent run; no message sent.
EOF
chmod +x ~/.hermes/scripts/memory-watchdog.sh

# 2. Schedule it in no-agent mode
hermes cron create "every 5m" \
  --no-agent \
  --script memory-watchdog.sh \
  --deliver telegram \
  --name "memory-watchdog"

# 3. Verify
hermes cron list
hermes cron run <job_id>    # fire it once to test
```

## Notes

- Exit 0 with non-empty stdout delivers verbatim; empty stdout is a silent tick; non-zero exit or timeout delivers an error alert.
- `.sh` / `.bash` run under bash; any other extension runs under the current Python. Shebangs are not honoured. For Python scripts needing your own packages, pass `--interpreter <absolute-or-~ path to python>` (user-managed venv; validated at run time).
- Cron scripts do not inherit provider credentials from the Hermes process environment.
- Delivery targets: `telegram`, `telegram:<chat_id>`, `telegram:<chat_id>:<thread_id>`, `discord:#ops`, `slack:#engineering`, `signal:+E164`, `local`. A running gateway is not required for bot-token platforms.
- From chat, the agent creates the same job via `cronjob_manage` with `no_agent=true`. Switch modes with `hermes cron edit <job_id> --agent` / `--no-agent --script ...`.
- Do not use this for watchdogs that must fire when the gateway itself is down; use OS cron with `curl`.
- Source: https://hermes-agent.nousresearch.com/docs/guides/cron-script-only (pinned to v0.22.2)
