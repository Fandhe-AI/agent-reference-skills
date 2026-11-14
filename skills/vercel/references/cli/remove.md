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
- The official page also says that using the project name removes the entire Vercel Project from the current scope unless `--safe` is used (its usage caption: "remove a Vercel Project and all of its deployments")
- With `--safe` and a project name, only removes deployments without active domains
- Deployments can also be removed from the Vercel Dashboard
- Source: https://vercel.com/docs/cli/remove (fetched 2026-11-14)

## Related

- [list.md](./list.md)
- [deploy.md](./deploy.md)
