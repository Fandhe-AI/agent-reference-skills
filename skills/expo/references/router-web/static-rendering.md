---
source: https://docs.expo.dev/router/web/static-rendering/
---

# Static rendering

Render an Expo Router web app to static HTML at build time (SEO, performance) with `web.output: "static"`.

## Signature / Usage

```json
{
  "expo": {
    "web": {
      "output": "static"
    }
  }
}
```

```sh
npx expo export --platform web
```

Dynamic routes generate known pages with `generateStaticParams`:

```tsx
// src/app/blog/[id].tsx
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  const posts = await getPosts();
  return posts.map(post => ({ id: post.id }));
}

export default function Page() {
  const { id } = useLocalSearchParams();

  return <Text>Post {id}</Text>;
}
```

Root HTML (**src/app/+html.tsx**):

```tsx
import { ScrollViewStyleReset, useServerDocumentContext } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  const { headNodes, bodyNodes, htmlAttributes, bodyAttributes } = useServerDocumentContext();

  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <ScrollViewStyleReset />
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}
```

Metadata (SDK 58 and later):

```tsx
import type { Metadata } from 'expo-router/server';

export function generateMetadata(): Metadata {
  return { title: 'My Blog Website', description: 'This is my blog.' };
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `generateStaticParams(params)` | `Promise<Record<string, string>[]>` | Server-only, evaluated at build time in Node.js. Cascades from parent layouts to dynamic children; all variations must be accounted for. |
| `useServerDocumentContext()` | hook (`expo-router/html`) | Returns `headNodes`, `bodyNodes`, `htmlAttributes`, `bodyAttributes`. |
| `ScrollViewStyleReset` | component (`expo-router/html`) | Root style reset for full-screen React Native web apps. |
| `generateMetadata(request, params)` | function | SDK 58 and later. Resolved at build time per static path; `request` is `undefined` (also in development). May be async. |

## Notes

- Distinct from Next.js `generateStaticParams` / `generateMetadata` (App Router); the names match but the signatures and runtime are Expo Router's. See nextjs-app skill.
- SDK 58 and later: combine with API routes using `apiRoutes: true` in the `expo-router` plugin (output in **dist/server** and **dist/client**, requires a deployed server). Otherwise deploy **dist** to any static host (`npx serve dist` to preview). The output is not a single-page app, so no SPA redirects are needed. Rendering at request time needs `web.output: "server"`.
- Dynamic routes do not work out of the box; use `generateStaticParams`. It runs in Node.js with `process.env` access but not browser or native APIs. Use `process.cwd()` rather than `__dirname` to read files.
- **+html.tsx** runs only in Node.js: no global CSS import (use the Root Layout), no `window`, no browser APIs; global context providers belong in the Root Layout. In SDK 58 and later it must render `headNodes` in `<head>` and `bodyNodes` after `children`, and receives `pathname` and `params` props.
- `<Head>` from `expo-router/head` updates metadata after hydration only; in SDK 57 and earlier use `<Head>` for initial static metadata.
- The root **public** directory is copied to **dist**. Avoid reserved paths such as `public/assets/`.
- `expo-font` (`useFonts` / `Font.loadAsync`) fonts loaded synchronously are statically extracted and preloaded in HTML.
- Pinned: documentation fetched 2026-10-17, Expo SDK 58.

## Related

- [Server rendering](./server-rendering.md)
- [Data loaders](./data-loaders.md)
- [API Routes](./api-routes.md)
- [Async routes](./async-routes.md)
