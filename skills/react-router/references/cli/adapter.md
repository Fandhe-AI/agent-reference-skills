# Server Adapters (@react-router/{adapter})

Idiomatic React Router apps can be deployed anywhere because React Router adapts the server's request/response to the Web Fetch API, through adapters. Official adapters: `@react-router/architect`, `@react-router/cloudflare`, `@react-router/express`. `@react-router/node` provides shared Node utilities used by Node-based adapters.

Adapters are imported into your server's entry and are not used inside the React Router app itself. If you scaffolded with `npx create-react-router@latest` using something other than [`@react-router/serve`](./serve.md), your `server/index.js` already imports one of these.

## Signature / Usage

```ts
// @react-router/express
import { createRequestHandler } from "@react-router/express";
import express from "express";

const app = express();
app.all(
  "*",
  createRequestHandler({
    build: require("./build"),
    getLoadContext(req, res) {
      return {};
    },
  }),
);
```

```ts
// @react-router/architect
import { createRequestHandler } from "@react-router/architect";
import * as build from "./build/server";

export const handler = createRequestHandler({ build });
```

```ts
// @react-router/cloudflare
import {
  RouterContextProvider,
  createContext,
  createRequestHandler,
} from "react-router";

const cloudflareContext = createContext<{
  env: Env;
  ctx: ExecutionContext;
}>();

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    let routerContext = new RouterContextProvider();
    routerContext.set(cloudflareContext, { env, ctx });
    return requestHandler(request, routerContext);
  },
} satisfies ExportedHandler<Env>;
```

## Notes

- Migrating off [`@react-router/serve`](./serve.md) to `@react-router/express`: swap deps (`npm uninstall @react-router/serve`, `npm install @react-router/express compression express morgan cross-env`), add a `server/app.ts` calling `createRequestHandler`, point `vite.config.ts` `build.rollupOptions.input` at it for the SSR build, and update `dev`/`start` scripts to run the new server (`dev` needs `--conditions development`)
- Each adapter shares the same `createRequestHandler` API; some add platform-specific options
- `@react-router/node` is not itself an adapter but supplies Node-specific utilities consumed by Node-based adapters
- Node version support: React Router officially supports all Active LTS versions and the latest minor of the current Maintenance LTS line; minimum Maintenance LTS minor bumps can ship in a minor release, dropping an EOL Node major always ships in a major release
- v8: unchanged from v7 — same adapter set (`architect`, `cloudflare`, `express`, `node`) and API shape

## Related

- [@react-router/serve](./serve.md)
- [@react-router/dev (CLI)](./dev.md)
- [react-router.config.ts](../conventions/react-router-config-ts.md)
