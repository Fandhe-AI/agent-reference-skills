---
source: https://docs.expo.dev/router/web/server-rendering/
---

# Server rendering

Generate HTML on each request (SSR) with `web.output: "server"`, as opposed to static rendering at build time.

## Signature / Usage

```json
{
  "expo": {
    "web": {
      "output": "server"
    },
    "plugins": ["expo-router"]
  }
}
```

```sh
npx expo export --platform web
npx expo serve
```

Per-page metadata:

```tsx
import type { GenerateMetadataFunction } from 'expo-router/server';

export const generateMetadata: GenerateMetadataFunction = async (request, params) => {
  const response = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await response.json();

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.coverImage },
  };
};
```

## Options / Props

| Feature | Static rendering | Server rendering |
| --- | --- | --- |
| HTML generation | Build time | Request time |
| HTML delivery | Complete document | Streamed progressively |
| Configuration | `web.output: 'static'` | `web.output: 'server'` |
| Dynamic routes | Requires `generateStaticParams` | Works automatically |
| Server required | No | Yes |
| Time to First Byte | Fastest (cached) | Slower (rendered per request) |
| Hosting | Any static host | Server runtime required |

Supported platforms:

| Platform | Adapter |
| --- | --- |
| EAS Hosting | Built-in |
| Node.js/Express | `expo-server/adapter/express` |
| Cloudflare Workers | `expo-server/adapter/workerd` |
| Vercel Edge Functions | `expo-server/adapter/vercel` |
| Netlify Edge Functions | `expo-server/adapter/netlify` |
| Bun | `expo-server/adapter/bun` |

## Notes

- Distinct from Next.js App Router SSR (see nextjs-app skill); runtime is `expo-server`, and hono / fastify servers are not involved.
- Stable in SDK 58 and later. For SDK 55-57 enable `unstable_useServerRendering` in the `expo-router` plugin. To keep the SDK 57-and-earlier behavior of `web.output: "server"`, use `web.output: "static"` with `apiRoutes: true`.
- Output: **dist/client** (JS and CSS bundles for hydration) and **dist/server** (routes manifest `_expo/routes.json` and `_expo/server/render.js`); no HTML files are pre-generated.
- `generateStaticParams` is not needed; if exported it is handled dynamically. Pages render at request time with the actual URL params.
- **+html.tsx** runs on the server only via `expo-server`; spread all `useServerDocumentContext()` values (`htmlAttributes`, `bodyAttributes`, `headNodes`, `bodyNodes`) or the page may break or fail to hydrate (omitting `bodyNodes` prevents hydration). No global CSS, no `window` / `document`, must render `children`; receives `pathname` and `params` in SDK 58 and later.
- `generateMetadata` runs on the server and is stripped from the client bundle; `<Head>` from `expo-router/head` can co-exist but only updates tags after hydration.
- Server rendering cannot be deployed to static hosts such as GitHub Pages. Static and server rendering cannot be mixed in one project. Response caching is handled at the server or CDN level. API routes run on the server independently of the page rendering mode, but require `web.output: "server"` (enabled by default in SDK 58+) or `web.output: "static"` with `apiRoutes: true` in the `expo-router` plugin; they are not available with `single` output. Data loaders run per request.
- The official FAQ says API routes work independently of the rendering mode; the output-mode requirement was added from the API Routes page (static or server output required).
- EAS Hosting deploy: `npx expo export --platform web` then `npx eas-cli@latest deploy --export-dir dist`. The official page shows `hosting:deploy dist`, but eas-cli 25.1.1 has no `hosting:deploy` command; the command is `eas deploy` (alias `worker:deploy`) with `--export-dir`.
- Pinned: documentation fetched 2026-10-17, Expo SDK 58.

## Related

- [Static rendering](./static-rendering.md)
- [Data loaders](./data-loaders.md)
- [Server (expo-server)](./server.md)
- [API Routes](./api-routes.md)
