# create-hono

Command-line project initializer for scaffolding new Hono applications from a starter template.

## Signature / Usage

```sh
npm create hono@latest my-app
# or
yarn create hono my-app
pnpm create hono@latest my-app
bun create hono@latest my-app
deno init --npm hono@latest my-app
```

Non-interactive setup with flags (npm/npx require forwarding flags after `--`):

```sh
npm create hono@latest my-app -- --template cloudflare-workers --pm npm --install
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--template <template>` | string | Select a starter template (e.g. `cloudflare-workers`, `vercel`, `bun`) and skip the interactive template prompt |
| `--install` | boolean | Automatically install dependencies after the project is created |
| `--pm <packageManager>` | string | Specify the package manager to use (`npm`, `pnpm`, `yarn`) |
| `--offline` | boolean | Use the local cache/templates instead of fetching the latest remote templates |

## Notes

- With `npm create` / `npx`, flags intended for the initializer must be placed after `--`; other package managers (yarn, pnpm, bun, deno) do not require this separator.
- The full, authoritative list of templates and flags is maintained in the `create-hono` GitHub repository (`honojs/create-hono`).

## Related

- [getting-started/README.md](../getting-started/README.md)
