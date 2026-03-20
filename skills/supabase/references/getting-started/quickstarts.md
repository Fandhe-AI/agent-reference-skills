# クイックスタート

フレームワーク別クイックスタート一覧。

## 概要

Supabase は主要な Web / モバイルフレームワークのクイックスタートガイドを提供する。各ガイドでは、supabase-js のインストール、認証設定、データ取得の基本フローをカバーする。

## クイックスタート一覧

| フレームワーク | カテゴリ | パッケージ |
|-------------|---------|-----------|
| Next.js | React / SSR | `@supabase/supabase-js` + `@supabase/ssr` |
| React | SPA | `@supabase/supabase-js` |
| Vue | SPA | `@supabase/supabase-js` |
| Nuxt | Vue / SSR | `@supabase/supabase-js` + `@supabase/ssr` |
| SvelteKit | Svelte / SSR | `@supabase/supabase-js` + `@supabase/ssr` |
| SolidJS | SPA | `@supabase/supabase-js` |
| TanStack Start | React / SSR | `@supabase/supabase-js` + `@supabase/ssr` |
| RedwoodJS | React / Full-stack | `@supabase/supabase-js` |
| Refine | React / Admin | `@supabase/supabase-js` |
| Flutter | Mobile | `supabase_flutter` |
| Expo (React Native) | Mobile | `@supabase/supabase-js` |
| Swift (iOS) | Mobile | `supabase-swift` (SPM) |
| Kotlin (Android) | Mobile | `supabase-kt` (Gradle) |
| Laravel | PHP / Backend | `supabase-php` |
| Ruby on Rails | Ruby / Backend | Direct PostgreSQL |
| Flask | Python / Backend | `supabase-py` |
| Hono | Edge | `@supabase/supabase-js` |

## 共通セットアップ手順

1. Supabase プロジェクトを作成（dashboard.supabase.com）
2. API URL と anon key を取得（Settings → API）
3. クライアントライブラリをインストール
4. 環境変数を設定（`SUPABASE_URL`, `SUPABASE_ANON_KEY`）
5. `createClient()` でクライアントを初期化

## 基本的な初期化例

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
```

## SSR フレームワーク向け（Next.js, SvelteKit, Nuxt 等）

```typescript
import { createServerClient } from '@supabase/ssr';

const supabase = createServerClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        );
      },
    },
  }
);
```

## 注意点

- SSR フレームワークでは `@supabase/ssr` パッケージを使用する
- SPA では `@supabase/supabase-js` のみで十分
- モバイルアプリは各言語の専用クライアントを使用
- `anon` キーはクライアントサイドで安全に使用可能（RLS が保護）
- `service_role` キーは絶対にクライアントに露出させない

## 関連

- [./architecture.md](./architecture.md) — アーキテクチャ概要
- [../auth/server-side.md](../auth/server-side.md) — サーバーサイド認証
- [../client-js/initialization.md](../client-js/initialization.md) — JS クライアント初期化
