# Automate with Cron

Five real-world Hermes cron automation patterns: monitoring, reports, repo watching, data pipelines, multi-skill workflows.

## Signature / Usage

Website change monitor: a pre-run `--script` prints to stdout, which becomes agent context.

```bash
/cron add "every 1h" "If the script output says CHANGE DETECTED, summarize what changed on the page and why it might matter. If it says NO_CHANGE, respond with just [SILENT]." --script ~/.hermes/scripts/watch-site.py --name "Pricing monitor" --deliver telegram
```

Weekly report:

```bash
hermes cron create "0 9 * * 1" \
  "Generate a weekly report covering the top AI news, trending ML GitHub repos, and most-discussed HN posts. Format with sections, include links, keep under 500 words." \
  --name "Weekly AI digest" \
  --deliver telegram
```

Multi-skill workflow:

```bash
/cron add "0 8 * * *" "Search arXiv for the 3 most interesting papers on 'language model reasoning' from the past day. For each paper, create an Obsidian note." \
  --skill arxiv \
  --skill obsidian \
  --name "Paper digest"
```

```python
cronjob(
    action="create",
    skills=["arxiv", "obsidian"],
    prompt="Search arXiv for papers on 'language model reasoning' from the past day. Save the top 3 as Obsidian notes.",
    schedule="0 8 * * *",
    name="Paper digest",
    deliver="local"
)
```

Job management:

```bash
/cron list
/cron run <job_id>
/cron pause <job_id>
/cron edit <job_id> --schedule "every 4h"
/cron edit <job_id> --prompt "Updated task description"
/cron edit <job_id> --skill arxiv --skill obsidian
/cron edit <job_id> --clear-skills
/cron remove <job_id>
```

## Options / Props

`--deliver` targets:

| Name | Type | Description |
|------|------|-------------|
| `origin` | target | Same chat that created the job (default) |
| `local` | target | Save to local file only |
| `telegram` / `discord` / `slack` | target | Home channel of that platform |
| `telegram:-1001234567890` | target | Specific Telegram group |
| `telegram:-1001234567890:17585` | target | Specific Telegram topic thread |
| `bot-chat` | target | Inject output into this profile's canonical Bot Chat; the bot reads and responds |
| `bot-chat:research` | target | Another local profile's Bot Chat |

## Notes

- Cron jobs run in fresh sessions with no memory of the current chat; prompts must be fully self-contained (persistent memory does load, but do not rely on it for job-critical details).
- Respond with only `[SILENT]` when nothing changed; cron treats it as the delivery-suppression marker. It applies to successful runs only.
- Hard failures post a `⚠️ Cron 'X' failed…` notice to the delivery target; `--failure-deliver local` suppresses it, `--failure-deliver slack:C_OPS` redirects it. Omit to follow `--deliver`.
- Zero-token alternatives: script-only cron jobs (no LLM) and `hermes send` for one-shot piping.
- Bot Chat delivery is machine-local (profile must exist, `hermes profile list`), costs a full bot turn per delivery, is combinable (`--deliver bot-chat,telegram`), and `all` never expands to bot-chat targets.
- Schedule formats: relative delays (`30m`), intervals (`every 2h`), cron expressions (`0 9 * * *`), ISO timestamps (`2025-06-15T09:00:00`). Natural language like `daily at 9am` is not supported.
- Skills load in the order given before the prompt runs.
- Test with `/cron run <job_id>` before waiting for the schedule.

## Related

- [daily-briefing-bot](./daily-briefing-bot.md)
- [cron-script-only](./cron-script-only.md)
- [pipe-script-output](./pipe-script-output.md)
- [cron-troubleshooting](./cron-troubleshooting.md)
