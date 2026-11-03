---
source: https://developers.cloudflare.com/workers/wrangler/commands/artifacts/
---

# Artifacts

Manage Artifacts namespaces, repositories, and repo-scoped tokens using Wrangler. Private beta.

## Signature / Usage

```sh
npx wrangler artifacts namespaces list
npx wrangler artifacts namespaces get <NAME>
npx wrangler artifacts repos create <NAME>
npx wrangler artifacts repos list
npx wrangler artifacts repos get <NAME>
npx wrangler artifacts repos delete <NAME>
npx wrangler artifacts repos issue-token <REPO>
```

## Options / Props

### `artifacts namespaces list`

List Artifacts namespaces

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--json` | boolean | false | Return output as JSON |

### `artifacts namespaces get`

Get an Artifacts namespace

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The Artifacts namespace name |
| `--json` | boolean | false | Return output as JSON |

### `artifacts repos create`

Create an Artifacts repository

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The Artifacts repository name |
| `--namespace` | string (required) | — | The Artifacts namespace name |
| `--description` | string | — | An optional description for the repository |
| `--default-branch` | string | — | The default branch for the repository |
| `--read-only` | boolean | — | Create the repository as read-only |
| `--json` | boolean | false | Return output as JSON |

### `artifacts repos list`

List Artifacts repositories in a namespace

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--namespace` | string (required) | — | The Artifacts namespace name |
| `--json` | boolean | false | Return output as JSON |

### `artifacts repos get`

Get an Artifacts repository

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The Artifacts repository name |
| `--namespace` | string (required) | — | The Artifacts namespace name |
| `--json` | boolean | false | Return output as JSON |

### `artifacts repos delete`

Delete an Artifacts repository

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The Artifacts repository name |
| `--namespace` | string (required) | — | The Artifacts namespace name |
| `--force` | boolean (alias `--y`) | false | Skip confirmation |
| `--json` | boolean | false | Return output as JSON |

### `artifacts repos issue-token`

Issue a repo-scoped Artifacts token

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<REPO>` | string (required) | — | The Artifacts repository name |
| `--namespace` | string (required) | — | The Artifacts namespace name |
| `--scope` | string | — | The token scope |
| `--ttl` | number | — | The token TTL in seconds |
| `--json` | boolean | false | Return output as JSON |

## Notes

- Artifacts is in private beta.
- Each command also accepts the global flags; see the global flags page.

## Related

- [Global flags](./global-flags.md)
- [Commands overview](./overview.md)
