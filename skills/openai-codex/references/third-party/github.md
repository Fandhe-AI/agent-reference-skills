# Review GitHub pull requests with Codex

Codex code review posts a standard GitHub code review on pull requests, following repository guidance from `AGENTS.md`; Security Review adds an in-depth pass on security issues (research preview).

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

# Any other mention starts a cloud chat with the PR as context
@codex fix the CI failures
```

## Set up

1. Set up [Codex cloud](../getting-started/cloud.md) for the repository.
2. Go to Codex settings (`chatgpt.com/codex/settings/code-review`) and turn on **Code review**. Requires GitHub push or admin permission on the repo.
3. (Optional) Turn on **Automatic reviews** to post a review on every new pull request without an `@codex review` comment.

## Customize review rules

Codex searches the repository for `AGENTS.md` files and follows the applicable `## Code Review Rules` section (use `###` subheadings to group checks). Root `AGENTS.md` holds repo-wide rules; nested `AGENTS.md` (e.g. `services/experiment_reporting/AGENTS.md`) holds service-specific rules — Codex applies both root and the most-specific match per changed file.

```md
## Code Review Rules

### Experiment cohorts

- Do not filter treatment comparisons on post-exposure behavior, including conversion or retention.
  Safe path: build cohorts from assignment or exposure; report conversion as an outcome.
```

## Notes

- In GitHub, Codex flags only P0/P1 issues so comments stay focused on high-priority risks.
- Security Review is a separate, deeper pass (`@codex security review`); results appear in the associated Codex task's **Security Report** tab. Configuration and threat models are documented on the `security` category's Security Review page, not here.
- Code review rules guide Codex; they do not replace tests, branch protections, or required approvals. Keep deterministic checks (formatting, lint) in CI, not in review rules.
- This is the GitHub **pull request review** integration (Codex commenting on PRs). It is distinct from the `security-automation/github-action.md` page, which covers `openai/codex-action@v1` — a GitHub Actions step that runs `codex exec` inside a CI job.

## Related

- [Codex cloud](../getting-started/cloud.md)
- [Codex GitHub Action](../security-automation/github-action.md)
