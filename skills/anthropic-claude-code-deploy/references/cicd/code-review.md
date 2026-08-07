<!-- source: https://code.claude.com/docs/en/code-review.md / last verified: 2026-08-07 -->

# Code Review

Automated PR reviews that catch logic errors, security vulnerabilities, and regressions using multi-agent analysis of the full codebase. Findings post as inline GitHub comments and don't block merges. Research preview, Team/Enterprise plans; not available with Zero Data Retention.

## Signature / Usage

```text
@claude review
@claude review always
```

Local, no GitHub App required:

```text
/code-review
/code-review --fix
/code-review --comment
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `@claude review` | comment command | Starts a single review without subscribing the PR to future pushes |
| `@claude review always` | comment command | Starts a review and subscribes the PR to push-triggered reviews going forward |
| `@claude review once` | comment command | Same as `@claude review` |
| Once after PR creation | trigger mode | Review runs once when a PR opens or is marked ready |
| After every push | trigger mode | Review runs on every push, auto-resolving threads when issues are fixed |
| Manual | trigger mode | Reviews start only via comment command |
| `CLAUDE.md` | guidance file | Project instructions; newly introduced violations are flagged as nit-level findings |
| `REVIEW.md` | guidance file | Review-only instructions injected as highest priority into every review agent; not applied to general Claude Code sessions, `@` imports not expanded |
| `/code-review [target] [--fix] [--comment]` | local command | Reviews branch commits + uncommitted changes, or a given file/PR/branch/ref-range; runs as a background subagent by default |
| `/code-review ultra` | local command | Escalates to the deeper cloud ultrareview; requires claude.ai auth, unavailable on Bedrock/Vertex/Foundry or with Zero Data Retention |

## Notes

- Severity levels: 🔴 Important (fix before merging), 🟡 Nit (minor, non-blocking), 🟣 Pre-existing (bug present before this PR).
- Each review comment ships with 👍/👎 for one-click rating; reactions tune the reviewer but don't trigger a re-review.
- The **Claude Code Review** check run always completes with a neutral conclusion, so it never blocks merges via branch protection; parse its machine-readable `bughunter-severity` JSON via `gh api ... | jq` to gate merges in your own CI.
- Setup (Owner/Primary Owner role): enable from `claude.ai/admin-settings/claude-code`, install the Claude GitHub App, select repositories, and set a Review Behavior per repo (Once/Every push/Manual).
- Pricing: billed per token via usage credits (not plan-included usage), averaging $15-25/review; set a monthly spend cap under `claude.ai/admin-settings/usage`.
- Failed/timed-out reviews don't retry automatically — comment `@claude review` to retrigger; GitHub's Checks tab **Re-run** button does not work for this.

## Related

- [Claude Code GitHub Actions](./github-actions.md)
- [Claude Code GitLab CI/CD](./gitlab-ci-cd.md)
- [Claude Code with GitHub Enterprise Server](./github-enterprise-server.md)
