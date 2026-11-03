---
source: https://developers.cloudflare.com/queues/configuration/local-development/
---

# Local development

Run and test Queues locally with `wrangler dev` (simulated via Miniflare).

## Signature / Usage

Adapted (not in the official docs): `npx wrangler@latest` is replaced by the project's installed `npx wrangler`; see Notes.

```sh
npx wrangler dev
```

Producer and consumer as separate Workers (experimental multi-Worker mode):

Adapted (not in the official docs): `npx wrangler@latest` is replaced by `npx wrangler`; see Notes.

```sh
npx wrangler dev -c wrangler.jsonc -c consumer-worker/wrangler.jsonc --persist-to .wrangler/state
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `-c` | string (repeatable) | — | Wrangler configuration file; pass one per Worker. |
| `--persist-to` | string | — | Directory for shared local state, so producer and consumer see the same queue. |

## Notes

- Adapted from the official docs: the page runs `npx wrangler@latest dev`; `npx wrangler dev` uses the Wrangler version installed in the project (v3.1.0 or later, and 3.38.0 or later for delays), so local runs match the version used to deploy.
- Requires Wrangler v3.1.0 or later and a Node.js version supported by Wrangler.
- Running several Workers with one Wrangler command is experimental and subject to change; when the producer sends, the consumer Worker is invoked automatically.
- Consumer concurrency is not supported locally.
- Known issue: Queues does not support Wrangler remote mode (`wrangler dev --remote`).
- Expected directory layout: `producer-worker/wrangler.jsonc`, `index.ts`, and `consumer-worker/wrangler.jsonc`, `index.ts`.
- Delivery and retry delays in local development require wrangler 3.38.0 or greater.

## Related

- [Get started](./get-started.md)
- [Consumer concurrency](./consumer-concurrency.md)
- [Batching, retries and delays](./batching-retries.md)
