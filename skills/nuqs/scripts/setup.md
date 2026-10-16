# Setup

フレームワーク別の NuqsAdapter セットアップ手順。インストール後に行う初期設定。

## セットアップ前のインストール

```sh
npm install nuqs
```

他のパッケージマネージャーは `install.md` を参照。以下の各節は `NuqsAdapter` を配置するコード例（コマンドではなくソース編集）で、同内容の実例は `samples/adapter-setup.md` にもある。

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

サーバーレンダリングされるアイランド（Astro / Fastify / Hono 等、v2.10.0+、#1551）向けに `serverSearch` prop でリクエスト URL の検索文字列を渡し、SSR 時のデフォルト値のちらつきを避ける。クエリ文字列（先頭 `?` の有無は不問）または `URLSearchParams` を受け取り、SSR とハイドレーション時のみ読まれる（以降は通常どおり `location.search`）。アイランドごとに `NuqsAdapter` を 1 つ置き、History API 経由で同期される。

```astro
---
import { SearchIsland } from '../islands/SearchIsland'
---

<SearchIsland client:load serverSearch={Astro.url.search} />
```

```tsx
import { NuqsAdapter } from 'nuqs/adapters/react'

export function SearchIsland({ serverSearch }: { serverSearch: string }) {
  return (
    <NuqsAdapter serverSearch={serverSearch}>
      {/* useQueryState works here, on the server & the client */}
    </NuqsAdapter>
  )
}
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

非推奨: Remix v2 は EOL。`nuqs/adapters/remix` は nuqs@3.0.0 で削除予定。React Router v7 / v8 へ移行し、下記のアダプターを使う。

## React Router v6 のセットアップ

非推奨: React Router v6 は EOL。`nuqs/adapters/react-router/v6` は nuqs@3.0.0 で削除予定。汎用インポート `nuqs/adapters/react-router`（v6 を指す）も同じく nuqs@3.0.0 で削除予定のため、`/v6` `/v7` `/v8` のいずれかに固定する。違いは React Router フックのインポート元（v6 は `react-router-dom`、v7 / v8 は `react-router`）。

`BrowserRouter` のみ対応。`HashRouter` は将来対応の可能性あり（#810）、`MemoryRouter` は対応予定なし。

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

## React Router v8 のセットアップ

```tsx
import { NuqsAdapter } from 'nuqs/adapters/react-router/v8'
import { Outlet } from 'react-router'

export default function App() {
  return (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  )
}
```

React Router v7 と v8 は同じ `react-router` フックを公開するため、このアダプターは現状 v7 アダプターを再エクスポートしている。`/v8` に固定しておけば、将来実装が分岐してもインポートの変更が不要。

## TanStack Router のセットアップ

実験的サポートで、TanStack Start は未対応。ルートルートのコンポーネントを `NuqsAdapter` でラップする。

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
