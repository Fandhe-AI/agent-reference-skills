# CLI

| Name | Description | Path |
|------|-------------|------|
| turbo boundaries | Experimental feature that checks for dependency violations across workspaces. | [boundaries.md](./boundaries.md) |
| turbo gen | Extend the repository with new apps and packages (`turbo generate`, `run` / `workspace`) and `@turbo/gen` generator types. | [gen.md](./gen.md) |
| Options overview | Mapping of CLI flags, System Environment Variables, and `turbo.json` keys (precedence: flags > environment variables > `turbo.json`). | [options-overview.md](./options-overview.md) |
| Other commands | `turbo ls` / `login` / `link` / `docs` / `telemetry` / `bin` and the `create-turbo`, `@turbo/codemod`, `turbo-ignore`, ESLint packages. | [other-commands.md](./other-commands.md) |
| turbo prune | Generates a partial monorepo containing only a target package and its dependencies. Useful for optimizing Docker layer caching in deployments. | [prune.md](./prune.md) |
| turbo query | Runs GraphQL queries against the monorepo to analyze package dependencies and task relationships. | [query.md](./query.md) |
| turbo run | All flags and options for running tasks specified in `turbo.json`. | [run.md](./run.md) |
| turbo watch | Re-runs tasks based on code changes. | [watch.md](./watch.md) |
