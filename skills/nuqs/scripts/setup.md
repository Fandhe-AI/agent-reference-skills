# Setup

フレームワーク別の NuqsAdapter セットアップ手順。インストール後に行う初期設定。

## Next.js App Router のセットアップ

`app/layout.tsx` でルートレイアウトを `NuqsAdapter` でラップする。

```tsx
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
```

## Next.js Pages Router のセットアップ

`_app.tsx` でページコンポーネントを `NuqsAdapter` でラップする。

```tsx
import { NuqsAdapter } from 'nuqs/adapters/next/pages'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NuqsAdapter>
      <Component {...pageProps} />
    </NuqsAdapter>
  )
}
```

## Next.js 統合アダプター（App + Pages 両対応）のセットアップ

App Router と Pages Router を併用するアプリ向け。

```tsx
import { NuqsAdapter } from 'nuqs/adapters/next'
```

## React SPA（Vite 等）のセットアップ

`main.tsx` でルートを `NuqsAdapter` でラップする。

```tsx
import { NuqsAdapter } from 'nuqs/adapters/react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <NuqsAdapter>
    <App />
  </NuqsAdapter>
)
```

フルページナビゲーションオプション付き（v2.4.0+）:

```tsx
<NuqsAdapter fullPageNavigationOnShallowFalseUpdates>
  <App />
</NuqsAdapter>
```

## Remix のセットアップ

`app/root.tsx` で `Outlet` を `NuqsAdapter` でラップする。

```tsx
import { NuqsAdapter } from 'nuqs/adapters/remix'
import { Outlet } from '@remix-run/react'

export default function App() {
  return (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  )
}
```

## React Router v6 のセットアップ

```tsx
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([{ path: '/', element: <App /> }])

export function ReactRouter() {
  return (
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  )
}
```

## React Router v7 のセットアップ

```tsx
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

## TanStack Router のセットアップ

ルートルートのコンポーネントを `NuqsAdapter` でラップする。

```tsx
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
