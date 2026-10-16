# vercel connect

Manage Vercel Connect connectors: discover services, create connectors, attach/detach projects, request runtime tokens.

## Signature / Usage

```bash
vercel connect discover [query]
vercel connect categories
vercel connect create slack --name acme-slack
vercel connect create okta --connection-method custom-server --param domain=acme.okta.com --name okta --data @credentials.json
vercel connect list --all-projects
vercel connect token slack/my-bot --subject app
vercel connect attach scl_abc123 -e production -e preview
vercel connect detach scl_abc123
vercel connect update scl_abc123 --icon ./logo.png
vercel connect remove scl_abc123 --disconnect-all --yes
vercel connect open scl_abc123
```

## Options / Props

| Name | Description |
|------|-------------|
| `discover [query] --category / --connection-method / --target / --supports-triggers / --limit / --next` | Find services you can create a connector for; `--category` (from `vercel connect categories`), `--connection-method` (e.g. `oauth`, `api-key`, `mcp`) and `--target` (e.g. `api`, `mcp`) are repeatable; `--limit` default 50, max 500 |
| `categories` | List service categories with service counts |
| `create <service> --name / --connection-method / --target / --param / --data / --connector-type / --triggers / --trigger-event / --yes / --icon / --background-color / --accent-color` | Create a connector for a service (e.g. `slack`, `notion`, `okta`, or an OAuth / MCP server URL such as `mcp.linear.app`). `--param KEY=VALUE` setup values (repeatable); `--data` JSON credentials, `@<path>` for a file or `@-` for stdin; `--connector-type` only valid with `--data`; `--trigger-event` repeatable, requires `--triggers` |
| `list --all-projects / --type / --service / --search / --limit / --next` (alias `ls`) | List connectors, default scoped to the linked project; `--type` is `slack`, `github`, `oauth`, `custom` (repeatable) |
| `token <connector> --subject <user\|app> / --installation-id / --scopes / --yes` | Request a runtime token (plain output is the raw token) |
| `attach <connector> --project / --environment / --triggers / --trigger-branch / --trigger-environment / --trigger-path / --yes` | Attach a project to a connector for one or more environments (default `production`, `preview`, `development`) |
| `detach <connector> --project / --yes` | Detach a project from a connector |
| `update <connector> --icon / --background-color / --accent-color` | Update connector branding |
| `remove <connector> --disconnect-all / --yes` (alias `rm`) | Delete a connector |
| `open <connector>` | Open a connector in the Vercel dashboard (`--format=json` prints the URL) |

## Notes

- Vercel Connect is generally available on all plans (changelog published 2026-08-25); the docs no longer mark the command as beta
- CLI setup works for 100+ services: `vercel connect create <service> --name ...`; run `vercel connect create <service> --help` to see products, connection methods, required credentials and runnable examples for a service
- For known services `create` reads the published connection methods and prompts for product, connection method, setup values and credentials (secrets are masked); it opens a browser only when the provider requires sign-in or app install. `--yes` skips the single-method confirmation. Inline `--data` values leak into shell history and process listings; use a file or stdin for secrets
- Connectors are identified by ID (`scl_abc123`) or UID (`slack/my-bot`)
- Detaching a project removes token access but does not remove it from trigger destinations
- A connector can have up to three trigger destinations; `--trigger-branch` and `--trigger-environment` are mutually exclusive and only valid with `--triggers`; without either, the destination targets Production
- `--environment` on `attach` replaces the built-in environment defaults; existing trigger destinations' Custom Environments are preserved on the project link
- `remove` fails if projects are still attached unless `--disconnect-all` is passed
- All subcommands support `--format json` (`-F`)

## Related

- [mcp.md](./mcp.md)
- [integration.md](./integration.md)
