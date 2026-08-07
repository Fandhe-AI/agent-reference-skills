# Save workflows as skills

Create a skill Codex can keep on hand for work you repeat.

```text
Use $skill-creator to create a Codex skill that [fixes failing Buildkite checks on a GitHub PR / turns PR notes into inline review comments / writes our release notes from merged PRs]

Use these sources when creating the skill:
- Working example: [say "use this chat," link a merged PR, or paste a good Codex answer]
- Source: [paste a Slack thread, PR review link, runbook URL, docs URL, or ticket]
- Repo: [repo path, if this skill depends on one repo]
- Scripts or commands to reuse: [test command], [preview command], [log-fetch script], [release command]
- Good output: [paste the Slack update, changelog entry, review comment, ticket, or final answer you want future tasks to match]
```

## Notes

- Source: OpenAI Codex use-case (learn.chatgpt.com). The `$skill-creator` system skill gathers context, scaffolds the skill, and validates the result
- Best for: workflows worth codifying, teams that want a reusable skill instead of pasting a long prompt into every chat
- Related: Agent skills (https://learn.chatgpt.com/codex/build-skills)
