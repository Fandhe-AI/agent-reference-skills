# Plugins (207)

Source: https://knip.dev/reference/plugins

## Overview

Plugins activate automatically when their associated package appears in `package.json` dependencies. Each plugin handles configuration files, entry file patterns, and CLI arguments.

## Configuration

```json
{
  "pluginName": { "config": "path/to/config", "entry": ["pattern"] },
  "pluginName": true,
  "pluginName": false
}
```

## Complete Plugin List

Angular, Astro, Astro DB, Astro Markdoc, astro-og-canvas, Ava, AWS CDK, Babel, Biome, Borp, Buf, bumpp, Bun, c8, Capacitor, Catalyst, Changelogen, Changelogithub, Changesets, Commitizen, commitlint, Convex, create-typescript-app, CSpell, Cucumber, Cypress, Danger, dependency-cruiser, Docusaurus, dotenv, Drizzle, Electron Forge, electron-vite, Eleventy, esbuild, ESLint, Evalite, eve, execa, Expo, Expo Router, Expressive Code, FAST, filesystem-routing, Flue, Fumadocs, Gatsby, GitHub Action, GitHub Actions, glob, GraphQL Codegen, Hardhat, husky, i18next Parser, Jasmine, Jest, Karma, Knex, kysely-codegen, Ladle, laravel-vite-plugin, Lefthook, Lingui, lint-staged, LintHTML, Lit, lockfile-lint, Lost Pixel, Lunaria, markdownlint, Marko, Mastra, MCP, MDX, mdxlint, Metro, MikroORM, mise, Mocha, moonrepo, Mock Service Worker, nano-spawn, Nano Staged, Nest, Netlify, Next.js, next-intl, Next.js MDX, Nitro, Node.js, node-modules-inspector, nodemon, npm-package-json-lint, Nuxt, @nuxtjs/i18n, Nx, nyc, oclif, openapi-ts, OpenClaw, orval, osls, Oxfmt, Oxlint, Panda CSS, Parcel, Payload CMS, pino, Playwright, Playwright for components, playwright-test, Plop, pm2, pnpm, PostCSS, pre-commit, Preconstruct, Prettier, Prisma, PurgeCSS, Quasar, Qwik, Railway, Raycast, React Cosmos, React Email, React Native, React Router, Relay, Release It!, Remark, Remix, retry-cli, Rolldown, Rollup, Rsbuild, Rslib, Rspack, Rstest, Sanity, Semantic Release, Sentry, Serverless Framework, simple-git-hooks, size-limit, @solidjs/vite-plugin, SST, Starlight, Stencil, Storybook, Stryker, Stylelint, Svelte, @sveltejs/package, SvelteKit, SVGO, SVGR, SWC, Syncpack, Tailwind, TanStack Router, Taskfile, Tauri, Temporal.io, textlint, Travis CI, ts-node, tsd, tsdown, tsrs, tsup, tsx, Turborepo, TypeDoc, TypeScript, TypeScript Content Mapper, unbuild, UnoCSS, unplugin-auto-import, unplugin-icons, unplugin-vue-components, @intlify/unplugin-vue-i18n, unplugin-vue-markdown, unplugin-vue-router, Varlock, Vercel, Vercel OG, Vike, Vite, vite-plugin-pages, vite-plugin-pwa, vite-plugin-vue-layouts-next, vite-plus, @vite-pwa/assets-generator, VitePress, Vitest, Vue, Web Test Runner, WebdriverIO, webpack, Wireit, Wrangler, WXT, xo, Yarn, yorkie, zx

Individual plugin pages: `https://knip.dev/reference/plugins/[name]`

## Notes

- Plugin list regenerated from the knip@6.45.1 docs (207 plugins; the knip@6.41.0 docs listed 177 and the previous version of this page 155). Plugins added since 6.41.0: @solidjs/vite-plugin, AWS CDK, Borp, Buf, Electron Forge, Evalite, Expo Router (split from the Expo plugin per the 6.41.0 release), filesystem-routing, Flue, Jasmine, kysely-codegen, Lingui, Marko, Mastra, MCP, MikroORM, mise, OpenClaw, osls, pre-commit, PurgeCSS, Railway, retry-cli, textlint, tsd, tsrs, Turborepo, TypeScript Content Mapper, Varlock, Web Test Runner
- Source: https://knip.dev/reference/plugins (knip@6.45.1 docs, retrieved 2026-11-14)
