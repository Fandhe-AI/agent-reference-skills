# Understanding Your Repository

## Usage

### turbo devtools

A browser-based package graph visualization tool, used to diagnose task graph issues.

```bash
turbo devtools
```

### turbo ls

Lists packages and their directory locations. Supports the same filtering options as `turbo run`.

```bash
turbo ls
turbo ls --filter ...ui
```

### turbo run (no arguments)

Running `turbo run` without specifying a task shows every available task in the monorepo and the package it's defined in.

```bash
turbo run
```

### turbo query (v2.2.0+)

A GraphQL interface for deep inspection of the repository.

#### Examples

```bash
# Find packages that have a build task
turbo query "query { packages(filter: { has: { field: TASK_NAME, value: \"build\"}}) { items { name } } }"

# Find packages depended on by 10 or more packages
turbo query "query { packages(filter: { greaterThan: { field: DIRECT_DEPENDENT_COUNT, value: 10 } }) { items { name } } }"

# Check which packages were affected by a recent change, and why
turbo query "query { affectedPackages(base: \"HEAD^\", head: \"HEAD\") { items { reason { __typename } } } }"
```

#### Common use cases

- Identifying packages with frequent cache misses (packages that are imported often)
- Understanding the scope of impact when using the `--affected` flag
- Deciding whether an oversized package should be split

## Related

- [running-tasks](./running-tasks.md)
- [caching](./caching.md)
- [cli/query](../cli/query.md)
