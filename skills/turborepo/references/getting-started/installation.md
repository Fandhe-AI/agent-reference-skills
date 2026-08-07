# Installation

## Signature / Usage

```bash
# Create a new project (quickstart)
pnpm dlx create-turbo@latest
yarn dlx create-turbo@latest
npx create-turbo@latest
bunx create-turbo@latest
```

```bash
# Install globally
pnpm add turbo --global
npm install turbo --global
```

```bash
# Install as a repository devDependency
npm install turbo --save-dev
```

## Options / Props

| Package Manager | Command |
| --- | --- |
| pnpm | `pnpm dlx create-turbo@latest` |
| yarn | `yarn dlx create-turbo@latest` |
| npm | `npx create-turbo@latest` |
| bun | `bunx create-turbo@latest` |

## Notes

- The starter created by `create-turbo` includes two applications and three shared libraries
- Global `turbo` usage: `turbo build` builds along the dependency graph, `turbo build --filter=docs --dry` performs a dry run, `turbo generate` runs code generation, and `cd apps/docs && turbo build` builds a specific package
- Add `turbo` as a root devDependency as well, to keep the version consistent across the team
- A globally installed `turbo` automatically delegates to the local version if one exists in the repository, preserving workflow convenience while keeping the team's version consistent

## Related

- [Add to Existing Repository](./add-to-existing.md)
- [Editor Integration](./editor-integration.md)
