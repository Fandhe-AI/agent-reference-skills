<!-- source: https://code.claude.com/docs/en/code-review-costs.md / last verified: 2026-10-17 -->

# Code Review costs and usage

Estimate and cap what your organization spends on Claude Code Review: how reviews are billed through usage credits, what drives cost, and where to track usage. There is no flat per-review price.

## Signature / Usage

Limit spend at `https://claude.ai/admin-settings/usage` (configure the limit for the Claude Code Review service; applies to the whole organization). View activity at `https://claude.ai/analytics/code-review`.

Estimating monthly spend from a pilot:

```text
monthly spend = average cost per review x PRs opened per month
(for "After every push": x typical pushes per PR)
```

## Options / Props

Cost drivers:

| Driver | What it depends on |
|--------|--------------------|
| Cost of each review | Review level, size of the change, complexity of surrounding code, number of candidate issues needing verification |
| Number of reviews | Each repository's **Review runs** setting |

Review runs setting and count:

| Setting | Reviews |
|---------|---------|
| Once after PR creation | One when the PR is opened, reopened, or marked ready |
| After every push | One per push (cost multiplied by number of pushes) |
| Manual (@claude review) | None on open or push |

Analytics sections:

| Section | What it shows |
|---------|---------------|
| PRs reviewed | Daily count of PRs reviewed over the selected range |
| Code Review cost | Code Review spend so far this month |
| Feedback | Count of review comments auto-resolved because a developer addressed the issue |
| Repository breakdown | Per-repo PRs reviewed, comments resolved, review runs, estimated cost, and a per-PR view |

## Notes

- Billed on token usage through usage credits, separately from your plan's included usage, to the organization (not the developer who opened the PR or requested the review). Costs appear on your Anthropic bill even if the organization uses Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry for other Claude Code features.
- A repository added from the admin page starts at **After every push**, the setting that runs the most reviews.
- `@claude review always` in Once or Manual mode opts the PR into push-triggered reviews (extra cost per push thereafter); in Every-push mode it doesn't change per-push cost. `@claude review` runs a single review. Drafts and fork PRs are skipped by automatic reviews, so pushes there add no reviews.
- Pilot: set a monthly spend limit, enable a few representative repositories with Once or Manual, then read each repository's **Average cost** column in **Repositories** (Admin settings > Claude Code, **Code review** section). The average moves with PR size and review level.
- Code Review skips reviews when the Code Review spend limit (resets next billing period), the organization spend limit, or the usage credits balance runs out, and also when what's left is less than the expected cost of one review. Developers see a PR comment naming the cause and linking to usage settings.
- The Code Review cost card shows an amount only for the current month. Analytics costs can differ from your invoice (estimated at list price, before discounts or credits, and only for reviews Claude posted on a PR); use your Anthropic bill for accurate spend.

## Related

- [Code Review](./code-review.md)
- [Set up Code Review](./code-review-setup.md)
- [Read and request reviews on a pull request](./code-review-pull-requests.md)
- [Troubleshoot Code Review](./code-review-troubleshooting.md)
