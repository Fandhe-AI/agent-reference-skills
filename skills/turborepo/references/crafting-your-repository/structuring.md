# Structuring a Repository

## Usage

### Recommended directory layout

```
apps/       # Applications and services
packages/   # Libraries and tooling configuration
turbo.json
package.json
```

### Minimum requirements

1. Package manager workspace definition
2. Lockfile
3. Root `package.json`
4. Root `turbo.json`
5. Each package's `package.json`

### Workspace definition

**pnpm** (`pnpm-workspace.yaml`):
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**npm / yarn / bun / nub** (root `package.json`):
```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

**aube** (`aube-workspace.yaml`):
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

Lockfiles in the official layouts: `pnpm-lock.yaml` (pnpm), `yarn.lock`, `package-lock.json`, `bun.lock`, `nub.lock` (nub), `aube-lock.yaml` (aube).

### Root package.json and package manager declaration

Declare the package manager with `devEngines.packageManager` (names in the official examples: `pnpm`, `yarn`, `npm`, `bun`, `nub`, `aube`):

```json
{
  "private": true,
  "scripts": { "build": "turbo run build", "dev": "turbo run dev", "lint": "turbo run lint" },
  "devDependencies": { "turbo": "latest" },
  "devEngines": { "packageManager": { "name": "pnpm", "version": "9.0.0" } }
}
```

### exports field

```json
{
  "exports": {
    ".": "./src/constants.ts",
    "./add": "./src/add.ts",
    "./subtract": "./src/subtract.ts"
  }
}
```

Avoids barrel files and allows conditional exports. IDE autocomplete works correctly.

## Notes

- Nested packages are not supported (`apps/**` is invalid).
- Group packages by directory with globs like `packages/*` and `packages/group/*` and do not create `packages/group/package.json`.
- A lockfile is required; without one `turbo` may behave unpredictably (it uses the lockfile to understand dependencies between Internal Packages).
- `create-turbo` starts from a valid structure (`pnpm dlx` / `yarn dlx` / `npx` / `bunx` / `nubx` / `aubx create-turbo@latest`).
- A namespace prefix is recommended for package names (e.g. `@acme/name`).
- Do not access other packages via relative paths (`../`).
