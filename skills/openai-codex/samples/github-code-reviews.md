# Review GitHub pull requests

Catch regressions and potential issues before human review.

```text
@codex review for security regressions, missing tests, and risky behavior changes.
```

## Notes

- Source: OpenAI Codex use-case (learn.chatgpt.com). `suggestedModel: cloud`. Triggered by mentioning `@codex` on a GitHub pull request
- The `$security-best-practices` skill can narrow the review to risky surfaces such as secrets, auth, and dependency changes
- Best for: teams that want another review signal before human merge approval, large production codebases
- Related: Custom instructions with AGENTS.md (https://learn.chatgpt.com/codex/agent-configuration/agents-md), Scan code changes for security (`scan-code-changes-for-security.md`)
