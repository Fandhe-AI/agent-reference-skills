# CLI

| Name | Description | Path |
|------|-------------|------|
| turbo boundaries | Experimental feature that checks for dependency violations across workspaces. | [boundaries.md](./boundaries.md) |
| turbo gen | | [gen.md](./gen.md) |
| Options overview | Flags, `turbo.json` configuration, and System Environment Variables for Turborepo. Three ways to manage `turbo` behavior, listed in order of precedence: CLI flags > System Environment Variables > `turbo.json` configuration. Where a flag is provided, it overrides the same setting from an environment variable or `turbo.json`. | [options-overview.md](./options-overview.md) |
| Other commands | | [other-commands.md](./other-commands.md) |
| turbo prune | Generates a partial monorepo containing only a target package and its dependencies. Useful for optimizing Docker layer caching in deployments. | [prune.md](./prune.md) |
| turbo query | Runs GraphQL queries against the monorepo to analyze package dependencies and task relationships. | [query.md](./query.md) |
| turbo run | | [run.md](./run.md) |
| turbo watch | Re-runs tasks based on code changes. | [watch.md](./watch.md) |
