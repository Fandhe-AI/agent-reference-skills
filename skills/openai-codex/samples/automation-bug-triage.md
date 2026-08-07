# Automate bug triage

Turn daily bug reports into a prioritized list, then automate the sweep.

```text
Run a bug triage sweep for [repo/service/team] covering the last [time window].

Use these plugins: [@Sentry / @Slack / @Linear / @GitHub / none]

Input sources:
- Sentry: [project / alert link / none]
- Slack: [channel / thread links / none]
- Linear: [team / project / view / issue query / none]
- GitHub: [repo / issue query / PR checks / none]
- Other: [logs / support tickets / deploy link / dashboard / attached file / none]

Output format:
First, name any input source you could not access.
Then return a prioritized list of bugs, sorted from P0 to P3.
If you find no bugs, say: No qualifying bugs found.

For each bug, include:
- Priority: P0, P1, P2, or P3
- Title
- Evidence (links or short citations)
- Recommended next action

Rules:
- Do not post, create, assign, label, close, rerun, or edit anything.
- Group duplicate reports under one bug.
- Keep observed evidence separate from guesses.
```

## Notes

- Source: OpenAI Codex use-case (learn.chatgpt.com). Uses the GitHub, `$sentry`, Slack, and Linear plugins to sweep bug sources
- A manual, one-shot triage chat can graduate into a Scheduled task (https://learn.chatgpt.com/codex/automations) for recurring runs
- For internal sources with no existing plugin, use Codex MCP (https://learn.chatgpt.com/codex/extend/mcp) to wire up a small MCP server or CLI
