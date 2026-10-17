<!-- source: https://code.claude.com/docs/en/code-review.md / last verified: 2026-10-16 -->

# Code Review

Catch bugs in GitHub pull requests with Code Review: Claude reviews each change, verifies its findings, and comments inline. For Team and Enterprise plans. Several agents read each change alongside the surrounding code, and a verification step checks findings against the code before they're reported. A review never approves or blocks the pull request, so the decision to merge stays with your team.

## Signature / Usage

```text
@claude review
@claude review always
```

Review the local branch without the GitHub App (see `code-review-local.md`):

```text
/code-review
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Find / Verify / Rank / Post | pipeline stages | Several agents examine the diff and surrounding code in parallel; a verification step filters false positives; remaining findings are deduplicated and ranked by severity; results are posted on the pull request |
| Findings | output | Inline comments on the lines concerned, with a summary in the review body |
| `Claude Code Review` | check run | Lists the findings in its details; concludes as neutral, or as skipped when an automatic review didn't run because a push changed no files; never concludes as a failure |
| `Code review found no issues` | check run title | Shown when nothing is found; Claude posts the same short note on the pull request |
| Quick | review level | Lighter pass; fastest and lowest cost |
| Standard | review level | Balanced depth, speed, and cost; the default |
| Deep | review level | Most thorough pass; takes longest and costs the most |
| Comment commands (`@claude review`, `@claude review always`) | PR comment | Start a review; see `code-review-pull-requests.md` |
| `/code-review` | local command | Local review in your Claude Code session; see `code-review-local.md` |
| `REVIEW.md` / `CLAUDE.md` | guidance files | Tune what gets flagged; see `code-review-customize.md` |

## Notes

- Availability: Team and Enterprise plans; repositories on GitHub, including GitHub Enterprise Server and GitHub Enterprise Cloud with data residency (for data residency, an Owner follows the GitHub Enterprise Server admin setup and enters the enterprise's `ghe.com` hostname).
- Not available to organizations with Zero Data Retention enabled or the HIPAA configuration applied, and not covered under Anthropic's Business Associate Agreement (BAA). Not yet available for organizations using customer-managed encryption keys (CMEK).
- A Claude organization on a Team or Enterprise plan is needed even if developers use Claude Code through Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry.
- Default focus is correctness: bugs that would break production, not formatting preferences or missing test coverage.
- Code Review chooses the Claude models; its admin settings don't offer a model choice. Change the review level instead. An Owner chooses one level for the organization and can give an individual repository its own.
- What a review can access: runs on Anthropic infrastructure in a managed environment (not in self-hosted environments); repository access inside a review is read-only and it doesn't push commits; it posts comments and the check run, resolves its own earlier comment threads, and can react to a comment command with 👀; it reads the diff and surrounding code without building or running your code.
- Who controls a review: where reviews run automatically, opening or pushing to a pull request starts a review, except on drafts and forks; a comment command starts one only when it comes from a person with write access; `REVIEW.md` is read from the base or default branch and never from the pull request's own changes.
- `CLAUDE.md` violations become findings at whichever severity level fits the issue. `REVIEW.md` content goes to the agents that find and verify issues alongside the default review guidance, and the step that writes the final review consults it before settling severity and the summary.
- Interrupted review sessions are retried once automatically; **Re-run** in GitHub's Checks tab works for pull requests not from a fork. See `code-review-troubleshooting.md`.
- Billing: there is no flat per-review price; spend depends on each review's cost and how many reviews run. See `code-review-costs.md`.
- Ways to get a review:

| Option | What starts a review | Where it runs | Who can use it |
| :- | :- | :- | :- |
| Code Review | Pull request activity as each repository is set, or an `@claude review` comment | Anthropic infrastructure | Team or Enterprise organizations with GitHub repositories, once an Owner turns it on |
| `/code-review` | You run the command on your branch | Your Claude Code session | Anyone, on any plan |
| Ultrareview | You start it from Claude Code | A cloud sandbox | Requires a claude.ai account sign-in |
| Claude in your own CI (GitHub Actions / GitLab CI/CD) | Your pipeline's events | Your own CI runners | Anyone with a Claude API key or cloud provider credentials |
| Your own reviewer as a subagent or skill | You or Claude invoke it in a session | Wherever you run Claude Code | Anyone who writes one |

## Related

- [Set up Code Review](./code-review-setup.md)
- [Customize Code Review](./code-review-customize.md)
- [Read and request reviews on a pull request](./code-review-pull-requests.md)
- [Code Review costs and usage](./code-review-costs.md)
- [Troubleshoot Code Review](./code-review-troubleshooting.md)
- [Review locally with /code-review](./code-review-local.md)
- [Find bugs with ultrareview](./ultrareview.md)
- [Claude Code GitHub Actions](./github-actions.md)
- [Claude Code GitLab CI/CD](./gitlab-ci-cd.md)
- [Claude Code with GitHub Enterprise Server](./github-enterprise-server.md)
