<!-- source: https://code.claude.com/docs/en/code-review-local.md / last verified: 2026-10-17 -->

# Review locally with /code-review

Run `/code-review` in a Claude Code session to find bugs in your branch's changes, point the review at a pull request or path, and have Claude apply the fixes. Works on any plan; the review runs in your own session and counts toward your plan usage or API billing.

## Signature / Usage

```text
/code-review
/code-review --fix
/code-review --comment
/code-review HEAD~15..HEAD
/code-review main...my-feature
/code-review 1234
/code-review src/auth
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| (no target) | target | Reviews your branch's commits ahead of its upstream plus uncommitted changes. With no upstream, compares against `main`, or against the previous commit |
| `HEAD~15..HEAD` | target | Last 15 commits |
| `main...my-feature` | target | One branch against another |
| `abc1234^..abc1234` | target | A single commit (`abc1234` is the commit hash) |
| `1234` | target | A pull request by number |
| `src/auth` | target | A file or directory path |
| `--fix` | flag | Also asks Claude to apply the findings to your working tree after the review; edits go through your permission mode |
| `--comment` | flag | Posts findings on a GitHub pull request as inline comments, or on a GitLab merge request as a single note |
| `--post` | flag | On an `ultra` cloud review of a `github.com` pull request, preselects posting the finished findings to the PR in the launch dialog. Requires Claude Code v2.1.227 or later |
| `--max-findings <n>` / `all` / `default` | flag | Reports up to `n` findings, or every finding with `all`, in place of the usual limit (32 where the review reports through the findings tool). Later reviews reuse the typed value until `default`; a value passed in a non-interactive `-p` run isn't remembered. Requires v2.1.288 or later |
| effort level (`low` to `max`) | argument | `low` reports only the most confident findings (fewer false positives); `medium` through `max` broaden coverage. With no level typed, the last level typed is reused, even from an earlier session |

## Notes

- `/review` is an alias of `/code-review`. Before v2.1.223, `/review` was a separate command that ran a single-pass, read-only review of a GitHub pull request.
- The review runs as a background subagent with its own context window; findings arrive in the conversation when complete. Before v2.1.218, the review ran inside your conversation.
- Without `--fix` the review asks Claude for a report only. A background review's `--fix` edits are applied outside the session's checkpoints, so `/rewind` restores only files already edited in the conversation; use git to revert the rest.
- The review follows your `CLAUDE.md`, including in a non-interactive `-p` run. It does not read `REVIEW.md`, which configures the managed Code Review service.
- Findings are reported as text in a terminal session and in a `-p` run. In a host application that requests the findings list (such as the desktop app), they are reported through the `ReportFindings` tool (requires v2.1.218 or later).
- Effort level rules: typing a level changes what later runs reuse; a level passed in `-p` doesn't update the remembered level; `ultra` neither uses nor updates it. Before v2.1.223, a `/code-review` without a level always used the session's current effort.
- GitLab: `--comment` posts through the `glab` CLI (requires v2.1.257 or later); without `glab` the findings print in the terminal. Pass the MR as a URL or `!123`; a bare number or branch name is treated as an MR only when origin is on `gitlab.com`.
- With `ultra`, a single word is read as a base branch or PR number; longer text becomes a note attached to the review. Without `ultra`, everything left is the review target, even when it starts with another command name (before v2.1.218, a stacked command expanded as its own skill).
- Foreground runs: use non-interactive mode (`-p` or Agent SDK; except `ultra`, which doesn't wait for the cloud review), set `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` to `1` (also disables every other background task feature), or run `/code-review` again while an earlier review is in progress.
- Claude can start `/code-review` itself when asked in plain language or from a scheduled task (a scheduled task never launches the cloud review, so omit `ultra`). Before v2.1.246 this worked only where a feature flag fetched from Anthropic turned it on.
- `/code-review ultra --fix` runs the cloud ultrareview, then applies findings locally. Ultrareview needs claude.ai auth; it is unavailable on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, with Zero Data Retention, the HIPAA configuration, or customer-managed encryption keys (CMEK) — `/code-review ultra` runs a local review instead.
- `/code-review` is a bundled skill with no `SKILL.md` on disk. A project or personal skill named `code-review` replaces it (the `/review` alias keeps running the bundled review). The command was named `/simplify` before v2.1.147, when it applied fixes by default; for bug-finding scripts switch to `/code-review --fix`.

To stop Claude and scheduled tasks from starting the review while keeping it available for you to type:

```json
{
  "skillOverrides": {
    "code-review": "user-invocable-only"
  }
}
```

## Related

- [Code Review](./code-review.md)
- [Ultrareview](./ultrareview.md)
- [Customize Code Review](./code-review-customize.md)
