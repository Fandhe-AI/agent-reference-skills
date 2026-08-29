---
source: https://tanstack.com/router/latest/docs/framework/react/installation/manual
---

# Install

Package installation commands for TanStack Router's core package, bundler plugin, devtools, CLI, and ESLint plugin.

> The official docs render these commands via package-manager tabs (npm/pnpm/yarn/bun) whose literal text is not present in the fetched page source. The package names below are taken verbatim from the docs' prose (see per-section source notes); the `npm install` / `pnpm add` / `yarn add` / `bun add` invocation forms are the standard syntax for installing a named package as a (dev) dependency, not TanStack-specific flags. The docs explicitly call `@tanstack/router-plugin`, `@tanstack/router-cli`, and `@tanstack/eslint-plugin-router` dev dependencies (hence `-D` below); devtools' dependency placement is not stated in the fetched pages, so it is shown without `-D`.

## TanStack Router 本体のインストール（React）

```sh
npm install @tanstack/react-router
# or
pnpm add @tanstack/react-router
# or
yarn add @tanstack/react-router
# or
bun add @tanstack/react-router
```

For file-based routing, install this alongside the bundler plugin and devtools as dev dependencies (see below). Source: https://tanstack.com/router/latest/docs/framework/react/installation/manual — "install `@tanstack/react-router` ... plus devtools and the router bundler plugin as a dev dependency".

## TanStack Router 本体のインストール（Solid）

```sh
npm install @tanstack/solid-router
```

Source: https://tanstack.com/router/latest/docs/framework/react/installation/manual

## Bundler Plugin のインストール

```sh
npm install -D @tanstack/router-plugin
```

Used from `@tanstack/router-plugin/vite`, `@tanstack/router-plugin/rspack`, or `@tanstack/router-plugin/webpack` / `@tanstack/router-plugin/esbuild` depending on the bundler. See `bundler-plugins.md` for the config snippets.

Sources: https://tanstack.com/router/latest/docs/framework/react/installation/with-vite, https://tanstack.com/router/latest/docs/framework/react/installation/with-rspack, https://tanstack.com/router/latest/docs/framework/react/installation/with-webpack, https://tanstack.com/router/latest/docs/framework/react/installation/with-esbuild

## Router CLI のインストール（バンドラーを使わない場合）

```sh
npm install -D @tanstack/router-cli
```

"The CLI only supports the generation of the route tree file and does not provide any other features." Recommended primarily for projects not using Vite/Rspack/Webpack/Esbuild. Source: https://tanstack.com/router/latest/docs/framework/react/installation/with-router-cli

## Devtools のインストール

```sh
npm install @tanstack/react-router-devtools
# Solid
npm install @tanstack/solid-router-devtools
```

Source: https://tanstack.com/router/latest/docs/framework/react/devtools

## ESLint Plugin のインストール

```sh
npm install -D @tanstack/eslint-plugin-router
```

Source: https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router
