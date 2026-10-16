# vercel deploy

Deploy a Vercel project. Default command when no subcommand is specified.

## Signature / Usage

```bash
vercel
vercel deploy
vercel deploy --prod
vercel deploy --prebuilt --archive=tgz
vercel deploy --target=staging
vercel index.html            # single-file deployment
vercel index.html --dry      # preview without uploading
vercel index.html --temporary  # unauthenticated, .html only
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
- Fast static deployments: Vercel automatically makes eligible static deployments ready without a build step. Supported: only HTML (`.html`, `.htm`) or Markdown (`.md`) files, up to 10 files and 5 MB total. Eligibility also depends on project build settings and deployment configuration; other deployments use the standard flow (Vercel CLI 59.16.0 or later per the changelog)
- Single-file deployments: pass one file path to `vercel` / `vercel deploy` (e.g. `vercel index.html`, `vercel deploy README.md`). The CLI uploads only that file with static settings independent of the linked project's framework and build config. Authenticated deploys accept any extension; `--dry` previews without uploading; `--temporary` deploys without logging in and requires a `.html` file
- Single-file constraints: `--prebuilt`, `--archive` and `--local-config` require a directory deployment; files excluded by `.vercelignore` or the default ignore list are refused; hidden files need confirmation (pass `--yes` in scripts)
- Turbo build machine per deployment: the changelog states `vc deploy --turbo` (CLI 59.20.0 or later), or `#VERCEL_BUILD_MACHINE=TURBO` in a Git commit message, or `buildMachine: turbo` in the REST API. `--turbo` is not listed on the current `vercel deploy` docs page, so it is not in the options table; check `vercel deploy --help`

## Related

- [build.md](./build.md)
- [promote.md](./promote.md)
- [rollback.md](./rollback.md)
- [alias.md](./alias.md)
- [list.md](./list.md)
