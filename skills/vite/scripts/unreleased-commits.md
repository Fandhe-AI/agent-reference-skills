---
source: https://vite.dev/guide/#using-unreleased-commits
---

# Unreleased Commits

Commands for trying unreleased Vite commits.

> **Warning**: Unreleased commits come with no stability guarantee. Verify in a throwaway branch or environment. Releases via pkg.pr.new are valid only for commits within the last month; older ones are purged.

## Install a specific commit from pkg.pr.new

```sh
npm install -D https://pkg.pr.new/vite@SHA
```

```sh
yarn add -D https://pkg.pr.new/vite@SHA
```

```sh
pnpm add -D https://pkg.pr.new/vite@SHA
```

```sh
bun add -D https://pkg.pr.new/vite@SHA
```

Replace `SHA` with any commit SHA from the Vite repository.

## Clone locally and link

```sh
git clone https://github.com/vitejs/vite.git
cd vite
pnpm install
cd packages/vite
pnpm run build
pnpm link # use your preferred package manager for this step
```

pnpm is required. Then, in the project that uses Vite, run `pnpm link vite` (or the equivalent command of the package manager used for the global link) and restart the dev server.

```sh
pnpm link vite
```

## Replace the Vite version used by dependent packages

The official docs advise using npm overrides or pnpm overrides to replace the Vite version used through dependencies (this is done via `package.json` / pnpm settings, not a command; see the official overrides documentation for details).
