---
source: https://developers.cloudflare.com/workers/get-started/guide/
---

# Create Project

Scaffold a new Worker project with C3 (`create-cloudflare`). Pinned to cloudflare-docs production SHA `d0995b9`, fetched 2026-11-03. Also from https://developers.cloudflare.com/workers/static-assets/get-started/ and the framework guides under https://developers.cloudflare.com/workers/framework-guides/web-apps/.

Full Wrangler command set: see the cloudflare-wrangler skill.

## Create a Worker project (Hello World)

```sh
npm create cloudflare@latest -- my-first-worker
```

Interactive prompts in the official guide: "What would you like to start with?" = `Hello World example`, "Which template would you like to use?" = `Worker only`, language = `JavaScript`, git = `Yes`, AGENTS.md = `Yes`, deploy = `No`. Other managers: `yarn create cloudflare my-first-worker` / `pnpm create cloudflare@latest my-first-worker`.

## Move into the project

```sh
cd my-first-worker
```

## Create a static site project

```sh
npm create cloudflare@latest -- my-static-site
```

Choose `Hello World example` -> `Static site` -> `TypeScript`. See also https://developers.cloudflare.com/workers/static-assets/get-started/.

## Create a full-stack (SSR) project

```sh
npm create cloudflare@latest -- my-dynamic-site
```

Choose `Hello World example` -> `SSR / full-stack app` -> `TypeScript`.

## Create a project from a Git repository template

```sh
npm create cloudflare@latest -- --template <SOURCE>
```

`<SOURCE>` accepts `user/repo`, `git@github.com:user/repo`, `https://github.com/user/repo`, `user/repo/some-template` (subdirectory), `user/repo#canary` (branch), `user/repo#1234abcd` (commit hash), `bitbucket:user/repo`, `gitlab:user/repo`. The template must contain at least `package.json`, `wrangler.jsonc`, and `src/` with a Worker script referenced from `wrangler.jsonc`.

## Create a framework project (--framework)

```sh
npm create cloudflare@latest -- my-react-app --framework=react
```

Values shown in the framework guides: `react`, `react-router`, `next`, `astro`, `vue`, `svelte` (SvelteKit guide), `nuxt`, `angular`, `gatsby`, `qwik`, `analog`, `docusaurus`, `waku`, `tanstack-start`. Replace the project name and value accordingly.

## Create a framework project (variants with extra flags)

```sh
npm create cloudflare@latest -- my-docusaurus-app --framework=docusaurus --platform=workers
```

```sh
npm create cloudflare@latest -- my-solid-app --framework=solid --experimental
```

The Docusaurus guide passes `--platform=workers` in one place; the Solid guide passes `--experimental`. Flags are shown only as they appear in those guides.

## Create a Hono full-stack project (--template)

```sh
npm create cloudflare@latest -- my-hono-app --template=cloudflare/templates/vite-react-template
```

Hono API + React SPA with the Cloudflare Vite plugin.

## Notes

- The Waku guide writes the command as `npm create cloudflare@latest my-waku-app -- --framework=waku` (project name before `--`), unlike the other guides.
- The Hono guide has no Hono-specific flag; it uses the shared `vite-react-template` template.
- Run the first `wrangler dev` / `wrangler deploy` steps after creation per the cloudflare-wrangler skill.
