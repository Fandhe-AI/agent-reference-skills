---
source: https://vite.dev/guide/#using-unreleased-commits
---

# Using Unreleased Commits

Install a specific Vite commit via pkg.pr.new, or build and link the repo locally.

## Signature / Usage

```bash
$ npm install -D https://pkg.pr.new/vite@SHA
$ yarn add -D https://pkg.pr.new/vite@SHA
$ pnpm add -D https://pkg.pr.new/vite@SHA
$ bun add -D https://pkg.pr.new/vite@SHA
```

Local build and link (pnpm is required for the build):

```bash
git clone https://github.com/vitejs/vite.git
cd vite
pnpm install
cd packages/vite
pnpm run build
pnpm link # use your preferred package manager for this step
```

Then in your Vite-based project run `pnpm link vite` (or the package manager used to link globally) and restart the dev server.

## Notes

- Replace `SHA` with any of Vite's commit SHAs. Only commits within the last month work; older commit releases are purged.
- To replace the Vite version used by dependencies transitively, use npm overrides or pnpm overrides.

## Related

- [scaffolding.md](./scaffolding.md)
