<!-- source: https://code.claude.com/docs/en/costs.md / last verified: 2026-10-16 -->

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
- `/usage` cost figures are computed locally from token counts at list price (responses billed at the 1.1x data residency rate are multiplied by 1.1, and that figure also counts toward `--max-budget-usd`) and may differ from actual billing; the Claude Console Usage page is authoritative. Totals reset when `/clear` starts a new session (before v2.1.211 they accumulated across `/clear` for the life of the process).
- Report spend at contracted rates: set the `modelPricing` managed setting (v2.1.242+) with `multiplier` below 1 for a flat discount or above 1 for a markup (markup needs v2.1.271+), and/or per-model four per-token rates under `overrides`. Deliver it as managed settings (server-managed, MDM, `managed-settings.json`, or policy helper); Claude Code ignores the key in user, project, and local settings and `--settings`. Claude Code doesn't fetch rates from the Console, so update it when the contract changes. With it in effect the `Total cost` line carries the note `at your organization's configured rates`; figures remain estimates, and the `/model` picker prices stay at list price. A cached `modelPricing` applies only after the server-managed fetch confirms the payload.
- Prompt cache statistics (v2.1.251+): after the main conversation's first API response the Session block adds a `Prompt cache (main)` line (request count, share of input tokens from cache, misses with the time of the last miss and tokens re-cached, expected rebuilds after compaction or tool-result clearing, and warm/cold with the TTL in effect). A likely-cause note for the last miss needs v2.1.260+. Main conversation only (not subagents); works on every provider and gateway; status line scripts read the same numbers from the `prompt_cache` object.
- Plan usage breakdown on `/usage` (Pro, Max, Team, Enterprise): Attribution (skills, subagents, plugins, MCP servers as a percentage of total), Behavior flags (long context, cache misses; flagged at 10% or more of recent usage), and Loops (heaviest `/loop` / scheduled tasks, v2.1.242+); `d` / `w` switch between 24 hours and 7 days; figures are computed from local session history on this machine. When the usage request fails, `/usage` shows last-known bars from the past 60 minutes and `r` retries.
- Usage credits: `/usage-credits` (claude.ai authentication only; v2.1.248+ in self-serve Enterprise, Enterprise trials, and Enterprise billed through AWS Marketplace) opens Settings > Usage for Pro and Max, Organization settings > Usage for Team/Enterprise members with billing access, and for members without billing access asks to confirm then sends a request to admins (confirmation step since v2.1.211). `/usage` shows a usage-credits row (Pro/Max: month spend against your limit or `Unlimited`; Team/Enterprise: your own spend against any limit that applies to you; row shown with a limit from v2.1.236).
- When a developer asks about a limit: "session limit" / "weekly limit" is a seat-based window shared across models (switching models doesn't help, except after a model-specific Opus/Sonnet limit message); `/usage-credits` requests spend beyond the allowance; v2.1.234+ can wait and continue after reset (`autoContinueAtUsageLimit` in managed settings controls it fleet-wide). "individual spend limit" / "org's monthly spend limit" / "team's shared budget" means usage credits hit a limit you set: raise it under Organization settings > Usage. A Claude apps gateway spend message means a gateway cap. A context/auto-compact warning isn't a usage limit.
- Background token usage: summarization jobs for `claude --resume` and commands like `/usage` use a small amount (typically under $0.04 per session) even when idle; prompt suggestions add a short cache-reusing request after each response (skipped near or at a usage limit; turn off in interactive-mode settings).
- Reduce token usage via: `/clear` between unrelated tasks, custom compaction instructions, choosing Sonnet over Opus, disabling unused MCP servers, code intelligence plugins, offloading to hooks/skills, moving CLAUDE.md content to skills (keep under 200 lines), adjusting extended thinking effort/budget, delegating verbose operations to subagents.
- Agent teams use ~7x more tokens than standard sessions in plan mode since each teammate maintains its own context window; keep teams small.
- Long-session usage spikes trace to: long context resent each turn, cache misses after breaks longer than the cache lifetime (1 hour on a subscription; 5 minutes once you draw on usage credits; 5 minutes by default on an API key or cloud provider; you can choose the TTL yourself to keep 1 hour while drawing on usage credits), scheduled tasks firing while idle, cross-session messages delivered to an idle session (hold them with `crossSessionInbound: hold`), goal check-ins (at most three idle check-ins per goal, v2.1.246+; `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` turns them off, v2.1.236+), subagents and workflows, active agent teammates, or large `/compact` operations.

## Related

- [monitoring-usage](./monitoring-usage.md)
- [analytics](./analytics.md)
- [large-codebases](./large-codebases.md)
