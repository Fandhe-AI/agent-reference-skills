<!-- source: https://code.claude.com/docs/en/code-review.md / last verified: 2026-08-07 -->

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

Report at most five Nits per review. If you found more, say "plus N
similar items" in the summary instead of posting them inline. If
everything you found is a Nit, lead the summary with "No blocking
issues."

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

- `REVIEW.md` is injected verbatim into every review agent's system prompt at highest priority; `@` import syntax is not expanded, so put rules directly in the file rather than referencing other files.
- `CLAUDE.md` is also read during review but only produces nit-level findings for newly introduced violations; use `REVIEW.md` for review-only behavior changes.
- The check run named **Claude Code Review** always completes with a neutral conclusion, so it never blocks merging by itself; gate merges on findings by parsing the severity JSON (e.g. `{"normal": 2, "nit": 1, "pre_existing": 0}`) in your own CI, where `normal` is the Important count.
- Find `CHECK_RUN_ID` with `gh api repos/OWNER/REPO/commits/<commit-sha>/check-runs --jq '.check_runs[] | {id, name}'` and take the `Claude Code Review` entry's `id`.
- Code Review is a managed GitHub App service (Team/Enterprise, not available with Zero Data Retention) distinct from running Claude in your own CI — see `github-actions-workflow.md` and `gitlab-ci.md` for self-hosted alternatives, and the local `/code-review` command for reviewing a diff without installing the app.
