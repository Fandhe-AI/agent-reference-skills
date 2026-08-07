# Scan code changes for security

Review a pull request or local diff for security regressions.

```text
Use $codex-security:security-diff-scan to review this PR, commit, branch diff, or working-tree patch for security regressions.

Scope and rules:
- Target: [this pull request / commit SHA / branch diff from BASE to HEAD / the current working-tree patch]
- I am authorized to assess this repository and change set.
- Pay particular attention to [auth, input handling, secrets, filesystem, network, dependencies, or other sensitive surface].

Return the final Markdown report and inline code comments for findings that require human review.
```

## Notes

- Source: OpenAI Codex use-case (learn.chatgpt.com). `suggestedEffort: high`. Uses the `$codex-security:security-diff-scan` skill
- Best for: pull requests touching authentication, authorization, parsing, file access, secrets, or privileged workflows; a security-focused check before merge
- Related: Review GitHub pull requests (`github-code-reviews.md`), Agent approvals and security (https://learn.chatgpt.com/codex/agent-approvals-security)
