---
source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch
---

# Install

Manual dependency setup when building a TanStack Start project from an empty directory (skip this if scaffolding via the CLI — see `create-project.md`).

## Initialize a new directory

```bash
mkdir myApp && cd myApp && npm init -y
```

## Install core dependencies

```bash
npm i @tanstack/react-start @tanstack/react-router react react-dom
npm i -D typescript @types/react @types/react-dom @types/node
```

## Install a build tool (Vite or Rsbuild)

```bash
# Vite
npm i -D vite @vitejs/plugin-react
```

```bash
# or Rsbuild
npm i -D @rsbuild/core @rsbuild/plugin-react
```

After installing, wire up `tsconfig.json`, `vite.config.ts` (with the `tanstackStart()` plugin), `src/router.tsx`, and `src/routes/__root.tsx` as shown in the official Build from Scratch guide.
