# Your First Cleanup

Source: https://knip.dev/overview/first-cleanup

Guidance for handling the initial cleanup report after installing and running Knip for the first time.

## Read the Report from the Top

Knip organizes findings by category, with unused files listed first. Address issues top-down: one unused file also makes its exports and the dependencies it imports look unused, so fixing files first eliminates cascading false positives.

## Fix an Unused File

Files fall into two categories:

- **Dead code**: genuinely unused, safe to delete
- **Reachability gaps**: loaded by tools or conventions Knip doesn't recognize; add them to configuration instead of deleting

Search the codebase for the filename and dynamic import patterns before deleting.

## Fix an Unused Export

```sh
knip --fix --exports
```

Strips export keywords from unused declarations. This can reveal additional unused code, so cleanup is iterative.

## Fix a Dependency

- **Unused dependencies**: remove from `package.json`, unless a tool depends on them indirectly
- **Unlisted dependencies**: add missing entries to `package.json` to avoid relying on transitive dependency resolution

## When a Result Looks Wrong

Instead of silencing flags with `ignore` rules, teach Knip through proper configuration, entry points, and plugin customization.

## Keep It Tidy

Integrate Knip into CI/CD, and consider a gradual adoption path for legacy codebases.

```sh
npm run knip -- --max-show-issues 5
pnpm knip --max-show-issues 5
bun knip --max-show-issues 5
yarn knip --max-show-issues 5
```

## Notes

- Intended to be read together with Handling Issues (`guides/handling-issues.md`) for deeper troubleshooting of specific issue types.

## Related

- [Getting Started](./getting-started.md)
- [Handling Issues](../guides/handling-issues.md)
