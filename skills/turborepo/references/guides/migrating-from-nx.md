# Migrating from Nx

## Signature / Usage

Migration motivations:

- Using ecosystem standards (Turborepo is built on top of JavaScript package manager workspaces; Nx uses layers of plugins and Nx-specific code)
- Greater control of source code (you configure, or not, your own tooling)
- Less configuration (the equivalent starters need roughly a short `turbo.json` versus `nx.json` + `project.json` with plugins)

Migration steps (from an Nx Next.js starter):

1. Add `.turbo` to `.gitignore`
2. Add a workspace definition (e.g. `pnpm-workspace.yaml` with `apps/*`, or `workspaces` in `package.json`; `aube-workspace.yaml` for aube)
3. Add a `package.json` to each app (instead of `project.json`) with `dev` / `build` scripts
4. Remove the Nx plugin from the app's `next.config.js`
5. Add `devEngines.packageManager` to the root `package.json`
6. Run the package manager's install command (the lockfile diff shows the package was added to the workspace)
7. Install Turborepo (`pnpm add turbo --save-dev --workspace-root`, `yarn add turbo --save-dev --ignore-workspace-root-check`, `npm install turbo --save-dev`, `bun install turbo --dev`, `nub add turbo --save-dev`, `aube add turbo --save-dev`) and optionally the global binary
8. Create `turbo.json`
9. Verify with `turbo build`
10. Enable Remote Caching (optional: `turbo login`, `turbo link`)

```json
{
  "devEngines": { "packageManager": { "name": "pnpm", "version": "9.0.0" } }
}
```

```bash
# global binary, macOS and Linux: download, review, then run
curl -fsSL https://turborepo.dev/install -o turbo-install.sh
less turbo-install.sh
sh ./turbo-install.sh

# Windows x64 (PowerShell): download, review, then run
Invoke-RestMethod https://turborepo.dev/install.ps1 -OutFile turbo-install.ps1
Get-Content ./turbo-install.ps1
./turbo-install.ps1
```

```json
{
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "!.next/cache/**", "!.next/dev/**"] },
    "dev": { "cache": false, "persistent": true }
  }
}
```

## Options / Props

Global configuration:

| Nx | Turborepo |
|---|---|
| `sharedGlobals` | `globalDependencies` |
| `sharedGlobals.env` | `globalEnv` |
| `sharedGlobals.namedInput` | `globalDependencies` |
| `cacheDirectory` | `cacheDir` |

Task configuration:

| Nx | Turborepo |
|---|---|
| `inputs` files | `tasks[task].inputs` |
| `inputs.env` | `tasks[task].env` |
| `outputs` files | `tasks[task].outputs` |
| `cache` | `tasks[task].cache` |

CLI equivalents:

| Nx | Turborepo |
|---|---|
| `nx generate` | `turbo generate` |
| `nx run` | `turbo run` |
| `nx run-many` | `turbo run` |
| `nx reset` | `--force` |
| `--parallel` | `--concurrency` |
| `--nxBail` | `--continue` |
| `--projects` | `--filter` |
| `--graph` | `--graph` |
| `--output-style` | `--log-order` |
| `--no-cloud` | `--cache` |
| `--verbose` | `--verbosity` |

## Notes

- The official docs show a one-liner that streams the installer straight into the shell; here the installer is downloaded and reviewed before it is run.

- Migrate incrementally (Nx and Turborepo side by side): one task at a time (`nx run lint` to `turbo run lint`), one package at a time (`nx run-many lint test --projects=web` to `turbo run lint test --filter=web`), or double-run tasks (`turbo run lint` and `nx run lint`) for stability early on.
- Install dependencies where they are used (unlike Nx's root-install recommendation) to improve cache hit ratios and dependency pruning.
- Shared packages: include the directory in the workspace definition (e.g. `./packages/*`), add a `package.json` with needed scripts, and check task dependencies in `turbo.json`.
- The majority of globs are the same between Nx and Turborepo; see the file glob specification for edge cases.
- Multi-language monorepos: JavaScript/TypeScript are native; other languages have secondary support (see the multi-language guide).

## Related

- [Multi-language support](./multi-language.md)
