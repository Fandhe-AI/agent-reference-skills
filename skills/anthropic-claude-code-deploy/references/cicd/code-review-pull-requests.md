<!-- source: https://code.claude.com/docs/en/code-review-pull-requests.md / last verified: 2026-11-14 -->

# Read and request reviews on a pull request

Read Code Review findings on your GitHub pull request, respond to or dismiss them, and request a review with `@claude review`. Findings appear as inline comments, a review-body summary, and a check run named **Claude Code Review**. A review never approves or blocks your PR.

## Signature / Usage

```text
@claude review
@claude review always
@claude review once
@claude review stop
```

Read severity counts from the check run in your own CI. The last line of the Details text is an HTML comment holding the counts as JSON:

```text
<!-- bughunter-severity: {"nit":1,"normal":2,"pre_existing":0} -->
```

```bash
gh api repos/OWNER/REPO/commits/<commit-sha>/check-runs --jq '.check_runs[] | {id, name}'

gh api repos/OWNER/REPO/check-runs/CHECK_RUN_ID --jq '
  (.output.text | split("\n") | last
    | scan("^<!-- bughunter-severity: (.*) -->$")[0] | fromjson)?
  // error("no severity line")'
```

## Options / Props

Severity levels:

| Marker | Severity | Meaning |
|--------|----------|---------|
| 🔴 | Important | A bug that should be fixed before merging |
| 🟡 | Nit | A minor issue, worth fixing but not blocking |
| 🟣 | Pre-existing | A bug that exists in the codebase but wasn't introduced by this PR |

Comment commands:

| Command | What it does | When to use it |
|---------|--------------|----------------|
| `@claude review` | Starts a single review without subscribing the PR to future pushes | One review now, e.g., in a Manual repository, or another right away in other modes |
| `@claude review always` | Starts a review and subscribes the PR to push-triggered reviews going forward | Every later push should start a fresh review |
| `@claude review once` | Same as `@claude review` | Same cases as `@claude review` |
| `@claude review stop` | Ends the PR's subscription to push-triggered reviews, without starting a review or canceling one that's already running; Claude replies with a comment instead of a check run | A PR subscribed with `@claude review always` in a Manual or Once after PR creation repository, where you no longer want each push to start a review |
| `@claude review off` / `@claude review pause` | Same as `@claude review stop` | Same cases as `@claude review stop` |

## Notes

- Respond: resolve the thread on GitHub to dismiss without a code change (replying alone doesn't dismiss); push a fix and the next review resolves its earlier thread when it judges the issue fixed; a reply doesn't start a review, but the next review reads replies on earlier findings and can resolve the thread or post one follow-up reply. If branch protection requires conversation resolution, resolve each finding's thread before merging.
- Each finding may carry a collapsed **Why this was flagged** section when the review recorded its reasoning.
- Check run **Details** shows one severity-sorted table (File:Line / Issue), including findings whose inline comment GitHub didn't accept; those with a line appear as annotations in **Files changed** (Important red, nits yellow, pre-existing gray). The check run concludes as neutral, or skipped when an automatic review didn't run because a push changed no files; never as failure.
- Script reading: the last line of the Details text is a machine-readable comment; take the counts from the last line only (the lines above can include file names from the PR). If the commit has had more than one `Claude Code Review` run (e.g., after **Re-run**), GitHub lists only the newest. The JSON has keys like `{"nit": 1, "normal": 2, "pre_existing": 0}` (alphabetical); `normal` is the count of Important findings. Except on a check run that kept an earlier result, counts include findings from earlier reviews whose threads are still open.
- Handle these cases in order: title starts with `Code review not repeated` (an earlier result with open Important findings was kept; no severity line; read the title with `--jq .output.title`; fail the job to gate the merge); title ends with `no new changes` (pass without reading counts; the counts then leave out nits and pre-existing findings from earlier reviews); `normal` above zero (fail to gate the merge; add `| .normal` before the closing single quote to print only that count); line missing (the command prints an error containing `no severity line` and exits non-zero; treat as no verdict, not zero findings — failed, timed-out, canceled, or superseded reviews have none, and some completed reviews have none either).
- When a push keeps the earlier result: check run title **Code review skipped — no new changes** (no Important finding from the earlier review is still open) or **Code review not repeated — earlier findings still open** (push a fix for an open Important finding, or resolve its thread and push again). On github.com this happens when the PR still adds and removes the same lines (empty commit, clean base merge, clean rebase) and nobody has resolved an Important finding's thread since that review. To get a review without a code change, comment `@claude review` or click **Re-run**; **Re-run** after a kept-result push works on non-fork PRs.
- After `stop`/`off`/`pause`: in an **After every push** repository you can't stop reviews with a comment (pushes start reviews with or without a subscription); convert the PR to a draft, and marking it ready starts a review.
- A later review's body can include a sentence counting what it left out: "outside the scope of this re-review and not posted" (findings on unchanged code) or "found and not posted" (nits and pre-existing findings).
- Source: https://code.claude.com/docs/en/code-review-pull-requests.md, fetched 2026-11-14
- Ways to get a review: open/reopen/mark ready (repository set to Once or Every push); comment a command; push (Every push, or PR subscribed via `always`); click **Re-run** after a failure or timeout on a non-fork PR; or wait for the automatic retry of an interrupted session (retried once).
- Command conditions: new top-level PR comment (not inline, not a review body, editing doesn't count); the whole command on one line at the start of the comment, other text may follow (a misspelled or later-line `always` / `stop` is read as a plain `@claude review`; case-insensitive); write, maintain, or admin permission (comments from bots don't start reviews); PR must be open. On acceptance a check run titled **Code review queued...** appears, changing to **Code review in progress...**. The 👀 reaction can appear when no review starts. A request doesn't start a second review while one runs on the latest commit.
- Before a July 2026 update, `@claude review` subscribed the PR to push-triggered reviews; use `@claude review always` for that behavior.
- A later automatic review (e.g., after a push) focuses on what changed since the last review and posts fewer nits and pre-existing findings; `@claude review` covers the whole PR again.
- Drafts and fork PRs are skipped by automatic reviews. Comment commands run on a draft; pushes to a draft don't start reviews even after `always` (subscription takes effect once marked ready). On a fork PR, a command needs write access to the base repository, `always` works but doesn't subscribe to later pushes, and **Re-run** doesn't start a review.
- If the repository also runs the Claude Code GitHub Action in interactive mode with its default `@claude` trigger phrase, `@claude review` starts the Action as well; set the Action's `trigger_phrase` input to a different phrase to separate them.
- If your plan doesn't include Code Review, use local `/code-review` from a Claude Code session.

## Related

- [Code Review](./code-review.md)
- [Set up Code Review](./code-review-setup.md)
- [Customize Code Review](./code-review-customize.md)
- [Code Review costs and usage](./code-review-costs.md)
- [Troubleshoot Code Review](./code-review-troubleshooting.md)
- [Review locally with /code-review](./code-review-local.md)
- [Claude Code GitHub Actions](./github-actions.md)
