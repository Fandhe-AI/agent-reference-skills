# vercel git

Manage Git provider repository connections for a Vercel Project.

## Signature / Usage

```bash
vercel git connect
vercel git connect --yes
vercel git connect https://github.com/user/repo.git
vercel git connect --project my-project
vercel git disconnect
vercel git ls
```

## Options / Props

| Name | Description |
|------|-------------|
| `--yes` | Skip the confirmation prompts of `connect` and `disconnect` (e.g. replacing an already-connected repository, disconnecting) |
| `--project` | Select the Vercel Project by name or ID; defaults to the project linked to the current directory |

## Notes

- Searches for a local `.git` config file with at least one remote URL
- Subcommands: `connect`, `disconnect [provider]`, `ls`
- Pass a repository URL to `vercel git connect` to connect a repository that is not in the local Git config, or to connect from a directory that is not a Git repository
- `--project` lets you manage another project's Git connection or run from an unlinked directory
- Source: https://vercel.com/docs/cli/git (fetched 2026-11-14)

## Related

- [link.md](./link.md)
- [deploy.md](./deploy.md)
