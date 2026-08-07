<!-- source: https://code.claude.com/docs/en/costs.md / last verified: 2026-08-07 -->

# Manage costs effectively

Track token usage, set team spend limits, and reduce Claude Code costs with context management, model selection, extended thinking settings, and preprocessing hooks.

## Signature / Usage

```text
/usage           # session cost, plan usage breakdown (Attribution, Behavior flags)
/usage-credits    # manage usage credits past plan limit (claude.ai auth only)
/model            # switch models mid-session
/effort           # adjust reasoning effort level
/compact Focus on code samples and API usage   # custom compaction instructions
```

Rate limit recommendations by team size (TPM/RPM per user): 1-5 users 200k-300k/5-7, 5-20 users 100k-150k/2.5-3.5, 20-50 users 50k-75k/1.25-1.75, 50-100 users 25k-35k/0.62-0.87, 100-500 users 15k-20k/0.37-0.47, 500+ users 10k-15k/0.25-0.35.

## Options / Props

| Setup | See spend | Cap spend | Per-user reporting |
| --- | --- | --- | --- |
| Claude for Teams/Enterprise | Spend report in org analytics | Spend limits in admin settings | Spend report CSV; Enterprise Analytics API |
| Claude Console (API) | Console usage page | Workspace spend limits | Console dashboard; Claude Code Analytics API |
| Amazon Bedrock / Agent Platform / Foundry | Cloud billing console | Cloud budget controls | OpenTelemetry or LLM gateway |

## Notes

- Average enterprise cost is around $13/developer/active day, $150-250/developer/month; below $30/active day for 90% of users.
- `/usage` cost figures use local standard list-rate pricing and may differ from actual billing; the Claude Console Usage page is authoritative.
- Reduce token usage via: `/clear` between unrelated tasks, custom compaction instructions, choosing Sonnet over Opus, disabling unused MCP servers, code intelligence plugins, offloading to hooks/skills, moving CLAUDE.md content to skills (keep under 200 lines), adjusting extended thinking effort/budget, delegating verbose operations to subagents.
- Agent teams use ~7x more tokens than standard sessions in plan mode since each teammate maintains its own context window; keep teams small.
- Long-session usage spikes trace to: long context resent each turn, cache misses after breaks longer than the cache lifetime (1hr subscription / 5min API or post-usage-credits), scheduled tasks firing while idle, active agent teammates, or large `/compact` operations.

## Related

- [monitoring-usage](./monitoring-usage.md)
- [analytics](./analytics.md)
- [large-codebases](./large-codebases.md)
