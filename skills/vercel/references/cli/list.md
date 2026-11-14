# vercel list

List recent deployments for the currently-linked Vercel Project. Alias: `vercel ls`.

## Signature / Usage

```bash
vercel list
vercel list [project-name]
vercel list --status READY,BUILDING
vercel list --meta githubCommitSha=de8b89f
vercel list my-app --environment=staging
vercel list --all
vercel list --limit 100
vercel list --json
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--meta` | `-m` | Filter by deployment metadata `KEY=value` (repeatable) |
| `--policy` | `-p` | Show expiration per deployment retention policy `type=duration` (repeatable) |
| `--yes` | | Skip new-project setup questions |
| `--status` | `-s` | Filter by status: `BUILDING`, `ERROR`, `INITIALIZING`, `QUEUED`, `READY`, `CANCELED`, `BLOCKED` (comma-separated) |
| `--environment` | | Filter by environment: `production`, `preview`, or custom environment name |
| `--next` | | Pagination cursor (ms timestamp from previous response) |
| `--prod` | | Show only production deployments |
| `--all` | | List deployments across all projects in the current scope, even when the directory is linked |
| `--limit` | | Number of deployments to list; default `20`, maximum `100` |
| `--json` | | Output the list as JSON; when more remain, `pagination.next` holds the cursor for `--next` |

## Notes

- `vercel ls` is the short form of `vercel list`
- When the current directory is not linked to a project, the command lists deployments across all projects in the current scope
- `--yes` and `--prod` are not mentioned on the current official page (not confirmed in official docs); `--environment production` is the documented way to list production deployments
- When more deployments remain, the output ends with the command for the next page, which passes a cursor to `--next`
- `BLOCKED` = deployments that Vercel blocked from building
- Source: https://vercel.com/docs/cli/list (fetched 2026-11-14)
- Metadata filtering useful for finding deployments by Git commit SHA

## Related

- [deploy.md](./deploy.md)
- [inspect.md](./inspect.md)
- [remove.md](./remove.md)
