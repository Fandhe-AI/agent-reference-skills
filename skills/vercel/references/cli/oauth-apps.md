# vercel oauth-apps

Register Vercel Apps (OAuth) and manage team installations: register new apps, review installation requests, install with permissions, uninstall.

## Signature / Usage

```bash
vercel oauth-apps register --name "My App" --slug my-app --redirect-uri https://app.example.com/oauth/callback
vercel oauth-apps list-requests --format json
vercel oauth-apps install --client-id cl_abc --permission read:project --permission read:deployment
vercel oauth-apps dismiss cl_abc123 --yes
vercel oauth-apps remove inst_abc123 --yes
```

## Options / Props

| Name | Description |
|------|-------------|
| `list-requests` (alias `requests`) `-F, --format` | List pending installation requests for the current team |
| `register --name / --slug / --redirect-uri / --description` (alias `create`) | Register a new OAuth client; response includes `clientId` |
| `install --client-id / --permission / --projects` (alias `add`) | Install an app with granted permission scopes, optionally restricted to project IDs |
| `dismiss <appId> -y, --yes` | Decline a pending installation request |
| `remove <installationId> -y, --yes` (alias `rm`, `uninstall`) | Uninstall an app by installation ID |

## Notes

- These subcommands act on team-scoped resources; confirm the current scope or pass `--scope <team>`
- `install --permission` is required and repeatable (e.g. `--permission read:project`)

## Related

- [teams.md](./teams.md)
- [integration.md](./integration.md)
