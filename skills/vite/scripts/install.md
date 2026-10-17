---
source: https://vite.dev/guide/#scaffolding-your-first-vite-project
---

# Install

Commands for scaffolding a Vite project and installing it manually. Vite requires Node.js 20.19+ / 22.12+ (some templates require an even newer Node.js).

## Scaffold a project (interactive)

```sh
npm create vite@latest
```

```sh
yarn create vite
```

```sh
pnpm create vite
```

```sh
bun create vite
```

```sh
deno init --npm vite
```

Follow the prompts. The create-vite template is selected within the prompts.

## Scaffold with a specified template

```sh
# npm 7+ requires an extra --
npm create vite@latest my-vue-app -- --template vue
```

```sh
yarn create vite my-vue-app --template vue
```

```sh
pnpm create vite my-vue-app --template vue
```

```sh
bun create vite my-vue-app --template vue
```

```sh
deno init --npm vite my-vue-app --template vue
```

Specify `.` as the project name to scaffold into the current directory. Add `--no-interactive` to create a project without interactive prompts.

## Available templates

```sh
# Values accepted by --template (18 listed in the create-vite README)
vanilla
vanilla-ts
vue
vue-ts
react
react-compiler
react-ts
react-compiler-ts
preact
preact-ts
lit
lit-ts
svelte
svelte-ts
solid
solid-ts
qwik
qwik-ts
```

The above lists values to pass to `--template <name>`; it is not a command to run by itself.

## Use a community template (tiged)

```sh
npx tiged user/project my-project
cd my-project

npm install
npm run dev
```

Assumes a template on GitHub whose default branch is `main`. tiged is an external tool, and community templates are listed in Awesome Vite.

## Manual install into an existing project

```sh
npm install -D vite
```

```sh
yarn add -D vite
```

```sh
pnpm add -D vite
```

```sh
bun add -D vite
```

```sh
deno add -D npm:vite
```

Create `index.html` (for example `<p>Hello Vite!</p>`), then start the server.

```sh
npx vite
```

```sh
yarn vite
```

```sh
pnpm vite
```

```sh
bunx vite
```

```sh
deno run -A npm:vite
```

`index.html` is served at `http://localhost:5173`.
