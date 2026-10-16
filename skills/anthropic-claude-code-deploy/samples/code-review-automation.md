<!-- source: https://code.claude.com/docs/en/code-review-customize.md, https://code.claude.com/docs/en/code-review-pull-requests.md / last verified: 2026-10-16 -->

# Tune Code Review with REVIEW.md and parse its check run

A repository-root `REVIEW.md` that recalibrates severity and caps nit volume for automated PR reviews, plus a `gh api` command that parses the machine-readable severity summary from the check run.

```markdown REVIEW.md
# Review instructions

## What Important means here

Reserve Important for findings that would break behavior, leak data,
or block a rollback: incorrect logic, unscoped database queries, PII
in logs or error messages, and migrations that aren't backward
compatible. Style, naming, and refactoring suggestions are Nit at
most.

## Cap the nits

Report at most five Nits per review.

## Do not report

- Anything CI already enforces: lint, formatting, type errors
- Generated files under `src/gen/` and any `*.lock` file
- Test-only code that intentionally violates production rules

## Always check

- New API routes have an integration test
- Log lines don't include email addresses, user IDs, or request bodies
- Database queries are scoped to the caller's tenant
```

```bash parse the check run's severity summary
gh api repos/OWNER/REPO/check-runs/CHECK_RUN_ID \
  --jq '.output.text | split("bughunter-severity: ")[1] | split(" -->")[0] | fromjson'
```

## Notes

- A `REVIEW.md` can also be added in a subdirectory (for example `services/billing/REVIEW.md`) to add checks for changes under that path, on top of the root file.
- `REVIEW.md` is read from the pull request's base branch or from the default branch, never from the pull request's own changes; merge the `REVIEW.md` change first. Lowering severity, excluding paths, and capping nits are honored only from the root file on a protected default branch (classic rule or ruleset; any other branch needs a ruleset).
- `CLAUDE.md` is also read during review as project context; a change that violates one of its rules becomes a finding at whichever severity level fits. The local `/code-review` command reads `CLAUDE.md` and not `REVIEW.md`, so put guidance you want in both places in `CLAUDE.md`.
- The check run named **Claude Code Review** concludes as neutral (or skipped), never as a failure, so it never blocks merging by itself; gate merges by parsing the severity JSON (e.g. `{"nit": 1, "normal": 2, "pre_existing": 0}`) in your own CI, where `normal` is the Important count. The counts include findings from earlier reviews whose threads are still open.
- If the `bughunter-severity:` line is missing, treat it as no verdict, not as zero findings: failed, timed-out, canceled, or superseded reviews have no such line, and some completed reviews have none either.
- Find `CHECK_RUN_ID` with `gh api repos/OWNER/REPO/commits/<commit-sha>/check-runs --jq '.check_runs[] | {id, name}'` and take the `Claude Code Review` entry's `id`.
- Code Review is a managed GitHub App service (Team/Enterprise, not available with Zero Data Retention) distinct from running Claude in your own CI — see `github-actions-workflow.md` and `gitlab-ci.md` for self-hosted alternatives.
