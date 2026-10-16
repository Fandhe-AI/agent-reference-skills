# Add to Existing Repository

## Signature / Usage

```bash
# Step 1: Install turbo globally (standalone installer), then pin it in the repository root
# macOS and Linux: download, review, then run
curl -fsSL https://turborepo.dev/install -o turbo-install.sh
less turbo-install.sh
sh ./turbo-install.sh

# Windows x64 (PowerShell): download, review, then run
Invoke-RestMethod https://turborepo.dev/install.ps1 -OutFile turbo-install.ps1
Get-Content ./turbo-install.ps1
./turbo-install.ps1

pnpm add turbo --save-dev --workspace-root   # needs pnpm-workspace.yaml first
yarn add turbo --dev
npm install turbo --save-dev
bun install turbo --dev
nub add turbo --save-dev
aube add turbo --save-dev
```

```json
// Step 2: Create turbo.json (Next.js example)
{
  "$schema": "https://turborepo.dev/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "!.next/dev/**"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "persistent": true,
      "cache": false
    }
  }
}
```

```
# Step 3: Add to .gitignore
.turbo
```

```json
// Step 4: Declare the package manager in root package.json
{
  "devEngines": {
    "packageManager": { "name": "pnpm", "version": "10.0.0" }
  }
}
```

```yaml
# Step 5: Configure workspace structure (monorepo only)
# pnpm-workspace.yaml (npm / yarn / bun / nub use "workspaces" in package.json; aube uses aube-workspace.yaml)
packages:
  - "apps/*"
  - "packages/*"
```

```bash
# Step 6: Run tasks
turbo build check-types
```

## Options / Props

| Repository Type | Description |
| --- | --- |
| Single-Package Workspace | A single package created with e.g. `create-next-app` or `npm create vite`. No extra setup required |
| Multi-Package Workspace (monorepo) | Multiple packages managed via the package manager's workspace feature |

## Notes

- Package manager declaration: `devEngines.packageManager` is used; the legacy top-level `packageManager` field is also supported. While migrating, or where a declaration is not yet possible, `dangerouslyDisablePackageManagerCheck` (turbo.json key / flag / environment variable) is the opt-out.
- The official docs show a one-liner that streams the installer straight into the shell; here the installer is downloaded and reviewed before it is run.
- Install: the binaries are also available in the GitHub release assets. The installed local version takes precedence when the global binary is run in the repository. With pnpm, `pnpm-workspace.yaml` must exist before installing, or `--workspace-root may only be used inside a workspace` errors.
- Vite: split `"build": "tsc && vite build"` into `build` (`vite build`) and `check-types` (`tsc --noEmit`) so `turbo` can run them in parallel; Vite `outputs` is `["dist/**"]`. In Next.js, add a `check-types` script (`tsc --noEmit`).
- You can start with a single task in a few packages and add more incrementally.
- Expected output on re-run, showing the cache hit:

```
Tasks:    2 successful, 2 total
Cached:    2 cached, 2 total
Time:    185ms >>> FULL TURBO
```

- `turbo dev` starts development tasks for all packages in a multi-package workspace; it adds little value in a single-package workspace (no cached outputs, nothing to run in parallel).

## Related

- [Installation](./installation.md)
- [Editor Integration](./editor-integration.md)
