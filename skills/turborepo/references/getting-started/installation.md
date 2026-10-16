# Installation

## Signature / Usage

```bash
# Create a new project (quickstart)
pnpm dlx create-turbo@latest
yarn dlx create-turbo@latest
npx create-turbo@latest
bunx create-turbo@latest
nubx create-turbo@latest
aubx create-turbo@latest
```

```bash
# Install globally (standalone installer)
# macOS and Linux: download, review, then run
curl -fsSL https://turborepo.dev/install -o turbo-install.sh
less turbo-install.sh
sh ./turbo-install.sh

# Windows x64 (PowerShell): download, review, then run
Invoke-RestMethod https://turborepo.dev/install.ps1 -OutFile turbo-install.ps1
Get-Content ./turbo-install.ps1
./turbo-install.ps1
```

```bash
# Install as a repository devDependency (pins the version)
pnpm add turbo --save-dev --ignore-workspace-root-check
yarn add turbo --dev --ignore-workspace-root-check
npm install turbo --save-dev
bun install turbo --dev
nub add turbo --save-dev
aube add turbo --save-dev
```

## Options / Props

| Package Manager | create-turbo | Repository install |
| --- | --- | --- |
| pnpm | `pnpm dlx create-turbo@latest` | `pnpm add turbo --save-dev --ignore-workspace-root-check` |
| yarn | `yarn dlx create-turbo@latest` | `yarn add turbo --dev --ignore-workspace-root-check` |
| npm | `npx create-turbo@latest` | `npm install turbo --save-dev` |
| bun | `bunx create-turbo@latest` | `bun install turbo --dev` |
| nub | `nubx create-turbo@latest` | `nub add turbo --save-dev` |
| aube | `aubx create-turbo@latest` | `aube add turbo --save-dev` |

## Notes

- The starter created by `create-turbo` includes two deployable applications and three shared libraries.
- Global installation: the standalone installer is the documented path. The binaries are also available in the GitHub release assets, starting with 2.11.5; to install an older version use your package manager. See the support policy for supported platforms.
- Global `turbo` usage: `turbo build` builds along the dependency graph, `turbo build --filter=docs --dry` prints an outline of the `build` task without running it, `turbo generate` runs Generators, and `cd apps/docs && turbo build` builds a specific package and its dependencies (Automatic Package Scoping). `turbo` is an alias for `turbo run`.
- The official docs show a one-liner that streams the installer straight into the shell; here the installer is downloaded and reviewed before it is run.
- Add `turbo` as a root devDependency as well, to pin the version used in the repository. When a local binary is installed, the global binary defers to it.
- For global `turbo` in CI (including pinning with `TURBO_VERSION`), see the CI reference.

## Related

- [Add to Existing Repository](./add-to-existing.md)
- [Editor Integration](./editor-integration.md)
