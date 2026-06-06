# vercel list

List recent deployments for the currently-linked Vercel Project. Alias: `vercel ls`.

## Signature / Usage

```bash
vercel list
vercel list [project-name]
vercel list --status READY,BUILDING
vercel list --meta githubCommitSha=de8b89f
vercel list my-app --environment=staging
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--meta` | `-m` | Filter by deployment metadata `KEY=value` (repeatable) |
| `--policy` | `-p` | Show expiration per deployment retention policy `type=duration` (repeatable) |
| `--yes` | | Skip new-project setup questions |
| `--status` | `-s` | Filter by status: `BUILDING`, `ERROR`, `INITIALIZING`, `QUEUED`, `READY`, `CANCELED` (comma-separated) |
| `--environment` | | Filter by environment: `production`, `preview`, or custom environment name |
| `--next` | | Pagination cursor (ms timestamp from previous response) |
| `--prod` | | Show only production deployments |

## Notes

- `vercel ls` is the short form of `vercel list`
- Metadata filtering useful for finding deployments by Git commit SHA

## Related

- [deploy.md](./deploy.md)
- [inspect.md](./inspect.md)
- [remove.md](./remove.md)
