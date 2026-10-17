# Daily Briefing Bot

Tutorial: build a cron-scheduled bot that researches topics each morning, summarizes them, and delivers the briefing to Telegram or Discord.

## Signature / Usage

Prerequisites: Hermes installed, gateway running (it executes cron), `FIRECRAWL_API_KEY` set for web search, optional messaging home channel.

```bash
hermes gateway install                 # user service
sudo hermes gateway install --system   # Linux servers: boot-time system service
hermes gateway                         # or foreground
```

Test the prompt manually first, then schedule it:

```
/cron add "0 8 * * *" "Search the web for the latest news about AI agents and open source LLMs. Find at least 5 recent articles from the past 24 hours. Summarize the top 3 most important stories in a concise daily briefing format. For each story include: a clear headline, a 2-sentence summary, and the source URL. Use a friendly, professional tone. Format with emoji bullet points and end with a total story count."
```

Variants from the guide:

```
/cron add "0 8 * * 1-5" "Search for the latest AI and tech news..."     # weekdays only
/cron add "0 8 * * *" "Morning briefing: ..."
/cron add "0 18 * * *" "Evening recap: ..."                              # twice daily
```

Management:

```bash
hermes cron list
hermes cron status
```

```
/cron list
/cron remove a1b2c3d4
```

## Notes

- Cron jobs run in a completely fresh session: the prompt must be self-contained (what to search, how many articles, format, tone). "Do my usual morning briefing." is a bad prompt.
- Natural language also works in chat; Hermes creates the job with the unified `cronjob_manage` tool.
- Without messaging, use `deliver: "local"`; output is saved to `~/.hermes/cron/output/`.
- Set a global default model and provider before creating jobs; per-job model/provider overrides are available.
- For parallel research, tell the prompt to delegate each topic to a sub-agent and combine the results.
- Personal context (role, interests, what to skip) must be baked into the prompt because cron sessions have no conversational memory.
- If the gateway is not running, jobs do not execute.
- Source: https://hermes-agent.nousresearch.com/docs/guides/daily-briefing-bot (pinned to v0.22.2)

## Related

- [automate-with-cron](./automate-with-cron.md)
- [delegation-patterns](./delegation-patterns.md)
- [team-telegram-assistant](./team-telegram-assistant.md)
- [tips](./tips.md)
