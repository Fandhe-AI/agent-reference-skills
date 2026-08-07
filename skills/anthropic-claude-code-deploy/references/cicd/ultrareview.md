<!-- source: https://code.claude.com/docs/en/ultrareview.md / last verified: 2026-08-07 -->

# Find bugs with ultrareview

Deep, multi-agent code review that runs on Claude Code on the web infrastructure. `/code-review ultra` (alias `/ultrareview`) launches a fleet of reviewer agents in a remote sandbox to find and independently verify bugs in a branch or pull request. Research preview.

## Signature / Usage

```text
/code-review ultra
/code-review ultra develop
/code-review ultra 1234
/code-review ultra check my auth changes
```

Non-interactive (CI/script):

```bash
claude ultrareview
claude ultrareview 1234
claude ultrareview origin/main
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| (no argument) | branch review | Diffs current branch against the default branch, including uncommitted/staged changes |
| `<base-branch>` | branch review | Reviews current branch against the given base instead of the default branch; fetched from `origin` even if absent locally |
| `<PR-number>` / `#1234` / `PR 1234` / PR URL | PR review | Clones the PR directly from the host; no local upload. Works on `github.com` and connected GitHub Enterprise Server |
| free-text note (v2.1.218+) | plain-words request | Reviews the current branch (same scope as no argument); text is kept as a note and related to findings |
| `--json` | `claude ultrareview` flag | Prints the raw `bugs.json` payload instead of formatted findings |
| `--timeout <minutes>` | `claude ultrareview` flag | Maximum minutes to wait for the review; default 30 |

## Notes

- Requires claude.ai account auth (`/login`); unavailable with Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or Zero Data Retention orgs — falls back to a local review when unavailable.
- Diff limits: branch review up to 500 changed files / 8,000 changed lines by default; oversized PRs are refused the same way. No merge base falls back to reviewing every tracked file (full clone, same limits).
- Pricing: Pro/Max get 3 one-time free runs; Team/Enterprise none. After free runs, bills as usage credits (~$5–25/review); requires usage credits turned on.
- Review typically takes 5–10 minutes, runs as a background task; use `/tasks` to track, view, or stop it. Stopping discards partial findings.
- `claude ultrareview` blocks until the remote review finishes and exits 0 (success) / 1 (failure/timeout) / 130 (Ctrl-C interrupt); progress goes to stderr so stdout stays parseable as `--json`. Before v2.1.218, `/code-review ultra` in a non-interactive session ran a local review instead of the cloud one.

## Related

- [Code Review](./code-review.md)
