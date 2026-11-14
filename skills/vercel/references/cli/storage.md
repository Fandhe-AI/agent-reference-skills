# vercel storage

Manage storage resources (Vercel Blob and Global Config stores) and their project connections.

## Signature / Usage

```bash
vercel storage list
vercel storage status
vercel storage list --type global-config --json
vercel storage create my-uploads --type blob --access private
vercel storage create feature-config --type global-config --items '{"enabled":true}'
vercel storage inspect my-uploads
vercel storage inspect feature-config --type global-config --json
vercel storage connect my-uploads --project my-app --dry-run --json
vercel storage connect my-uploads --project my-app --yes
vercel storage connect my-uploads --environment production --environment preview
vercel storage connect my-uploads --auth token --add-rw-token --dry-run
vercel storage status my-uploads
vercel storage status --all --json
vercel storage update my-uploads --prefix UPLOADS --dry-run --json
vercel storage update my-uploads --environment production --yes
vercel storage update my-uploads --auth oidc --yes
vercel storage disconnect my-uploads --dry-run --json
vercel storage disconnect my-uploads
vercel storage disconnect my-uploads --all
vercel storage delete my-uploads
vercel storage delete feature-config --type global-config
```

## Options / Props

| Subcommand | Description |
|------------|-------------|
| `list` | List stores in the current scope (name, ID, product, status, connected projects). `--type` filters (`blob`, `global-config`, `integration`) |
| `create` | Create a Blob or Global Config store. Does not connect it to a project |
| `inspect` | Inspect a store by name or ID (older `get` alias prints a deprecation warning) |
| `connect` | Connect a store to a project and add the connection's environment variables |
| `status` | Show connections, environments, credential modes, and env var names |
| `update` | Change a connection's environments, prefix, or Blob credential mode |
| `disconnect` | Disconnect a store from a project (removes its env vars) |
| `delete` | Permanently delete a Blob or Global Config store (aliases `rm`, `del`) |

### Create options

| Option | Description |
|--------|-------------|
| `--type <type>` | `blob` or `global-config`. Required without interactive prompts |
| `--access <access>` | Blob access level, `public` or `private`. Required for Blob creation without prompts |
| `--region <region>` | Blob region. Defaults to `iad1` |
| `--items <JSON>` | Initial Global Config items as a JSON object |
| `--json` | Return the created store's details as JSON |

### Connection options (`connect` and `update`)

| Option | Description |
|--------|-------------|
| `--project <name-or-id>`, `-p` | Target project. Defaults to the linked project |
| `--environment <environment>`, `-e` | Repeatable: `production`, `preview`, `development`. `connect` defaults to all three; `update` preserves the current environments |
| `--auth <mode>` | Blob credential mode, `oidc` or `token`. `connect` defaults to `oidc`; `update` preserves the current mode. Other store types use provider-managed credentials |
| `--add-rw-token` | Include a static Blob read-write token. Required with `--auth token`; with OIDC, adds the token alongside OIDC credentials |
| `--prefix <prefix>` | Prefix for generated env var names, for example `UPLOADS` produces `UPLOADS_STORE_ID` for an OIDC Blob connection |
| `--dry-run` | Preview changes without applying. Provider-managed variable names may be unavailable until a connection exists |
| `--yes`, `-y` | Skip the confirmation prompt. Required when applying changes non-interactively |
| `--json` | Return JSON. Requires `--yes` or `--dry-run` for these subcommands |

## Notes

- Log in (or use a token) first. Store operations use the linked project's team when available, otherwise the current scope; use global `--scope` to select a team. Connection commands use the linked project unless `--project` is passed. `--auth` controls the credentials your project receives, not CLI authentication
- `list` JSON has a `stores` array with `id`, `name`, `type`, `product`, `status`, `projects`. `inspect` JSON has metadata, product-specific `details`, and `connections`. If several stores share a name, pass the store ID or narrow with `--type`
- `status` without a store argument uses the linked project or `--project`; `--all` (`-a`) shows every store in the scope and cannot be combined with `--project`. JSON `stores[].connections` include project, environments, prefix, credential mode, and env var names
- A dry run returns a change plan with `action`, `store`, `projects`, `environments`, `envVars` (names to add, remove, keep), with `dryRun: true` and `applied: false`
- `update`: omitted options preserve current values (changing a prefix does not switch credentials). With multiple connections to the same store, pass `--environment` values that overlap only the connection to update; they become its new environment set
- `disconnect`: applying always requires interactive confirmation (no `--yes`); `--json` requires `--dry-run`. `--all` disconnects every project
- `delete` is permanent, always needs interactive confirmation, and supports no `--yes`, `--dry-run`, or JSON. Use `--type` to disambiguate same-named stores
- Marketplace databases: create with `vercel install`, find with `vercel integration discover --category storage`, delete with `vercel integration resource delete`
- After changing a connection that affects development, run `vercel env pull`
- `--json` is supported directly by `list`, `create`, `inspect`, `status`
- Source: https://vercel.com/docs/cli/storage (fetched 2026-11-14)

## Related

- [blob.md](./blob.md)
- [global-config.md](./global-config.md)
- [env.md](./env.md)
- [integration.md](./integration.md)
- [install.md](./install.md)
