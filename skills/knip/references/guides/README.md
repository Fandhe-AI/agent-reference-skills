# Guides

| Name | Description | Path |
|------|-------------|------|
| Adopt Knip Gradually | Roll out Knip gradually on a large or legacy codebase, starting from a baseline | [adopt-gradually.md](./adopt-gradually.md) |
| Configuring Project Files | `entry` and `project` file patterns are fundamental to Knip. | [configuring-project-files.md](./configuring-project-files.md) |
| Contributing | Ways to contribute to Knip, including filing reproductions, opening pull requests, and writing a plugin | [contributing.md](./contributing.md) |
| Handling Issues | Formula: `unused files = project files - (entry files + resolved files)` | [handling-issues.md](./handling-issues.md) |
| Issue Reproduction | Open an issue on GitHub to help improve Knip. | [issue-reproduction.md](./issue-reproduction.md) |
| Namespace Imports | How Knip handles exports used through `import * as NS` namespace imports, with the `nsExports` and `nsTypes` issue types | [namespace-imports.md](./namespace-imports.md) |
| Performance | How to profile and speed up Knip with `--cache`, `--performance`, `--debug`, file patterns, and per-workspace linting | [performance.md](./performance.md) |
| Troubleshooting | Troubleshoot Knip lint issues and exceptions using exit codes, `--debug`, and `--trace` | [troubleshooting.md](./troubleshooting.md) |
| Using Knip in CI | Run Knip in continuous integration to catch regressions, with a GitHub Actions example, exit codes, caching, and reporters | [using-knip-in-ci.md](./using-knip-in-ci.md) |
| Working with CommonJS | Conventions for `module.exports` and `require()` so Knip detects CommonJS exports correctly and avoids false positives | [working-with-commonjs.md](./working-with-commonjs.md) |
