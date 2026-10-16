# Review GitHub pull requests with Codex

Use Codex code review to get another high-signal review pass on GitHub pull requests. Codex reviews the pull request diff, follows repository guidance from `AGENTS.md`, and posts a standard GitHub code review focused on serious issues. Security Review (research preview) provides a more in-depth review of potential security issues.

## Signature / Usage

```md
# In a pull request comment
@codex review

# Focus a review
@codex review for issues in the database migration

# Request a deeper security pass
@codex security review

# Act on findings
@codex fix the P1 issue

# Any other mention starts a legacy cloud chat with the PR as context
@codex fix the CI failures
```

## Set up

1. Make sure you have a GitHub repository connected to Codex (for legacy integration setup, see Codex Cloud (Legacy) in `../environments/cloud-environment.md`), access to Codex code review settings (`chatgpt.com/settings/code-review`), and an `AGENTS.md` if you want repository-specific review guidance.
2. Go to Codex settings (`chatgpt.com/settings/code-review`), choose your repository, and turn on **Automatic review** under **Review code**. Configuring automatic reviews requires a connected GitHub repository and GitHub push or admin permission for its settings.
3. To request a review manually, mention `@codex review` in a pull request comment and wait for Codex to react (👀) and post a review. In GitHub, Codex flags only P0 and P1 issues so comments stay focused on high-priority risks.

### Enable automatic reviews

Turn on **Automatic review** under **Personal preferences** in Codex settings and choose when reviews run with **Review trigger**. This applies to repositories with code review enabled and doesn't require an `@codex review` comment.

## Customize review rules

Codex searches the repository for `AGENTS.md` files and follows the applicable `## Code Review Rules` section (use `###` subheadings to group related checks), placed in the file closest to the code the rules govern. Root `AGENTS.md` holds repo-wide rules; a nested `AGENTS.md` (e.g. `services/experiment_reporting/AGENTS.md`) holds service-specific rules — Codex applies the root and the more-specific guidance for each changed file.

```md
## Code Review Rules

### Experiment cohorts

- Do not filter treatment comparisons on post-exposure behavior, including conversion or retention.
  Safe path: build cohorts from assignment or exposure; report conversion as an outcome.
```

Start with two or three concise rules that encode checks reviewers often explain:

- Focus on consequential, repository-specific behavior (the compatibility constraint, data boundary, or unsafe side effect to flag, and why).
- State the safe path or exception so Codex can tell a real issue from expected behavior.
- Keep rules scoped and durable (outcomes over function names that can change; place guidance near the code).
- Leave mechanical checks (formatting, lint, other deterministic checks) in CI.

Open a representative pull request, request a review with `@codex review`, refine the rules based on findings, and narrow or remove guidance that produces noise.

## Security Review

An additional review that goes deeper than Code Review on security-specific risks by analyzing the PR diff, supporting repository context, and configured threat models or security guidance. Code Review can also surface security issues, so some overlap is expected. Set up: connect the repository, choose it in Codex settings, and under **Review security vulnerabilities** turn on **Auto security review**, choose whose pull requests are reviewed with **Review**, and set **Trigger** to **Whenever code review runs** to run alongside Code Review. Request manually with `@codex security review`; Codex reacts while it runs, then posts findings on the PR. Open the associated Codex task and select the **Security Report** tab for the full report. See security-review.md in the security category for details.

## Notes

- Act on review findings: reply `@codex fix the P1 issue`; Codex starts a legacy cloud chat with the pull request as context and can push a fix to the branch when it has permission. Any `@codex` mention other than `review` does the same (e.g. `@codex fix the CI failures`).
- Troubleshoot code review: confirm code review is turned on for the repository in Codex settings; the PR belongs to a GitHub repository connected to Codex; use the exact trigger `@codex review` in a pull request comment; for automatic reviews check **Automatic review** under the repository settings and **Personal preferences**, and confirm the pull request event matches your review trigger settings.
- Code review rules guide Codex; they do not replace tests, branch protections, or required approvals.
- This is the GitHub **pull request review** integration (Codex commenting on PRs); for running Codex inside a CI job see the Codex GitHub Action page.

## Related

- [Codex Cloud](../getting-started/cloud.md)
- [Codex GitHub Action](../security-automation/github-action.md)
- [Code review](./code-review.md)
