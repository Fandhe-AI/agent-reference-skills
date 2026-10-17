---
source: https://docs.expo.dev/router/reference/reserved-paths/
---

# Reserved paths

URL paths reserved by Metro and Expo Router that you should avoid using for routes or static files. If you create a route or place static files at these paths, Metro or Expo Router intercepts the request instead of serving your content, resulting in a "404 Asset not found" error or your page being silently replaced by an internal dev server response.

## Signature / Usage

Conflict example for `/assets/*` and the fix:

```text
app
  assets.tsx          Conflicts with Metro
  assets
    index.tsx         Conflicts with Metro
public
  assets
    logo.png          Conflicts with Metro

app
  media.tsx           Works
public
  images
    logo.png          Works
```

## Options / Props

| Path | Description |
| --- | --- |
| `/assets/*` | Metro serves all bundled assets (images, fonts, other files) here. A route at **app/assets.tsx** or a directory at **public/assets/** is intercepted. |
| `/_expo/*` | Expo Router uses this for multiple internal middlewares, including dev tools and manifests. Do not create routes or static files under it. |
| `/_flight/*` | React Server Components use this path internally. |
| `/inspector` | React Native uses `/inspector/debug` and `/inspector/network` for the debugger. Avoid routes matching `/inspector` or sub-paths. |
| `/expo-dev-plugins/*` | Expo development tool plugins use this path. |
| `/manifest` | The dev server serves the native app manifest here. A route at **app/manifest.tsx** gets manifest JSON instead of your page and appears to silently not load during development. |
| `/_sitemap` | Expo Router generates a sitemap route here for debugging. A route at **app/_sitemap.tsx** overrides the built-in sitemap. |
| `/public/*` | If the project has a **public** directory, `/public` may conflict with static file serving. Avoid **app/public.tsx** or **app/public/index.tsx**. |
| `/favicon.ico` | Safe to override. Expo CLI serves a default favicon when none is provided; replace it with **favicon.ico** in **public** or an API route. |

## Notes

- Source: https://docs.expo.dev/router/reference/reserved-paths/ (unversioned guide, fetched 2026-10-17, modificationDate February 26, 2026).

## Related

- [Sitemap](./sitemap.md)
