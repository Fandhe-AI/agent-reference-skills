---
source: https://docs.expo.dev/guides/publishing-websites/
---

# Publish websites

Export an Expo web app, serve it locally, and deploy it to EAS Hosting or third-party hosts.

## Signature / Usage

```json
{
  "expo": {
    "web": {
      "output": "server",
      "bundler": "metro"
    }
  }
}
```

```sh
npx expo export -p web
npx expo serve
```

## Options / Props

| `web.output` | Expo Router | API Routes | Description |
| --- | --- | --- | --- |
| `single` (default) | Yes | No | Single Page Application with one **index.html**, no statically indexable HTML. |
| `server` | Yes | Enabled by default | **client** and **server** directories. SDK 58 and later: HTML rendered on each request. Requires a deployed server. |
| `static` | Yes | Opt-in | Separate HTML file for every route in the **app** directory. |

The `server` config shown under Signature / Usage is for SSR-capable hosts such as EAS Hosting. For the static hosts below (Vercel, Netlify, GitHub Pages), set `web.output` to `"single"` (SPA) or `"static"` before running `npx expo export -p web`.

Vercel configuration for a single-page / static export (**vercel.json**; requires `web.output` of `"single"` or `"static"`):

```json
{
  "buildCommand": "expo export -p web",
  "outputDirectory": "dist",
  "devCommand": "expo",
  "cleanUrls": true,
  "framework": null,
  "rewrites": [{ "source": "/:path*", "destination": "/" }]
}
```

Netlify SPA redirect (**public/_redirects**, for `web.output: "single"`; not needed with `static` rendering): `/*    /index.html   200`. GitHub Pages (requires a `static` or `single` export): set `experiments.baseUrl` to `/repo-name` and use `"deploy": "gh-pages --nojekyll -d dist"`, `"predeploy": "expo export -p web"`.

## Notes

- Default and tabs templates configure `web.output: "server"` in SDK 58 and later. If `web.output` is omitted the fallback remains `single`; choose `static` explicitly for static hosts. API routes with `static` need `apiRoutes: true` in the `expo-router` plugin; `apiRoutes: false` disables them in either mode.
- For server output deploy both client assets and server code to a host that supports Expo Router server rendering (such as EAS Hosting); uploading only **client** to a static host gives no server rendering.
- `npx expo export -p web` writes to **dist**; **public** is copied into it. Avoid reserved paths such as `public/assets/`. `npx expo serve` serves at `http://localhost:8081` over HTTP only (camera, location, permissions may not work).
- Global HTTP headers for `static` and `server` output are configured through the `expo-router` plugin.
- Hosts covered in the source: EAS Hosting (recommended), Netlify, Vercel, AWS Amplify Console, Firebase Hosting, GitHub Pages. SDK 49 and earlier webpack builds use an archived guide.
- Vercel here is a static / SPA deployment of an Expo export; see the vercel skill for the Vercel platform itself, and the API Routes page for the `expo-server/adapter/vercel` server setup.
- Pinned: documentation fetched 2026-10-17, Expo SDK 58.

## Related

- [API Routes](./api-routes.md)
- [Static rendering](./static-rendering.md)
- [Server rendering](./server-rendering.md)
- [Server headers](./server-headers.md)
