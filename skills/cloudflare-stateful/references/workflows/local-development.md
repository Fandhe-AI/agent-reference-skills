---
source: https://developers.cloudflare.com/workflows/build/local-development/
---

# Local development

`wrangler dev` runs an emulated Workflows engine so you can test locally; `wrangler workflows ... --local` and Local Explorer manage local instances.

## Signature / Usage

```sh
# Confirm we are using wrangler v3.89.0+
npx wrangler --version

# Start a local dev session:
npx wrangler dev
```

```sh
npx wrangler workflows list --local
npx wrangler workflows trigger my-workflow --local
npx wrangler workflows instances describe my-workflow <INSTANCE_ID> --local
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| --local | boolean | — | Target a Workflow in a running `wrangler dev` session (Wrangler 4.79.0 or greater) |
| --port | number | 8787 | Port of the local dev session |

## Notes

- Prerequisites: Wrangler v3.89.0 or later and a Node.js version supported by Wrangler.
- Local Explorer: while `wrangler dev` runs press `e`, or open `http://localhost:8787/cdn-cgi/local/explorer`. It lists Workflows and instances, shows step history and status, triggers runs, sends events, pauses/resumes/terminates/restarts, and deletes instances. Requires Wrangler 4.82.1+ or Cloudflare Vite plugin 1.32.0+.
- Workflows declared only in `exports` work with `--local` and Local Explorer on Wrangler 4.142.0+ (Vite plugin 1.61.0+ for Local Explorer).
- Known issues: Workflows are not supported as remote bindings or with `wrangler dev --remote`; local development ignores the `jurisdiction` setting.
- `wrangler workflows` flags are documented in the cloudflare-wrangler skill; Vitest workflow introspection (`cloudflare:test`) is documented in the cloudflare-wrangler skill (vitest-integration).

## Related

- [wrangler-commands.md](./wrangler-commands.md)
- [workflow-configuration.md](./workflow-configuration.md)
- [data-location.md](./data-location.md)
