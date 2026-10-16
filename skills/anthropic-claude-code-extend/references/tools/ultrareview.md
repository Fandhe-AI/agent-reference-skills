<!-- source: https://code.claude.com/docs/en/ultrareview / last verified: 2026-10-17 -->

# Ultrareview

Research-preview deep code review that runs on Claude Code on the web infrastructure. `/code-review ultra` launches a fleet of reviewer agents in a remote sandbox to find bugs in your branch or pull request, with every finding independently reproduced and verified. Requires claude.ai authentication; not available on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or for organizations with Zero Data Retention enabled or the HIPAA configuration applied (falls back to a local review there). Organizations that use customer-managed encryption keys (CMEK) can't run ultrareview (run `/code-review` locally instead).

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
| `claude ultrareview [pr\|branch]` | CLI subcommand | Same review, blocks until findings arrive, prints to stdout, exit 0/1/130 |
| `--json` | flag | Print raw `bugs.json` instead of formatted findings (subcommand only) |
| `--timeout <minutes>` | flag | Max wait for the review; default 45 (subcommand only) |
| `--post` | flag | Post the finished findings to a `github.com` PR as one plain comment from your own GitHub account; other targets ignore the flag. Requires v2.1.227+ |
| `--no-post` | flag | Don't post (the default; if both flags are passed, nothing is posted). Requires v2.1.227+ |

Interactive posting: in the launch dialog, select **Run and post the findings to the PR as me**. Adding `--post` to the command (`/code-review ultra 1234 --post`) preselects that choice and still asks before launching.

Subcommand exit codes: **0** review completed (with or without findings); **1** failed to launch / stopped before finishing / cloud session errored / timeout elapsed; **130** interrupted with Ctrl-C.

Diff limits: up to 500 changed files / 8,000 changed lines for a branch review by default (exact refusal names current limits); no merge base falls back to reviewing every tracked file.

Pricing: Pro/Max get 3 free runs (one-time, don't refresh). After free runs, billed as usage credits (~$5–$25 per review depending on size); a stopped or failed review still consumes a free run. Paid runs need usage credits turned on (otherwise the launch is blocked; check or change with `/usage-credits`), and billing is confirmed once per conversation (again after `/clear`).

## Notes

- Alias `/ultrareview` is available once ultrareview is enabled for the account.
- A review typically takes 15–25 minutes and runs as a background task; track/stop with `/tasks`.
- Posting (`--post`) is not available on third-party providers or when `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` is set. PR mode needs a `github.com` repository; GitHub Enterprise Server is not supported (run without a PR number to review the local branch).
- First commit (v2.1.277+): a repository's first commit is reviewed whole only after confirmation in the launch dialog; the `claude ultrareview` subcommand and `claude -p` refuse it. A checkout with no branches or other refs (e.g. detached HEAD from `FETCH_HEAD`) is refused; create a branch first.
- When Claude runs `claude ultrareview` for you (e.g. through the Bash tool), Claude Code refuses the whole-repository review; running it yourself counts as consent.
- `/code-review ultra` in a non-interactive session (v2.1.218+) launches and prints a tracking link without blocking; use `claude ultrareview` to block until findings arrive. When billing confirmation is needed, the non-interactive path stops and points to `claude ultrareview` instead.
- Distinct from local `/code-review`: local runs in-session in seconds to minutes at normal usage cost; ultrareview runs remotely over ~15–25 minutes with independent verification and usage-credit billing.

## Related

- [advisor.md](./advisor.md) — another server-side second-opinion mechanism, but consulted mid-task rather than as a pre-merge review
- [tools-reference.md](./tools-reference.md) — `Agent` tool for local subagents, as contrasted with ultrareview's remote reviewer fleet
