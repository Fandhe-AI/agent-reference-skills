# vercel connect

Manage Vercel Connect connectors: create connectors, attach/detach projects, request runtime tokens. Beta command.

## Signature / Usage

```bash
vercel connect create slack --name acme-slack
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
| `create <service> --name / --triggers / --icon / --background-color / --accent-color` | Create a connector for a service (e.g. `slack`, `github`, or an MCP URL) |
| `list --all-projects / --type / --service / --search / --limit / --next` (alias `ls`) | List connectors, default scoped to the linked project |
| `token <connector> --subject <user\|app> / --installation-id / --scopes / --yes` | Request a runtime token |
| `attach <connector> --project / --environment / --triggers / --trigger-branch / --trigger-environment / --trigger-path` | Attach a project to a connector for one or more environments |
| `detach <connector> --project` | Detach a project from a connector |
| `update <connector> --icon / --background-color / --accent-color` | Update connector branding |
| `remove <connector> --disconnect-all --yes` (alias `rm`) | Delete a connector |
| `open <connector>` | Open a connector in the Vercel dashboard |

## Notes

- Connectors are identified by ID (`scl_abc123`) or UID (`slack/my-bot`)
- Detaching a project removes token access but does not remove it from trigger destinations
- A connector can have up to three trigger destinations
- All subcommands support `--format json` (`-F`)

## Related

- [mcp.md](./mcp.md)
- [integration.md](./integration.md)
