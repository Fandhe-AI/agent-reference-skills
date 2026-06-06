# vercel link

Link a local directory to a Vercel Project. Stores metadata in `.vercel/project.json`.

## Signature / Usage

```bash
vercel link
vercel link [path-to-directory]
vercel link --yes --project foo
vercel link --repo
```

## Options / Props

| Name | Description |
|------|-------------|
| `--repo` | Link all projects in the repository to their respective Vercel projects (requires Git integration) |
| `--yes` | Skip setup questions; use defaults |
| `--project` | Project name or ID to link; useful in non-interactive mode when project name differs from directory name |

## Notes

- `VERCEL_PROJECT_ID` env var can be used instead of `--project`; `--project` takes precedence
- Once linked, other CLI commands auto-detect the project from `.vercel/project.json`

## Related

- [deploy.md](./deploy.md)
- [pull.md](./pull.md)
- [dev.md](./dev.md)
- [global-options.md](./global-options.md)
