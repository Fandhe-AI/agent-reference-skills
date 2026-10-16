# Adopt Knip Gradually

Source: https://knip.dev/guides/adopt-gradually

On a large or legacy codebase the first run can report a lot. Reaching zero in one sitting is the wrong goal. Get a trustworthy signal first, then ratchet the codebase toward clean and keep it there.

## Signature / Usage

Narrow the report with filters, clear one type, commit, then move to the next.

```sh
knip --files        # unused files only (the major cascade!)
knip --dependencies # then dependencies
knip --exports      # then exports and types
```

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

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--files` | CLI filter | Report unused files only. |
| `--dependencies` | CLI filter | Report dependencies only. |
| `--exports` | CLI filter | Report exports and types only. |
| `rules` | object | Severity per issue type: `"error"`, `"warn"` or `"off"`. |
| `--workspace` | CLI option | Scope a pass to a workspace; accepts multiple workspaces and glob patterns. |
| `--production` | CLI flag | Limits analysis to shipped code, deferring tests and tooling. |
| `--max-issues` | CLI option | Budget: CI fails only when the count exceeds the number (e.g. `knip --max-issues 50`). |
| `--no-exit-code` | CLI flag | Run report-only while still triaging. |
| `@lintignore` / `@internal` | JSDoc tags | Tag an export to suppress it with a specific, documented signal. |
| `ignoreExportsUsedInFile` | config option | For internal-only exports. |
| `ignoreDependencies` | config option | List known exceptions. |

## Notes

- Actionable baseline: most of the noise on a first run comes from gaps in what Knip can reach (a dependency without a plugin yet, an entry point it can't resolve, a phantom dependency). Fix the gaps before deleting anything: address configuration hints, tune entry and project files so Knip analyzes the right set of files, and tune configuration for your tools' plugins.
- Read the output from the top. One unused file hides its exports and dependencies, so files come first. Once the report reflects real findings instead of gaps, you have an actionable baseline.
- Focus on one issue type at a time: clear one type, commit, then move to the next.
- As each `"warn"` type reaches zero, set it to `"error"`.
- Add Knip to CI as soon as you have a baseline, so new clutter is caught in review. Marking cleaned types `"error"` and the rest `"warn"` makes CI fail only on finished types.
- Other ways to stage CI: workspace by workspace in a monorepo (`--workspace`), production first (`--production`), a budget (`--max-issues`), or report-only (`--no-exit-code`).
- Prefer a specific, documented signal over a blanket `ignore`.
- Source pinned to knip@6.41.0 docs (`packages/docs/src/content/docs/guides/adopt-gradually.md`).

## Related

- [Using Knip in CI](./using-knip-in-ci.md)
- [Configuring Project Files](./configuring-project-files.md)
- [Handling Issues](./handling-issues.md)
