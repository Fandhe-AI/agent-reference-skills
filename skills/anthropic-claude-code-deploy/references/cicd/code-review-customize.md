<!-- source: https://code.claude.com/docs/en/code-review-customize.md / last verified: 2026-10-17 -->

# Customize Code Review

Tune what Code Review flags on your pull requests with `REVIEW.md` and `CLAUDE.md`: recalibrate severity, skip paths, add checks, and see which copy applies.

## Signature / Usage

Example layout (root file plus one subdirectory file):

```text
your-repo/
├── REVIEW.md            # Root file
├── services/
│   └── billing/
│       └── REVIEW.md    # Adds checks for changes under services/billing/
└── src/
```

Example `REVIEW.md`:

```markdown
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

## Options / Props

Which file does what:

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project instructions read for every task, reviews included. Violations become findings at whichever severity fits. Read: root `CLAUDE.md` plus `CLAUDE.md` files in parent directories of each changed file |
| `REVIEW.md` | Review-only instructions at repository root; a subdirectory `REVIEW.md` adds checks for changes under that path |

Problem to instruction:

| Problem | What to add |
|---------|-------------|
| Wrong things marked Important | Redefine what Important means; state which classes are Important vs Nit at most; optionally escalate (e.g., any `CLAUDE.md` violation is Important) |
| Too many nits | Cap Nit comments per review (e.g., at most five) |
| Comments on generated files or CI-enforced checks | List paths and categories to skip; for paths needing less scrutiny, set a higher bar (e.g., in `scripts/`, only report if near-certain and severe) |
| A team rule isn't checked | Add rules to flag on every PR |
| Findings that turn out wrong | Require evidence (e.g., behavior claims need a `file:line` citation in the source) |

What a review reads for each branch setup:

| Branch protection | Copy read | Files read |
|-------------------|-----------|------------|
| Default branch protected, and the PR targets it or targets a branch no ruleset protects | Default branch | Root and subdirectory files |
| PR targets another branch that a ruleset protects | That base branch | Root and subdirectory files |
| Default branch unprotected, and base branch has no protection rule of either kind | Default branch | Root file |
| Protection can't be confirmed (includes an unprotected default branch with a base branch that has only a classic rule) | None | None |

## Notes

- Code Review reads `REVIEW.md` from the PR's base branch or from the default branch, never from the PR's own changes. Merge the `REVIEW.md` change first.
- From a root file on a protected default branch, a review honors: lowering a finding's severity, excluding paths/files/classes of issue, and capping nit comments.
- Counts as protection: default branch — a classic branch protection rule or a ruleset; any other branch — a ruleset only. A ruleset counts when it restricts updates or requires PRs with at least one approval; if it requires PRs, it must also dismiss approval on a new push or require approval after the last push.
- `REVIEW.md` contents reach the agents that find issues and the agents that verify them, alongside the default guidance; the step that writes the final review consults it before settling severity and the summary. It changes what a review finds and reports, not the format.
- The managed service reads both `CLAUDE.md` and `REVIEW.md`; the local `/code-review` command reads `CLAUDE.md` only. Put guidance for both places in `CLAUDE.md`; keep `REVIEW.md` for PR-review-specific rules.
- To change thoroughness or when reviews run, an Owner changes the review level or the **Review runs** setting.

## Related

- [Code Review](./code-review.md)
- [Set up Code Review](./code-review-setup.md)
- [Read and request reviews on a pull request](./code-review-pull-requests.md)
- [Review locally with /code-review](./code-review-local.md)
- [Troubleshoot Code Review](./code-review-troubleshooting.md)
