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

Notes: Start requires Vite 8 when you build with Vite (since `@tanstack/react-start` 1.169; upgrade with Vite's migration guide at https://vite.dev/guide/migration). The official 1.169.2 example `package.json` uses `vite` `^8.0.14` and `@vitejs/plugin-react` `^6.0.1`.

After installing, wire up `tsconfig.json`, `vite.config.ts` (with the `tanstackStart()` plugin), `src/router.tsx`, and `src/routes/__root.tsx` as shown in the official Build from Scratch guide.
