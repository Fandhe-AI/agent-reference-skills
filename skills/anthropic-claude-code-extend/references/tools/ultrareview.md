<!-- source: https://code.claude.com/docs/en/ultrareview / last verified: 2026-08-07 -->

# Ultrareview

Research-preview deep code review that runs on Claude Code on the web infrastructure. `/code-review ultra` launches a fleet of reviewer agents in a remote sandbox to find bugs in your branch or pull request, with every finding independently reproduced and verified. Requires claude.ai authentication; not available on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or for organizations with Zero Data Retention enabled (falls back to a local review there).

## Signature / Usage

```text
/code-review ultra
/code-review ultra develop
/code-review ultra 1234
/code-review ultra check my auth changes
```

```bash
claude ultrareview
claude ultrareview 1234
claude ultrareview origin/main
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `/code-review ultra [base\|pr#\|note]` | command | No argument reviews current branch vs. default branch; a branch name compares against that base; a PR number/`#N`/URL reviews a pull request; free-text (2+ words) is kept as a note |
| `claude ultrareview [pr\|branch]` | CLI subcommand | Same review, blocks until findings arrive, prints to stdout, exit 0/1 |
| `--json` | flag | Print raw `bugs.json` instead of formatted findings (subcommand only) |
| `--timeout <minutes>` | flag | Max wait for the review; default 30 (subcommand only) |

Diff limits: up to 500 changed files / 8,000 changed lines for a branch review by default (exact refusal names current limits); no merge base falls back to reviewing every tracked file.

Pricing: Pro/Max get 3 free runs (one-time, don't refresh); Team/Enterprise have none. After free runs, billed as usage credits (~$5–$25 per review depending on size); a stopped or failed review still consumes a free run.

## Notes

- Alias `/ultrareview` is available once ultrareview is enabled for the account.
- A review typically takes 5–10 minutes and runs as a background task; track/stop with `/tasks`.
- `/code-review ultra` in a non-interactive session (v2.1.218+) launches and prints a tracking link without blocking; use `claude ultrareview` to block until findings arrive. When billing confirmation is needed, the non-interactive path stops and points to `claude ultrareview` instead.
- Distinct from local `/code-review`: local runs in-session in seconds to minutes at normal usage cost; ultrareview runs remotely over ~5–10 minutes with independent verification and usage-credit billing.

## Related

- [advisor.md](./advisor.md) — another server-side second-opinion mechanism, but consulted mid-task rather than as a pre-merge review
- [tools-reference.md](./tools-reference.md) — `Agent` tool for local subagents, as contrasted with ultrareview's remote reviewer fleet
