# guides-tools

| Name | Description | Path |
|------|-------------|------|
| Biome | Fast formatter and linter. Recommended to run as a root task. | [biome.md](./biome.md) |
| Docker | Problem: shared lockfile triggers full rebuilds. Solution: `turbo prune`. | [docker.md](./docker.md) |
| ESLint | ESLint v9 (Flat Config) — recommended. | [eslint.md](./eslint.md) |
| Go (experimental support) | Discovers modules in a repository-root `go.work` as Turborepo packages and maps common tasks to standard Go commands. | [go-experimental.md](./go-experimental.md) |
| Jest | Basic setup with a `jest` script and a `test` task. | [jest.md](./jest.md) |
| Oxc (oxlint / oxfmt) | Rust-based, extremely fast JavaScript / TypeScript tool suite. | [oxc.md](./oxc.md) |
| Playwright | Environment variable setup (Strict Mode compatible). | [playwright.md](./playwright.md) |
| Prisma | Configure the DB client as a shared internal package inside the monorepo. | [prisma.md](./prisma.md) |
| Python (experimental support) | Detects uv workspace members as Turborepo packages, builds the dependency graph, and maps tasks to uv commands. Package resolution, environment setup, and installs are still handled by uv; uv is currently the only supported Python package manager. | [python-experimental.md](./python-experimental.md) |
| Rust (experimental support) | Native detection of Cargo workspaces. Recognizes Rust crates as Turborepo packages and maps tasks to Cargo commands. | [rust-experimental.md](./rust-experimental.md) |
| shadcn/ui | Setup: use the canary version for monorepos. | [shadcn-ui.md](./shadcn-ui.md) |
| Storybook | Start from the `design-system` create-turbo template. | [storybook.md](./storybook.md) |
| Tailwind CSS | Quick start via create-turbo; shared Tailwind config package. | [tailwind.md](./tailwind.md) |
| TypeScript | Shared config package `@repo/typescript-config`. | [typescript.md](./typescript.md) |
| Vitest | Per-package setup with `vitest run` (recommended). | [vitest.md](./vitest.md) |
