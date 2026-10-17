---
source: https://react.dev/blog/2025/02/14/sunsetting-create-react-app
---

# Sunsetting Create React App

On February 14, 2025 the React team deprecated Create React App for new apps. Existing apps are encouraged to migrate to a framework, or to a build tool such as Vite, Parcel or Rsbuild.

## Signature / Usage

New installs show this deprecation warning (once per install):

```text
create-react-app is deprecated.

You can find a list of up-to-date React frameworks on react.dev
For more info see: react.dev/link/cra

This error message will only be shown once per install.
```

Why a router matters (from the post): routing in state does not create URLs, while a router gives each route its own URL.

```js
import {RouterProvider, createBrowserRouter} from 'react-router';

import Home from './Home';
import Dashboard from './Dashboard';

// ✅ Each route has it's own URL
const router = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: '/dashboard', element: <Dashboard />}
]);

export default function App() {
  return (
    <RouterProvider value={router} />
  )
}
```

## Options / Props

| Path | Guidance |
| --- | --- |
| Migrate to a framework | Recommended for new React apps. All recommended frameworks support CSR and SPAs and can be deployed to a CDN or static hosting without a server. Guides: Next.js' Create React App migration guide, React Router's framework adoption guide, Expo webpack to Expo Router migration guide |
| Migrate to a build tool | For unusual constraints or building your own framework. Guides: Vite, Parcel, Rsbuild Create React App migration guides; new docs for Building a React App from Scratch |

## Notes

- Create React App is deprecated because it has no active maintainers and existing frameworks already solve its limitations. It continues working in maintenance mode, and a new version was published to work with React 19. Deprecation notices were added to the CRA website and GitHub repo.
- Limitations of build tools called out: no built-in routing (state-based routing produces no shareable URLs), no data-fetching solution (fetching in an effect causes network waterfalls; use route loaders or libraries such as TanStack Query, SWR, Apollo or Relay), no code-splitting solution (`React.lazy` fetches code only when the component renders; router-level `lazy` options fetch in parallel).
- Other problem areas listed: accessibility, asset loading, authentication, caching, error handling, mutating data, navigations, optimistic updates, progressive enhancement, server-side rendering, static site generation, streaming.
- Recommended frameworks for new projects: Next.js, React Router, Expo. A rule of thumb: if your app needs routing, you would probably benefit from a framework.
- Server rendering is optional in the recommended frameworks (CSR is supported), and server rendering is not just for SEO: it also reduces the JavaScript the user must download and parse.
- Recommended frameworks include support for React Server Components, which do not require a server (they can run at build time on CI for SSG or at runtime for SSR).
- This post mentions React Router and TanStack Router as routing libraries; for those libraries use the react-router and tanstack-router skills. Next.js is covered by nextjs-app.

## Related

- [React Versions](./versions.md)
- [React Compiler v1.0](./react-compiler-1.md)
