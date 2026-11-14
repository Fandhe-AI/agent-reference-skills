<!-- source: https://code.claude.com/docs/en/ultrareview.md / last verified: 2026-11-14 -->

# Run claude ultrareview non-interactively in CI

Start a cloud ultrareview from a script, wait for the findings on stdout, and branch on the exit code.

```bash
claude ultrareview 1234 --json --post
```

```bash
claude ultrareview
claude ultrareview 1234
claude ultrareview origin/main
```

In a CI job that can't answer the `Trust <folder>? [y/N]` prompt (otherwise it exits with `Error: Workspace not trusted`):

```bash
claude ultrareview 1234 --trust-workspace
```

## Notes

- Exit codes: `0` the review completed (with or without findings), `1` failed to launch, stopped, cloud session errored, or timeout elapsed, `130` interrupted with Ctrl-C.
- `--json` prints the raw `bugs.json` payload instead of formatted findings; progress goes to stderr so stdout stays parseable. `--timeout <minutes>` defaults to 45.
- `--post` posts the finished findings to the PR as one plain comment from your GitHub account (`github.com` PR targets only; requires Claude Code v2.1.227 or later). `--no-post` is the default, and if both are passed nothing is posted. On failure or timeout nothing is posted.
- Use the subcommand in scripts, not `claude -p '/code-review ultra'`: the `-p` run launches the cloud review and exits without the findings. If the subcommand exits early, rerunning starts a new review (free run or usage credits) rather than resuming.
- `--trust-workspace` (Claude Code v2.1.309 or later) trusts the current folder for this run only, without asking; it takes no value, so put the PR number or base branch before it. Trust a folder only if you trust its code (git and Claude Code can run programs named in its git configuration and project settings). To review an untrusted PR, run it from a branch you trust; the PR is cloned in the cloud. Exit code 1 also covers an untrusted folder (answering `n`, Enter, or Ctrl-C at the trust question); 130 is Ctrl-C while launching, waiting, or sending the `--post` comment.
- Source: https://code.claude.com/docs/en/ultrareview.md, fetched 2026-11-14
- Running the subcommand yourself counts as consent to the billing prompt and the whole-repository fallback; Claude Code refuses the whole-repository review when Claude runs it for you through the Bash tool.
