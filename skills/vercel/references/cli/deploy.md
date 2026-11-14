# vercel deploy

Deploy a Vercel project. Default command when no subcommand is specified.

## Signature / Usage

```bash
vercel
vercel deploy
vercel deploy --prod
vercel deploy --prebuilt --archive=tgz
vercel deploy --environment=staging
vercel --project my-project
vercel deploy --turbo
vercel deploy --temporary
vercel index.html            # single-file deployment
vercel index.html --dry      # preview without uploading
vercel index.html --temporary  # unauthenticated, .html only
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--prebuilt` | | Upload results from `vercel build` in `.vercel/output`; skips Vercel cloud build |
| `--build-env` | | Build-time environment variable as `KEY=value` (repeatable) |
| `--yes` | | Skip new-project setup questions; use defaults. Does not choose a team; also pass `--scope` if you belong to several teams |
| `--env` | | Runtime environment variable as `KEY=value` (repeatable) |
| `--project` | | Project name or ID to deploy to without linking the directory (default: the linked project) |
| `--prod` | | Deploy to the production domain |
| `--skip-domain` | | With `--prod`: skip custom domain assignment (use `vercel promote` later) |
| `--regions` | | Region IDs for Vercel Functions |
| `--no-wait` | | Do not wait for the deployment to finish before exiting |
| `--force` | | Force new deployment ignoring build cache |
| `--with-cache` | | Retain build cache when using `--force` |
| `--archive` | | Compress deployment before upload; value: `tgz` |
| `--logs` | | Print build logs during deployment |
| `--meta` | | Metadata key-value as `KEY=value` (repeatable); filterable via `vercel list --meta` |
| `--environment` | | Target environment: `production`, `preview`, or custom environment name; `--prod` equals `--environment=production` |
| `--turbo` | | Use a Turbo build machine for one deployment without changing the project's build machine settings |
| `--temporary` | | Create a temporary deployment without logging in (only when the CLI has no credentials) |
| `--json` | | `stdout` is a JSON document instead of the deployment URL (also the case in non-interactive mode) |
| `--guidance` | | Show suggested next steps after deployment completes (displayed by default unless guidance is turned off) |

## Notes

- `stdout` is the deployment URL; with `--json` or in non-interactive mode it is a JSON document. Suitable for piping
- `stderr` carries error messages; check exit code in CI scripts
- When using `--prebuilt`, System Environment Variables are absent at build time. `vercel redeploy` on a prebuilt deployment reuses its prebuilt output. Prebuilt deployments cannot use `dpl_` as a user-configured deployment ID prefix
- Fast static deployments: Vercel automatically makes eligible static deployments ready without a build step. Supported: only HTML (`.html`, `.htm`) or Markdown (`.md`) files, up to 100 files and 25 MB total (the previous version of this page said 10 files and 5 MB). Eligibility also depends on project build settings and deployment configuration; other deployments use the standard flow
- Single-file deployments: pass one file path to `vercel` / `vercel deploy` (e.g. `vercel index.html`, `vercel deploy README.md`). The CLI uploads only that file with static settings and does not use the linked project; by default the project is named after the file (use `--project` to choose). Logged in: any extension; a single-file `--temporary` deployment supports only `.html`; `--dry` previews without uploading
- Single-file constraints: `--prebuilt`, `--archive` and `--local-config` require a directory deployment; files excluded by `.vercelignore` or the default ignore list are refused; hidden files need confirmation (pass `--yes` in scripts)
- `--temporary`: warns and creates a normal deployment when logged in, fails in non-interactive mode; builds locally and deploys prebuilt output unless `--prebuilt` with an existing `.vercel/output`; always targets production (any other `--environment` errors); prints a claim URL and expiry; not available in CI or in a directory already linked to a project
- The first deployment of a new project is always a production deployment even without `--prod`
- To associate a CLI deployment with a Git branch, pass `--meta` keys per provider (GitHub `githubDeployment=1` + `githubCommitRef`, GitLab `gitlabDeployment=1` + `gitlabCommitRef`, Bitbucket `bitbucketDeployment=1` + `bitbucketCommitRef`); for local or prebuilt deployments run `vercel pull --environment=preview --git-branch=feature-checkout` before `vercel build`. `--git-branch` is shown on the official page only as a `vercel pull` option, not as a `vercel deploy` option
- Not confirmed in the current official page: `--target` (replaced by `--environment` in the official examples), `--name` / `-n`, `--public`, and the shorthands `-b`, `-e`, `-f`, `-l`, `-m`. The `--turbo` flag, previously missing from the docs page, is now documented (the earlier changelog-based CLI 59.20.0 note is not repeated on the page)
- Source: https://vercel.com/docs/cli/deploy (fetched 2026-11-14)

## Related

- [build.md](./build.md)
- [promote.md](./promote.md)
- [rollback.md](./rollback.md)
- [alias.md](./alias.md)
- [list.md](./list.md)
