# turbo prune

## Signature / Usage

```bash
turbo prune [package] [options]
```

Generates a partial monorepo for a target package into `out/`: the full source of all internal packages needed to build the target, a pruned lockfile (the subset needed), and a copy of the root `package.json`. Useful for optimizing Docker layer caching in deployments.

## Options / Props

| Option | Default | Description |
|---|---|---|
| `--docker` | `false` | Output structure optimized for Docker layer caching |
| `--out-dir <path>` | `./out` | Path to the output directory |
| `--use-gitignore[=<bool>]` | `true` | Respect `.gitignore` file(s) when copying files to the output directory |
| `--production` | `false` | Exclude in-workspace packages listed only in `devDependencies`; only workspace packages reachable through `dependencies` (and non-optional peer workspace dependencies) are included. For Bun repositories, references to excluded workspaces are also removed from the pruned manifests and lockfile so the output can be installed with a frozen lockfile |

## Notes

- Output structure with `--docker`:
  ```
  out/
  ├── json/          # package.json files of the pruned workspace (for dependency install)
  ├── full/          # full source of internal packages needed to build the target
  └── pnpm-lock.yaml # pruned lockfile
  ```
- Example Dockerfile usage:
  ```dockerfile
  FROM node:alpine AS installer
  COPY out/json/ .
  RUN npm install

  FROM node:alpine AS builder
  COPY --from=installer /app/node_modules ./node_modules
  COPY out/full/ .
  RUN turbo run build
  ```
- Task dependencies: by default `turbo prune` follows package dependencies, not task dependencies; an explicit `"dependsOn": ["mycrate#build:types"]` does not by itself retain `mycrate`. Enable `futureFlags.affectedUsingTaskInputs` to also retain packages required by task dependencies (including across enabled toolchains), with their package dependencies and inherited Package Configurations. The command still accepts package names, and considers all configured tasks of retained packages, not only `build`. With `--production`, development dependencies are excluded unless otherwise required (e.g. by an explicit task dependency).
- Including `globalDependencies`: by default files referenced by `globalDependencies` are not copied (the field is preserved in the pruned `turbo.json`). Enable `futureFlags.pruneIncludesGlobalFiles` to copy them; with `--docker` they go to both `full` and `json`.
  ```jsonc
  { "globalDependencies": ["tsconfig.json", ".env"], "futureFlags": { "pruneIncludesGlobalFiles": true } }
  ```
- Comparison to `pnpm deploy`: `turbo prune` generates a partial monorepo (repository structure retained); `pnpm deploy` generates a directory containing only the target package's contents, with a self-contained `node_modules` of hard-linked internal dependencies, i.e. a portable standalone deployable package (structure not retained).

## Related

- [Docker](../guides-tools/docker.md)
- [turbo.json](../configuration/turbo-json.md)
