---
source: https://developers.cloudflare.com/workers/local-development/multi-workers/
---

# Developing with multiple Workers

Run multiple Workers locally either in a single dev command (recommended default) or in separate dev commands.

## Signature / Usage

Single dev command with Wrangler (the first config is the primary Worker, exposed at `http://localhost:8787`; additional configs run as auxiliary Workers reachable via service bindings or tail consumers):

```sh
npx wrangler dev -c ./app/wrangler.jsonc -c ./api/wrangler.jsonc
```

Vite plugin (`auxiliaryWorkers`), then run `npx vite dev`:

```js
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    cloudflare({
      configPath: "./app/wrangler.jsonc",
      auxiliaryWorkers: [
        {
          configPath: "./api/wrangler.jsonc",
        },
      ],
    }),
  ],
});
```

Multiple dev commands (separate terminals):

```sh
# Terminal 1
npx wrangler dev -c ./app/wrangler.jsonc
# Terminal 2
npx wrangler dev -c ./api/wrangler.jsonc
```

## Notes

- Single dev command is recommended as the default for best binding compatibility. Use when you want the simplest setup, Workers are part of the same codebase, or you need Durable Object namespace / Workflow access from another Worker via `script_name`, or Queues with separate producer and consumer Workers.
- Separate dev commands can communicate via service bindings or tail consumers regardless of whether they run via `wrangler dev` or `vite dev`. Use when each Worker should be reachable at its own local URL (only the primary Worker is exposed in a single dev command), each Worker has its own build tooling, or you want to develop Workers independently.
- The approaches can be combined, e.g. a group via `vite dev` with `auxiliaryWorkers` plus another Worker via `wrangler dev`.

## Related

- [Local development](./overview.md)
- [Choosing between Wrangler & Vite](./wrangler-vs-vite.md)
- [Cloudflare Vite plugin](../vite-plugin/README.md)
