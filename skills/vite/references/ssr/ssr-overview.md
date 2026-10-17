---
source: https://vite.dev/guide/ssr
---

# SSR Overview & Source Structure

Vite provides built-in (low-level) support for server-side rendering of front-end frameworks, and a typical SSR app splits its source into universal app code, a client entry, and a server entry.

## Signature / Usage

```
- index.html
- server.js # main application server
- src/
  - main.js          # exports env-agnostic (universal) app code
  - entry-client.js  # mounts the app to a DOM element
  - entry-server.js  # renders the app using the framework's SSR API
```

`index.html` references `entry-client.js` and includes a placeholder where the server-rendered markup is injected:

```html
<div id="app"><!--ssr-outlet--></div>
<script type="module" src="/src/entry-client.js"></script>
```

You can use any placeholder instead of `<!--ssr-outlet-->`, as long as it can be precisely replaced.

## Notes

- SSR here means front-end frameworks (React, Preact, Vue, Svelte) running the same application in Node.js, pre-rendering to HTML, and hydrating on the client. For traditional server-side frameworks, see the Backend Integration guide (../build-deploy/backend-integration.md).
- The guide assumes prior SSR experience with your framework and covers only Vite-specific integration details.
- This is a low-level API meant for library and framework authors. For applications, the page points to higher-level SSR plugins and tools (Awesome Vite SSR section) first, while noting many applications are built directly on the native API.
- The page states Vite is working on an improved SSR API with the Environment API.
- Example projects (`create-vite-extra`): Vanilla, Vue, React, Preact, Svelte, Solid (`template-ssr-<name>` under https://github.com/bluwy/create-vite-extra). Scaffold locally with `create-vite` and choose `Others > create-vite-extra`.
- Framework-level SSR (react-router, tanstack-start, tanstack-router, nextjs-app skills) is a different layer; this page covers Vite's own SSR primitives only.

## Related

- [Conditional Logic](./conditional-logic.md)
- [Setting Up the SSR Dev Server](./ssr-dev-server.md)
- [Building SSR for Production](./ssr-production-build.md)
- [ssr.* Options](./ssr-options.md)
