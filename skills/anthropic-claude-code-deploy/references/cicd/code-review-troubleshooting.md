<!-- source: https://code.claude.com/docs/en/code-review-troubleshooting.md / last verified: 2026-10-17 -->

# Troubleshoot Code Review

Fix a Code Review that didn't start, failed, or was skipped for budget, find missing findings, and resolve setup and `REVIEW.md` problems. Start with the **Claude Code Review** check run; its title says how far the review got.

## Signature / Usage

Recover a failed, timed-out, or skipped review by commenting as a new top-level PR comment:

```text
@claude review
```

## Options / Props

Check run title:

| Check run title | What it means | What to do |
|-----------------|---------------|------------|
| **Code review queued...** / **Code review in progress...** | Review hasn't finished | Wait |
| **Code review found no issues** | Finished, nothing flagged | Nothing |
| A title saying issues were found | Finished with findings | If not visible on the diff, check Details, Files changed annotations, and the review body |
| **Code review skipped — no new changes** | An automatic review didn't run on your latest push | Comment `@claude review` |
| **Code review failed** / **Code review timed out** | Review didn't finish | Retrigger (see Notes) |
| **Code review declined** | Review didn't run | Read the summary; if it names a budget or spend limit, see budget messages |
| No check run | No review started | Comment `@claude review`; if still none, see causes below |

Budget message wording (comment begins "⚠️ Code review skipped", links `claude.ai/admin-settings/usage`):

| Wording | Meaning |
|---------|---------|
| "has reached its monthly code review spending cap" | Code Review monthly limit reached; resumes next billing period or raise the limit |
| "has no extra usage available to pay for this review" | Usage credits balance empty or overall monthly spend limit reached |
| "is too low to start another review" | Remaining budget/balance is less than the expected cost of one review |

## Notes

- A comment command that starts no review: Code Review isn't on for the repository (no comment and no check run; ask an Owner to add it); the comment doesn't meet a condition (inline comment or review body, command not at the start, edited earlier comment, PR not open); no write, maintain, or admin permission (on a fork PR, permission on the base repository counts; with tips on, Claude replies "No review was started: manual reviews can only be requested by someone with write access to this repository."); or the budget ran out. The 👀 reaction doesn't confirm a review is coming.
- After the budget is restored, comment `@claude review` to get the skipped review; the commenter needs write access.
- If the check run summary says "The review session was interrupted before it could finish. A new review of this commit has been queued automatically.", do nothing; it is retried once.
- Retrigger a **Code review failed** / **Code review timed out**: comment `@claude review` (fresh review, no subscription to future pushes), or click **Re-run** on the check in GitHub's **Checks** tab when the PR isn't from a fork (covers the current head commit; no subscription).
- Findings not inline: open **Details** next to the check (severity table with file, line, summary regardless of inline acceptance); the **Files changed** tab (annotations on the lines concerned); or the review body under an **Additional findings** heading (findings with no inline location or outside the current diff).
- `REVIEW.md` messages: "This review applied the repository's review instructions (REVIEW.md) from its default branch, which is not protected against direct pushes." means only the root file was read; "were not applied to this review: branch protection could not be confirmed" means no `REVIEW.md` was read.
- Setup: a repository missing from **Add a repository** — search by name first (the dialog doesn't load a long list in full); it lists only repositories the Claude GitHub App can access, so click **Install GitHub App** and grant access. No check run on the test PR — confirm **Allow code review** is on, the repository is listed under **Repositories**, and the app has access; automatic reviews skip drafts, and a Manual repository needs an `@claude review` comment.

## Related

- [Code Review](./code-review.md)
- [Read and request reviews on a pull request](./code-review-pull-requests.md)
- [Set up Code Review](./code-review-setup.md)
- [Code Review costs and usage](./code-review-costs.md)
- [Customize Code Review](./code-review-customize.md)
