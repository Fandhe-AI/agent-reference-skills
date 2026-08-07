# turbo query

## Signature / Usage

```bash
turbo query [query|file.gql]
```

Runs GraphQL queries against the monorepo to analyze package dependencies and task relationships.

```bash
turbo query                              # interactive mode
turbo query "query { packages { items { name } } }"  # run directly
turbo query query.gql                    # from a file
```

## Options / Props

| Option | Description |
|---|---|
| `--schema` | Output the GraphQL schema |
| `--variables` / `-V` | Path to a JSON file of query variables |
| `--filter` / `-F` | Filter packages using pnpm-style selectors |
| `--output` | Output format (`json` or `pretty`) |

## Notes

- `turbo query ls` — shorthand for listing packages:
  ```bash
  turbo query ls              # all packages
  turbo query ls web          # details for a specific package
  turbo query ls --affected   # only changed packages
  turbo query ls --filter=web... --output json
  ```
- `turbo query affected` — identifies packages/tasks impacted by changes:
  ```bash
  turbo query affected [flags]
  ```

  | Flag | Description |
  |---|---|
  | `--tasks [names]` | Filter by task name |
  | `--packages [names]` | Filter by package name |
  | `--base [ref]` | Git ref to compare from |
  | `--head [ref]` | Git ref to compare against (default: `HEAD`) |
  | `--exit-code` | Changes found: 1, none: 0, error: 2 |
