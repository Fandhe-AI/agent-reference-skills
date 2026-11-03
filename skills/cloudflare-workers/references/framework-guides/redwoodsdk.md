---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/redwoodsdk/
---

# RedwoodSDK

RedwoodSDK is a Vite plugin for server-side web apps on Cloudflare (SSR, React Server Components, Server Functions, realtime).

## Signature / Usage

```sh
npx create-rwsdk my-project-name
```

Entry point `src/worker.tsx`:

```tsx
import { defineApp } from "rwsdk/worker";
import { route, render } from "rwsdk/router";

export default defineApp([
  render(Document, [
    route("/", () => new Response("Hello, World!")),
    route("/ping", function () {
      return <h1>Pong!</h1>;
    }),
  ]),
]);
```

```sh
npm install
npm run dev
npm run release
```

## Notes

- Dev server runs at `http://localhost:5173`.
- `npm run release` builds and deploys. The first run may fail asking for a workers.dev subdomain; opening the Workers landing page in the dashboard creates it.

## Related

- [overview.md](./overview.md)
