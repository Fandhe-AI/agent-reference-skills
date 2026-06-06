# vercel remove

Remove deployments by URL/ID or remove all deployments for a project. Alias: `vercel rm`.

## Signature / Usage

```bash
vercel remove [deployment-url]
vercel remove [deployment-url-1 deployment-url-2]
vercel remove [project-name]
vercel remove my-project --safe
vercel remove my-deployment.com --yes
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--safe` | `-s` | Skip removal of deployments with an active preview URL or production domain when removing by project name |
| `--yes` | `-y` | Skip confirmation prompt |

## Notes

- Providing a project name removes all deployments for that project
- With `--safe` and a project name, only removes deployments without active domains

## Related

- [list.md](./list.md)
- [deploy.md](./deploy.md)
