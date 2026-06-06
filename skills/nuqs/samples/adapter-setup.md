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

## Notes

- Each framework has its own import path: `nuqs/adapters/next/app`, `nuqs/adapters/next/pages`, `nuqs/adapters/react`, `nuqs/adapters/remix`, `nuqs/adapters/react-router/v7`, `nuqs/adapters/tanstack-router`
- The adapter must wrap all components that use `useQueryState` or `useQueryStates`
- Global defaults can be set via `<NuqsAdapter defaultOptions={{ shallow: false, scroll: true }}>` (v2.5.0+)
- For testing, use `withNuqsTestingAdapter` from `nuqs/adapters/testing` instead
