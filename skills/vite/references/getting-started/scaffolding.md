---
source: https://vite.dev/guide/#scaffolding-your-first-vite-project
---

# Scaffolding (create-vite)

Create a project from a template with `create vite`, or install the `vite` CLI manually.

## Signature / Usage

```bash
$ npm create vite@latest
$ yarn create vite
$ pnpm create vite
$ bun create vite
$ deno init --npm vite
```

With a project name and template:

```bash
# npm 7+, extra double-dash is needed:
$ npm create vite@latest my-vue-app -- --template vue
$ yarn create vite my-vue-app --template vue
$ pnpm create vite my-vue-app --template vue
$ bun create vite my-vue-app --template vue
$ deno init --npm vite my-vue-app --template vue
```

Manual installation:

```bash
$ npm install -D vite
$ yarn add -D vite
$ pnpm add -D vite
$ bun add -D vite
$ deno add -D npm:vite
```

Create an `index.html`, then run the CLI (served on `http://localhost:5173`):

```html
<p>Hello Vite!</p>
```

```bash
$ npx vite
```

## Options / Props

Supported template presets (`--template`):

| Name | Description |
|------|-------------|
| `vanilla`, `vanilla-ts` | Vanilla JS / TS |
| `vue`, `vue-ts` | Vue |
| `react`, `react-ts` | React |
| `react-compiler`, `react-compiler-ts` | React with compiler |
| `preact`, `preact-ts` | Preact |
| `lit`, `lit-ts` | Lit |
| `svelte`, `svelte-ts` | Svelte |
| `solid`, `solid-ts` | Solid |
| `qwik`, `qwik-ts` | Qwik |

## Notes

- Requires Node.js 20.19+ or 22.12+. Some templates require a higher Node.js version.
- Use `.` as the project name to scaffold in the current directory.
- Use the `--no-interactive` flag to create a project without interactive prompts.
- Community templates: see Awesome Vite. For a GitHub template, `npx tiged user/project my-project` creates a local copy; `https://github.stackblitz.com/user/project` opens it online.
- The `rsc` template (`npm create vite@latest -- --template rsc`) is mentioned on the Official Plugins page for `@vitejs/plugin-rsc`; it is not in the create-vite README preset list.

## Related

- [overview.md](./overview.md)
- [index-html-project-root.md](./index-html-project-root.md)
- [official-plugins.md](./official-plugins.md)
