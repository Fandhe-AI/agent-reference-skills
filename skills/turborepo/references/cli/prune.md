# turbo prune

## Signature / Usage

```bash
turbo prune [package] [options]
```

Generates a partial monorepo containing only a target package and its dependencies. Useful for optimizing Docker layer caching in deployments.

## Options / Props

| Option | Default | Description |
|---|---|---|
| `--docker` | `false` | Output structure optimized for Docker layer caching |
| `--out-dir` | `./out` | Path to the output directory |
| `--use-gitignore` | `true` | Respect `.gitignore` |

## Notes

- Output structure with `--docker`:
  ```
  out/
  ├── json/          # package.json only (for dependency install)
  ├── full/          # full source code (for build)
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
- Unlike `pnpm deploy`, the monorepo structure is preserved.
- Files referenced via `globalDependencies` are not copied by default.
