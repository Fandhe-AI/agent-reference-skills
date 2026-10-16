# Adopt Knip Gradually

Source: https://knip.dev/guides/adopt-gradually

## Overview

On a large or legacy codebase the first run can report a lot. Reaching zero in one sitting is the wrong goal. Get a trustworthy signal first, then ratchet the codebase toward clean and keep it there.

## Actionable Baseline

Most of the noise on a first run comes from gaps in what Knip can reach: a dependency without a plugin yet, an entry point it can't resolve, a phantom dependency. Fix the gaps before deleting anything:

- Address configuration hints.
- Tune entry and project files so Knip analyzes the right set of files.
- Tune configuration for your tools' plugins.

Read the output from the top. One unused file hides its exports and dependencies, so files come first. Once the report reflects real findings instead of gaps, you have an actionable baseline.

## Focus One Issue Type at a Time

Narrow the report with filters, clear one type, commit, then move to the next.

```sh
knip --files        # unused files only (the major cascade!)
knip --dependencies # then dependencies
knip --exports      # then exports and types
```

## Stage by Rules

Rules set a severity per issue type. Start by setting all types to `"warn"`, then the types you've cleaned to `"error"`. Warnings are printed in gray and don't fail the run.

```json
{
  "rules": {
    "files": "error",
    "dependencies": "error",
    "exports": "warn",
    "duplicates": "off"
  }
}
```

As each `"warn"` type reaches zero, set it to `"error"`.

## Gate CI Without Blocking the Team

Add Knip to CI as soon as you have a baseline, so new clutter is caught in review. Ways to stage it:

- Mark cleaned types `"error"` and the rest `"warn"`, so CI fails only on finished types.
- Workspace by workspace: in a monorepo, scope passes with `--workspace` (accepts multiple workspaces and glob patterns).
- Production first: `--production` limits analysis to shipped code, deferring tests and tooling.
- Set a budget, so CI fails only when the count exceeds the number (e.g. `knip --max-issues 50`).
- Run report-only with `--no-exit-code` while still triaging.

## Suppress Only What's Justified

Prefer a specific, documented signal over a blanket `ignore`:

- Tag an export with e.g. `@lintignore` or `@internal`.
- Use `ignoreExportsUsedInFile` for internal-only exports.
- List known exceptions in `ignoreDependencies`.

## Notes

- Source pinned to knip@6.41.0 docs (`packages/docs/src/content/docs/guides/adopt-gradually.md`).

## Related

- [Using Knip in CI](./using-knip-in-ci.md)
- [Configuring Project Files](./configuring-project-files.md)
- [Handling Issues](./handling-issues.md)
