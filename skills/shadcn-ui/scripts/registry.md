---
source: https://ui.shadcn.com/docs/registry/getting-started
---

# Registry

Commands to build, serve, validate and consume a custom registry. Source: the official registry getting-started / github / namespace / dynamic-search / health pages (retrieved 2026-10-16).

## Build registry JSON

```sh
npx shadcn@latest build
```

Writes static JSON from `registry.json` to `public/r` (for example `public/r/button.json`). Change the destination with `--output`.

## Start a development server for serving (Next.js example)

```sh
npm run dev
```

Served at `http://localhost:3000/r/[NAME].json`. The command varies by framework.

## Add the dependency for dynamic route handlers

```sh
npm install shadcn
```

Install `shadcn` as a runtime dependency when using `loadRegistry` and similar functions from `shadcn/registry`.

## Test a locally served registry (by URL)

```sh
npx shadcn@latest list http://localhost:3000/r/registry.json
npx shadcn@latest search http://localhost:3000/r/registry.json --query button
npx shadcn@latest view http://localhost:3000/r/button.json
npx shadcn@latest add http://localhost:3000/r/button.json
```

Pass the catalog URL to `list` / `search` and an item URL to `view` / `add`. Run `add` in the consuming project.

## Add a registry as a namespace

```sh
npx shadcn@latest registry add @acme=http://localhost:3000/r/{name}.json
npx shadcn@latest registry add @acme=https://acme.com/r/{name}.json
```

Run it in a project that has `components.json`. `{name}` must resolve to an item JSON.

## Use a namespaced registry

```sh
npx shadcn@latest list @acme
npx shadcn@latest search @acme --query button
npx shadcn@latest view @acme/button
npx shadcn@latest add @acme/button
```

Multiple items or registries can be given.

```sh
npx shadcn@latest add @acme/header @lib/auth-utils @ai/chatbot-rules
npx shadcn@latest search @v0 @acme @lib
npx shadcn@latest search @v0 --limit 10 --offset 20
```

## Add from a URL or local path

```sh
npx shadcn@latest add https://registry.example.com/button.json
npx shadcn@latest add ./local-registry/button.json
```

## Use a GitHub repository as a registry

```sh
npx shadcn@latest add <username>/<repo>/<item>
npx shadcn@latest add acme/toolkit/project-conventions
npx shadcn@latest list acme/toolkit
npx shadcn@latest search acme/toolkit --query conventions
npx shadcn@latest view acme/toolkit/project-conventions
```

Place `registry.json` at the repository root. Specify a branch, tag or commit SHA with `#`.

```sh
npx shadcn@latest add acme/toolkit/project-conventions#v1.0.0
npx shadcn@latest add acme/toolkit/project-conventions#main
```

## Validate a GitHub registry

```sh
npx shadcn@latest registry validate acme/toolkit
npx shadcn@latest registry validate acme/toolkit#v1.0.0
```

Reads the root `registry.json`, resolves includes, validates items and checks that referenced files exist.

## Validate before registering in the registry index

```sh
pnpm validate:registries
```

Validation command to run inside the `shadcn-ui/ui` repository after adding an entry to `apps/v4/registry/directory.json` (documented on the registry-index page).

## CLI check used by Registry Health

```sh
npx shadcn@latest add --dry-run
```

The weekly Registry Health CLI check verifies that an item works with `shadcn add --dry-run` (per the health page). Only registries listed in the directory are checked; for local verification use the `list` / `view` / `add` commands above. The official documentation lists no health-specific command.
