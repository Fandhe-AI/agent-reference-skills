# Building CI

## Usage

### Running only affected packages

```bash
# Simple approach
turbo run build --affected

# Check affected packages as JSON
turbo query affected --packages web

# Check a specific task (respects `inputs`)
turbo query affected --tasks test --packages docs

# Binary check (exit 1 if there are changes, 0 if none, 2 on errors)
turbo query affected --packages web --exit-code
```

### Typical workflow

```bash
# Run quality checks across all packages
turbo run lint check-types test

# Build only specific packages
turbo build --filter=web
```

### Pinning the standalone binary before dependencies are installed

For CI steps that run before dependencies are installed (e.g. `turbo prune` for a Docker image), global `turbo` cannot use the version from `package.json`. Pin the standalone binary to an exact version compatible with the repository's `turbo` dependency with `TURBO_VERSION`:

```sh
# macOS and Linux
curl -fsSL https://turborepo.dev/install -o turbo-install.sh
less turbo-install.sh
TURBO_VERSION=2.11.5 sh ./turbo-install.sh
```

```powershell
# Windows x64
$env:TURBO_VERSION = '2.11.5'
Invoke-RestMethod https://turborepo.dev/install.ps1 -OutFile turbo-install.ps1
Get-Content ./turbo-install.ps1
./turbo-install.ps1
```

## Options

| Environment variable | Purpose |
| --- | --- |
| `TURBO_TOKEN` | Bearer token to access the Remote Cache |
| `TURBO_TEAM` | Account name for the repository (Vercel team slug) |
| `TURBO_VERSION` | Exact version used by the standalone installer |

## Notes

- Shallow clone limitation: filtering by source-control changes needs history. With `--affected` and `turbo query affected`, an insufficiently deep checkout makes all packages be considered changed; check out with `--filter=blob:none --depth=0`. `--affected` handles shallow clones more gracefully than bespoke filtering because it falls back to running all tasks.
- The official docs suggest `--filter=blob:none --depth=0`, but Git rejects `--depth=0` (`fatal: depth 0 is not a positive number`). To get full history, omit `--depth` on a fresh `git clone --filter=blob:none`, run `git fetch --unshallow` on an existing shallow checkout, or set `fetch-depth: 0` on `actions/checkout` (a GitHub Actions input, not a Git flag).
- GitHub Actions auto-detection of `--affected`: Turborepo inspects `GITHUB_BASE_REF` (set for `pull_request` and `pull_request_target`) to compare the PR base and head. On regular push events it uses `GITHUB_EVENT_PATH` to find the base; for force pushes and pushing a branch with no additional commits it compares to the parent of the first commit on the branch.
- `turbo query affected` compares against the merge-base with the default branch by default. The JSON output has a `length` field (`0` = safe to skip the rest of CI) and a per-item reason (e.g. `FileChanged`, `DependencyChanged`). Use it to skip container preparation like dependency installation.
- The official docs show a one-liner that streams the installer straight into the shell; here the installer is downloaded and reviewed before it is run.
- Standalone releases start at 2.11.5; to use an older version install it with your package manager.
- Use `turbo run <task>` explicitly in CI to avoid collisions with future `turbo` subcommands (e.g. `turbo run deploy`).
- Remote Cache in CI: Vercel's built-in CI/CD connects to the managed Vercel Remote Cache with zero configuration; other CI vendors need `TURBO_TOKEN` and `TURBO_TEAM`.
- Misconfigured `outputs` (task passes on cache miss but fails on hit) or missing `env` / `globalEnv` (cache hits across different environments) are the usual troubleshooting causes.
- Docker: `turbo prune` helps ship lightweight images.
