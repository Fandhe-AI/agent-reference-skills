<!-- source: https://code.claude.com/docs/en/code-review-customize.md / last verified: 2026-11-14 -->

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
- Source: https://code.claude.com/docs/en/code-review-customize.md, fetched 2026-11-14

### Subdirectory REVIEW.md exclusions

A subdirectory `REVIEW.md` is applied only on a protected branch (see the table above). Code Review doesn't apply a `REVIEW.md` in or below a subdirectory with one of these names; the match is on the whole name, any letter case, any depth (`Tests` matches, `integration-tests` doesn't):

- Tests: `test`, `tests`, `__tests__`, `testdata`, `fixtures`, `__fixtures__`, `golden`, `corpus`, `snapshots`, `__snapshots__`
- Examples: `example`, `examples`, `sample`, `samples`, `demo`, `demos`
- Generated code: `generated`
- Third-party code: `vendor`, `third_party`, `third-party`, `thirdparty`, `node_modules`, `bower_components`, `external`, `extern`, `deps`, `godeps`, `pods`, `carthage`, `site-packages`, `contrib`

Put checks for those paths in the root `REVIEW.md` (or a parent subdirectory's file not on the list). The remaining subdirectory `REVIEW.md` files on the changed paths share a 150,000-byte limit, not counting the root file; the check run reports files that didn't fit.

### Include other files in REVIEW.md

A line in the root `REVIEW.md` containing only `@` and a file name is replaced by that file's contents:

```markdown
# Review instructions

Report at most five Nits per review.

@review-security.md
@review-api.md
```

- Included files sit at the repository root beside `REVIEW.md`; inclusion happens only when `REVIEW.md` is read from a protected branch. On an unprotected default branch the `@` line stays as plain text (and is left out if the PR changes the named file).
- Not included: a path into a subdirectory (except a skill file), a name with spaces, a name matching no file (stays as plain text and is not reported as skipped), an `@` line inside an included file or a subdirectory `REVIEW.md` (one level only), a Markdown link.
- Limits: at most eight different files; `REVIEW.md` plus included files under 150,000 bytes combined (a file reaching the limit is skipped whole); Markdown links at 64 or fewer across them (`http` / `https` / `mailto` and `#` anchors don't count) — past that, the review skips the whole root `REVIEW.md` and the check run says the instructions weren't applied. The check run reports how many include lines were skipped for the file or byte limits.
- The included file must be merged into the branch `REVIEW.md` is read from; both are read from the same commit, never from the PR's own changes.

### Include a skill file

Code Review doesn't run skills, but you can include a skill's `SKILL.md` with `@.claude/skills/<folder>/SKILL.md` on a line of its own:

```markdown
# Review instructions

Report at most five Nits per review.

@.claude/skills/api-review/SKILL.md

Treat any change under `migrations/` as Important.
```

- Included only from a protected branch. Counts toward the eight-file and 150,000-byte limits and has its own 30,000-byte limit (frontmatter included); at most eight skill lines (a repeated line counts again).
- Path must be `.claude/skills/<folder>/SKILL.md` from the repository root, folder directly under `skills/`, no spaces; a matching-form path with no file is skipped and counted. Other files under `.claude/` and bundled, personal, or plugin skills can't be included directly; copy their guidance into a file beside `REVIEW.md`. `SKILL.md` must be a regular text file (symbolic links, whether file or folder, aren't followed). Keep the `@` line out of code fences and close every HTML comment and `<pre>` / `<script>` / `<style>` / `<textarea>` block above it.
- A review gets only the body of `SKILL.md`: repeat needed frontmatter content in the body; write out what a `!` command would supply (the line or block is replaced with a placeholder); replace `$ARGUMENTS` and other substitutions with fixed text; scripts, linked files, and `@file` references aren't loaded; write exclusions and Nit caps in `REVIEW.md` or a file beside it, not in the skill; state in words what a link points to.
- Code Review changes some characters in skill text (for example backticks become `ˋ`, `[` in `items[0]` becomes `(`, `<` in `List<String>` gets a following space, `|` becomes `¦`, `@alice` becomes `@ alice`); state such rules in words too.

## Related

- [Code Review](./code-review.md)
- [Set up Code Review](./code-review-setup.md)
- [Read and request reviews on a pull request](./code-review-pull-requests.md)
- [Review locally with /code-review](./code-review-local.md)
- [Troubleshoot Code Review](./code-review-troubleshooting.md)
