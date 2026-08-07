# Adapter Setup

Wrap the app with a framework-specific `NuqsAdapter` to enable query state hooks.

```tsx
// Next.js App Router — app/layout.tsx
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
```

```tsx
// Next.js Pages Router — pages/_app.tsx
import type { AppProps } from 'next/app'
import { NuqsAdapter } from 'nuqs/adapters/next/pages'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NuqsAdapter>
      <Component {...pageProps} />
    </NuqsAdapter>
  )
}
```

```tsx
// React SPA (Vite) — src/main.tsx
import { NuqsAdapter } from 'nuqs/adapters/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <App />
    </NuqsAdapter>
  </StrictMode>
)
```

```tsx
// React Router v7 / v8 — app/root.tsx
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { Outlet } from 'react-router'

export default function App() {
  return (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  )
}
```

```tsx
// TanStack Router — src/routes/__root.tsx
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  ),
})
```

## Notes

- Each framework has its own import path: `nuqs/adapters/next/app`, `nuqs/adapters/next/pages`, `nuqs/adapters/next` (unified), `nuqs/adapters/react`, `nuqs/adapters/react-router/v7`, `nuqs/adapters/react-router/v8`, `nuqs/adapters/tanstack-router`
- The adapter must wrap all components that use `useQueryState` or `useQueryStates`
- React Router v7 and v8 expose the same `react-router` hooks, so `nuqs/adapters/react-router/v8` currently re-exports the v7 adapter — either import path works on v8 projects
- `nuqs/adapters/remix` and `nuqs/adapters/react-router/v6` still work but are deprecated: both frameworks/versions have reached end of life and no longer receive security updates, and their adapters will be removed in nuqs@3.0.0. Migrate to `nuqs/adapters/react-router/v7` (or `/v8`) instead
- Global defaults can be set via `<NuqsAdapter defaultOptions={{ shallow: false, scroll: true }}>` (v2.5.0+)
- For testing, use `withNuqsTestingAdapter` from `nuqs/adapters/testing` instead
