# vercel deploy

Deploy a Vercel project. Default command when no subcommand is specified.

## Signature / Usage

```bash
vercel
vercel deploy
vercel deploy --prod
vercel deploy --prebuilt --archive=tgz
vercel deploy --target=staging
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--prebuilt` | | Upload results from `vercel build` in `.vercel/output`; skips Vercel cloud build |
| `--build-env` | `-b` | Build-time environment variable as `KEY=value` (repeatable) |
| `--yes` | | Skip new-project setup questions; use defaults |
| `--env` | `-e` | Runtime environment variable as `KEY=value` (repeatable) |
| `--name` | `-n` | Project name (deprecated; prefer project linking) |
| `--prod` | | Deploy to the production domain |
| `--skip-domain` | | With `--prod`: skip custom domain assignment (use `vercel promote` later) |
| `--public` | | Make source code publicly available at `/_src` |
| `--regions` | | Comma-separated region IDs for Vercel Functions |
| `--no-wait` | | Exit immediately after requesting deployment, without waiting |
| `--force` | `-f` | Force new deployment ignoring build cache |
| `--with-cache` | | Retain build cache when using `--force` |
| `--archive` | | Compress deployment before upload; value: `tgz` |
| `--logs` | `-l` | Print build logs during deployment |
| `--meta` | `-m` | Metadata key-value as `KEY=value` (repeatable); filterable via `vercel list --meta` |
| `--target` | | Target environment: `production`, `preview`, or custom environment name |
| `--guidance` | | Show suggested next steps after deployment completes |

## Notes

- `stdout` is always the deployment URL; suitable for piping
- `stderr` carries error messages; check exit code in CI scripts
- When using `--prebuilt`, System Environment Variables are absent at build time

## Related

- [build.md](./build.md)
- [promote.md](./promote.md)
- [rollback.md](./rollback.md)
- [alias.md](./alias.md)
- [list.md](./list.md)
