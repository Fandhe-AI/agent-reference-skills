# vercel connect

Manage Vercel Connect connectors: discover services, create connectors, attach/detach projects, request runtime tokens, revoke tokens, add phone contacts.

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
vercel connect delete scl_abc123 --disconnect-all --yes
vercel connect revoke-tokens scl_abc123 --my-tokens --yes
vercel connect contacts add linq/support --phone-number +12025550123
vercel connect open scl_abc123
```

## Options / Props

| Name | Description |
|------|-------------|
| `discover [query] --category / --connection-method / --target / --supports-triggers / --limit (-n) / --next / --json` | Find services you can create a connector for; `--category` (from `vercel connect categories`), `--connection-method` (e.g. `oauth`, `api-key`, `mcp`) and `--target` (e.g. `api`, `mcp`) are repeatable; `--limit` default 50, max 500 |
| `categories --json` | List service categories with service counts |
| `create <service> --name / --connection-method / --target / --param / --data / --connector-type / --triggers / --trigger-event / --trigger-project / --trigger-path / --git-branch / --trigger-environment / --yes (-y) / --icon / --background-color / --accent-color / --json` | Create a connector for a service (e.g. `slack`, `notion`, `okta`, or an OAuth / MCP server URL such as `mcp.linear.app`). `--param KEY=VALUE` setup values (repeatable); `--data` JSON credentials, `@<path>` for a file or `@-` for stdin; `--connector-type` only valid with `--data`; `--trigger-*`, `--git-branch` and `--trigger-environment` require `--triggers`; `--trigger-event` is repeatable and replaces the provider's default events; `--trigger-project` defaults to the linked project; `--git-branch` and `--trigger-environment` cannot be combined |
| `list --all-projects / --type / --service / --query (-q) / --limit (-n) / --next / --json` | List connectors, default scoped to the linked project; `--type` is `slack`, `github`, `oauth`, `custom` (repeatable); `--service` repeatable |
| `token <connector> --subject <user\|app> / --installation <ID> / --scopes / --no-default-scopes / --yes (-y) / --json` | Request a runtime token (plain output is the raw token); `--installation` only with `--subject app`; without `--scopes` the connector's default scopes are requested, `--no-default-scopes` sends the request with none |
| `attach <connector> --project (-p) / --environment (-e) / --triggers / --git-branch / --trigger-environment / --trigger-path / --yes (-y) / --json` | Attach a project to a connector for one or more environments (default `production`, `preview`, `development`); `--json` requires `--yes` |
| `detach <connector> --project (-p) / --yes (-y) / --json` | Detach a project from a connector; `--json` requires `--yes` |
| `update <connector> --icon / --background-color / --accent-color / --json` | Update connector branding |
| `delete <connector> --disconnect-all / --yes (-y) / --json` | Delete a connector; `--json` requires `--yes` |
| `revoke-tokens <connector> --my-tokens / --all-tokens / --yes (-y) / --json` | Revoke tokens a connector issued; `--yes` requires `--my-tokens` or `--all-tokens` |
| `contacts add <connector> --phone-number <PHONE> / --json` | Add a phone contact (E.164, e.g. `+12025550123`, required) that a connector may message |
| `open <connector> --json` | Open a connector in the Vercel dashboard (`--json` prints the URL) |

## Notes

- Vercel Connect is generally available on all plans (changelog published 2026-08-25); the docs no longer mark the command as beta
- CLI setup works for 100+ services: `vercel connect create <service> --name ...`; run `vercel connect create <service> --help` to see products, connection methods, required credentials and runnable examples for a service
- For known services `create` reads the published connection methods and prompts for product, connection method, setup values and credentials (secrets are masked); it opens a browser only when the provider requires sign-in or app install. `--yes` skips the single-method confirmation. Inline `--data` values leak into shell history and process listings; use a file or stdin for secrets
- Connectors are identified by ID (`scl_abc123`) or UID (`slack/my-bot`)
- Detaching a project (`vercel connect detach`) removes the token-access link and also removes the project from the connector's trigger destinations (the previous version of this page said it did not)
- A connector can have up to three trigger destinations; `--git-branch` and `--trigger-environment` are mutually exclusive and only valid with `--triggers`; without either, the destination targets Production. If `--trigger-path` is omitted, Vercel derives the receiver path from the connector and project framework
- `--environment` on `attach` replaces the built-in environment defaults; existing trigger destinations' Custom Environments are preserved on the project link
- `delete` fails if projects are still attached unless `--disconnect-all` is passed
- `token` requests a user token by default; if authorization or installation is required in an interactive session the CLI opens the browser, and `--yes` allows this in non-interactive contexts
- `revoke-tokens` prompts in a terminal whether to revoke only your tokens or all; if the provider does not support revocation, a revoked token may keep working at the provider until it expires
- `contacts add` can finish successfully while verification is still pending; use `--scope <team-slug>` in non-interactive mode unless the directory is linked to a project in that team
- Renamed or not confirmed in the current official page: `remove` / `rm` (now `delete`), the `ls` alias, `--installation-id` (now `--installation`), `--trigger-branch` (now `--git-branch`), `--search` (now `--query` / `-q`), and `--format json` / `-F` (now `--json`) are not mentioned on the current page
- Source: https://vercel.com/docs/cli/connect (fetched 2026-11-14)

## Related

- [mcp.md](./mcp.md)
- [integration.md](./integration.md)
