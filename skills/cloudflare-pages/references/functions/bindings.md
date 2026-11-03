---
source: https://developers.cloudflare.com/pages/functions/bindings/
---

# Bindings overview and local-development flags

A binding lets Pages Functions interact with Cloudflare developer platform resources. Bindings are set for both production and preview environments and are read from `context.env`. Pages Functions support only a subset of all Workers bindings.

## Signature / Usage

Dashboard path for every binding: **Workers & Pages** > your Pages project > **Settings** > **Bindings** > **Add** > (binding type); give a **Variable name**, select the resource, then redeploy the project for the binding to take effect. Configure the same bindings in the Wrangler configuration file instead if preferred.

Local development with a binding flag:

```sh
npx wrangler pages dev <OUTPUT_DIR> --kv=TODO_LIST
```

## Options / Props

### `wrangler pages dev` flags per binding

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `-k <BINDING_NAME>` / `--kv=<BINDING_NAME>` | string | — | KV namespace binding. |
| `--do <BINDING_NAME>=<CLASS_NAME>@<SCRIPT_NAME>` | string | — | Durable Object binding; run `wrangler dev` in the Worker exporting the class in another terminal. |
| `--r2=<BINDING_NAME>` | string | — | R2 bucket binding. |
| `--d1 <BINDING_NAME>=<DATABASE_ID>` | string | — | D1 database binding. |
| `--ai=<BINDING_NAME>` | string | — | Workers AI binding (for example `--ai AI`). |
| `--service <BINDING_NAME>=<SCRIPT_NAME>` | string | — | Service binding to a Worker running under `wrangler dev`. |
| `--binding=<NAME>=<VALUE>` | string | — | Environment variable. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages). Wrangler `pages dev` flags are in the cloudflare-wrangler skill (commands/pages.md).
- If a binding is specified in a Wrangler configuration file and via a command-line argument, the command-line argument takes precedence.
- By default Wrangler persists local data to local storage; local KV/R2/D1 do not touch production resources.
- Analytics Engine cannot be used locally. Queue consumers cannot be implemented in Pages Functions (only producers).

## Related

- [bindings-data.md](./bindings-data.md)
- [bindings-services.md](./bindings-services.md)
- [bindings-env-secrets.md](./bindings-env-secrets.md)
- [wrangler-configuration.md](./wrangler-configuration.md)
- [local-development.md](./local-development.md)
