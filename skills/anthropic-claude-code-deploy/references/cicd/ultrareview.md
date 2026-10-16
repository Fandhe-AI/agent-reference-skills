<!-- source: https://code.claude.com/docs/en/ultrareview.md / last verified: 2026-10-16 -->

# Find bugs with ultrareview

Deep, multi-agent code review that runs as a cloud session on Anthropic's infrastructure. `/code-review ultra` (when ultrareview is available to your account, `/ultrareview` is an alias) launches a fleet of reviewer agents in a cloud sandbox to find and independently verify bugs in a branch or pull request. Research preview: the feature, pricing, and availability may change.

## Signature / Usage

```text
/code-review ultra
/code-review ultra develop
/code-review ultra 1234
/code-review ultra 1234 --post
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
| `<base-branch>` / commit id / tag | branch review | Reviews current branch against the given base instead of the default branch; a branch is fetched from `origin` even if absent locally; a commit id or tag covers changes on your branch since that commit |
| `<PR-number>` / `#1234` / `PR 1234` / PR URL | PR review | Clones the PR from `github.com`; no local upload. A pasted URL must point to the repository in your current directory |
| free-text note (v2.1.218+) | plain-words request | Reviews the current branch (same scope as no argument); a note needs more than one word and must not be a branch name or PR reference |
| `--json` | `claude ultrareview` flag | Prints the raw `bugs.json` payload instead of formatted findings |
| `--timeout <minutes>` | `claude ultrareview` flag | Maximum minutes to wait for the review; default 45 |
| `--post` | `claude ultrareview` flag / `/code-review ultra` arg | Posts the finished findings to a `github.com` pull request as one plain comment from your GitHub account; ignored with a notice on other targets. Requires v2.1.227+ |
| `--no-post` | `claude ultrareview` flag | Don't post (the default); if both flags are passed, nothing is posted. Requires v2.1.227+ |

## Notes

- Requires claude.ai account auth (`/login`). Unavailable with Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, Zero Data Retention, or the HIPAA configuration; in those cases `/code-review ultra` runs a local review instead. Organizations using customer-managed encryption keys (CMEK) can't run ultrareview; use `/code-review`.
- PR mode needs a repository on `github.com`. For a GitHub Enterprise Server repository, run `/code-review ultra` without a PR number to review the local branch. PR mode uses the GitHub account connected to your Claude account (needs read access); run `/web-setup` to connect your GitHub CLI login.
- Posting: `--no-post` is the default and posting is chosen per run. Interactive: select "Run and post the findings to the PR as me" in the launch dialog (`--post` preselects it and still asks). Non-interactive: `claude ultrareview --post` posts without asking; `claude -p '/code-review ultra'` exits before findings arrive and posts nothing. The post is made through the Anthropic API (not from your machine), isn't available on third-party providers or with `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, and is lost if the interactive session ends before the review finishes. Outcomes: Posted (link to comment), Already posted (link to the pull request), Failed (findings stay in your terminal).
- Diff limits: branch review up to 500 changed files / 8,000 changed lines by default; oversized PRs are refused the same way. Nothing to review (empty diff) is refused with the compared branch/commit named. No merge base falls back to reviewing every tracked file (full clone, same limits, needs launch-dialog confirmation or the `claude ultrareview` subcommand; refused in `claude -p`). A checkout with no branches, such as a detached HEAD, is refused.
- First commit: reviewed whole only after confirming in the launch dialog; refused if untracked files exist; the `claude ultrareview` subcommand and `claude -p` refuse it (v2.1.277+).
- When Claude runs the `claude ultrareview` subcommand for you (for example through the Bash tool), Claude Code refuses the whole-repository review.
- Pricing: the table lists Pro and Max with 3 free runs each (one-time per account, no refresh); after that billed as usage credits, typically $5 to $25 depending on change size. A run counts once the cloud session starts; a stopped or failed review still uses a free run, and a paid review bills only for the portion that ran. Usage credits must be turned on to launch a paid review; check with `/usage-credits`. Billing is confirmed once per conversation (again after `/clear`).
- A review typically takes 15 to 25 minutes and runs as a background task; use `/tasks` to track, view, or stop it. Stopping archives the cloud session and returns no partial findings. Claude reports a review as stopped (session stopped or archived) or not found (session deleted, or a different account/organization is signed in); after switching accounts, sign back in and use `claude --resume` to re-attach.
- `claude ultrareview` blocks until the remote review finishes and exits 0 (completed) / 1 (failed to launch, stopped, session error, or timeout) / 130 (Ctrl-C); progress goes to stderr so stdout stays parseable as `--json`. Re-running starts a new review. Before v2.1.218, `/code-review ultra` in a non-interactive session ran a local review.
- How it compares to `/code-review`:

| | `/code-review` | `/code-review ultra` |
| - | - | - |
| Target | working diff, a pull request, a branch, or a path | working diff or a pull request |
| Runs | locally in your session | in a cloud sandbox |
| Depth | scales with the effort argument | multi-agent fleet with independent verification |
| Duration | seconds to a few minutes | roughly 15 to 25 minutes |
| Cost | counts toward normal usage | free runs, then roughly $5 to $25 per review as usage credits |
| Best for | quick feedback while iterating | pre-merge confidence on substantial changes |

## Related

- [Code Review](./code-review.md)
- [Review locally with /code-review](./code-review-local.md)
